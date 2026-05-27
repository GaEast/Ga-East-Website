<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section header -->
      <div class="text-center mb-12">
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Leadership</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">
          Municipal Chief Executive
        </h2>
        <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
      </div>

      <!-- Profile + Stats grid -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        <!-- MCE Profile card (wider left column) -->
        <div class="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <!-- Dark banner -->
          <div class="h-28 bg-[#1E2833] relative">
            <div class="absolute inset-0 opacity-30"
              style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(108,197,81,0.15) 10px, rgba(108,197,81,0.15) 11px);">
            </div>
          </div>

          <div class="px-8 pb-8 -mt-14 relative z-10">
            <div class="flex flex-col sm:flex-row gap-6 items-start">
              <!-- Photo -->
              <img
                src="../assets/mce2025.jpg"
                alt="Municipal Chief Executive"
                class="w-28 h-28 rounded-xl object-cover shadow-lg ring-4 ring-white flex-shrink-0"
              />

              <!-- Name + title (sits beside photo on sm+) -->
              <div class="pt-0 sm:pt-16 min-w-0">
                <h3 class="text-xl font-bold text-[#1E2833] leading-tight">Hon. Edmund Agboh</h3>
                <span class="inline-block mt-1 px-3 py-0.5 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold uppercase tracking-wide rounded-full">
                  Municipal Chief Executive
                </span>
              </div>
            </div>

            <!-- Bio -->
            <p class="mt-6 text-gray-600 text-sm leading-relaxed text-left">
              Hon. Edmund Agboh leads the Ga East Municipal Assembly with a focus on sustainable infrastructure,
              improved service delivery, and inclusive community development across all ten electoral areas of
              the municipality in the Greater Accra Region.
            </p>

            <!-- Divider -->
            <div class="my-6 border-t border-gray-100"></div>

            <!-- Contact info row -->
            <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Abokobi, Greater Accra
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@gema.gov.gh
              </span>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap gap-3">
              <router-link
                to="/contact"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6CC551] text-white text-sm font-semibold rounded hover:bg-green-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Office
              </router-link>
              <router-link
                to="/about"
                class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded hover:border-[#6CC551] hover:text-[#6CC551] transition-colors"
              >
                About the Assembly
              </router-link>
            </div>
          </div>
        </div>

        <!-- Stats grid (right column) -->
        <div class="lg:col-span-2 grid grid-cols-2 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="relative rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            :class="stat.dark ? 'bg-[#1E2833]' : 'bg-[#6CC551]'"
          >
            <!-- Background icon watermark -->
            <div class="absolute -bottom-3 -right-3 opacity-10">
              <component :is="stat.icon" class="w-20 h-20 text-white" />
            </div>

            <!-- Icon badge -->
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative z-10"
              :class="stat.dark ? 'bg-white/10' : 'bg-white/20'"
            >
              <component :is="stat.icon" class="w-5 h-5 text-white" />
            </div>

            <span class="text-4xl font-extrabold text-white relative z-10">{{ stat.value }}</span>
            <span class="mt-2 text-xs font-bold uppercase tracking-widest relative z-10"
              :class="stat.dark ? 'text-[#6CC551]' : 'text-white/80'"
            >{{ stat.label }}</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { url } from "@/functions/endpoint";
import axios from "axios";

const departmentCount = ref("—");

onMounted(() => {
  const stored = localStorage.getItem("allDepartments");
  if (stored) {
    departmentCount.value = JSON.parse(stored).length.toString();
  }
  axios.get(`${url}/departments`).then((r) => {
    departmentCount.value = r.data.length.toString();
  }).catch(() => {});
});

const MapPinIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" }),
  ]);

const BuildingIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }),
  ]);

const CalendarIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }),
  ]);

const UsersIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }),
  ]);

const stats = [
  { label: "Electoral Areas", value: "10",           icon: MapPinIcon,   dark: false },
  { label: "Departments",     value: departmentCount, icon: BuildingIcon,  dark: true  },
  { label: "Est. Year",       value: "2012",          icon: CalendarIcon,  dark: true  },
  { label: "Communities",     value: "50+",           icon: UsersIcon,     dark: false },
];
</script>
