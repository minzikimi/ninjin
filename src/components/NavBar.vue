<template>
  <nav
    v-if="
      currentPath !== '/' &&
      currentPath !== '/signup' &&
      currentPath !== '/login'
    "
    class="flex justify-between items-center px-4 h-20 bg-orange-500 text-white"
  >
    <div class="relative mr-4">
      <Icon
        icon="material-symbols:notifications"
        width="24"
        height="24"
        @click="toggleDropdown"
      />

      <span
        v-if="notificationCount > 0"
        class="absolute -top-2 -right-2 bg-green-600 text-xs rounded-full px-2 py-0.5 font-bold"
      >
        {{ notificationCount }}
      </span>
      <NotificationDropdown
        :show="showDropdown"
        @close="showDropdown = false"
      />
    </div>

    <h1 class="text-2xl m-5">{{ title }}</h1>

    <router-link
      v-if="
        currentPath === '/signup' ||
        currentPath === '/item-post' ||
        currentPath === '/item-post-update'
      "
      to="/item-listing"
    >
      <Icon icon="material-symbols:close" width="24" height="24" />
    </router-link>

    <div
      class="right-icons flex items-center gap-x-4"
      v-if="currentPath === '/item-listing'"
    >
      <!-- <router-link to="/profile">
        <Icon icon="teenyicons:user-circle-solid" width="24" height="24" />
      </router-link> -->
      <!-- <router-link to="/item-post">
        <Icon icon="mdi:pencil-outline" width="24" height="24" />
      </router-link> -->
    </div>

    <router-link
      v-if="currentPath.startsWith('/item-detail')"
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
import { useAuth } from "../composables/useAuth";
import { usePriceChangeSubscription } from "../composables/usePriceChangeSubscription";
import NotificationDropdown from "./NotificationDropdown.vue";
import { useNotificationStore } from "../stores/notification";

const route = useRoute();
const currentPath = computed(() => route.path);
const title = ref("");
const showDropdown = ref(false);
const { user } = useAuth();

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const notificationStore = useNotificationStore();
const notificationCount = computed(
  () => notificationStore.notifications.length
);

watch(
  () => user.value,
  (val) => {
    if (val) {
      usePriceChangeSubscription(val.id);
      console.log("hi");
    }
  },
  { immediate: true }
);

// watch는 currentPath를 감시하도록 함
watch(currentPath, (path) => {
  if (path === "/login") {
    title.value = "";
  } else if (path === "/signup") {
    title.value = "Sign up";
  } else if (path === "/chat-list") {
    title.value = "Chat";
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
