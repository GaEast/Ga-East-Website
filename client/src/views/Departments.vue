<template>
  <div>

    <!-- Page Hero -->
    <div class="relative bg-[#1E2833] overflow-hidden">
      <!-- Diagonal grid watermark -->
      <div class="absolute inset-0 opacity-5"
        style="background-image: repeating-linear-gradient(45deg, #6CC551 0, #6CC551 1px, transparent 0, transparent 50%); background-size: 20px 20px;">
      </div>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <router-link to="/about" class="hover:text-[#6CC551] transition-colors">About</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#6CC551]">{{ department?.name ?? 'Department' }}</span>
        </div>

        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-3">Our Departments</p>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wide leading-tight">
          <template v-if="isLoading">
            <div class="h-10 sm:h-14 bg-white/10 rounded-lg w-72 animate-pulse" aria-hidden="true"></div>
          </template>
          <template v-else>{{ department?.name ?? 'Department' }}</template>
        </h1>
        <div class="mt-4 w-16 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-4 text-gray-400 text-sm max-w-xl leading-relaxed">
          Learn about this department's mandate, responsibilities, and its supporting units.
        </p>
      </div>
    </div>

    <!-- Main content -->
    <section class="py-10 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Skeleton -->
        <div v-if="isLoading" class="flex gap-8 items-start">
          <aside class="hidden lg:block w-72 flex-shrink-0">
            <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
              <div class="bg-gray-200 h-12"></div>
              <div class="p-4 space-y-3">
                <div v-for="n in 5" :key="n" class="h-3 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </aside>
          <div class="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4 animate-pulse">
            <div class="h-6 bg-gray-200 rounded w-1/3"></div>
            <div class="h-3 bg-gray-200 rounded w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
            <div class="h-3 bg-gray-200 rounded w-full"></div>
            <div class="h-3 bg-gray-200 rounded w-4/6"></div>
            <div class="h-3 bg-gray-200 rounded w-full mt-4"></div>
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-24">
          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <p class="text-gray-700 font-semibold text-sm">{{ error }}</p>
          <router-link to="/about"
            class="mt-4 inline-flex items-center gap-1.5 text-[#6CC551] text-sm font-semibold hover:underline">
            ← Back to About
          </router-link>
        </div>

        <template v-else-if="department">

          <!-- Mobile: horizontal scrollable tab strip -->
          <div class="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto">
            <div class="flex gap-2 w-max pb-2">
              <button
                @click="activeId = 'overview'"
                aria-label="View department overview"
                class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                :class="activeId === 'overview'
                  ? 'bg-[#1E2833] text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#6CC551] hover:text-[#6CC551]'"
              >
                Overview
              </button>
              <button
                v-for="unit in department.unit"
                :key="unit.id"
                @click="activeId = unit.id"
                class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                :class="activeId === unit.id
                  ? 'bg-[#1E2833] text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#6CC551] hover:text-[#6CC551]'"
              >
                {{ unit.title }}
              </button>
            </div>
          </div>

          <!-- Desktop: sidebar + content -->
          <div class="flex gap-8 items-start">

            <!-- Sidebar -->
            <aside class="hidden lg:block w-72 flex-shrink-0 sticky top-28">
              <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div class="bg-[#1E2833] px-5 py-4">
                  <p class="text-white text-xs font-bold uppercase tracking-widest">Sections</p>
                </div>
                <ul class="divide-y divide-gray-50">
                  <li>
                    <button
                      @click="activeId = 'overview'"
                      class="w-full flex items-center px-5 py-3.5 text-sm transition-all border-l-4"
                      :class="activeId === 'overview'
                        ? 'bg-[#6CC551]/8 text-[#6CC551] font-semibold border-[#6CC551]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1E2833] border-transparent'"
                    >
                      {{ department.name }} Overview
                    </button>
                  </li>
                  <li v-for="unit in department.unit" :key="unit.id">
                    <button
                      @click="activeId = unit.id"
                      class="w-full flex items-center px-5 py-3.5 text-sm transition-all border-l-4"
                      :class="activeId === unit.id
                        ? 'bg-[#6CC551]/8 text-[#6CC551] font-semibold border-[#6CC551]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1E2833] border-transparent'"
                    >
                      {{ unit.title }}
                    </button>
                  </li>
                </ul>
              </div>

              <!-- Back link -->
              <router-link to="/about"
                class="mt-4 flex items-center gap-2 text-gray-400 text-xs font-semibold hover:text-[#6CC551] transition-colors px-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                All Departments
              </router-link>
            </aside>

            <!-- Content panel -->
            <div class="flex-1 min-w-0">
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <!-- Section title -->
                <div class="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                  <div class="w-1 h-6 bg-[#6CC551] rounded-full flex-shrink-0"></div>
                  <h2 class="text-lg font-bold text-[#1E2833]">{{ activeTitle }}</h2>
                </div>
                <!-- Rich text content -->
                <div
                  v-html="decodeEntities(activeAbout)"
                  class="prose prose-sm max-w-none text-gray-600 leading-relaxed text-left
                    prose-headings:text-[#1E2833] prose-headings:font-bold prose-headings:text-left
                    prose-a:text-[#6CC551] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#1E2833] prose-p:text-left"
                ></div>
              </div>
            </div>
          </div>

        </template>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { url } from '@/functions/endpoint';
import Footer from '@/components/Footer.vue';
import { decodeEntities } from '@/functions';
import { decryptString } from '@/functions/encryption';

interface Unit {
  id: number;
  title: string;
  about: string;
}

interface Department {
  id: number;
  name: string;
  about: string;
  unit: Unit[];
}

const route      = useRoute();
const department = ref<Department | null>(null);
const isLoading  = ref(true);
const error      = ref<string | null>(null);
const activeId   = ref<number | 'overview'>('overview');

const departmentId = computed(() => {
  try {
    return decryptString(route.params.id.toString());
  } catch {
    error.value = 'Invalid department ID';
    return null;
  }
});

const activeTitle = computed(() => {
  if (!department.value) return '';
  if (activeId.value === 'overview') return `${department.value.name} Overview`;
  return department.value.unit.find(u => u.id === activeId.value)?.title ?? '';
});

const activeAbout = computed(() => {
  if (!department.value) return '';
  if (activeId.value === 'overview') return department.value.about;
  return department.value.unit.find(u => u.id === activeId.value)?.about ?? '';
});

const fetchData = async () => {
  if (!departmentId.value) return;
  try {
    isLoading.value = true;
    error.value = null;
    activeId.value = 'overview';
    const response = await axios.get<Department>(`${url}/departments/${parseInt(departmentId.value)}`);
    department.value = response.data;
  } catch {
    error.value = 'Failed to load department information. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);
watch(departmentId, fetchData);
</script>
