import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([]);

  function addNotification(notification) {
    notifications.value.push(notification);
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }

  function clearNotifications() {
    notifications.value = [];
  }

  return { notifications, addNotification, removeNotification, clearNotifications };
});
    