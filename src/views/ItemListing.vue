<template>
  <div class="mx-auto mt-5 relative min-h-[400px]">
    <ItemCard v-for="post in posts" :key="post.id" :item="post" />

    <router-link
      to="/item-post"
      class="fixed bottom-50 left-1/2 bg-orange-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition"
      aria-label="Add new item"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemCard from "../components/ItemCard.vue";
import supabase from "../supabase";
import { onMounted } from "vue";

const posts = ref([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from("item_posts")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    alert("failed to fetch posts");
  } else {
    posts.value = data; // data를 posts.value에 할당해야 화면에 렌더링됨
  }
  console.log(data);
});
</script>

<style></style>
