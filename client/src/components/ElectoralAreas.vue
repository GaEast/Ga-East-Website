<template>
  <div
    class="flex flex-col items-center justify-center rounded-none sm:rounded-lg p-6 sm:p-8 md:p-10 m-4 sm:m-8 group w-full max-w-xl mx-auto"
    :style="'background: rgb(108,197,81); min-width: 0; min-height: 180px;'"
  >
    <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">10</div>
    <div class="text-lg sm:text-xl md:text-2xl font-semibold tracking-widest text-white mb-4 text-center">ELECTORAL AREAS</div>
    <!-- Always show on mobile, hover-to-show on sm+ -->
    <ul
      class="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-4 w-full text-center
        sm:opacity-0 sm:max-h-0 sm:group-hover:opacity-100 sm:group-hover:max-h-96
        transition-all duration-300 overflow-hidden sm:overflow-x-auto scrollbar-thin scrollbar-thumb-white/30
        opacity-100 max-h-96"
    >
      <li v-for="area in areas" :key="area" class="py-1 px-2 sm:px-3 rounded-full bg-white bg-opacity-10 border border-white/20 text-white whitespace-nowrap text-xs sm:text-base font-medium min-w-[90px] text-center">
        {{ area }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const areas = [
  'Abokobi',
  'Ablor-Adjei',
  'Agbogba',
  'Atomic',
  'Haatso',
  'Tafia North',
  'Tafia South',
  'Dome East',
  'Dome West',
  'Kwabenya',
];
</script>

<style scoped>
.group:hover ul {
  opacity: 1 !important;
  max-height: 24rem !important;
}

/**** Optional: Custom scrollbar for pills on small screens ****/
.scrollbar-thin {
  scrollbar-width: thin;
}
.scrollbar-thumb-white\/30::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.3);
  border-radius: 8px;
}
ul::-webkit-scrollbar {
  height: 6px;
}
ul::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.3);
  border-radius: 8px;
}
</style> 