<template>
  <nav class="flex justify-between items-center px-4 h-16">
    <router-link
      v-if="
        currentPath === '/' ||
        currentPath === '/signup' ||
        currentPath === '/home'
      "
      to="/itemlisting"
      class="btn-close"
    >
      <Icon icon="material-symbols:close" width="24" height="24" />
    </router-link>
    <h1>{{ title }}</h1>
    <div
      class="right-icons flex items-center gap-x-4"
      v-if="currentPath === '/itemlisting'"
    >
      <router-link>
        <Icon icon="teenyicons:user-circle-solid" width="24" height="24" />
      </router-link>
      <router-link>
        <Icon icon="mdi:pencil-outline" width="24" height="24" />
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

let route = useRoute();
let currentPath = route.path;

const title = ref("");
watch(route, (newRoute) => {
  const currentPath = newRoute.path;
  console.log(currentPath);

  if (currentPath === "/login") {
    title.value = "Login";
  } else if (currentPath === "/signup") {
    title.value = "Sign up";
  } else if (currentPath === "/home") {
    title.value = "Home";
  } else if (currentPath === "/chat") {
    title.value = "Chat";
  } else if (currentPath === "/community") {
    title.value = "Community";
  } else if (currentPath === "/profile") {
    title.value = "Profile";
  } else {
    title.value = "";
  }
});
</script>

<style></style>
