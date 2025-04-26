<template>
  <div class="flex flex-col h-full max-w-5xl mx-auto mt-20 p-6">
    <h1 class="text-3xl text-center uppercase font-bold text-gray-800 dark:text-white mb-10">
      Dashboard
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-if="isLoading"
        class="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
      >
        <span class="loader"></span>
      </div>
      <div
        v-else
        v-for="(stat, index) in stats"
        :key="index"
        class="flex flex-col items-center justify-center h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md"
      >
        <span class="text-xl font-medium">{{ stat.label }}</span>
        <span class="text-4xl font-bold">{{ stat.value }}</span>
      </div>
    </div>

    <p v-if="errorMessage" class="text-center text-red-600 mt-6">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { url } from "@/functions/endpoint";

const stats = ref([
  { label: "Number of Posts", value: 0 },
  { label: "Number of Documents", value: 0 },
  { label: "Number of Sliders", value: 0 },
]);

const isLoading = ref(true);
const errorMessage = ref("");

const fetchStats = async () => {
  try {
    const [documentsResponse, postsResponse, slidersResponse] = await Promise.all([
      axios.get(`${url}/document-category`),
      axios.get(`${url}/posts`),
      axios.get(`${url}/slider`),
    ]);

    stats.value[0].value = postsResponse.data[1]?.length || 0;
    stats.value[1].value = documentsResponse.data?.length || 0;
    stats.value[2].value = slidersResponse.data[1]?.length || 0;
  } catch (error) {
    errorMessage.value = "Failed to load data. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchStats);
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
