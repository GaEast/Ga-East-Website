<template>
  <section class="relative w-full h-[90vh] min-h-[500px] overflow-hidden bg-[#1E2833]">

    <!-- Slide images (crossfade stack) -->
    <div class="absolute inset-0">
      <template v-if="!loading && allSliders.length > 0">
        <img
          v-for="(slide, index) in allSliders"
          :key="slide.id ?? index"
          :src="slide.image"
          :alt="slide.title"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
        />
      </template>
      <div
        v-if="loading"
        class="absolute inset-0 bg-[#1E2833] animate-pulse"
      ></div>
    </div>

    <!-- Base dark tint across the whole image -->
    <div class="absolute inset-0 bg-black/40"></div>
    <!-- Left-side gradient for text panel -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#1E2833]/95 via-[#1E2833]/60 to-transparent"></div>
    <!-- Bottom gradient for mobile -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#1E2833]/90 via-[#1E2833]/30 to-transparent md:hidden"></div>

    <!-- Content block -->
    <div class="relative h-full flex flex-col justify-end pb-20 md:justify-center md:pb-0">
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-lg">

          <!-- Section label -->
          <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-3 text-left">
            Ga East Municipal Assembly
          </p>

          <!-- Slide title -->
          <transition name="hero-text" mode="out-in">
            <h1
              v-if="activeImage"
              :key="'title-' + activeIndex"
              class="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-snug mb-4 text-left"
            >
              {{ activeImage.title }}
            </h1>
          </transition>

          <!-- Slide description -->
          <transition name="hero-text" mode="out-in">
            <p
              v-if="activeImage?.description"
              :key="'desc-' + activeIndex"
              class="text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3 text-left"
            >
              {{ activeImage.description }}
            </p>
          </transition>

          <!-- CTA buttons -->
          <div class="flex items-center gap-3 flex-wrap">
            <router-link
              to="/about"
              class="px-5 py-2.5 bg-[#6CC551] text-white text-sm font-semibold rounded hover:bg-green-600 transition-colors"
            >
              Learn More
            </router-link>
            <a
              href="mailto:info@gema.gov.gh"
              class="px-5 py-2.5 border border-white/40 text-white text-sm font-semibold rounded hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide indicators -->
    <div
      v-if="allSliders.length > 1"
      class="absolute bottom-6 left-6 md:left-12 flex items-center gap-2"
    >
      <button
        v-for="(_, index) in allSliders"
        :key="index"
        @click="setActiveIndex(index)"
        class="h-1 rounded-full transition-all duration-300"
        :class="index === activeIndex
          ? 'w-8 bg-[#6CC551]'
          : 'w-4 bg-white/30 hover:bg-white/60'"
        :aria-label="'Go to slide ' + (index + 1)"
      ></button>
    </div>

    <!-- Prev / Next controls -->
    <button
      v-if="allSliders.length > 1"
      @click="prevImage"
      class="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 hover:bg-[#6CC551] text-white transition-colors focus:outline-none"
      aria-label="Previous slide"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      v-if="allSliders.length > 1"
      @click="nextImage"
      class="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 hover:bg-[#6CC551] text-white transition-colors focus:outline-none"
      aria-label="Next slide"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { url } from "@/functions/endpoint";
import axios from "axios";
import Loader from "./Loader.vue";

const loading = ref(false);
const allSliders = ref<any[]>([]);
const activeIndex = ref(0);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

const activeImage = computed(() => allSliders.value[activeIndex.value] ?? null);

const startAutoSlide = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  intervalId.value = setInterval(() => {
    if (allSliders.value.length > 0) nextImage();
  }, 20000);
};

const fetchSliders = () => {
  loading.value = true;
  axios
    .get(`${url}/slider`)
    .then((response: any) => {
      const sliders = response.data[1] ?? [];
      allSliders.value = sliders.map((s: any, i: number) => ({ ...s, count: i }));
    })
    .catch(console.error)
    .finally(() => { loading.value = false; });
};

const setActiveIndex = (index: number) => {
  activeIndex.value = index;
  startAutoSlide();
};

const nextImage = () => {
  activeIndex.value = (activeIndex.value + 1) % allSliders.value.length;
};

const prevImage = () => {
  activeIndex.value = (activeIndex.value - 1 + allSliders.value.length) % allSliders.value.length;
};

onMounted(() => {
  fetchSliders();
  startAutoSlide();
});

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>

<style scoped>
.hero-text-enter-active {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}
.hero-text-leave-active {
  transition: opacity 0.2s ease-in;
}
.hero-text-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.hero-text-leave-to {
  opacity: 0;
}
</style>
