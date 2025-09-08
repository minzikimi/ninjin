<template>
  <nav class="flex justify-between items-center px-4 h-16">
    <router-link
      v-if="
        currentPath === '/signup' ||
        currentPath === '/login' ||
        currentPath === '/item-post' ||
        currentPath === '/item-post-update'
      "
      to="/item-listing"
    >
      <Icon icon="material-symbols:close" width="24" height="24" />
    </router-link>
    <h1>{{ title }}</h1>
    <div
      class="right-icons flex items-center gap-x-4"
      v-if="currentPath === '/item-listing'"
    >
      <router-link to="/profile">
        <Icon icon="teenyicons:user-circle-solid" width="24" height="24" />
      </router-link>
      <router-link to="/item-post">
        <Icon icon="mdi:pencil-outline" width="24" height="24" />
      </router-link>
    </div>

    <router-link
      v-if="
        currentPath.startsWith('/item-detail') || currentPath === '/profile'
      "
      to="/item-listing"
    >
      <Icon icon="ic:baseline-arrow-back" width="24" height="24" />
    </router-link>
  </nav>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";

const route = useRoute();

const currentPath = computed(() => route.path);

const title = ref("");

// watch는 currentPath를 감시하도록 함
watch(currentPath, (path) => {
  if (path === "/login") {
    title.value = "";
  } else if (path === "/signup") {
    title.value = "Sign up";
  } else if (path === "/home") {
    title.value = "Home";
  } else if (path === "/chat") {
    title.value = "Chat";
  } else if (path === "/community") {
    title.value = "Community";
  } else if (path === "/profile") {
    title.value = "Profile";
  } else if (path === "/item-post") {
    title.value = "Post your item";
  } else if (path === "/item-post-update") {
    title.value = "Update your item";
  } else if (path === "/item-detail") {
    title.value = "Item Detail";
  } else if (path === "/item-listing") {
    title.value = "Item Listing";
  } else {
    title.value = "";
  }
});
</script>

<style></style>
