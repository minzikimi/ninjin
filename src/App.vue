<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="max-w-xs mx-auto w-full min-h-screen box-border">
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped></style>
