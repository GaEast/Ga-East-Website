<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section header -->
      <div class="text-center mb-12">
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Latest Updates</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">
          Recent News
        </h2>
        <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
          <div class="h-52 bg-gray-200"></div>
          <div class="p-6 space-y-3">
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
            <div class="h-3 bg-gray-200 rounded w-full mt-2"></div>
            <div class="h-3 bg-gray-200 rounded w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      <!-- Cards grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="newsItem in allNews"
          :key="newsItem.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          <!-- Image -->
          <div class="relative h-52 overflow-hidden bg-gray-200">
            <img
              :src="newsItem.image"
              :alt="decodeEntities(newsItem.title)"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Body -->
          <div class="p-6 flex flex-col flex-1">
            <!-- Date chip -->
            <span class="inline-flex items-center gap-1.5 text-xs font-medium text-[#6CC551] mb-3">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ moment(newsItem.createdAt).format("LL") }}
            </span>

            <h3 class="text-base font-bold text-[#1E2833] mb-2 line-clamp-2 leading-snug text-left">
              {{ decodeEntities(newsItem.title) }}
            </h3>

            <p class="text-gray-500 text-sm leading-relaxed flex-1 text-left">
              {{ excerpt(stripHtml(decodeEntities(newsItem.article))) }}
            </p>

            <div class="mt-5 pt-4 border-t border-gray-100">
              <router-link
                :to="`/single-post/${encryptString(newsItem.id.toString())}`"
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6CC551] hover:text-green-700 transition-colors"
              >
                Read More
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </article>
      </div>

      <!-- View All -->
      <div class="text-center mt-12">
        <router-link
          to="/all-news"
          class="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#6CC551] text-[#6CC551] font-semibold text-sm rounded hover:bg-[#6CC551] hover:text-white transition-colors uppercase tracking-wide"
        >
          View All News
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { decodeEntities } from "@/functions";
import { encryptString } from "@/functions/encryption";
import { url } from "@/functions/endpoint";
import axios from "axios";
import moment from "moment";
import { ref } from "vue";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const excerpt = (text: string, max = 200) => text.length <= max ? text : text.slice(0, max).trimEnd() + "…";

const allNews = ref<any[]>([]);
const loading = ref(true);

axios
  .get(`${url}/posts`, { params: { category: "NEWS", limit: 6 } })
  .then((response: any) => {
    allNews.value = response.data[1] ?? [];
  })
  .catch(console.error)
  .finally(() => { loading.value = false; });
</script>
