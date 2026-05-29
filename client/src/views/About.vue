<template>
  <div>

    <!-- Page Hero — dark with diagonal pattern -->
    <div class="relative bg-[#1E2833] overflow-hidden">
      <!-- Diagonal grid watermark -->
      <div class="absolute inset-0 opacity-10"
        style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(108,197,81,0.4) 20px, rgba(108,197,81,0.4) 21px);">
      </div>
      <!-- Green left accent bar -->
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#6CC551]"></div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#6CC551]">About Us</span>
        </div>

        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-3 text-center">Who We Are</p>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wide text-center leading-tight">
          About the Assembly
        </h1>
        <div class="mt-4 w-16 h-1 bg-[#6CC551] rounded-full mx-auto"></div>
        <p class="mt-5 text-gray-400 text-sm max-w-2xl leading-relaxed text-center mx-auto">
          Dedicated to serving the people of Ga East with transparency, accountability,
          and a commitment to sustainable development for all communities.
        </p>

        <!-- Quick stat pills -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span v-for="pill in heroPills" :key="pill"
            class="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
            {{ pill }}
          </span>
        </div>
      </div>
    </div>

    <!-- Introduction + Political Administration -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-12">
          <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Background</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">Overview</h2>
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
              the nation's capital and is noted for its well-planned physical layout, which has attracted
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

    <!-- Stats band with icons -->
    <div class="bg-[#6CC551] py-14">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div v-for="stat in quickStats" :key="stat.label" class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <component :is="stat.icon" class="w-6 h-6 text-white" />
            </div>
            <p class="text-4xl font-extrabold text-white">{{ stat.value }}</p>
            <p class="text-white/80 text-xs font-semibold uppercase tracking-widest">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vision & Mission -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-12">
          <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Guiding Principles</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">Vision &amp; Mission</h2>
          <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            v-for="card in valueCards"
            :key="card.title"
            class="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div class="w-16 h-16 rounded-2xl bg-[#6CC551]/10 flex items-center justify-center mb-5 group-hover:bg-[#6CC551] transition-colors self-start">
              <component :is="card.icon" class="w-8 h-8 text-[#6CC551] group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-base font-bold text-[#1E2833] uppercase tracking-wide mb-3">{{ card.title }}</h3>
            <div class="w-8 h-0.5 bg-[#6CC551] rounded-full mb-4"></div>
            <p class="text-gray-500 text-sm leading-relaxed text-left">{{ card.text }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- Geographic Context — full-width dark section -->
    <section class="bg-[#1E2833] py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Location</p>
            <h2 class="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide mb-4">Geographic Context</h2>
            <div class="w-16 h-1 bg-[#6CC551] rounded-full mb-6"></div>
            <p class="text-gray-400 text-sm leading-relaxed mb-8">
              Ga East Municipal District is bordered on the north by the Akuapim South District in the Eastern Region.
              It is bordered on its other three sides by districts in the Greater Accra Region, making it a central
              hub within the nation's capital territory.
            </p>

            <div class="space-y-3">
              <div v-for="border in borders" :key="border.direction"
                class="flex items-center gap-4 bg-white/5 rounded-xl px-5 py-3 border border-white/10">
                <span class="text-[#6CC551] font-bold text-xs uppercase tracking-widest w-16 flex-shrink-0">{{ border.direction }}</span>
                <span class="text-gray-300 text-sm">{{ border.neighbour }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div v-for="geo in geoStats" :key="geo.label"
              class="rounded-2xl p-6 flex flex-col gap-2 border"
              :class="geo.highlight ? 'bg-[#6CC551] border-[#6CC551]' : 'bg-white/5 border-white/10'"
            >
              <component :is="geo.icon" class="w-6 h-6" :class="geo.highlight ? 'text-white' : 'text-[#6CC551]'" />
              <p class="text-2xl font-extrabold" :class="geo.highlight ? 'text-white' : 'text-white'">{{ geo.value }}</p>
              <p class="text-xs font-semibold uppercase tracking-widest" :class="geo.highlight ? 'text-white/80' : 'text-gray-400'">{{ geo.label }}</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- MCE Leadership -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-12">
          <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Leadership</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">Municipal Chief Executive</h2>
          <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
        </div>

        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="h-28 bg-[#1E2833] relative">
            <div class="absolute inset-0 opacity-30"
              style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(108,197,81,0.15) 10px, rgba(108,197,81,0.15) 11px);">
            </div>
          </div>

          <div class="px-8 pb-8 -mt-14 relative z-10">
            <div class="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src="@/assets/mce2025.jpg"
                alt="Municipal Chief Executive"
                class="w-28 h-28 rounded-xl object-cover shadow-lg ring-4 ring-white flex-shrink-0"
              />
              <div class="pt-0 sm:pt-16 min-w-0">
                <h3 class="text-xl font-bold text-[#1E2833] leading-tight">Hon. Edmund Agboh</h3>
                <span class="inline-block mt-1 px-3 py-0.5 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold uppercase tracking-wide rounded-full">
                  Municipal Chief Executive
                </span>
              </div>
            </div>

            <p class="mt-6 text-gray-600 text-sm leading-relaxed text-left">
              Hon. Edmund Agboh leads the Ga East Municipal Assembly with a focus on sustainable infrastructure,
              improved service delivery, and inclusive community development across all ten electoral areas of
              the municipality in the Greater Accra Region.
            </p>

            <div class="my-6 border-t border-gray-100"></div>

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

            <router-link
              to="/contact"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6CC551] text-white text-sm font-semibold rounded hover:bg-green-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact the Office
            </router-link>
          </div>
        </div>

      </div>
    </section>

    <!-- Departments -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-12">
          <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Structure</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">Our Departments</h2>
          <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
          <p class="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
            The Assembly operates through specialised departments to deliver services across the municipality.
          </p>
        </div>

        <!-- Skeleton -->
        <div v-if="depsLoading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="n in 8" :key="n" class="rounded-xl border border-gray-100 p-5 animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <router-link
            v-for="dep in departments"
            :key="dep.id"
            :to="`/departments/${encryptString(dep.id.toString())}`"
            class="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 hover:border-[#6CC551] hover:bg-[#6CC551]/5 hover:shadow-sm transition-all duration-200"
          >
            <span class="text-sm font-semibold text-[#1E2833] group-hover:text-[#6CC551] transition-colors leading-snug">
              {{ dep.name }}
            </span>
            <svg class="w-4 h-4 text-gray-300 group-hover:text-[#6CC551] flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

      </div>
    </section>

    <!-- Closing CTA -->
    <div class="bg-[#6CC551] py-14">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 class="text-white text-2xl sm:text-3xl font-bold leading-snug">
              Have questions about the Assembly?
            </h3>
            <p class="text-white/80 text-sm mt-2 max-w-lg">
              Our office is open Monday – Friday, 9:00 AM – 5:00 PM. You can reach us by phone, email, or visit us in Abokobi.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a href="tel:0302962718"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1E2833] text-sm font-bold rounded hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <router-link to="/contact"
              class="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white text-white text-sm font-bold rounded hover:bg-white hover:text-[#6CC551] transition-colors">
              Send a Message
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { url } from "@/functions/endpoint";
import { encryptString } from "@/functions/encryption";

