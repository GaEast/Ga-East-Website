<template>
  <div>

    <!-- Page Hero -->
    <div class="bg-white border-b border-gray-100 py-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#6CC551]">News</span>
        </div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Media</p>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1E2833] uppercase tracking-wide">
          Latest News
        </h1>
        <div class="mt-3 w-12 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-3 text-gray-500 text-sm max-w-2xl leading-relaxed text-center mx-auto">
          Stay updated with the latest happenings across the Ga East Municipality.
        </p>
      </div>
    </div>

    <!-- Content -->
    <section class="py-12 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-24">
          <div class="flex flex-col items-center gap-4">
            <div class="w-10 h-10 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
            <p class="text-gray-400 text-sm">Loading news…</p>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-24">
          <p class="text-red-500 font-medium text-sm mb-4">{{ error }}</p>
          <button @click="fetchNewsItems"
            class="px-5 py-2 bg-[#6CC551] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
            Try Again
          </button>
        </div>

        <!-- Empty -->
        <div v-else-if="allNews.length === 0"
          class="bg-white rounded-2xl border border-gray-100 py-24 text-center max-w-lg mx-auto">
          <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p class="text-gray-500 font-medium text-sm">No news articles published yet.</p>
          <p class="text-gray-400 text-xs mt-1">Check back later for updates.</p>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="item in allNews"
            :key="item.id"
            :to="'/single-post/' + encryptString(item.id.toString())"
            class="group bg-white rounded-2xl border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden bg-gray-100">
              <img
                :src="appendBaseURL(item.image)"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span class="absolute top-3 left-3 px-2.5 py-1 bg-[#6CC551] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                News
              </span>
            </div>

            <!-- Content -->
            <div class="p-5 flex flex-col flex-1 text-left">
              <h3 class="text-[#1E2833] text-sm font-bold group-hover:text-[#6CC551] transition-colors leading-snug mb-2 line-clamp-2">
                {{ decodeEntities(item.title) }}
              </h3>
              <div
                v-html="decodeEntities(item.article?.slice(0, 100)) + '…'"
                class="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1"
              />
              <div class="mt-4 flex items-center justify-between">
                <time class="text-gray-400 text-xs">{{ formattedDate(item.createdAt) }}</time>
                <span class="inline-flex items-center gap-1 text-[#6CC551] text-xs font-semibold">
                  Read more
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination -->
        <div v-if="count > perPage" class="flex justify-center mt-10">
          <Pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-items="count"
            layout="table"
            class="pagination-custom"
          />
        </div>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { Pagination } from 'flowbite-vue';
import Footer from '@/components/Footer.vue';
import { decodeEntities, appendBaseURL } from '@/functions';
import { encryptString } from '@/functions/encryption';
import { url } from '@/functions/endpoint';
import moment from 'moment';

interface NewsItem {
  id: number;
  title: string;
  article: string;
  image: string;
  createdAt: string;
}

const loading     = ref(false);
const error       = ref<string | null>(null);
const allNews     = ref<NewsItem[]>([]);
const count       = ref(0);
const perPage     = ref(12);
const currentPage = ref(1);

const formattedDate = (d: string) => moment(d).format('MMM D, YYYY');

const fetchNewsItems = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(`${url}/posts`, {
      params: { category: 'NEWS', page: currentPage.value, limit: perPage.value }
    });
    allNews.value = res.data[1];
    count.value   = res.data[0].totalLength;
  } catch {
    error.value = 'Failed to load news articles. Please try again.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => { window.scrollTo({ top: 0 }); fetchNewsItems(); });
watch(currentPage, () => { window.scrollTo({ top: 0 }); fetchNewsItems(); });
</script>

<style scoped>
.pagination-custom :deep(.pagination-item.active)             { @apply bg-[#6CC551] text-white border-[#6CC551]; }
.pagination-custom :deep(.pagination-item:hover:not(.active)) { @apply bg-green-50 text-[#6CC551] border-green-200; }
</style>
