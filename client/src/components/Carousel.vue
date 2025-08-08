<template>
  <div id="animation-carousel" class="relative text-left mb-34 px-4 md:px-4" data-carousel-interval="15000" data-carousel="slide">
    <!-- Carousel Wrapper -->
    <div class="relative overflow-hidden md:h-screen h-56">
      <!-- Loader -->
      <Loader v-if="loading" />
      <div v-else>
        <!-- Active Image -->
        <img
          v-if="activeImage"
          :src="`${activeImage?.image}`"
          :data-carousel-item="activeIndex"
          class="absolute block w-full object-cover md:h-screen h-56"
          alt="Carousel"
        />

        <!-- Overlay -->
        <!-- <div class="overlay md:h-screen h-56 absolute inset-0 bg-gray-300 bg-opacity-90"></div> -->

        <!-- Carousel Description -->
        <div
          class="carousel-description absolute top-[80%] flex flex-col gap-6 items-start justify-end px-6 md:px-16"
          v-if="activeImage"
        >
          <h1 class="text-xl md:text-3xl uppercase font-bold text-white shadow-lg w-full md:w-7/12">
            {{ activeImage?.title }}
          </h1>
          <p class="text-sm md:text-lg text-white w-full md:w-6/12">
            {{ activeImage?.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Slider Indicators -->
    <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
      <button
        v-for="(item, index) in allSliders"
        :key="index"
        type="button"
        class="w-3 h-3 rounded-full border border-white"
        :class="{ 'bg-white': index === activeIndex }"
        :aria-current="index === activeIndex ? 'true' : 'false'"
        :aria-label="'Slide ' + (index + 1)"
        @click="setActiveIndex(index)"
      ></button>
    </div>

    <!-- Slider Controls -->
    <button
      type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="prevImage"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-gray-800/60"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-white sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="nextImage"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-gray-800/60"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-white sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>

    <!-- Email Tooltip -->
    <span
      @click="sendEmail"
      data-tooltip-target="tooltip-light"
      data-tooltip-style="light"
      class="email cursor-pointer absolute top-[85%] right-10 md:right-20 transform -translate-y-1/2 text-white text-lg md:text-xl font-bold border-b-4 border-button-bg-hover"
    >
      info@gema.gov.gh
    </span>
    <div
      id="tooltip-light"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
    >
      Click to send us an email
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted } from "vue";
import { initCarousels, initTooltips } from "flowbite";
import { url, imagesUrl } from "@/functions/endpoint";
import axios from "axios";
import Loader from "./Loader.vue";

const loading = ref(false);
const email = ref("info@gema.gov.gh");
const subject = ref("Ga East Municipal Assembly, Head Office");
const body = ref("Send us an email and we will get back to you");

const allSliders = ref<any>([]);
const activeIndex = ref(0);
const intervalId = ref<number | null>(null);

const fetchSliders = () => {
  loading.value = true;
  axios
    .get(`${url}/slider`)
    .then((response: any) => {
      const sliders = response.data[1];
      const slidersWithKey = sliders.map((slider: any, index: number) => ({
        ...slider,
        count: index,
      }));
      allSliders.value = slidersWithKey;
      initTooltips(); // Initialize tooltips after fetching sliders
      if (allSliders.value.length > 0) {
        initCarousels();
      }
    })
    .catch((error: string) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const sendEmail = () => {
  const encodedSubject = encodeURIComponent(subject.value);
  const encodedBody = encodeURIComponent(body.value);
  window.location.href = `mailto:${email.value}?subject=${encodedSubject}&body=${encodedBody}`;
};

const activeImage = computed(() => {
  return allSliders.value[activeIndex.value];
});

const startAutoSlide = () => {
  // Clear any existing interval
  if (intervalId.value) clearInterval(intervalId.value);
  intervalId.value = setInterval(() => {
    if (allSliders.value.length > 0) {
      nextImage();
    }
  }, 20000); 
};

onMounted(() => {
  fetchSliders();
  startAutoSlide();
});

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});

// Restart auto-slide when user manually changes slide
const setActiveIndex = (index: number) => {
  activeIndex.value = index;
  startAutoSlide();
};

const nextImage = () => {
  activeIndex.value = (activeIndex.value + 1) % allSliders.value.length;
  startAutoSlide();
};

const prevImage = () => {
  activeIndex.value = (activeIndex.value - 1 + allSliders.value.length) % allSliders.value.length;
  startAutoSlide();
};
</script>

<style scoped>
.overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
}

.carousel-description h1 {
  animation: fadeIn 1.5s ease-in-out;
}

.carousel-description p {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.email {
  z-index: 100;
  cursor: pointer;
}

.tooltip {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
