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
          <span class="text-[#6CC551]">About Us</span>
        </div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Who We Are</p>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1E2833] uppercase tracking-wide">
          About the Assembly
        </h1>
        <div class="mt-3 w-12 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-3 text-gray-500 text-sm max-w-2xl leading-relaxed text-center mx-auto">
          Dedicated to serving the people of Ga East with transparency, accountability,
          and a commitment to sustainable development.
        </p>
      </div>
    </div>

    <!-- Introduction + Political Administration -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Section header -->
        <div class="text-center mb-12">
          <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Background</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">
            Overview
          </h2>
          <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <!-- Introduction -->
          <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-xl bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-[#1E2833]">Introduction</h3>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed text-left">
              The Ga East Municipality with a projected population of 284,000 is one of the 29 districts
              in the Greater Accra Region. Ga East is unique for its hosting of the elite population in
              the nation's capital and is also noted for its well-planned physical layout, which has attracted
              many Real Estate Companies such as Oak Villa, Regimanuel Gray, Edlorm Estate, and others to
              the municipality.
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-[#6CC551]/10 text-[#6CC551] text-xs font-semibold rounded-full">Greater Accra Region</span>
              <span class="px-3 py-1 bg-[#6CC551]/10 text-[#6CC551] text-xs font-semibold rounded-full">Pop. ~284,000</span>
              <span class="px-3 py-1 bg-[#6CC551]/10 text-[#6CC551] text-xs font-semibold rounded-full">Est. 2012</span>
            </div>
          </div>

          <!-- Political Administration -->
          <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-xl bg-[#1E2833]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[#1E2833]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-[#1E2833]">Political Administration</h3>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed text-left">
              The Ga East Municipal Assembly has a General Assembly membership of 18 comprising 9 elected members,
              5 government appointees, 1 Member of Parliament, with the Municipal Chief Executive as the
              representative of the Head of State at the Municipal level. The General Assembly has 2 committees —
              the Executive Committee and Public Relations — plus 5 statutory sub-committees.
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-[#1E2833]/10 text-[#1E2833] text-xs font-semibold rounded-full">18 Members</span>
              <span class="px-3 py-1 bg-[#1E2833]/10 text-[#1E2833] text-xs font-semibold rounded-full">2 Committees</span>
              <span class="px-3 py-1 bg-[#1E2833]/10 text-[#1E2833] text-xs font-semibold rounded-full">5 Sub-Committees</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Stats band -->
    <div class="bg-[#6CC551] py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div v-for="stat in quickStats" :key="stat.label">
            <p class="text-4xl font-extrabold text-white">{{ stat.value }}</p>
            <p class="mt-1 text-white/80 text-xs font-semibold uppercase tracking-widest">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vision, Mission, Geo Location -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Section header -->
        <div class="text-center mb-12">
          <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Guiding Principles</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">
            Vision &amp; Mission
          </h2>
          <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="card in valueCards"
            :key="card.title"
            class="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <!-- Icon -->
            <div class="w-16 h-16 rounded-2xl bg-[#6CC551]/10 flex items-center justify-center mb-5 group-hover:bg-[#6CC551] transition-colors self-start">
              <img :src="card.icon" :alt="card.title" class="w-8 h-8 group-hover:brightness-0 group-hover:invert transition-all" />
            </div>
            <h3 class="text-base font-bold text-[#1E2833] uppercase tracking-wide mb-3">{{ card.title }}</h3>
            <div class="w-8 h-0.5 bg-[#6CC551] rounded-full mb-4"></div>
            <p class="text-gray-500 text-sm leading-relaxed text-left">{{ card.text }}</p>
          </div>
        </div>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import visionIcon   from "@/assets/our-vision.svg";
import missionIcon  from "@/assets/our-mission.svg";
import geoIcon      from "@/assets/geo-location.svg";

const quickStats = [
  { value: "284K+",  label: "Population"      },
  { value: "10",     label: "Electoral Areas"  },
  { value: "2012",   label: "Established"      },
  { value: "50+",    label: "Communities"      },
];

const valueCards = [
  {
    title: "Our Vision",
    icon: visionIcon,
    text: "To become a highly professional, dynamic, and client-sensitive Assembly, focusing on sustainable development.",
  },
  {
    title: "Our Mission",
    icon: missionIcon,
    text: "To facilitate improvement in the quality of life of the people through the provision and promotion of basic socio-economic services within the context of good governance.",
  },
  {
    title: "Geo Location",
    icon: geoIcon,
    text: "Ga East Municipal District is bordered on the north by the Akuapim South District in the Eastern Region. It is bordered on its other three sides by districts in the Greater Accra Region.",
  },
];
</script>
