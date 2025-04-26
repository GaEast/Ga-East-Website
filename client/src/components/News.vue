<template>
  <section class="mx-auto px-4 sm:px-6 lg:px-4 mb-12 dark:bg-gray-800">
    <article class="flex flex-col">
      <h2 class="news-heading my-12 text-3xl font-extrabold text-center dark:text-white uppercase tracking-wide">
        Recent News
      </h2>

      <!-- News Carousel -->
      <div id="news-carousel" class="relative">
        <!-- News Items -->
        <div class="news-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 overflow-hidden">
          <div
            v-for="(newsItem, index) in visibleNews"
            :key="newsItem.id"
            class="news-item bg-white dark:bg-gray-900 shadow-lg mb-1 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <!-- News Image -->
            <div
              class="news-image relative bg-cover bg-center h-48 md:h-64 group"
              :style="{ backgroundImage: `url(${imagesUrl}/uploads/${newsItem?.image})` }"
            >
              <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
            </div>

            <!-- News Content -->
            <div class="news-content p-6 flex flex-col gap-4 h-64">
              <h3 class="text-lg font-bold dark:text-white truncate">
                {{ decodeEntities(newsItem.title) }}
              </h3>
              <span class="text-sm font-medium text-gray-500 dark:text-green-400 flex items-center">
                <span class="text-button-bg-hover mr-1.5">Posted on</span> |
                <span class="ml-1.5">{{ moment(newsItem.createdAt).format('LL') }}</span>
              </span>
              <p
                class="text-gray-600 text-justify dark:text-gray-400 text-sm leading-relaxed line-clamp-3"
                v-html="decodeEntities(newsItem.article)"
              ></p>
              <div class="mt-auto">
                <router-link 
    :to="`/single-post/${encryptString(newsItem.id.toString())}`"
    class="inline-block w-full"
  >
    <button
      type="button"
      class="w-full button uppercase font-semibold bg-button-bg text-white hover:bg-button-bg-hover focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-5 py-2.5 text-center transition-all duration-300"
    >
      Read More
    </button>
  </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Controls -->
        <div v-if="allNews.length > 3" class="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center pointer-events-none">
          <button
            @click="prevSlide"
            class="pointer-events-auto z-10 -ml-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextSlide"
            class="pointer-events-auto z-10 -mr-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>

    <!-- View All Button -->
    <div class="text-center mt-12">
      <router-link to="/all-news" custom v-slot="{ navigate }">
        <button
          type="button"
          @click="navigate"
          class="button uppercase font-semibold bg-white text-button-bg hover:text-button-bg-hover focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-6 py-3 transition-all duration-300"
        >
          View All
        </button>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { decodeEntities } from "@/functions";
import { encryptString } from "@/functions/encryption";
import { url, imagesUrl } from "@/functions/endpoint";
import axios from "axios";
import moment from "moment";
import { ref, computed } from "vue";

const allNews: any = ref([]);
const currentIndex = ref(0);

axios
  .get(`${url}/posts`, {
    params: {
      category: "NEWS",
      limit: 6,
    },
  })
  .then((response: any) => {
    console.log(response.data);
    allNews.value = response.data[1];
  })
  .catch((error: string) => {
    console.error(error);
  });

const visibleNews = computed(() => {
  return allNews.value.slice(currentIndex.value, currentIndex.value + 3);
});

const nextSlide = () => {
  if (currentIndex.value + 3 < allNews.value.length) {
    currentIndex.value += 1; // Move forward by 1
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1; // Move backward by 1
  }
};
</script>

<style scoped>
.news-heading {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.news-item:hover .news-image::before {
  opacity: 0.5;
}

.news-content {
  display: flex;
  flex-direction: column;
}

.news-content h3 {
  transition: color 0.3s ease-in-out;
}

.news-content h3:hover {
  color: #6cc551;
}

.news-content p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
}

.button {
  border-radius: 0.375rem;
}

@media (max-width: 768px) {
  .news-section {
    grid-template-columns: 1fr;
  }
}
</style>
