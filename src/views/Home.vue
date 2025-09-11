<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-white px-4"
  >
    <!-- bg-circles -->
    <div class="m-10">
      <div
        class="absolute w-48 h-48 bg-orange-400 rounded-full opacity-30 animate-moveCircle1"
      ></div>
      <div
        class="absolute w-36 h-36 bg-orange-500 rounded-full opacity-20 animate-moveCircle2"
      ></div>
    </div>

    <h1 class="text-6xl font-extrabold mb-10 text-neutral-700 tracking-wide">
      MoNoモノ
    </h1>

    <router-link
      to="/signup"
      class="rounded-md w-full max-w-xs py-4 mb-6 bg-orange-400 hover:bg-orange-600 text-white text-xl font-semibold shadow inline-block text-center"
    >
      Start
    </router-link>

    <div class="login-button">
      <h3 class="text-neutral-700">Already a member?</h3>
      <router-link to="/login" class="text-orange-400"> Login </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@keyframes moveCircle1 {
  0%,
  100% {
    transform: translateX(-30%);
  }
  50% {
    transform: translateX(30%);
  }
}

@keyframes moveCircle2 {
  0%,
  100% {
    transform: translateX(20%);
  }
  50% {
    transform: translateX(-20%);
  }
}

.animate-moveCircle1 {
  animation: moveCircle1 6s ease-in-out infinite;
  top: 18%;
}

.animate-moveCircle2 {
  animation: moveCircle2 8s ease-in-out infinite;
  top: 18%;
}
</style>
