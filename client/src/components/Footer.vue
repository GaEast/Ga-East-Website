<template>
  <div>
    <!-- Pre-footer CTA band -->
    <div class="bg-[#6CC551] py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="text-white text-2xl sm:text-3xl font-bold leading-snug">
              Have a question or concern?
            </h3>
            <p class="text-white/80 text-sm mt-1">
              Our office is open Monday – Friday, 9:00 AM – 5:00 PM
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="tel:0302962718"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1E2833] text-sm font-bold rounded hover:bg-gray-100 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <router-link
              to="/contact"
              class="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white text-white text-sm font-bold rounded hover:bg-white hover:text-[#6CC551] transition-colors"
            >
              Contact Page
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main footer -->
    <footer class="bg-[#1E2833] text-white relative overflow-hidden">

      <!-- Large watermark -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span class="text-[20rem] font-extrabold text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          GEMA
        </span>
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          <!-- Branding (wider) -->
          <div class="lg:col-span-4">
            <div class="flex items-center gap-3 mb-5">
              <img src="../assets/logo-transparent.png" class="h-14 w-auto" alt="Ga East Logo" />
              <div>
                <p class="text-white font-bold text-base uppercase tracking-wide leading-snug text-left">
                  Ga East<br />Municipal Assembly
                </p>
                <p class="text-[#6CC551] text-xs font-semibold mt-0.5 text-left">Greater Accra Region</p>
              </div>
            </div>

            <p class="text-gray-400 text-sm leading-relaxed mb-6 text-left">
              Dedicated to serving the people of Ga East with transparency, accountability, and a commitment
              to sustainable development for all communities.
            </p>

            <!-- Address card -->
            <div class="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 text-sm text-gray-400">
              <p class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-[#6CC551] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                P. O. Box AQ5, Abokobi
              </p>
              <p class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-[#6CC551] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                </svg>
                Digital Address: GE-011-2678
              </p>
              <p class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-[#6CC551] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Mon – Fri &nbsp;·&nbsp; 9:00 AM – 5:00 PM
              </p>
            </div>

            <!-- Social icons -->
            <div class="flex items-center gap-2 mt-5">
              <a href="https://www.facebook.com/gema.abokobi" target="_blank" rel="noreferrer" aria-label="Facebook"
                class="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#6CC551] flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/>
                </svg>
              </a>
              <a href="mailto:info@gema.gov.gh" aria-label="Email"
                class="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#6CC551] flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
              <a href="https://wa.me/0559920954" target="_blank" rel="noreferrer" aria-label="WhatsApp"
                class="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#6CC551] flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Navigate -->
          <div class="lg:col-span-2">
            <p class="text-white text-xs font-bold uppercase tracking-widest mb-5 pb-2 border-b border-white/10 text-left">
              Navigate
            </p>
            <ul class="space-y-3">
              <li v-for="link in navLinks" :key="link.href">
                <router-link :to="link.href"
                  class="text-gray-400 text-sm hover:text-[#6CC551] hover:translate-x-1 transition-all flex items-center gap-2">
                  <span class="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0"></span>
                  {{ link.label }}
                </router-link>
              </li>
              <li>
                <button @click="scrollToTop"
                  class="text-gray-400 text-sm hover:text-[#6CC551] hover:translate-x-1 transition-all flex items-center gap-2 w-full text-left">
                  <span class="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0"></span>
                  Back to Top
                </button>
              </li>
            </ul>
          </div>

          <!-- Useful Links -->
          <div class="lg:col-span-3">
            <p class="text-white text-xs font-bold uppercase tracking-widest mb-5 pb-2 border-b border-white/10 text-left">
              Useful Links
            </p>
            <ul class="space-y-3">
              <li v-for="link in usefulLinks" :key="link.href">
                <a :href="link.href" target="_blank" rel="noreferrer"
                  class="text-gray-400 text-sm hover:text-[#6CC551] hover:translate-x-1 transition-all flex items-center gap-2">
                  <span class="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0"></span>
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Quick contact -->
          <div class="lg:col-span-3">
            <p class="text-white text-xs font-bold uppercase tracking-widest mb-5 pb-2 border-b border-white/10 text-left">
              Quick Contact
            </p>
            <ul class="space-y-3">
              <li v-for="item in contactItems" :key="item.label">
                <component
                  :is="item.href ? 'a' : 'span'"
                  v-bind="item.href ? { href: item.href, ...(item.external ? { target: '_blank', rel: 'noreferrer' } : {}) } : {}"
                  class="text-gray-400 text-sm hover:text-[#6CC551] hover:translate-x-1 transition-all flex items-center gap-2"
                >
                  <span class="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span>
                    <span class="text-[#6CC551] font-semibold">{{ item.label }}:</span>
                    {{ item.value }}
                  </span>
                </component>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Bottom bar -->
      <div class="relative border-t border-white/10">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-gray-500 text-xs">
            &copy; {{ new Date().getFullYear() }} Ga East Municipal Assembly. All rights reserved.
          </p>
          <p class="text-gray-500 text-xs">
            Developed by
            <button @click="sendEmail" class="text-[#6CC551] hover:text-green-400 transition-colors font-semibold">
             Abubakar Sadick Yahaya &amp; Edem Jude Nyahe
            </button>
          </p>
        </div>
      </div>

    </footer>
  </div>
</template>

<script setup lang="ts">
import { scrollToTop } from "@/functions";

const navLinks = [
  { label: "Home",        href: "/"                  },
  { label: "About",       href: "/about"             },
  { label: "Documents",   href: "/general-documents" },
  { label: "Departments", href: "/departments"       },
  { label: "Projects",    href: "/projects"          },
  { label: "Gallery",     href: "/gallery"           },
  { label: "Contact",     href: "/contact"           },
];

const usefulLinks = [
  { label: "Local Government Service",  href: "http://lgs.gov.gh/"                  },
  { label: "Ghana Districts",           href: "http://www.ghanadistricts.com/home/" },
  { label: "GoG Official Portal",       href: "https://www.ghana.gov.gh/"           },
  { label: "GoG E-Pay Slip",            href: "http://gogpayslip.com/"              },
  { label: "Ministry of Local Gov't",   href: "http://www.mlgrd.gov.gh/"            },
  { label: "Staff Mail",                href: "http://outlook.office365.com/"       },
];

const contactItems = [
  { label: "Phone",     value: "0302-962718",        href: "tel:0302962718",                  external: false },
  { label: "Phone",     value: "0302-528761",         href: "tel:0302528761",                  external: false },
  { label: "Email",     value: "info@gema.gov.gh",    href: "mailto:info@gema.gov.gh",         external: false },
  { label: "WhatsApp",  value: "0559920954",          href: "https://wa.me/0559920954",        external: true  },
  { label: "Post Code", value: "255",                 href: null,                              external: false },
  { label: "Digital",   value: "GE-011-2678",         href: null,                              external: false },
];

const sendEmail = () => {
  window.location.href = "mailto:sadickashton@gmail.com,judeedemnyahe@gmail.com?subject=GEMA Website";
};
</script>
