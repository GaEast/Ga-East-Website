<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section header -->
      <div class="text-center mb-12">
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Representation</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">
          Electoral Areas
        </h2>
        <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
          The Ga East Municipality is made up of 10 electoral areas, each represented in the
          Municipal Assembly.
        </p>
      </div>

      <!-- Marquee track -->
      <div class="overflow-hidden">
        <div class="marquee-track flex gap-4 w-max">
          <!-- Items duplicated for seamless loop -->
          <template v-for="pass in 2" :key="pass">
            <div
              v-for="area in areas"
              :key="`${pass}-${area}`"
              class="bg-white border-l-4 border-[#6CC551] rounded-r-xl shadow-sm px-5 py-4 flex items-center gap-3 flex-shrink-0 min-w-[160px]"
            >
              <span class="w-2 h-2 rounded-full bg-[#6CC551] flex-shrink-0"></span>
              <p class="text-[#1E2833] font-semibold text-sm whitespace-nowrap">{{ area }}</p>
            </div>
          </template>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.marquee-track {
  animation: marquee 20s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>

<script setup lang="ts">
const areas = [
  "Abokobi",
  "Ablor-Adjei",
  "Agbogba",
  "Atomic",
  "Haatso",
  "Tafia North",
  "Tafia South",
  "Dome East",
  "Dome West",
  "Kwabenya",
];
</script>
