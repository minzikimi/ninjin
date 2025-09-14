import supabase from "../supabase";
import { useNotificationStore } from "../stores/notification";

export const usePriceChangeSubscription = (userId) => {
  const notificationStore = useNotificationStore();

  const subscription = supabase
    .channel("public:item_posts")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "item_posts" },
      async (payload) => {
        console.log("Realtime event payload:", payload);
        const oldPrice = payload.old.price;
        const newPrice = payload.new.price;
        const postId = payload.new.id;

        if (oldPrice !== newPrice) {
          const { data: savedItems, error } = await supabase
            .from("item_save_list")
            .select()
            .eq("buyer_id", userId)
            .eq("post_id", postId);

          if (error) console.error("Check savedItems error:", error);

          if (savedItems && savedItems.length > 0) {
            notificationStore.addNotification({
              postId,
              oldPrice,
              newPrice,
              message: `Item ${postId} price has changed from ${oldPrice} to ${newPrice}.`
            });
          }
        }
      }
    )
    .subscribe((status, error) => {
      console.log("Subscription status:", status);
      if (error) console.error("Subscription error:", error);
    });

  return subscription;
};
