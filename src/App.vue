<script setup>
// 불필요한 import는 지워도 됩니다.
// import HelloWorld from "./components/HelloWorld.vue";

import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped></style>
