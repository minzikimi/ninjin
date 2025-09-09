<template>
  <div
    class="w-full max-w-md mx-auto min-h-screen flex flex-col justify-center px-6 py-10 bg-white"
  >
    <h1 class="text-4xl font-bold mb-8 text-center">Join MoNo</h1>

    <form @submit.prevent="handleSignup" class="space-y-6">
      <input
        type="email"
        v-model="email"
        placeholder="Enter your Hyper Island email"
        required
        class="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
        class="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="tel"
        v-model="tel"
        placeholder="000 0000 0000"
        required
        class="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="text"
        v-model="name"
        placeholder="Enter your name"
        required
        class="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="text"
        v-model="location"
        placeholder="Enter your location"
        required
        class="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <textarea
        v-model="text"
        placeholder="Self introduction"
        rows="4"
        class="w-full px-4 py-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
      ></textarea>

      <button
        type="submit"
        class="w-full py-3 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 transition"
      >
        Sign Up
      </button>

      <p class="mt-6 text-center text-gray-600">
        Already a member?
        <router-link to="/login" class="text-orange-400 underline ml-1"
          >Login</router-link
        >
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import supabase from "../supabase";
import Spinner from "../components/Spinner.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const tel = ref("");
const name = ref("");
const text = ref("");
const location = ref("");

const isLoading = ref(false);

const handleSignup = async () => {
  isLoading.value = true;

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert(error.message);
  } else {
    // console.log("sign up sucessful");
    console.log(data);

    const { error } = await supabase.from("user_table").insert({
      tel: tel.value,
      text: text.value,
      name: name.value,
      location: location.value,
    });
    if (error) {
      alert("error");
      console.log(error);
    } else {
      isLoading.value = false;
      router.push("/login");
    }
  }
};
</script>
