<template>
  <div
    class="mb-3 border p-3 flex flex-row cursor-pointer transition hover:shadow-lg"
  >
    <img
      :src="item.image"
      alt="item photo"
      class="w-full h-40 object-cover rounded"
    />
    <div class="mt-3 flex-1 flex flex-col justify-between">
      <h2 class="font-semibold text-lg">{{ item.title }}</h2>
      <p class="text-gray-500 text-sm mt-1">{{ item.location }}</p>
      <div class="text-orange-600 font-bold mt-2">{{ item.price }}SEK</div>
      <p class="text-gray-700 mt-2 line-clamp-2">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});
</script>
