<script setup>
import NavBar from "./components/NavBar.vue";
import TabBar from "./components/TabBar.vue";
</script>

<template>
  <div
    class="max-w-md mx-auto w-full min-h-screen box-border relative"
    style="font-family: 'Host Grotesk', sans-serif"
  >
    <NavBar />
    <TabBar />
    <router-view />
  </div>
</template>

<style scoped></style>
