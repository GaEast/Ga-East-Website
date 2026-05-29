<template>
  <section class="bg-[#1E2833] py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section header -->
      <div class="text-center mb-12">
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Citizen Portal</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
          Quick Services
        </h2>
        <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
          Access key municipal services and information quickly from one place.
        </p>
      </div>

      <!-- Services grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <router-link
          v-for="service in services"
          :key="service.label"
          :to="service.href"
          class="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-[#6CC551] hover:border-[#6CC551] transition-all duration-300 hover:-translate-y-1"
        >
          <div class="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
            <component :is="service.icon" class="w-6 h-6 text-[#6CC551] group-hover:text-white transition-colors" />
          </div>
          <span class="text-white text-xs font-semibold text-center leading-snug group-hover:text-white transition-colors">
            {{ service.label }}
          </span>
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from "vue";

const NewsIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }),
  ]);

const DocumentIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }),
  ]);

const ProjectIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }),
  ]);

const GalleryIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }),
  ]);

const ContactIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }),
  ]);

const AboutIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }),
  ]);

const services = [
  { label: "Latest News",       href: "/all-news",           icon: NewsIcon     },
  { label: "Documents",         href: "/general-documents",  icon: DocumentIcon },
  { label: "Ongoing Projects",  href: "/ongoing-projects",   icon: ProjectIcon  },
  { label: "Photo Gallery",     href: "/gallery",            icon: GalleryIcon  },
  { label: "Contact Us",        href: "/contact",            icon: ContactIcon  },
  { label: "About Assembly",    href: "/about",              icon: AboutIcon    },
];
</script>
