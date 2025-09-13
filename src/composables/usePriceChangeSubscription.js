import supabase from "@/supabase";
import { useNotificationStore } from "@/stores/notification";

export const usePriceChangeSubscription = (userId) => {
  const notificationStore = useNotificationStore();

  const subscription = supabase
    .channel("public:item_posts")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "item_posts" },
      async (payload) => {
        const oldPrice = payload.old.price;
        const newPrice = payload.new.price;
        const postId = payload.new.id;

        if (oldPrice !== newPrice) {
          // 관심 사용자인지 여부 체크: item_save_list 조회 (생략 가능)
          const { data: savedItems } = await supabase
            .from("item_save_list")
            .select()
            .eq("buyer_id", userId)
            .eq("post_id", postId);

          if (savedItems.length > 0) {
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
    .subscribe();

  return subscription;
};
