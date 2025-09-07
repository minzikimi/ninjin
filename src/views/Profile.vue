<template>
  <div class="max-w-md mx-auto p-6 space-y-8" v-if="isLogin">
    <h1 class="text-3xl font-bold mb-6 border-b pb-2">Profile</h1>

    <section class="flex items-center gap-4 mb-6">
      <div
        class="w-20 h-20 bg-orange-400 rounded-full overflow-hidden flex items-center justify-center text-white-500 select-none"
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
        <p class="text-gray-600 mt-1">{{ tel }}</p>
        <p class="text-gray-600 mt-1">{{ location }}</p>
      </div>
    </section>

    <section class="mb-8">
      <h3 class="text-lg font-semibold mb-2">About Me</h3>
      <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {{ text }}
      </p>
    </section>

    <section>
      <button class="text-orange-400" @click="handleLogout">Logout</button>
    </section>

    <details class="bg-orange-50 p-4 mb-6">
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
        <p class="text-gray-400">No favorite items found.</p>
      </div>
    </details>

    <details class="bg-orange-50 -md p-4">
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
        <p class="text-gray-400">No posted items found.</p>
      </div>
    </details>
  </div>
</template>

<script setup>
import { ref } from "vue";
import supabase from "../supabase";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLogin = ref(false);

const name = ref("");
const tel = ref("");
const text = ref("");
const location = ref("");

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("logout failed");
  } else {
    alert("logout success");
    router.push("/");
  }
};

//check log in status upon mounting
onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user?.email);

  if (user) {
    console.log(" you are login now");
    isLogin.value = true;

    const { data: userData, error: userError } = await supabase
      .from("user_table")
      .select()
      .eq("id", user.id);

    if (userData && !userError) {
      console.log("user data:", userData);

      name.value = userData[0].name;
      tel.value = userData[0].tel;
      location.value = userData[0].location;
      text.value = userData[0].text;
    }
  } else {
    console.log("you are log out");
    isLogin.value = false;
    alert("Please log in");
    router.push("/");
  }
});
</script>
