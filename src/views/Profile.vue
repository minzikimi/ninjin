<template>
  <div class="max-w-md mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-bold mb-6 border-b pb-2">Profile</h1>

    <section class="flex items-center gap-4 mb-6">
      <div
        class="w-20 h-20 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center text-gray-500 select-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A9.718 9.718 0 0112 15.5c2.386 0 4.57.872 6.243 2.304M15 11a3 3 0 01-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <div>
        <h2 class="text-xl font-semibold text-gray-800">{{ name }}</h2>
        <p class="text-gray-600 mt-1">{{ phone }}</p>
      </div>
    </section>

    <section class="mb-8">
      <h3 class="text-lg font-semibold mb-2">About Me</h3>
      <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {{ intro }}
      </p>
    </section>

    <section>
      <button class="logout" @click="handleLogout">로그아웃</button>
    </section>

    <details class="bg-gray-50 rounded-md p-4 mb-6">
      <summary class="cursor-pointer font-semibold text-gray-900">
        My Favorite Items
      </summary>
      <div class="mt-2 space-y-4 text-gray-700">
        <div
          v-for="item in favoriteItems"
          :key="item.id"
          class="flex justify-between items-center border-b border-gray-200 pb-2"
        >
          <span class="font-medium">{{ item.title }}</span>
          <time class="text-sm text-gray-500">{{
            new Date(item.saved_at).toLocaleDateString()
          }}</time>
        </div>
        <p v-if="favoriteItems.length === 0" class="text-gray-400">
          No favorite items found.
        </p>
      </div>
    </details>

    <details class="bg-gray-50 rounded-md p-4">
      <summary class="cursor-pointer font-semibold text-gray-900">
        My Posted Items
      </summary>
      <div class="mt-2 space-y-4 text-gray-700">
        <div
          v-for="item in postedItems"
          :key="item.id"
          class="flex justify-between items-center border-b border-gray-200 pb-2"
        >
          <span class="font-medium">{{ item.title }}</span>
          <time class="text-sm text-gray-500">{{
            new Date(item.posted_at).toLocaleDateString()
          }}</time>
        </div>
        <p v-if="postedItems.length === 0" class="text-gray-400">
          No posted items found.
        </p>
      </div>
    </details>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("Name");
const phone = ref("010-1234-5678");
const intro = ref("Hi, i am front end dev student in hyPER iSLAND");
const favoriteItems = ref([
  { id: 1, title: "Vintage Chair", saved_at: "2025-09-01" },
  { id: 2, title: "Book", saved_at: "2025-08-15" },
]);
const postedItems = ref([
  { id: 1, title: "Office Desk", posted_at: "2025-07-10" },
  { id: 2, title: "Dining Table", posted_at: "2025-06-25" },
]);
</script>
