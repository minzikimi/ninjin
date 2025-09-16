<template>
  <div
    v-if="show"
    class="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-50 max-h-64 overflow-auto"
  >
    <p v-if="notifications.length === 0" class="p-4 text-gray-500">
      No notifications
    </p>
    <ul v-else>
      <li
        v-for="(note, idx) in notifications"
        :key="idx"
        class="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
        @click="goToItem(note.postId)"
      >
        <p class="text-orange-600 truncate">{{ note.message }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useNotificationStore } from "../stores/notification";
import { useRouter } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  show: Boolean,
});

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);

const router = useRouter();
function goToItem(postId) {
  router.push(`/item-detail/${postId}`);
}
</script>
