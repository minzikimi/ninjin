<template>
  <Spinner :visible="isLoading" text="just a moment..." />
  <div class="min-h-screen flex flex-col justify-center items-center bg-white">
    <form class="w-full max-w-xs" @submit.prevent="handleLogin">
      <h1 class="text-6xl font-extrabold mb-10">Login</h1>
      <div class="mb-4">
        <label
          for="email"
          class="block mb-1 text-gray-700 font-semibold text-sm"
          >Email</label
        >
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          v-model="email"
          class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-400 text-base transition"
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-1 text-gray-700 font-semibold text-sm"
          >Password</label
        >
        <input
          type="password"
          id="password"
          required
          placeholder="Enter your password"
          v-model="password"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-base transition"
        />
      </div>
      <button
        type="submit"
        class="w-full py-3 bg-orange-400 hover:bg-orange-800 text-white font-semibold text-base shadow transition"
      >
        Log In
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import supabase from "../supabase";
import { ref } from "vue";
import Spinner from "../components/Spinner.vue";

const email = ref("");
const password = ref("");

const router = useRouter();
const isLoading = ref(false);

const handleLogin = async () => {
  console.log(email.value, password.value);
  isLoading.value = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    alert(error.message);
  } else {
    alert(" login successful");
    console.log(data);
    router.push("/item-listing");
  }
};
</script>

<style></style>
