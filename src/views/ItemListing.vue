<template>
  <div class="max-w-xl mx-auto p-4">
    <div class="grid grid-cols-2 gap-5">
      <ItemCard v-for="post in posts" :key="post.id" :item="post" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemCard from "../components/ItemCard.vue";
import supabase from "../supabase";
import { onMounted } from "vue";

const posts = ref([]);

onMounted(async () => {
  const { data, error } = await supabase.from("item_posts").select();
  if (error) {
    alert("failed to fetch posts");
  } else {
    posts.value = data; // data를 posts.value에 할당해야 화면에 렌더링됨
  }
  console.log(data);
});
</script>

<style></style>
