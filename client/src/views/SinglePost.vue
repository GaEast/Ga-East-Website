<template>
  <div class="dark:bg-gray-800 min-h-screen pt-24 pb-12">
    <Loader class="my-52" v-if="!postData" />
    <section v-else class="single max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <router-link to="/all-news" class="ml-1 text-sm font-medium text-gray-500 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                News
              </router-link>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {{ truncateText(decodeEntities(postData?.title), 50) }}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Hero Section -->
      <div class="space-y-8 mb-12">
        <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          {{ moment(postData?.createdAt).format('LL') }}
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {{ decodeEntities(postData?.title) }}
        </h1>

        <div class="relative w-full h-[500px] rounded-lg shadow-lg overflow-hidden">
          <GradientPlaceholder v-if="!postData?.image" />
          <img
            v-else
            class="w-full h-full object-cover"
            :src="appendBaseURL(postData.image)" 
            :alt="postData?.title"
          >
        </div>
      </div>

      <!-- Article Content -->
      <article class="prose text-justify prose-lg max-w-none dark:prose-invert mb-16">
        <div v-html="decodeEntities(postData?.article)"></div>
      </article>

      <!-- Comments Section -->
      <!-- <div class="bg-white text-left dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-16">
        <h2 class="text-2xl font-semibold mb-8 dark:text-white">Comments</h2>
        

        <div class="flex gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <img src="../assets/profile.svg" class="w-12 h-12 rounded-full" alt="User avatar" />
          <div class="flex flex-col">
            <span class="font-medium text-gray-900 dark:text-gray-200">Abubakar Sadick Yahaya</span>
            <span class="text-gray-600 dark:text-gray-400 mt-1">Ga East is the best municipality in Ghana</span>
          </div>
        </div>

   
        <form class="mt-6">
          <div class="flex gap-4">
            <input 
              type="text"
              placeholder="Add a comment..."
              class="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button 
              type="submit"
              class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Comment
            </button>
          </div>
        </form>
      </div> -->

      <!-- Related Posts -->
      <!-- <div class="space-y-8">
        <h2 class="text-2xl font-semibold dark:text-white">You may also like</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="newsItem in allNews" :key="newsItem.id" 
               class="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <a :href="'/single-post/' + encryptString(newsItem?.id.toString())">
              <div class="relative w-full h-48">
                <GradientPlaceholder v-if="!newsItem?.image" />
                <img 
                  v-else
                  :src="appendBaseURL(newsItem.image)"
                  class="w-full h-full object-cover"
                  :alt="newsItem?.title"
                />
              </div>
              <div class="p-4 space-y-3">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ moment(newsItem?.createdAt).format('LL') }}
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {{ decodeEntities(newsItem?.title) }}
                </h3>
                
              </div>
            </a>
          </div>
        </div>
      </div> -->
    </section>
  </div>
  <Footer />
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Footer from "@/components/Footer.vue";
import { decodeEntities, appendBaseURL } from "@/functions";
import { decryptString, encryptString } from '@/functions/encryption';
import { url } from "@/functions/endpoint";
import moment from "moment";
import axios from 'axios';
import { useRoute } from "vue-router";
import Loader from "@/components/Loader.vue";
import GradientPlaceholder from "@/components/GradientPlaceholder.vue";

const route = useRoute();
const postId = computed(() => decryptString(route.params.id.toString()));
const postData: any = ref(null);
const allNews: any = ref([]);

const fetchPostData = async () => {
  try {
    const response = await axios.get(`${url}/posts/${parseInt(postId.value)}`);
    postData.value = response.data;
    // Fetch related news only after post data is available
    fetchRelatedNews();
  } catch (error) {
    console.error(error);
  }
};

const fetchRelatedNews = async () => {
  try {
    const response = await axios.get(`${url}/posts`, {
      params: {
        limit: 3,
        category: 'NEWS',
        createdAt: postData.value?.createdAt 
      }
    });
    allNews.value = response.data[1];
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await fetchPostData();
});

const truncateText = (text: string, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
</script>
<style scoped>
.prose {
  @apply text-gray-800 dark:text-gray-200;
}

.prose img {
  @apply rounded-lg shadow-md;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  h1 {
    @apply text-2xl;
  }
  
  .prose {
    @apply prose-base;
  }
}
</style>
