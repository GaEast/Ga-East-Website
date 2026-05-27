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
          <span class="text-[#6CC551]">Gallery</span>
        </div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Media</p>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1E2833] uppercase tracking-wide">
          Photo Gallery
        </h1>
        <div class="mt-3 w-12 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-3 text-gray-500 text-sm max-w-2xl leading-relaxed text-center mx-auto">
          A visual record of activities, projects, and events across the Ga East Municipality.
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
            <p class="text-gray-400 text-sm">Loading gallery…</p>
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

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="item in gallery"
            :key="item.id"
            class="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] cursor-pointer"
            @click="openLightbox(item)"
          >
            <img
              :src="appendBaseURL(item.image)"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p class="text-white text-sm font-semibold leading-snug line-clamp-2">
                {{ decodeEntities(item.title) }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Lightbox -->
    <Transition name="fade">
      <div
        v-if="lightboxItem"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="max-w-4xl w-full">
          <img
            :src="appendBaseURL(lightboxItem.image)"
            :alt="lightboxItem.title"
            class="w-full max-h-[80vh] object-contain rounded-xl"
          />
          <p class="mt-3 text-white/80 text-sm text-center">{{ decodeEntities(lightboxItem.title) }}</p>
        </div>
      </div>
    </Transition>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Footer from '@/components/Footer.vue';
import { decodeEntities, appendBaseURL } from '@/functions';
import { url } from '@/functions/endpoint';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

const loading     = ref(false);
const error       = ref<string | null>(null);
const gallery     = ref<GalleryItem[]>([]);
const lightboxItem = ref<GalleryItem | null>(null);

const openLightbox  = (item: GalleryItem) => { lightboxItem.value = item; };
const closeLightbox = () => { lightboxItem.value = null; };

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
