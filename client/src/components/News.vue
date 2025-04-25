<template>
  <section class="mx-auto px-4 sm:px-6 lg:px-4 mb-12 dark:bg-gray-800">
    <article class="flex flex-col">
      <h2 class="news-heading my-16 text-4xl font-extrabold text-center dark:text-white uppercase tracking-wide">
        Recent News
      </h2>
      <section class="news-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div
          v-for="newsItem in allNews"
          :key="newsItem.id"
          class="news-item bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- News Image -->
          <div
            class="news-image relative bg-cover bg-center h-48 md:h-64 group"
            :style="{ backgroundImage: `url(${imagesUrl}/uploads/${newsItem?.image})` }"
          >
            <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
          </div>

          <!-- News Content -->
          <div class="news-content p-6 flex flex-col gap-4">
            <h3 class="text-xl font-bold dark:text-white">
              {{ decodeEntities(newsItem.title) }}
            </h3>
            <span class="text-sm font-medium text-gray-500 dark:text-green-400 flex items-center">
              <span class="text-button-bg-hover mr-1.5">Posted on</span> |
              <span class="ml-1.5">{{ moment(newsItem.createdAt).format('LL') }}</span>
            </span>
            <p
              class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
              v-html="decodeEntities(newsItem.article.slice(0, 150))"
            ></p>
            <div class="mt-4">
              <a :href="'/single-post/' + encryptString(newsItem.id.toString())">
                <button
                  type="button"
                  class="button uppercase font-semibold bg-button-bg text-white hover:bg-button-bg-hover focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-5 py-2.5 text-center transition-all duration-300"
                >
                  Read More
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>

    <!-- View All Button -->
    <div class="text-center mt-12">
      <router-link to="/all-news" custom v-slot="{ navigate }">
        <button
          type="button"
          @click="navigate"
          class="button uppercase font-semibold bg-button-bg text-white hover:bg-button-bg-hover focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-6 py-3 transition-all duration-300"
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
import { ref } from "vue";

const allNews: any = ref([]);
axios
  .get(`${url}/posts`, {
    params: {
      category: "NEWS",
      limit: 3,
    },
  })
  .then((response: any) => {
    console.log(response.data);
    allNews.value = response.data[1];
  })
  .catch((error: string) => {
    console.error(error);
  });
</script>

<style scoped>
.news-heading {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.news-item:hover .news-image::before {
  opacity: 0.5;
}

.news-content h3 {
  transition: color 0.3s ease-in-out;
}

.news-content h3:hover {
  color: #6cc551;
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
