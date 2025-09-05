<template>
  <div class="max-w-xl mx-auto p-4 bg-white">
    <h1 class="text-3xl font-extrabold mb-4 text-orange-500">
      {{ post.title }}
    </h1>

    <figure class="mb-5 overflow-hidden">
      <img
        :src="post.image || 'https://placehold.co/640x360'"
        alt="head image"
        class="w-full h-56 object-cover"
      />
    </figure>

    <div class="p-4 bg-gray-50 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-1">{{ post.title }}</h2>
      <p class="text-sm text-gray-600 mb-3 flex items-center gap-2">
        <span>{{ post.seller }}</span>
        <span class="text-gray-400">·</span>
        <span>{{ post.location }}</span>
      </p>

      <p class="text-lg font-bold text-orange-500 mb-4">
        {{ post.pay_rule }}: <span>{{ post.price.toLocaleString() }}SEK</span>
      </p>
      <textarea
        readonly
        rows="8"
        class="w-full p-3 text-gray-700 resize-none bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        :value="post.desc"
      ></textarea>
    </div>

    <div
      class="max-w-xl bottom-0 left-0 w-full flex border-t border-gray-200 bg-white z-10"
    >
      <a
        :href="`tel:${post.tel}`"
        class="flex-1 py-4 text-center text-orange-500 hover:bg-orange-100 transition rounded-none font-semibold"
      >
        Ring
      </a>

      <button
        v-if="!isApplied"
        class="flex-1 py-4 text-center text-white bg-orange-500 border-l border-gray-200 hover:bg-orange-100 transition font-semibold"
      >
        Save
      </button>
      <button
        v-else
        disabled
        class="flex-1 py-4 text-center text-gray-400 border-l border-gray-200 cursor-not-allowed"
      >
        Saved
      </button>
    </div>

    <!-- if writer clicks -->
    <div
      class="max-w-xl bottom-0 left-0 w-full flex border-t border-gray-200 bg-white z-10"
    >
      <a
        :href="`tel:${post.tel}`"
        class="flex-1 py-4 text-center text-orange-500 hover:bg-orange-100 transition rounded-none font-semibold"
      >
        Delete
      </a>

      <button
        v-if="!isApplied"
        class="flex-1 py-4 text-center text-white bg-orange-500 border-l border-gray-200 hover:bg-orange-100 transition font-semibold"
      >
        Edit
      </button>
      <button
        v-else
        disabled
        class="flex-1 py-4 text-center text-gray-400 border-l border-gray-200 cursor-not-allowed"
      >
        Saved
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const post = {
  id: 1,
  title: "macbook",
  seller: "minji",
  location: "slussen",
  pay_rule: "Price",
  price: 50000,
  desc: "its almost new",
  tel: "010-1234-5678",
  author: 2,
  image: "",
};

const user = { id: 1 };
const isApplied = false;
</script>
