<template>
  <div
    class="fixed inset-0 bg-orange-500 bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white w-full max-w-md rounded-2xl shadow-lg flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="font-bold text-lg">Chat</h2>
        <button
          @click.prevent.stop="$emit('close')"
          class="text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="p-4 flex-1">
        <p>Coming soon!</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
