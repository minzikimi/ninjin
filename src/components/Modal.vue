<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative">
      <h2 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h2>
      <p class="text-gray-700 mb-6">{{ message }}</p>

      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
        >
          Close
        </button>
        <button
          v-if="confirmText"
          @click="$emit('confirm')"
          class="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String,
  confirmText: String, // optional: 확인 버튼 텍스트
});

defineEmits(["close", "confirm"]);
</script>
