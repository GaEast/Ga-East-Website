<template>
  <div class="navbar-component w-full z-50 fixed top-0 left-0 right-0">

    <!-- Top utility bar -->
    <div class="bg-[#1E2833] text-white text-xs">
      <div class="container mx-auto px-4 sm:px-6 flex items-center justify-between py-2">
        <!-- Contact info (sm+) -->
        <div class="hidden sm:flex items-center space-x-4">
          <a
            href="tel:0302962718"
            class="flex items-center gap-1.5 text-gray-300 hover:text-[#6CC551] transition-colors"
          >
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            0302-962718
          </a>
          <span class="text-gray-600">|</span>
          <a
            href="mailto:info@gema.gov.gh"
            class="flex items-center gap-1.5 text-gray-300 hover:text-[#6CC551] transition-colors"
          >
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@gema.gov.gh
          </a>
        </div>

        <!-- Right: social + staff mail -->
        <div class="flex items-center gap-3 ml-auto">
          <a
            href="https://www.facebook.com/gema.abokobi"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            class="text-gray-300 hover:text-[#6CC551] transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd" />
            </svg>
          </a>
          <a
            href="http://outlook.office365.com/"
            target="_blank"
            class="px-3 py-1 bg-[#6CC551] text-white font-medium rounded hover:bg-green-600 transition-colors"
          >
            Staff Mail
          </a>
        </div>
      </div>
    </div>

    <!-- Main navigation bar -->
    <div
      class="bg-white border-b border-gray-200 transition-shadow duration-300"
      :class="isScrolled ? 'shadow-md' : ''"
    >
      <div class="container mx-auto px-4 sm:px-6 flex items-center justify-between py-3">

        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 flex-shrink-0">
          <img src="../assets/ga-east-logo.jpg" class="h-10 sm:h-12 w-auto" alt="Ga East Logo" />
          <div class="text-left">
            <span class="hidden lg:block text-sm font-bold text-[#3a3838] uppercase leading-snug tracking-wide">
              Ga East Municipal<br />Assembly
            </span>
            <span class="lg:hidden text-lg font-bold text-[#3a3838] uppercase tracking-wide">GEMA</span>
          </div>
        </router-link>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex items-center">
          <template v-for="link in computedLinks" :key="link.href">

            <!-- Plain link -->
            <router-link
              v-if="!link.children || link.children.length === 0"
              :to="link.href"
              class="px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors"
              :class="isLinkActive(link.href)
                ? 'text-[#6CC551] border-b-2 border-[#6CC551]'
                : 'text-[#3a3838] hover:text-[#6CC551]'"
            >
              {{ link.text }}
            </router-link>

            <!-- Dropdown link -->
            <div
              v-else
              class="relative"
              @mouseenter="activeDropdown = link.text"
              @mouseleave="activeDropdown = null"
            >
              <button
                class="flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors"
                :class="activeDropdown === link.text || isLinkActive(link.href)
                  ? 'text-[#6CC551]'
                  : 'text-[#3a3838] hover:text-[#6CC551]'"
              >
                {{ link.text }}
                <svg
                  class="w-3.5 h-3.5 transition-transform duration-200"
                  :class="activeDropdown === link.text ? 'rotate-180' : ''"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>

              <transition
                enter-active-class="transition ease-out duration-150"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div
                  v-if="activeDropdown === link.text"
                  class="absolute top-full left-0 mt-1 min-w-[220px] max-h-72 overflow-y-auto bg-[#1E2833] shadow-2xl z-50"
                >
                  <div class="px-4 py-2 border-b border-white/10 flex items-center gap-2">
                    <span class="w-1 h-3.5 bg-[#6CC551] rounded-full flex-shrink-0"></span>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-left">{{ link.text }}</p>
                  </div>
                  <div class="py-1">
                    <router-link
                      v-for="child in link.children"
                      :key="child.href"
                      :to="child.href"
                      class="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors relative text-left"
                      :class="isLinkActive(child.href) ? 'text-[#6CC551]' : ''"
                      @click="activeDropdown = null"
                    >
                      <span
                        class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#6CC551] rounded-full transition-opacity duration-150"
                        :class="isLinkActive(child.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                      ></span>
                      {{ child.text }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>
          </template>
        </nav>

        <!-- Right: coat of arms + hamburger -->
        <div class="flex items-center gap-3">
          <img
            src="../assets/coat_of_arms.png"
            class="hidden sm:block h-12 w-auto"
            alt="Coat of Arms"
          />
          <button
            @click="mobileOpen = !mobileOpen"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu panel -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <div v-if="mobileOpen" class="md:hidden border-t border-gray-200 bg-white">
          <div class="px-4 py-3 space-y-1">
            <template v-for="link in computedLinks" :key="link.href">

              <!-- Simple mobile link -->
              <router-link
                v-if="!link.children || link.children.length === 0"
                :to="link.href"
                class="block px-3 py-2.5 text-sm font-medium uppercase tracking-wide rounded-lg transition-colors"
                :class="isLinkActive(link.href)
                  ? 'bg-green-50 text-[#6CC551]'
                  : 'text-gray-700 hover:bg-green-50 hover:text-[#6CC551]'"
                @click="mobileOpen = false"
              >
                {{ link.text }}
              </router-link>

              <!-- Mobile accordion dropdown -->
              <div v-else>
                <button
                  @click="toggleMobileAccordion(link.text)"
                  class="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium uppercase tracking-wide rounded-lg transition-colors"
                  :class="mobileAccordion === link.text
                    ? 'bg-green-50 text-[#6CC551]'
                    : 'text-gray-700 hover:bg-green-50 hover:text-[#6CC551]'"
                >
                  {{ link.text }}
                  <svg
                    class="w-4 h-4 transition-transform duration-200"
                    :class="mobileAccordion === link.text ? 'rotate-180' : ''"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </button>

                <transition
                  enter-active-class="transition ease-out duration-150"
                  enter-from-class="opacity-0 -translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-1"
                >
                  <div
                    v-if="mobileAccordion === link.text"
                    class="mt-1 mb-2 bg-[#1E2833] rounded-lg overflow-hidden"
                  >
                    <router-link
                      v-for="child in link.children"
                      :key="child.href"
                      :to="child.href"
                      class="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                      :class="isLinkActive(child.href) ? 'text-[#6CC551]' : ''"
                      @click="closeMobileNav"
                    >
                      <span
                        class="w-1 h-3.5 rounded-full bg-[#6CC551] flex-shrink-0 transition-opacity duration-150"
                        :class="isLinkActive(child.href) ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'"
                      ></span>
                      {{ child.text }}
                    </router-link>
                  </div>
                </transition>
              </div>
            </template>

            <!-- Mobile staff mail button -->
            <a
              href="http://outlook.office365.com/"
              target="_blank"
              class="block px-3 py-2.5 text-sm font-medium text-white bg-[#6CC551] rounded-lg hover:bg-green-600 uppercase tracking-wide transition-colors text-center mt-2"
            >
              Staff Mail
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- Spacer to prevent content from going under fixed navbar -->
  <div class="navbar-spacer"></div>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { url } from "@/functions/endpoint";
import { encryptString } from "@/functions/encryption";
import axios from "axios";

const route = useRoute();
const isScrolled = ref(false);
const handleScroll = () => { isScrolled.value = window.scrollY > 10; };

const activeDropdown = ref<string | null>(null);
const mobileOpen = ref(false);
const mobileAccordion = ref<string | null>(null);

const toggleMobileAccordion = (name: string) => {
  mobileAccordion.value = mobileAccordion.value === name ? null : name;
};

const closeMobileNav = () => {
  mobileOpen.value = false;
  mobileAccordion.value = null;
};

const allDepartments = ref<any[]>([]);

const isLinkActive = (href: string) => {
  const current = route.path;
  if (href === "/") return current === "/";
  return current.startsWith(href);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  const storedDepts = localStorage.getItem("allDepartments");
  if (storedDepts) allDepartments.value = JSON.parse(storedDepts);

  axios.get(`${url}/departments`).then((r) => {
    allDepartments.value = r.data;
    localStorage.setItem("allDepartments", JSON.stringify(r.data));
  }).catch(console.error);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const computedLinks = computed(() => [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Documents", href: "/general-documents" },
  {
    text: "Departments",
    href: "/departments",
    children: allDepartments.value.map((dept: any) => ({
      text: dept.name,
      href: `/departments/${encryptString(dept.id.toString())}`,
    })),
  },
  {
    text: "Projects",
    href: "/projects",
    children: [
      { text: "Ongoing Projects", href: "/ongoing-projects" },
      { text: "Finished Projects", href: "/finished-projects" },
      { text: "Upcoming Projects", href: "/upcoming-projects" },
    ],
  },
  {
    text: "Media",
    href: "/media",
    children: [
      { text: "News", href: "/all-news" },
      { text: "Gallery", href: "/gallery" },
    ],
  },
  { text: "Contact", href: "/contact" },
]);
</script>

<style scoped>
.navbar-spacer {
  /* top utility bar ~36px + main nav ~68px */
  height: 104px;
}

@media (max-width: 640px) {
  .navbar-spacer {
    height: 100px;
  }
}
</style>
