<template>
  <div>

    <!-- Editorial masthead (intentionally light / newspaper feel) -->
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">

        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#1E2833] font-semibold">News</span>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <!-- Overline with green rule -->
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-0.5 bg-[#6CC551]"></div>
              <span class="text-[#6CC551] text-xs font-bold uppercase tracking-widest">Ga East Newsroom</span>
            </div>
            <h1 class="text-4xl sm:text-6xl font-black text-[#1E2833] uppercase tracking-tight leading-none">
              Latest News
            </h1>
            <p class="mt-3 text-gray-500 text-sm max-w-lg leading-relaxed">
              Stay updated with the latest announcements, projects, and happenings across the Ga East Municipality.
            </p>
          </div>

          <!-- Search -->
          <div class="w-full lg:w-72 flex-shrink-0">
            <div class="relative">
              <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles…"
                aria-label="Search news articles"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#6CC551] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <!-- Divider with count -->
        <div class="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
          <p class="text-gray-400 text-xs">
            <template v-if="!loading">
              <span class="font-semibold text-[#1E2833]">{{ filteredNews.length }}</span>
              {{ filteredNews.length === 1 ? 'article' : 'articles' }}
              <template v-if="searchQuery"> matching "{{ searchQuery }}"</template>
              <template v-else> on this page</template>
            </template>
          </p>
          <button v-if="searchQuery" @click="searchQuery = ''"
            class="text-xs text-[#6CC551] font-semibold hover:underline">
            Clear search
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <section class="py-12 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Skeleton -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n"
            class="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div class="h-48 bg-gray-200"></div>
            <div class="p-5 space-y-3">
              <div class="h-2.5 bg-gray-200 rounded w-1/4"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-4/6"></div>
              <div class="h-3 bg-gray-200 rounded w-full mt-1"></div>
              <div class="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
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
        <div v-else-if="filteredNews.length === 0"
          class="bg-white rounded-2xl border border-gray-100 py-24 text-center max-w-lg mx-auto">
          <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p class="text-gray-500 font-medium text-sm">
            {{ searchQuery ? 'No articles match your search.' : 'No news articles published yet.' }}
          </p>
          <button v-if="searchQuery" @click="searchQuery = ''"
            class="mt-4 text-[#6CC551] text-xs font-semibold hover:underline">
            Clear search
          </button>
        </div>

        <!-- Grid + Pagination -->
        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link
              v-for="item in filteredNews"
              :key="item.id"
              :to="'/single-post/' + encryptString(item.id.toString())"
              class="group bg-white rounded-2xl border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div class="relative h-48 overflow-hidden bg-gray-100">
                <img
                  :src="appendBaseURL(item.image)"
                  :alt="item.title"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 px-2.5 py-1 bg-[#1E2833] text-white text-[10px] font-bold rounded uppercase tracking-wide">
                  News
                </span>
              </div>
              <div class="p-5 flex flex-col flex-1 text-left">
                <time class="text-gray-400 text-xs mb-2 block">{{ formattedDate(item.createdAt) }}</time>
                <h3 class="text-[#1E2833] text-sm font-bold group-hover:text-[#6CC551] transition-colors leading-snug mb-2 line-clamp-2 flex-1">
                  {{ decodeEntities(item.title) }}
                </h3>
                <div class="mt-3 flex items-center gap-1 text-[#6CC551] text-xs font-semibold border-t border-gray-100 pt-3">
                  <span>Read article</span>
                  <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Pagination (hidden while searching) -->
          <div v-if="totalPages > 1 && !searchQuery.trim()" class="flex items-center justify-center gap-1.5 mt-10">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              aria-label="Previous page"
              class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#6CC551] hover:text-[#6CC551] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <template v-for="page in pageRange" :key="page">
              <span v-if="page === '...'"
                class="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none">…</span>
              <button v-else
                @click="goToPage(page as number)"
                class="w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all"
                :class="page === currentPage
                  ? 'bg-[#1E2833] border-[#1E2833] text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#6CC551] hover:text-[#6CC551]'"
              >{{ page }}</button>
            </template>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              aria-label="Next page"
              class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#6CC551] hover:text-[#6CC551] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </template>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
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

const PER_PAGE = 12;

const loading     = ref(true);
const error       = ref<string | null>(null);
const allNews     = ref<NewsItem[]>([]);
const count       = ref(0);
const currentPage = ref(1);
const searchQuery = ref('');

const formattedDate = (d: string) => moment(d).format('MMM D, YYYY');

const filteredNews = computed(() => {
  if (!searchQuery.value.trim()) return allNews.value;
  const q = searchQuery.value.toLowerCase();
  return allNews.value.filter(n => decodeEntities(n.title).toLowerCase().includes(q));
});

const totalPages = computed(() => Math.max(1, Math.ceil(count.value / PER_PAGE)));

const pageRange = computed<(number | string)[]>(() => {
  const total = totalPages.value;
  const cur   = currentPage.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | string)[] = [1];
  if (cur > 3) pages.push('...');
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p);
  if (cur < total - 2) pages.push('...');
  pages.push(total);
  return pages;
});

const goToPage = (page: number) => {
  currentPage.value = page;
};

const fetchNewsItems = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(`${url}/posts`, {
      params: { category: 'NEWS', page: currentPage.value, limit: PER_PAGE }
    });
    allNews.value = res.data[1];
    count.value   = res.data[0]?.totalLength ?? 0;
  } catch {
    error.value = 'Failed to load news articles. Please try again.';
  } finally {
    loading.value = false;
  }
};

watch(searchQuery, () => { currentPage.value = 1; });
onMounted(() => { window.scrollTo({ top: 0 }); fetchNewsItems(); });
watch(currentPage, () => { window.scrollTo({ top: 0 }); fetchNewsItems(); });
</script>

