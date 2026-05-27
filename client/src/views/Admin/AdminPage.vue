<template>

  <!-- Topbar -->
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
    <div class="px-4 lg:px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Mobile menu toggle -->
        <button
          @click="toggleSidebar"
          type="button"
          class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link to="/admin/dashboard" class="flex items-center gap-2">
          <img src="../../assets/logo-transparent.png" class="h-8 w-8" alt="GEMA Logo" />
          <span class="text-[#1E2833] font-extrabold text-sm uppercase tracking-wide hidden sm:block">G.E.M.A</span>
          <span class="hidden sm:block px-1.5 py-0.5 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold rounded">Admin</span>
        </router-link>
      </div>

      <!-- User menu -->
      <div class="relative" ref="dropdownRef">
        <button
          @click="isDropdownOpen = !isDropdownOpen"
          type="button"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <img class="w-7 h-7 rounded-full" src="../../assets/profile.svg" alt="user" />
          <span class="hidden sm:block text-sm font-semibold text-[#1E2833]">{{ username }}</span>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-show="isDropdownOpen"
            class="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-10"
          >
            <router-link
              to="/admin/add-user"
              @click="isDropdownOpen = false"
              class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6CC551] transition-colors"
            >
              Add User
            </router-link>
            <div class="my-1 border-t border-gray-100"></div>
            <button
              @click="logout(); isDropdownOpen = false"
              class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              {{ isLoading ? 'Signing out…' : 'Sign Out' }}
            </button>
          </div>
        </transition>
      </div>
    </div>
  </nav>

  <!-- Sidebar -->
  <aside :class="[
    'fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform duration-300 ease-in-out bg-[#1E2833]',
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
  ]">
    <div class="h-0.5 bg-[#6CC551]"></div>
    <div class="h-full px-3 py-4 overflow-y-auto">
      <ul class="space-y-1">

        <!-- Dashboard -->
        <router-link to="/admin/dashboard" custom v-slot="{ navigate }">
          <li>
            <button
              @click="navigate"
              :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isRouteActive('/admin/dashboard')
                  ? 'bg-[#6CC551] text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white']"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              Dashboard
            </button>
          </li>
        </router-link>

        <p class="px-3 pt-4 pb-1 text-xs font-bold uppercase tracking-widest text-gray-500">Content</p>

        <!-- Posts -->
        <li>
          <button
            @click="toggleAccordion('posts')"
            :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              openAccordion === 'posts' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white']"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="flex-1 text-left">Posts</span>
            <svg :class="['w-4 h-4 transition-transform duration-200', openAccordion === 'posts' ? 'rotate-180' : '']"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-if="openAccordion === 'posts'" class="mt-1 space-y-0.5 pl-9">
            <router-link to="/admin/new-post" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/new-post') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  New Post
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-posts" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-posts') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Posts
                </button>
              </li>
            </router-link>
          </ul>
        </li>

        <!-- Documents -->
        <li>
          <button
            @click="toggleAccordion('documents')"
            :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              openAccordion === 'documents' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white']"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
            <span class="flex-1 text-left">Documents</span>
            <svg :class="['w-4 h-4 transition-transform duration-200', openAccordion === 'documents' ? 'rotate-180' : '']"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-if="openAccordion === 'documents'" class="mt-1 space-y-0.5 pl-9">
            <router-link to="/admin/add-document" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/add-document') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Add Document
                </button>
              </li>
            </router-link>
            <router-link to="/admin/document-categories" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/document-categories') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Categories
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-documents" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-documents') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Documents
                </button>
              </li>
            </router-link>
          </ul>
        </li>

        <!-- Slider -->
        <li>
          <button
            @click="toggleAccordion('sliders')"
            :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              openAccordion === 'sliders' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white']"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="flex-1 text-left">Slider</span>
            <svg :class="['w-4 h-4 transition-transform duration-200', openAccordion === 'sliders' ? 'rotate-180' : '']"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-if="openAccordion === 'sliders'" class="mt-1 space-y-0.5 pl-9">
            <router-link to="/admin/add-slider" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/add-slider') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Add Slider
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-sliders" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-sliders') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Sliders
                </button>
              </li>
            </router-link>
          </ul>
        </li>

        <!-- Departments -->
        <li>
          <button
            @click="toggleAccordion('departments')"
            :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              openAccordion === 'departments' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white']"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span class="flex-1 text-left">Departments & Units</span>
            <svg :class="['w-4 h-4 transition-transform duration-200', openAccordion === 'departments' ? 'rotate-180' : '']"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-if="openAccordion === 'departments'" class="mt-1 space-y-0.5 pl-9">
            <router-link to="/admin/add-department" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/add-department') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Add Department
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-departments" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-departments') ? 'bg-[#6CC551] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Departments
                </button>
              </li>
            </router-link>
          </ul>
        </li>

      </ul>
    </div>
  </aside>

  <!-- Main content -->
  <main :class="['pt-14 min-h-screen bg-gray-50 transition-all duration-300', isSidebarOpen ? 'lg:ml-64' : 'ml-0']">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>

</template>

<script setup lang="ts">
import { onMounted, computed, ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { isRouteActive } from "@/functions/index";
import router from "@/router";

const store          = useStore();
const isLoading      = ref(false);
const isSidebarOpen  = ref(true);
const openAccordion  = ref<string | null>(null);
const isDropdownOpen = ref(false);
const dropdownRef    = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  sessionStorage.setItem("username", storeUsername.value);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const storeUsername = computed(() => store.getters.username);
const username = sessionStorage.getItem("username") || storeUsername.value;

const toggleSidebar   = () => { isSidebarOpen.value = !isSidebarOpen.value; };
const toggleAccordion = (key: string) => {
  openAccordion.value = openAccordion.value === key ? null : key;
};

const logout = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("logout");
    router.push("/login");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; }
</style>
