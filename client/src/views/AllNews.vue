<template>
  <div class="min-h-screen dark:bg-gray-800">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-green-600 to-green-700 py-12 mb-8">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-4xl font-bold  mb-4">Latest News</h1>
        <p class="text-green-400">Stay updated with the latest happenings in Ga East Municipality</p>
      </div>
    </div>

    <!-- News Grid Section -->
    <section class="text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-20">
      <!-- Error State -->
      <div v-if="error" class="text-center py-8">
        <p class="text-red-600 dark:text-red-400 text-lg">{{ error }}</p>
        <button 
          @click="fetchNewsItems" 
          class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- News Grid -->
      <article v-else>
        <section 
          v-if="!loading" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
        >
          <div 
            v-for="newsItem in allNews" 
            :key="newsItem.id"
            class="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          >
            <router-link :to="'/single-post/' + encryptString(newsItem.id.toString())">
              <!-- News Image -->
              <article
                class="relative w-full h-64 bg-cover bg-center rounded-lg overflow-hidden shadow-md"
                :style="{ backgroundImage: `url(${imagesUrl}/uploads/${newsItem?.image})` }"
              >
              </article>

              <!-- News Content -->
              <div class="mt-4 space-y-3">
                <h2 class="font-semibold text-xl text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {{ decodeEntities(newsItem.title?.slice(0, 50)) + "..." }}
                </h2>
                
                <div 
                  v-html="decodeEntities(newsItem.article?.slice(0, 100)) + '...'"
                  class="text-gray-600 dark:text-gray-400 line-clamp-2"
                />

                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span class="text-green-600 dark:text-green-400">Posted</span>
                  <span class="mx-2">•</span>
                  <time>{{ formattedCreatedAt(newsItem?.createdAt) }}</time>
                </div>
              </div>
            </router-link>
          </div>
        </section>

        <!-- Loading State -->
        <div 
          v-if="loading" 
          class="flex justify-center items-center min-h-[400px]"
        >
          <Loader />
        </div>

        <!-- Empty State -->
        <div 
          v-if="!loading && allNews.length === 0" 
          class="text-center py-12"
        >
          <p class="text-gray-600 dark:text-gray-400">No news articles found.</p>
        </div>
      </article>
    </section>

    <!-- Pagination -->
    <div class="flex items-center justify-center mb-20">
      <Pagination
        v-if="count > perPage"
        v-model="currentPage"
        :per-page="perPage"
        :total-items="count"
        :layout="'table'"
        class="pagination-custom"
      />
    </div>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Pagination } from 'flowbite-vue'
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";
import { decodeEntities } from "@/functions";
import { encryptString } from '@/functions/encryption';
import { url, imagesUrl } from "@/functions/endpoint";
import moment from "moment";
import axios from "axios";

interface NewsItem {
  id: number;
  title: string;
  article: string;
  image: string;
  createdAt: string;
  category: string;
}

interface NewsResponse {
  totalLength: number;
  items: NewsItem[];
}

// State
const loading = ref(false);
const error = ref<string | null>(null);
const allNews = ref<NewsItem[]>([]);
const count = ref(0);
const perPage = ref(12);
const currentPage = ref(1);

// Methods
const formattedCreatedAt = (createdAt: string): string => {
  return moment(createdAt).fromNow();
};

const fetchNewsItems = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get<NewsResponse>(`${url}/posts`, {
      params: {
        category: 'NEWS',
        page: currentPage.value,
        limit: perPage.value
      }
    });

    allNews.value = response.data[1];
    count.value = response.data[0].totalLength;
  } catch (err) {
    error.value = 'Failed to load news articles. Please try again.';
    console.error('Error fetching news:', err);
  } finally {
    loading.value = false;
  }
};

// Lifecycle & Watchers
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  fetchNewsItems();
});

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  fetchNewsItems();
});
</script>

<style scoped>
.pagination-custom :deep(.pagination-item.active) {
  @apply bg-green-600 text-white border-green-600;
}

.pagination-custom :deep(.pagination-item:hover:not(.active)) {
  @apply bg-green-50 text-green-600 border-green-200;
}
</style>
