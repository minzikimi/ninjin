<template>
  <router-link
    :to="`/item-detail/${item.id}`"
    class="block rounded-md w-full mb-3"
  >
    <div
      class="rounded-md w-full p-4 flex cursor-pointer transition bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
    >
      <img
        :src="item.img_url || 'https://placehold.co/150x150?text=No+Image'"
        alt="item photo"
        class="w-24 h-24 object-cover rounded-md flex-shrink-0 border border-gray-300"
      />
      <div class="ml-4 flex flex-col justify-between flex-1">
        <h2 class="font-semibold text-lg truncate">{{ item.title }}</h2>
        <h3 class="text-orange-600 font-bold text-xl mt-1">
          {{ formatPrice(item.price) }} SEK
        </h3>
        <address class="text-gray-500 text-sm mt-1 truncate">
          {{ item.location }}
        </address>

        <p class="text-gray-700 mt-2 line-clamp-2">{{ item.desc }}</p>
        <time>{{ format(new Date(item.created_at), "yyyy-MM-dd") }}</time>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { format } from "date-fns";

defineProps({
  item: Object,
});

const formatPrice = (price) => {
  if (!price) return "-";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>
