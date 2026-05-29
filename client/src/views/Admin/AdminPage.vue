<template>

  <!-- Topbar -->
  <nav aria-label="Top navigation"
    class="fixed top-0 z-50 w-full h-14 bg-white border-b border-gray-100 flex items-center shadow-sm">

    <!-- Logo section — always visible, aligns with sidebar width on desktop -->
    <div class="flex items-center gap-3 px-4 lg:px-5 h-full border-r border-white/10 lg:w-64 flex-shrink-0 bg-[#1E2833]">
      <img src="../../assets/logo-transparent.png" class="h-8 w-8 flex-shrink-0" alt="GEMA" />
      <div class="min-w-0">
        <p class="font-extrabold text-sm tracking-wider text-white leading-tight">G.E.M.A</p>
        <p class="text-[#6CC551] text-[10px] font-medium leading-tight tracking-wide hidden sm:block">Admin Portal</p>
      </div>
    </div>

    <!-- Topbar content -->
    <div class="flex items-center justify-between flex-1 px-3 lg:px-5">

      <!-- Left: Hamburger (mobile) + Breadcrumb (desktop) -->
      <div class="flex items-center gap-2">
        <button @click="toggleSidebar" type="button"
          class="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="hidden lg:flex items-center gap-1.5 text-sm">
          <span class="text-gray-300">/</span>
          <span class="font-semibold text-gray-700">{{ pageTitle }}</span>
        </div>
      </div>

      <!-- Right: View site + User dropdown -->
      <div class="flex items-center gap-1.5">

        <a href="/" target="_blank"
          class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-[#6CC551] hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </a>

        <div class="relative" ref="dropdownRef">
          <button @click="isDropdownOpen = !isDropdownOpen" type="button"
            class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
            <div
              class="w-7 h-7 rounded-full bg-[#6CC551] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 select-none">
              {{ usernameInitials }}
            </div>
            <span class="hidden md:block text-sm font-semibold text-[#1E2833]">{{ username }}</span>
            <svg
              :class="['w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0', isDropdownOpen ? 'rotate-180' : '']"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden">
              <div class="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-full bg-[#6CC551] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 select-none">
                    {{ usernameInitials }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-gray-800 truncate">{{ username }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">Administrator</p>
                  </div>
                </div>
              </div>
              <div class="py-1">
                <router-link to="/admin/add-user" @click="isDropdownOpen = false"
                  class="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6CC551] transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Add User
                </router-link>
                <a href="/" target="_blank" @click="isDropdownOpen = false"
                  class="sm:hidden flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6CC551] transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Site
                </a>
              </div>
              <div class="border-t border-gray-100 py-1">
                <button @click="isDropdownOpen = false; showSignOutModal = true"
                  class="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </transition>
        </div>

      </div>
    </div>
  </nav>

  <!-- Mobile overlay -->
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="fixed inset-0 z-30 bg-black/40 lg:hidden"></div>
  </transition>

  <!-- Sidebar -->
  <aside :class="[
    'fixed top-14 left-0 z-40 w-64 flex flex-col bg-[#1E2833]',
    'h-[calc(100vh-3.5rem)]',
    'transition-transform duration-300 ease-in-out lg:transition-none',
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  ]">

    <div class="h-0.5 bg-gradient-to-r from-[#6CC551] via-[#5ab544] to-[#3d9b2e] flex-shrink-0"></div>

    <nav aria-label="Sidebar navigation" class="flex-1 overflow-y-auto px-3 py-4">
      <ul class="space-y-0.5">

        <!-- Dashboard -->
        <router-link to="/admin/dashboard" custom v-slot="{ navigate }">
          <li>
            <button @click="navigate"
              :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isRouteActive('/admin/dashboard')
                  ? 'bg-[#6CC551] text-white shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white']">
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              Dashboard
            </button>
          </li>
        </router-link>

        <!-- CONTENT section label -->
        <li class="pt-5 pb-1 px-3">
          <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Content</p>
        </li>

        <!-- Posts -->
        <li>
          <div :class="['flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider select-none',
            isSectionActive('posts') ? 'text-[#6CC551]' : 'text-gray-500']">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Posts
          </div>
          <ul class="mt-1 space-y-0.5 ml-3 pl-3 border-l border-white/10">
            <router-link to="/admin/new-post" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/new-post')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  New Post
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-posts" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-posts')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Posts
                </button>
              </li>
            </router-link>
          </ul>
        </li>

        <!-- Documents -->
        <li class="pt-2">
          <div :class="['flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider select-none',
            isSectionActive('documents') ? 'text-[#6CC551]' : 'text-gray-500']">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
            Documents
          </div>
          <ul class="mt-1 space-y-0.5 ml-3 pl-3 border-l border-white/10">
            <router-link to="/admin/add-document" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/add-document')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Add Document
                </button>
              </li>
            </router-link>
            <router-link to="/admin/document-categories" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/document-categories')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Categories
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-documents" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-documents')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Documents
                </button>
              </li>
            </router-link>
          </ul>
        </li>

        <!-- Slider -->
        <li class="pt-2">
          <div :class="['flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider select-none',
            isSectionActive('sliders') ? 'text-[#6CC551]' : 'text-gray-500']">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Slider
          </div>
          <ul class="mt-1 space-y-0.5 ml-3 pl-3 border-l border-white/10">
            <router-link to="/admin/add-slider" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/add-slider')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Add Slider
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-sliders" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-sliders')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Sliders
                </button>
              </li>
            </router-link>
          </ul>
        </li>

        <!-- Messages -->
        <li class="pt-2">
          <router-link to="/admin/messages" custom v-slot="{ navigate }">
            <button @click="navigate"
              :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isRouteActive('/admin/messages')
                  ? 'bg-[#6CC551] text-white shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white']">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Messages
            </button>
          </router-link>
        </li>

        <!-- Comments -->
        <li>
          <router-link to="/admin/comments" custom v-slot="{ navigate }">
            <button @click="navigate"
              :class="['flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isRouteActive('/admin/comments')
                  ? 'bg-[#6CC551] text-white shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white']">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Comments
            </button>
          </router-link>
        </li>

        <!-- ORGANIZATION section label -->
        <li class="pt-5 pb-1 px-3">
          <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Organization</p>
        </li>

        <!-- Departments -->
        <li>
          <div :class="['flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider select-none',
            isSectionActive('departments') ? 'text-[#6CC551]' : 'text-gray-500']">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Departments & Units
          </div>
          <ul class="mt-1 space-y-0.5 ml-3 pl-3 border-l border-white/10">
            <router-link to="/admin/add-department" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/add-department')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  Add Department
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-departments" custom v-slot="{ navigate }">
              <li>
                <button @click="navigate"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    isRouteActive('/admin/view-departments')
                      ? 'bg-[#6CC551] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10']">
                  View Departments
                </button>
              </li>
            </router-link>
          </ul>
        </li>

      </ul>
    </nav>

    <!-- Sidebar footer -->
    <div class="flex-shrink-0 border-t border-white/10 px-4 py-3">
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-full bg-[#6CC551] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 select-none">
          {{ usernameInitials }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-white text-sm font-semibold truncate leading-tight">{{ username }}</p>
          <p class="text-gray-500 text-xs leading-tight">Administrator</p>
        </div>
        <router-link to="/admin/add-user"
          class="p-1.5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors flex-shrink-0"
          title="Manage Users">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </router-link>
      </div>
    </div>

  </aside>

  <!-- Sign Out Confirmation Modal -->
  <transition
    enter-active-class="transition ease-out duration-150"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="showSignOutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.45);" @click.self="showSignOutModal = false">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        style="border: 1px solid #f3f4f6;">
        <!-- Modal header -->
        <div class="px-6 pt-6 pb-4 flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style="background: #fef2f2;">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-[#1E2833] mb-1">Sign out?</h3>
          <p class="text-sm" style="color: #6b7280;">You'll be returned to the login page. Any unsaved changes will be lost.</p>
        </div>
        <!-- Modal actions -->
        <div class="px-6 pb-6 flex gap-3">
          <button @click="showSignOutModal = false"
            class="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors hover:bg-gray-50"
            style="border: 1px solid #e5e7eb; color: #374151; background: #fff;">
            Cancel
          </button>
          <button @click="showSignOutModal = false; logout()"
            :disabled="isLoading"
            class="flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60">
            {{ isLoading ? 'Signing out…' : 'Sign Out' }}
          </button>
        </div>
      </div>
    </div>
  </transition>

  <!-- Main content -->
  <main class="pt-14 min-h-screen bg-gray-50 lg:ml-64 text-left">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>

</template>

<script setup lang="ts">
import { onMounted, computed, ref, onBeforeUnmount, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { isRouteActive } from "@/functions/index";
import router from "@/router";

const store          = useStore();
const route          = useRoute();
const isLoading       = ref(false);
const isDesktop       = ref(false);
const isSidebarOpen   = ref(false);
const isDropdownOpen  = ref(false);
const showSignOutModal = ref(false);
const dropdownRef    = ref<HTMLElement | null>(null);

const pageTitles: Record<string, string> = {
  '/admin/dashboard':           'Dashboard',
  '/admin/new-post':            'New Post',
  '/admin/view-posts':          'Posts',
  '/admin/add-document':        'Add Document',
  '/admin/view-documents':      'View Documents',
  '/admin/document-categories': 'Document Categories',
  '/admin/add-slider':          'Add Slider',
  '/admin/view-sliders':        'View Sliders',
  '/admin/add-department':      'Add Department',
  '/admin/view-departments':    'View Departments',
  '/admin/add-user':            'Add User',
  '/admin/messages':            'Messages',
  '/admin/comments':            'Comments',
};

const pageTitle = computed(() => {
  const path = route.path;
  if (path.startsWith('/admin/edit-post/'))       return 'Edit Post';
  if (path.startsWith('/admin/edit-document/'))   return 'Edit Document';
  if (path.startsWith('/admin/edit-department/')) return 'Edit Department';
  if (path.startsWith('/admin/edit-unit/'))       return 'Edit Unit';
  return pageTitles[path] || 'Admin';
});

const getActiveSection = (path: string): string | null => {
  if (path.startsWith('/admin/new-post') || path.startsWith('/admin/view-posts') || path.startsWith('/admin/edit-post')) return 'posts';
  if (path.startsWith('/admin/add-document') || path.startsWith('/admin/view-documents') || path.startsWith('/admin/document-categories') || path.startsWith('/admin/edit-document')) return 'documents';
  if (path.startsWith('/admin/add-slider') || path.startsWith('/admin/view-sliders')) return 'sliders';
  if (path.startsWith('/admin/add-department') || path.startsWith('/admin/view-departments') || path.startsWith('/admin/edit-department') || path.startsWith('/admin/edit-unit')) return 'departments';
  return null;
};

const isSectionActive = (section: string) => getActiveSection(route.path) === section;

watch(() => route.path, () => {
  if (!isDesktop.value) isSidebarOpen.value = false;
});

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
  if (isDesktop.value) isSidebarOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", handleResize);
  isDesktop.value = window.innerWidth >= 1024;
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", handleResize);
});

const username         = computed(() => store.getters.username || 'Admin');
const usernameInitials = computed(() => {
  const name = store.getters.username || 'AD';
  return name.slice(0, 2).toUpperCase();
});

const toggleSidebar = () => {
  if (!isDesktop.value) isSidebarOpen.value = !isSidebarOpen.value;
};

const logout = async () => {
  isLoading.value = true;
  await store.dispatch("logout");
  isLoading.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; }
</style>
