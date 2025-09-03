<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-white px-4"
  >
    <h1 class="text-6xl font-extrabold mb-10">MoNoモノ</h1>

    <router-link
      to="/signup"
      class="w-full max-w-xs py-4 mb-6 bg-orange-400 hover:bg-orange-600 text-white text-xl font-semibold shadow inline-block text-center"
    >
      Start
    </router-link>

    <div class="login-button">
      <h3>Already a member?</h3>
      <router-link to="/login" class="text-orange-400"> Login </router-link>
    </div>
  </div>
</template>

<script setup></script>
