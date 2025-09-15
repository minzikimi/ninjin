<template>
  <Spinner :visible="isLoading" text="Just a moment, we're posting..." />
  <div
    class="overflow-auto max-w-md flex flex-col justify-start items-center bg-gray-50 p-4"
  >
    <form
      v-if="isLogin"
      @submit.prevent="handleSubmit"
      class="space-y-6 bg-white p-6 rounded-none w-full"
    >
      <label
        for="photo"
        class="border-2 rounded-md border-dashed cursor-pointer bg-center bg-cover mb-2 flex flex-col items-center justify-center text-neutral-300"
        :style="
          previewImage
            ? `background-image: url('${previewImage}'); width: 150px; height: 150px;`
            : 'width: 150px; height: 150px;'
        "
      >
        <template v-if="!previewImage">
          <!-- Camera Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12"
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
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
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
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
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
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 resize-y"
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
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
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
          placeholder="Your phone number"
          class="border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
        />
      </div>
      <button
        type="submit"
        class="w-full py-4 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition rounded-none"
      >
        Post Item
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import supabase from "../supabase";
import Spinner from "../components/Spinner.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const { isLogin, user, updateUserState } = useAuth();

const title = ref("");
const price = ref("");
const description = ref("");
const location = ref("");
const tel = ref("");
const previewImage = ref("");
const isLoading = ref(false);
const currentImageUrl = ref("");
const img_url = ref("");
const prev_img_url = ref("");

let file = null;

const id = route.params.id;

onMounted(async () => {
  await updateUserState();
  if (isLogin.value && id) {
    isLoading.value = true;
    const { data, error } = await supabase
      .from("item_posts")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      alert(error.message);
    } else {
      title.value = data.title;
      price.value = data.price;
      description.value = data.description;
      location.value = data.location;
      tel.value = data.tel;
      currentImageUrl.value = data.img_url || "";
      prev_img_url.value = data.img_url;
    }
    isLoading.value = false;
  }
});

const onFileChange = (event) => {
  file = event.target.files && event.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const sanitizeFileName = (fileName) => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-\.]/g, "");
};

const generateUniqueFileName = (file) => {
  const timestamp = Date.now();
  const sanitized = sanitizeFileName(file.name);
  return `${timestamp}-${sanitized}`;
};

const uploadImage = async () => {
  const uniqueFileName = generateUniqueFileName(file);

  const { data, error } = await supabase.storage
    .from("images")
    .upload(uniqueFileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.log("Upload Error:", error);
    alert("UploadError: " + error.message);
  } else {
    const { data: imgData } = supabase.storage
      .from("images")
      .getPublicUrl(uniqueFileName);
    img_url.value = imgData.publicUrl;
  }
};

const handleSubmit = async () => {
  isLoading.value = true;

  if (previewImage.value) {
    if (!prev_img_url.value.includes(file.name)) {
      await uploadImage();
      const { data, error } = await supabase.storage
        .from("images")
        .remove([prev_img_url.value.split("/").pop()]);
    } else {
      img_url.value = prev_img_url.value;
    }
  }

  const updatedImgUrl = img_url.value || currentImageUrl.value || "";
  // let imgUrl = currentImageUrl.value;
  const { error } = await supabase
    .from("item_posts")
    .update({
      title: title.value,
      price: price.value,
      description: description.value,
      location: location.value,
      tel: tel.value,
      img_url: updatedImgUrl,
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
  } else {
    alert("Item updated!");
    router.push("/item-listing");
  }
  isLoading.value = false;
};
</script>
