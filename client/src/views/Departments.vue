<template>
  <div>

    <!-- Page Hero -->
    <div class="bg-white border-b border-gray-100 py-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <router-link to="/departments" class="hover:text-[#6CC551] transition-colors">Departments</router-link>
          <svg v-if="department" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span v-if="department" class="text-[#6CC551]">{{ department.name }}</span>
        </div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2 text-center">Our Departments</p>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1E2833] uppercase tracking-wide text-center">
          {{ department?.name ?? 'Department' }}
        </h1>
        <div class="mt-3 w-12 h-1 bg-[#6CC551] rounded-full mx-auto"></div>
        <p class="mt-3 text-gray-500 text-sm max-w-2xl leading-relaxed text-center mx-auto">
          Learn about this department's mandate, responsibilities, and its supporting units.
        </p>
      </div>
    </div>

    <!-- Main content -->
    <section class="py-10 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Loading -->
        <div v-if="isLoading" class="flex justify-center py-24">
          <div class="flex flex-col items-center gap-4">
            <div class="w-10 h-10 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
            <p class="text-gray-400 text-sm">Loading department…</p>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-24">
          <p class="text-red-500 font-medium text-sm">{{ error }}</p>
        </div>

        <template v-else-if="department">

          <!-- Mobile: horizontal scrollable tab strip -->
          <div class="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto">
            <div class="flex gap-2 w-max pb-2">
              <button
                @click="activeId = 'overview'"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
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
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
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
                  <!-- Overview item -->
                  <li>
                    <button
                      @click="activeId = 'overview'"
                      class="w-full flex items-center justify-between px-5 py-3.5 text-sm transition-all border-l-4"
                      :class="activeId === 'overview'
                        ? 'bg-[#6CC551]/8 text-[#6CC551] font-semibold border-[#6CC551]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1E2833] border-transparent'"
                    >
                      <span class="text-left">{{ department.name }} Overview</span>
                    </button>
                  </li>
                  <!-- Unit items -->
                  <li v-for="unit in department.unit" :key="unit.id">
                    <button
                      @click="activeId = unit.id"
                      class="w-full flex items-center justify-between px-5 py-3.5 text-sm transition-all border-l-4"
                      :class="activeId === unit.id
                        ? 'bg-[#6CC551]/8 text-[#6CC551] font-semibold border-[#6CC551]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1E2833] border-transparent'"
                    >
                      <span class="text-left">{{ unit.title }}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </aside>

            <!-- Content panel -->
            <div class="flex-1 min-w-0">

              <!-- Panel header -->
              <div class="mb-5">
                <h2 class="text-xl font-bold text-[#1E2833]">{{ activeTitle }}</h2>
                <p class="text-gray-400 text-xs mt-0.5 capitalize">
                  {{ activeId === 'overview' ? 'Department overview' : 'Departmental unit' }}
                </p>
              </div>

              <!-- Content -->
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
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
  if (activeId.value === 'overview') return department.value.name;
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
