import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([]);

  function addNotification(notification) {
    notifications.value.push(notification);
  }

  function clearNotifications() {
    notifications.value = [];
  }

  return {
    notifications,
    addNotification,
    clearNotifications
  };
});