const heroPills = ["Greater Accra Region", "Est. 2012", "Pop. ~284,000", "10 Electoral Areas", "50+ Communities"];

// ── Stats band ────────────────────────────────────────────────────────────────

const PeopleIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }),
  ]);

const MapIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" }),
  ]);

const CalendarIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }),
  ]);

const HomeIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }),
  ]);

const quickStats = [
  { value: "284K+", label: "Population",      icon: PeopleIcon   },
  { value: "10",    label: "Electoral Areas", icon: MapIcon      },
  { value: "2012",  label: "Established",     icon: CalendarIcon },
  { value: "50+",   label: "Communities",     icon: HomeIcon     },
];

// ── Vision & Mission ──────────────────────────────────────────────────────────

const VisionIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" }),
  ]);

const MissionIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }),
  ]);

const valueCards = [
  {
    title: "Our Vision",
    icon: VisionIcon,
    text: "To become a highly professional, dynamic, and client-sensitive Assembly, focusing on sustainable development.",
  },
  {
    title: "Our Mission",
    icon: MissionIcon,
    text: "To facilitate improvement in the quality of life of the people through the provision and promotion of basic socio-economic services within the context of good governance.",
  },
];

// ── Geographic borders ────────────────────────────────────────────────────────

const borders = [
  { direction: "North",  neighbour: "Akuapim South District (Eastern Region)"     },
  { direction: "East",   neighbour: "La-Nkwantanang-Madina Municipal Assembly"    },
  { direction: "South",  neighbour: "Accra Metropolitan Assembly"                 },
  { direction: "West",   neighbour: "Ga West Municipal Assembly"                  },
];

const AreaIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" }),
  ]);

const PinIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" }),
  ]);

const geoStats = [
  { value: "10",    label: "Electoral Areas",  icon: MapIcon,    highlight: true  },
  { value: "50+",   label: "Communities",      icon: HomeIcon,   highlight: false },
  { value: "~284K", label: "Population",       icon: PeopleIcon, highlight: false },
  { value: "GAR",   label: "Greater Accra Reg",icon: PinIcon,    highlight: true  },
];

// ── Departments ───────────────────────────────────────────────────────────────

interface Department { id: number; name: string; about: string; }

const departments = ref<Department[]>([]);
const depsLoading = ref(true);

onMounted(async () => {
  try {
    const res = await axios.get(`${url}/departments`);
    departments.value = Array.isArray(res.data) ? res.data : [];
  } catch {
    // silently fail — section simply stays empty
  } finally {
    depsLoading.value = false;
  }
});
</script>
