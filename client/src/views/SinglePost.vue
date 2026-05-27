<template>
  <div>

    <!-- Reading progress bar -->
    <div class="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-gray-200 pointer-events-none">
      <div
        class="h-full bg-[#6CC551] transition-all duration-75 ease-out"
        :style="{ width: readingProgress + '%' }"
      ></div>
    </div>

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

      <!-- Page header -->
      <div class="bg-white border-b border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10">

          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
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

          <!-- Category -->
          <span
            v-if="postData.category"
            class="inline-block px-3 py-1 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold uppercase tracking-widest rounded-full mb-4"
          >
            {{ postData.category }}
          </span>

          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E2833] leading-tight mb-6">
            {{ decodeEntities(postData.title) }}
          </h1>

          <!-- Meta row -->
          <div class="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-gray-100">
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ moment(postData.createdAt).format('MMMM D, YYYY') }}</span>
              </div>
              <span class="text-gray-300">·</span>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ readingTime }} min read</span>
              </div>
            </div>

            <!-- Share (top) -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400 font-medium">Share:</span>
              <button @click="shareWhatsApp" title="Share on WhatsApp"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              <button @click="shareFacebook" title="Share on Facebook"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </button>
              <button @click="copyLink" title="Copy link"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <svg v-if="!linkCopied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <svg v-else class="w-4 h-4 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button @click="printPage" title="Print article"
                class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Article -->
      <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

          <!-- Hero image -->
          <figure v-if="postData.image" class="mb-10 -mx-4 sm:mx-0">
            <div class="w-full h-72 sm:h-[480px] sm:rounded-2xl overflow-hidden shadow-lg bg-gray-200">
              <img
                :src="appendBaseURL(postData.image)"
                :alt="decodeEntities(postData.title)"
                class="w-full h-full object-cover"
              />
            </div>
          </figure>

          <!-- Article body -->
          <article class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 mb-10">
            <div
              v-html="decodeEntities(postData.article)"
              class="article-body text-justify prose prose-base sm:prose-lg max-w-none"
            ></div>
          </article>

          <!-- Bottom share bar -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-12 flex items-center justify-between flex-wrap gap-4">
            <span
              v-if="postData.category"
              class="px-3 py-1.5 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold uppercase tracking-widest rounded-full"
            >
              {{ postData.category }}
            </span>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm text-gray-500 font-medium">Share this post:</span>
              <button @click="shareWhatsApp"
                class="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full hover:bg-green-100 transition-colors">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
              <button @click="shareFacebook"
                class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full hover:bg-blue-100 transition-colors">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
                Facebook
              </button>
              <button @click="copyLink"
                class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full hover:bg-gray-200 transition-colors">
                <svg v-if="!linkCopied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-3.5 h-3.5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ linkCopied ? 'Copied!' : 'Copy Link' }}
              </button>
            </div>
          </div>

          <!-- Related posts -->
          <div v-if="relatedPosts.length">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1 h-6 bg-[#6CC551] rounded-full flex-shrink-0"></div>
              <div>
                <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest">Continue Reading</p>
                <h2 class="text-xl font-bold text-[#1E2833]">Related Posts</h2>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <router-link
                v-for="item in relatedPosts"
                :key="item.id"
                :to="'/single-post/' + encryptString(item.id.toString())"
                class="group bg-white rounded-xl border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div class="h-44 overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <img
                    v-if="item.image"
                    :src="appendBaseURL(item.image)"
                    :alt="decodeEntities(item.title)"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div v-else class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div v-if="item.category" class="absolute top-3 left-3">
                    <span class="px-2 py-0.5 bg-[#6CC551] text-white text-[10px] font-bold uppercase tracking-wide rounded-full">
                      {{ item.category }}
                    </span>
                  </div>
                </div>
                <div class="p-4 flex flex-col flex-1 text-left">
                  <p class="text-gray-400 text-xs mb-2">{{ moment(item.createdAt).format('MMM D, YYYY') }}</p>
                  <h3 class="text-[#1E2833] text-sm font-bold group-hover:text-[#6CC551] transition-colors leading-snug line-clamp-2 flex-1">
                    {{ decodeEntities(item.title) }}
                  </h3>
                  <div class="mt-3 flex items-center gap-1 text-[#6CC551] text-xs font-semibold">
                    <span>Read more</span>
                    <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

        </div>
      </section>

    </template>

    <!-- Back to top -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        title="Back to top"
        class="fixed bottom-8 right-8 w-11 h-11 bg-[#1E2833] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6CC551] transition-colors z-50"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </transition>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
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

const readingProgress = ref(0);
const showBackToTop   = ref(false);
const linkCopied      = ref(false);

const truncateText = (text: string, max: number) =>
  text && text.length > max ? text.substring(0, max) + "…" : text ?? "";

const readingTime = computed(() => {
  if (!postData.value?.article) return 1;
  const plainText = postData.value.article.replace(/<[^>]*>/g, ' ');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
});

const handleScroll = () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  readingProgress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
  showBackToTop.value   = scrollTop > 400;
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const shareWhatsApp = () => {
  const text = `${decodeEntities(postData.value?.title ?? '')} — ${window.location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

const shareFacebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    '_blank'
  );
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    linkCopied.value = true;
    setTimeout(() => { linkCopied.value = false; }, 2000);
  } catch {}
};

const printPage = () => window.print();

const fetchPostData = async () => {
  loading.value = true;
  error.value   = null;
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
  window.addEventListener('scroll', handleScroll, { passive: true });
  fetchPostData();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.article-body :deep(p)               { @apply text-gray-700 leading-relaxed mb-4 text-base; }
.article-body :deep(h1)              { @apply text-2xl font-bold text-[#1E2833] mt-8 mb-3; }
.article-body :deep(h2)              { @apply text-xl  font-bold text-[#1E2833] mt-6 mb-3; }
.article-body :deep(h3)              { @apply text-lg  font-bold text-[#1E2833] mt-5 mb-2; }
.article-body :deep(h4)              { @apply text-base font-semibold text-[#1E2833] mt-4 mb-2; }
.article-body :deep(a)               { @apply text-[#6CC551] hover:underline; }
.article-body :deep(img)             { @apply rounded-xl shadow-sm my-6 max-w-full; }
.article-body :deep(ul)              { @apply list-disc pl-6 mb-4 space-y-1; }
.article-body :deep(ol)              { @apply list-decimal pl-6 mb-4 space-y-1; }
.article-body :deep(li)              { @apply text-gray-700; }
.article-body :deep(blockquote)      { @apply border-l-4 border-[#6CC551] pl-5 italic text-gray-500 my-6 bg-gray-50 py-3 rounded-r-lg; }
.article-body :deep(strong)          { @apply text-[#1E2833] font-bold; }
.article-body :deep(table)           { @apply w-full text-sm border-collapse mb-6; }
.article-body :deep(th)              { @apply bg-[#1E2833] text-white font-semibold px-4 py-2 text-left; }
.article-body :deep(td)              { @apply border border-gray-200 px-4 py-2 text-gray-700; }
.article-body :deep(tr:nth-child(even) td) { @apply bg-gray-50; }

@media print {
  .fixed, button { display: none !important; }
  .bg-gray-50 { background: white !important; }
}
</style>
