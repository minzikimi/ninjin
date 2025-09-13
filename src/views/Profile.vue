<template>
  <div class="max-w-md mx-auto p-6 space-y-8" v-if="isLogin">
    <!-- <h1 class="text-3xl font-bold mb-6 border-b pb-2">Profile</h1> -->

    <section class="flex items-center gap-4 mb-6">
      <div
        class="w-20 h-20 bg-orange-500 rounded-full overflow-hidden flex items-center justify-center text-white-500 select-none"
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
      <button class="text-orange-500" @click="handleLogout">Logout</button>
    </section>

    <details class="bg-orange-50 p-4 mb-6">
      <summary class="cursor-pointer font-semibold text-gray-900">
        My Favorite Items
      </summary>
      <div class="mt-2 space-y-4 text-gray-700">
        <div
          v-for="item in item_save_list"
          :key="item.id"
          class="flex justify-between items-center border-b border-gray-200 pb-2"
        >
          <router-link
            :to="`/item-detail/${item.post_id}`"
            class="font-medium text-orange-600 hover:underline"
          >
            <span class="font-medium">{{ item.item_title }}</span>
          </router-link>
          <time class="text-sm text-gray-500">{{
            new Date(item.created_at).toLocaleDateString()
          }}</time>
        </div>
        <p v-if="item_save_list.length === 0" class="text-gray-400">
          No favorite items found.
        </p>
      </div>
    </details>

    <details class="rounded-md bg-orange-50 -md p-4">
      <summary class="cursor-pointer font-semibold text-gray-900">
        My Posted Items
      </summary>
      <div class="mt-2 space-y-4 text-gray-700">
        <div
          v-for="item in item_my_posted_list"
          :key="item.id"
          class="flex justify-between items-center border-b border-gray-200 pb-2"
        >
          <router-link
            :to="`/item-detail/${item.id}`"
            class="font-medium text-orange-600 hover:underline"
          >
            <span class="font-medium">{{ item.title }}</span>
          </router-link>
          <time class="text-sm text-gray-500">{{
            new Date(item.created_at).toLocaleDateString()
          }}</time>
        </div>

        <p v-if="item_my_posted_list.length === 0" class="text-gray-400">
          You have not posted any items yet.
        </p>
      </div>
    </details>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import supabase from "../supabase";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

import { onMounted } from "vue";

const router = useRouter();
const { isLogin, user, updateUserState } = useAuth();

const name = ref("");
const tel = ref("");
const text = ref("");
const location = ref("");

const item_save_list = ref([]);
const item_my_posted_list = ref([]);

const getMyPostList = async () => {
  const { error, data } = await supabase
    .from("item_posts")
    .select()
    .eq("author", user.value.id);

  if (error) {
    alert("Failed to fetch my posted items");
  } else {
    item_my_posted_list.value = data;
    console.log("My posted items:", item_my_posted_list.value);
  }
};

const getSavedlist = async () => {
  const { data, error } = await supabase
    .from("item_save_list")
    .select()
    .eq("buyer_id", user.value.id);

  if (error) {
    alert("Failed to fetch save history");
  } else {
    item_save_list.value = data;
    console.log(item_save_list);
  }
};

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("logout failed");
  } else {
    alert("logout success");
    router.push("/");
  }
};
const updateUserStateData = async () => {
  if (!user.value) {
    alert("Please log in");
    router.push("/");
    return;
  }
  const { data: userData, error: userError } = await supabase
    .from("user_table")
    .select()
    .eq("id", user.value.id);

  console.log(userData);

  if (userData && !userError) {
    name.value = userData[0].name;
    tel.value = userData[0].tel;
    location.value = userData[0].location;
    text.value = userData[0].text;
  } else {
    alert("User profile not found. Please log in again.");
    router.push("/");
  }
};

onMounted(async () => {
  await updateUserState();
  await getSavedlist();
  await getMyPostList();
});

watch(isLogin, async (loggedIn) => {
  if (loggedIn) {
    await updateUserStateData(); // 로그인 상태가 되면 프로필 갱신
  } else {
    router.push("/");
  }
});
</script>
