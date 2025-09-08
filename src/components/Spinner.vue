<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-orange-500 bg-opacity-80 flex justify-center items-center z-50"
  >
    <p class="text-white text-xl font-semibold">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  text: {
    type: String,
    default: "Loading...",
  },
});
</script>
