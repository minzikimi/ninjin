<template>
  <div class="max-w-xl mx-auto p-4">
    <div class="grid grid-cols-2 gap-5">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemCard from "../components/ItemCard.vue";

const items = ref([
  {
    id: 1,
    title: "macbook",
    desc: "its almost new",
    price: "50,000",
    location: "slussen",
    image: "",
  },
  {
    id: 2,
    title: "desk and chair",
    desc: "ikea desk, chair included!",
    price: "25,000",
    location: "nacka strand",
    image: "",
  },
]);
</script>

<style></style>
