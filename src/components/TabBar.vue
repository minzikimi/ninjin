<template>
  <nav
    v-if="
      currentPath !== '/' &&
      currentPath !== '/signup' &&
      currentPath !== '/login'
    "
    class="absolute bottom-0 w-full bg-white border-t border-gray-300 flex justify-around items-center h-16"
  >
    <router-link
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="flex flex-col items-center justify-center text-sm text-gray-500"
      active-class="text-orange-500"
      exact
    >
      <Icon :icon="tab.icon" width="24" height="24" />
      <span class="mt-1">{{ tab.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const tabs = [
  { path: "/item-listing", label: "Explore", icon: "mdi:compass-outline" },
  { path: "/chat-list", label: "Chat", icon: "mdi:chat-outline" },

  { path: "/profile", label: "Profile", icon: "teenyicons:user-circle-solid" },
];

const route = useRoute();
const currentPath = computed(() => route.path);
</script>
