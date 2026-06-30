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
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          :class="index === activeIndex && loadedImages[slide.image] ? 'opacity-100' : 'opacity-0'"
          @load="markLoaded(slide.image)"
        />
      </template>
    </div>

    <!-- Small spinner while the first image loads -->
    <transition name="fade-skeleton">
      <div
        v-if="loading || !activeImageLoaded"
        class="absolute top-6 right-6 z-10 flex items-center gap-2"
      >
        <span class="w-4 h-4 rounded-full border-2 border-[#6CC551] border-t-transparent animate-spin"></span>
        <span class="text-white/50 text-xs">Loading…</span>
      </div>
    </transition>

    <!-- Base dark tint across the whole image -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Fallback content when no slides are loaded -->
    <div
      v-if="!loading && allSliders.length === 0"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="text-center px-6">
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-3">Ga East Municipal Assembly</p>
        <h1 class="text-2xl sm:text-4xl font-bold text-white leading-snug mb-4">
          Serving the People of Ga East
        </h1>
        <p class="text-gray-300 text-sm leading-relaxed mb-6 max-w-md mx-auto">
          Dedicated to transparent governance, sustainable development, and inclusive community growth
          across the Greater Accra Region.
        </p>
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <router-link to="/about"
            class="px-5 py-2.5 bg-[#6CC551] text-white text-sm font-semibold rounded hover:bg-green-600 transition-colors">
            About Us
          </router-link>
          <router-link to="/contact"
            class="px-5 py-2.5 border border-white/40 text-white text-sm font-semibold rounded hover:bg-white/10 transition-colors">
            Contact Us
          </router-link>
        </div>
      </div>
    </div>

    <!-- Content block — solid panel floating over the image -->
    <div v-if="allSliders.length > 0" class="absolute bottom-12 left-6 md:left-12 lg:left-16 right-6 md:right-auto">
      <div class="bg-black/10 backdrop-blur-sm max-w-2xl md:max-w-4xl px-7 py-6 md:px-10 md:py-7 relative overflow-hidden text-left border border-white/10">

        <!-- Green left accent bar -->
        <div class="absolute top-0 left-0 w-1 h-full bg-[#6CC551]"></div>

        <!-- Section label -->
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-3">
          Ga East Municipal Assembly
        </p>

        <!-- Slide title -->
        <transition name="hero-text" mode="out-in">
          <h1
            v-if="activeImage"
            :key="'title-' + activeIndex"
            class="text-base sm:text-lg lg:text-xl font-bold text-white leading-snug mb-3"
          >
            {{ activeImage.title }}
          </h1>
        </transition>

        <!-- Slide description -->
        <transition name="hero-text" mode="out-in">
          <p
            v-if="activeImage?.description"
            :key="'desc-' + activeIndex"
            class="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3"
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

    <!-- Slide indicators -->
    <div
      v-if="allSliders.length > 1"
      class="absolute bottom-4 right-6 md:right-12 flex items-center gap-2"
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

const loading = ref(false);
const allSliders = ref<any[]>([]);
const activeIndex = ref(0);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const loadedImages = ref<Record<string, boolean>>({});

const activeImage = computed(() => allSliders.value[activeIndex.value] ?? null);
const activeImageLoaded = computed(() =>
  activeImage.value ? !!loadedImages.value[activeImage.value.image] : false
);

const markLoaded = (src: string) => {
  loadedImages.value = { ...loadedImages.value, [src]: true };
};

const startAutoSlide = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  intervalId.value = setInterval(() => {
    if (allSliders.value.length > 0) nextImage();
  }, 6000);
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

const handleKeydown = (e: KeyboardEvent) => {
  if (allSliders.value.length <= 1) return;
  if (e.key === "ArrowLeft")  { prevImage(); startAutoSlide(); }
  if (e.key === "ArrowRight") { nextImage(); startAutoSlide(); }
};

onMounted(() => {
  fetchSliders();
  startAutoSlide();
  globalThis.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value);
  globalThis.removeEventListener("keydown", handleKeydown);
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

/* Spinner fade-out */
.fade-skeleton-leave-active { transition: opacity 0.4s ease; }
.fade-skeleton-leave-to     { opacity: 0; }
</style>
