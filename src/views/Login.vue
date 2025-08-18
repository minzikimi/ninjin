<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-white">
    <h1 class="text-xl font-bold mb-8 text-gray-800 tracking-tight">Login</h1>
    <form class="w-full max-w-xs">
      <div class="mb-4">
        <label
          for="email"
          class="block mb-1 text-gray-700 font-semibold text-sm"
          >Email</label
        >
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          v-model="email"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-base transition"
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-1 text-gray-700 font-semibold text-sm"
          >Password</label
        >
        <input
          type="password"
          id="password"
          required
          placeholder="Enter your password"
          v-model="password"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-base transition"
        />
      </div>
      <button
        type="submit"
        class="w-full py-3 rounded-lg bg-gray-600 hover:bg-gray-800 text-white font-semibold text-base shadow transition"
      >
        Log In
      </button>
      <div class="flex mt-4 justify-between text-sm text-gray-500">
        <a href="#" class="hover:underline">Sign Up</a>
        <a href="#" class="hover:underline">Forgot Password?</a>
      </div>
    </form>
  </div>
</template>

<script></script>

<style></style>
