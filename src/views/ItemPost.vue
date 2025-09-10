<template>
  <Spinner :visible="isLoading" text="Just a moment, we're posting..." />
  <!--  -->
  <div
    class="max-w-md mx-auto min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4"
  >
    <form
      v-if="isLogin"
      @submit.prevent="handleSubmit"
      class="space-y-6 bg-white p-6 border border-gray-400 rounded-none w-full"
    >
      <label
        for="photo"
        class="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover mb-2"
        :style="previewImage ? `background-image: url('${previewImage}');` : ''"
      >
        <template v-if="!previewImage">
          <!-- Camera Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-20 h-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke="currentColor"
              stroke-width="1.5"
              d="M5 7l1.5-2h11L19 7M3 7h18a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 3a4 4 0 100 8 4 4 0 000-8zm0 5.8a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6z"
            />
          </svg>
          <div class="text-neutral-400 text-sm">Add a photo</div>
        </template>
      </label>
      <input
        @change="onFileChange"
        type="file"
        id="photo"
        accept="image/*"
        class="hidden"
      />

      <!-- Title -->
      <div class="flex flex-col">
        <label for="title" class="mb-2 font-semibold text-gray-700"
          >Title</label
        >
        <input
          id="title"
          type="text"
          v-model="title"
          required
          placeholder="Please provide a concise title for your item"
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
        />
      </div>
      <div class="flex flex-col">
        <label for="price" class="mb-2 font-semibold text-gray-700"
          >Price</label
        >
        <input
          id="price"
          type="number"
          v-model="price"
          required
          placeholder="Price"
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
        />
      </div>
      <div class="flex flex-col">
        <label for="description" class="mb-2 font-semibold text-gray-700"
          >Description</label
        >
        <textarea
          id="description"
          v-model="description"
          required
          placeholder="Detailed item description"
          rows="4"
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 resize-y"
        />
      </div>
      <div class="flex flex-col">
        <label for="location" class="mb-2 font-semibold text-gray-700"
          >Location</label
        >
        <input
          id="location"
          type="text"
          v-model="location"
          required
          placeholder="City, district, or neighborhood"
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
        />
      </div>
      <div class="flex flex-col">
        <label for="tel" class="mb-2 font-semibold text-gray-700"
          >Phone number</label
        >
        <input
          id="tel"
          type="tel"
          v-model="tel"
          required
          placeholder="tel number"
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
        />
      </div>
      <button
        type="submit"
        class="w-full py-4 bg-orange-400 text-white font-semibold hover:bg-orange-600 transition rounded-none"
      >
        Post Item
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { onMounted } from "vue";
import supabase from "../supabase";
import Spinner from "../components/Spinner.vue";
import { useRouter } from "vue-router";

const title = ref("");
const price = ref("");
const description = ref("");
const location = ref("");
const tel = ref("");
const previewImage = ref("");

const { isLogin, user, updateUserState } = useAuth();

const isLoading = ref(false);
const router = useRouter();

onMounted(async () => {
  await updateUserState();
  console.log("auth 정보", isLogin.value, user.value);
});

const onFileChange = (event) => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  const { error } = await supabase.from("item_posts").insert({
    title: title.value,
    price: price.value,
    description: description.value,
    location: location.value,
    tel: tel.value,
    // user_id: user.value.id,
    img_url: "https://placehold.co/64x64",
  });
  if (error) {
    console.log(error);
    alert(error);
  } else {
    alert("posted!!");
    router.push("/item-listing");
  }
  isLoading.value = false;
};
</script>
