<template>
  <div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen bg-gray-50">
      <div class="flex flex-col items-center gap-4">
        <div class="w-10 h-10 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
        <p class="text-gray-400 text-sm">Loading…</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex justify-center items-center min-h-screen bg-gray-50">
      <div class="text-center">
        <p class="text-red-500 font-medium text-sm mb-4">{{ error }}</p>
        <button
          @click="fetchPostData"
          class="px-5 py-2 bg-[#6CC551] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <template v-else-if="postData">

      <!-- Page Header -->
      <div class="bg-white border-b border-gray-100 py-10">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-xs text-gray-400 mb-4 flex-wrap">
            <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <router-link to="/all-news" class="hover:text-[#6CC551] transition-colors">News</router-link>
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-[#6CC551] line-clamp-1">
              {{ truncateText(decodeEntities(postData.title), 60) }}
            </span>
          </div>

          <!-- Category + Date -->
          <div class="flex items-center gap-3 mb-4">
            <span
              v-if="postData.category"
              class="px-2.5 py-0.5 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold uppercase tracking-wide rounded-full"
            >
              {{ postData.category }}
            </span>
            <span class="text-gray-400 text-xs">{{ moment(postData.createdAt).format('LL') }}</span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1E2833] leading-tight">
            {{ decodeEntities(postData.title) }}
          </h1>
        </div>
      </div>

      <!-- Content -->
      <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          <!-- Hero Image -->
          <div
            v-if="postData.image"
            class="w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden shadow-sm mb-10 bg-gray-200"
          >
            <img
              :src="appendBaseURL(postData.image)"
              :alt="decodeEntities(postData.title)"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Article body -->
          <div class="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 mb-12">
            <article class="prose prose-sm sm:prose max-w-none text-justify">
              <div v-html="decodeEntities(postData.article)"></div>
            </article>
          </div>

          <!-- Related Posts -->
          <div v-if="relatedPosts.length">
            <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">More to Read</p>
            <h2 class="text-xl font-bold text-[#1E2833] mb-6">Related Posts</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <router-link
                v-for="item in relatedPosts"
                :key="item.id"
                :to="'/single-post/' + encryptString(item.id.toString())"
                class="group bg-white rounded-xl border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div class="h-40 overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    v-if="item.image"
                    :src="appendBaseURL(item.image)"
                    :alt="decodeEntities(item.title)"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div v-else class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                </div>
                <div class="p-4 flex flex-col flex-1 text-left">
                  <p class="text-gray-400 text-xs mb-1.5">{{ moment(item.createdAt).format('MMM D, YYYY') }}</p>
                  <h3 class="text-[#1E2833] text-sm font-bold group-hover:text-[#6CC551] transition-colors leading-snug line-clamp-2">
                    {{ decodeEntities(item.title) }}
                  </h3>
                </div>
              </router-link>
            </div>
          </div>

        </div>
      </section>

    </template>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";
import Footer from "@/components/Footer.vue";
import { decodeEntities, appendBaseURL } from "@/functions";
import { decryptString, encryptString } from "@/functions/encryption";
import { url } from "@/functions/endpoint";

interface Post {
  id: number;
  title: string;
  article: string;
  image: string;
  category: string;
  createdAt: string;
}

const route    = useRoute();
const postId   = computed(() => decryptString(route.params.id.toString()));
const postData = ref<Post | null>(null);
const relatedPosts = ref<Post[]>([]);
const loading  = ref(true);
const error    = ref<string | null>(null);

const truncateText = (text: string, max: number) =>
  text && text.length > max ? text.substring(0, max) + "…" : text ?? "";

const fetchPostData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(`${url}/posts/${parseInt(postId.value)}`);
    postData.value = res.data;
    fetchRelatedPosts();
  } catch {
    error.value = "Failed to load this post. Please try again.";
  } finally {
    loading.value = false;
  }
};

const fetchRelatedPosts = async () => {
  if (!postData.value) return;
  try {
    const res = await axios.get(`${url}/posts`, {
      params: { limit: 3, category: postData.value.category, createdAt: postData.value.createdAt },
    });
    relatedPosts.value = (res.data[1] as Post[]).filter((p) => p.id !== postData.value!.id);
  } catch {}
};

onMounted(() => {
  window.scrollTo({ top: 0 });
  fetchPostData();
});
</script>

<style scoped>
.prose :deep(img)  { @apply rounded-xl shadow-sm; }
.prose :deep(a)    { @apply text-[#6CC551] hover:underline; }
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3)   { @apply text-[#1E2833]; }
</style>
