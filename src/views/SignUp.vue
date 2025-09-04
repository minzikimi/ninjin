<template>
  <div
    class="w-full max-w-md mx-auto min-h-screen flex flex-col justify-center items-center bg-white"
  >
    <h1 class="text-6xl font-extrabold mb-10">MoNoモノ</h1>

    <form
      @submit.prevent="handleSignup"
      class="w-full max-w-xl space-y-6 bg-white p-8 border border-gray-400"
    >
      <input
        type="email"
        v-model="email"
        placeholder="Enter your Hyper Island email"
        required
        class="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
        class="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
      />

      <input
        type="tel"
        v-model="tel"
        placeholder="000 0000 000 "
        required
        class="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
      />

      <input
        type="text"
        v-model="name"
        placeholder="Enter your name"
        required
        class="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
      />

      <input
        type="text"
        v-model="addr"
        placeholder="Enter your address"
        required
        class="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
      />

      <textarea
        v-model="text"
        placeholder="Self introduction"
        rows="5"
        class="w-full px-4 py-2 border border-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
      ></textarea>

      <button
        type="submit"
        class="w-full py-4 bg-orange-400 text-white font-semibold transition hover:bg-orange-600 rounded-none"
      >
        Sign Up
      </button>

      <div class="text-center text-gray-700 pt-4">
        Already a member?
        <router-link
          to="/login"
          class="text-orange-400 font-semibold hover:underline ml-1"
          >Login</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const tel = ref("");
const name = ref("");
const addr = ref("");
const text = ref("");

function handleSignup() {}
</script>
