<template>
  <div>

    <!-- Hero with decorative colour strip (no real images) -->
    <div class="relative bg-[#1E2833] overflow-hidden">

      <!-- Decorative strip: solid colour blocks -->
      <div class="absolute inset-0 flex gap-0.5 pointer-events-none" aria-hidden="true">
        <div class="flex-[2] bg-[#6CC551]/15"></div>
        <div class="flex-1 bg-white/5"></div>
        <div class="flex-1 bg-[#6CC551]/8"></div>
        <div class="hidden sm:block flex-1 bg-white/5"></div>
        <div class="hidden lg:block flex-[2] bg-[#6CC551]/12"></div>
      </div>

      <!-- Diagonal grid watermark on top -->
      <div class="absolute inset-0 opacity-5"
        style="background-image: repeating-linear-gradient(45deg, #6CC551 0, #6CC551 1px, transparent 0, transparent 50%); background-size: 20px 20px;">
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#6CC551]">Gallery</span>
        </div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-3">Media</p>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wide leading-tight">
          Photo Gallery
        </h1>
        <div class="mt-4 w-16 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-4 text-gray-400 text-sm max-w-xl leading-relaxed">
          A visual record of activities, projects, and events across the Ga East Municipality.
        </p>
      </div>
    </div>

    <!-- Gallery grid -->
    <section class="py-10 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Skeleton grid -->
        <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div v-for="n in 12" :key="n"
            class="animate-pulse bg-gray-200 rounded-xl aspect-[4/3]">
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-24">
          <p class="text-red-500 font-medium text-sm mb-4">{{ error }}</p>
          <button @click="fetchGallery"
            class="px-5 py-2 bg-[#6CC551] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
            Try Again
          </button>
        </div>

        <!-- Empty -->
        <div v-else-if="gallery.length === 0"
          class="bg-white rounded-2xl border border-gray-100 py-24 text-center max-w-lg mx-auto">
          <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-gray-500 font-medium text-sm">No gallery photos yet.</p>
          <p class="text-gray-400 text-xs mt-1">Check back later for updates.</p>
        </div>

        <template v-else>
          <!-- Count bar -->
          <div class="flex items-center justify-between mb-5">
            <p class="text-gray-500 text-sm">
              <span class="font-semibold text-[#1E2833]">{{ gallery.length }}</span>
              {{ gallery.length === 1 ? 'photo' : 'photos' }}
            </p>
            <p class="text-gray-400 text-xs">Page {{ currentPage }} of {{ totalPages }}</p>
          </div>

          <!-- Photo grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <div
              v-for="item in paginatedGallery"
              :key="item.id"
              class="group relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer aspect-[4/3]"
              @click="openLightbox(item)"
            >
              <img
                :src="appendBaseURL(item.image)"
                :alt="decodeEntities(item.title)"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="w-full bg-[#1E2833]/85 backdrop-blur-sm px-3 py-2.5">
                  <p class="text-white text-xs font-semibold leading-snug line-clamp-2">
                    {{ decodeEntities(item.title) }}
                  </p>
                </div>
              </div>
              <div class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex items-center justify-center gap-1.5 mt-10">
            <!-- Prev -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#6CC551] hover:text-[#6CC551] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Previous page"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Page numbers -->
            <template v-for="page in pageRange" :key="page">
              <span v-if="page === '...'" class="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none">
                …
              </span>
              <button v-else
                @click="goToPage(page as number)"
                class="w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all"
                :class="page === currentPage
                  ? 'bg-[#1E2833] border-[#1E2833] text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#6CC551] hover:text-[#6CC551]'"
              >
                {{ page }}
              </button>
            </template>

            <!-- Next -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#6CC551] hover:text-[#6CC551] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Next page"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </template>

      </div>
    </section>

    <!-- Lightbox -->
    <Transition name="fade">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button @click="closeLightbox" aria-label="Close photo"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button v-if="lightboxIndex > 0" @click="lightboxIndex--" aria-label="Previous photo"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button v-if="lightboxIndex < gallery.length - 1" @click="lightboxIndex++" aria-label="Next photo"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div class="max-w-5xl w-full">
          <img
            :src="appendBaseURL(gallery[lightboxIndex].image)"
            :alt="gallery[lightboxIndex].title"
            class="w-full max-h-[80vh] object-contain rounded-xl"
          />
          <div class="mt-3 flex items-center justify-between px-1">
            <p class="text-white/80 text-sm">{{ decodeEntities(gallery[lightboxIndex].title) }}</p>
            <p class="text-white/40 text-xs">{{ lightboxIndex + 1 }} / {{ gallery.length }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Footer from '@/components/Footer.vue';
import { decodeEntities, appendBaseURL } from '@/functions';
import { url } from '@/functions/endpoint';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

const PER_PAGE = 12;

const loading      = ref(true);
const error        = ref<string | null>(null);
const gallery      = ref<GalleryItem[]>([]);
const currentPage  = ref(1);
const lightboxIndex = ref(0);
const lightboxOpen  = ref(false);

const totalPages = computed(() => Math.max(1, Math.ceil(gallery.value.length / PER_PAGE)));

const paginatedGallery = computed(() =>
  gallery.value.slice((currentPage.value - 1) * PER_PAGE, currentPage.value * PER_PAGE)
);

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
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openLightbox = (item: GalleryItem) => {
  lightboxIndex.value = gallery.value.findIndex(g => g.id === item.id);
  lightboxOpen.value  = true;
};
const closeLightbox = () => { lightboxOpen.value = false; };

const fetchGallery = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(`${url}/posts`, { params: { category: 'GALLERY' } });
    gallery.value = res.data[1].filter((item: GalleryItem) => item.image?.startsWith('https'));
  } catch {
    error.value = 'Failed to load gallery. Please try again.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => { window.scrollTo({ top: 0 }); fetchGallery(); });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; }
</style>
