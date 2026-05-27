<template>
  <div class="p-6 sm:p-8 max-w-5xl">

    <!-- Header -->
    <div class="mb-8">
      <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Overview</p>
      <h1 class="text-2xl font-extrabold text-[#1E2833]">Dashboard</h1>
      <p class="text-gray-400 text-sm mt-1">{{ today }}</p>
    </div>

    <!-- Stat cards — skeleton while loading -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <div v-for="i in 3" :key="i" class="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="relative rounded-2xl p-6 overflow-hidden shadow-sm"
        :class="stat.dark ? 'bg-[#1E2833]' : 'bg-[#6CC551]'"
      >
        <!-- Watermark -->
        <div class="absolute -bottom-3 -right-3 opacity-10">
          <component :is="stat.icon" class="w-20 h-20 text-white" />
        </div>
        <div class="relative z-10">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            :class="stat.dark ? 'bg-white/10' : 'bg-white/20'">
            <component :is="stat.icon" class="w-5 h-5 text-white" />
          </div>
          <p class="text-4xl font-extrabold text-white">{{ stat.value }}</p>
          <p class="mt-1 text-xs font-bold uppercase tracking-widest"
            :class="stat.dark ? 'text-[#6CC551]' : 'text-white/80'">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-6">{{ errorMessage }}</p>

    <!-- Quick Actions -->
    <div>
      <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-4">Quick Actions</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <router-link
          v-for="action in quickActions"
          :key="action.label"
          :to="action.to"
          class="group bg-white border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-md rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-200"
        >
          <div class="w-10 h-10 rounded-xl bg-[#6CC551]/10 group-hover:bg-[#6CC551] flex items-center justify-center transition-colors duration-200">
            <component :is="action.icon" class="w-5 h-5 text-[#6CC551] group-hover:text-white transition-colors duration-200" />
          </div>
          <span class="text-xs font-semibold text-[#1E2833] group-hover:text-[#6CC551] transition-colors">
            {{ action.label }}
          </span>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import axios from "axios";
import { url } from "@/functions/endpoint";

const isLoading    = ref(true);
const errorMessage = ref("");
const today = new Date().toLocaleDateString("en-GB", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});

// ——— Icons ———
const FileIcon = () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }),
]);

const FolderIcon = () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
    d: "M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" }),
]);

const PhotoIcon = () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }),
]);

const PencilIcon = () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }),
]);

const PlusDocIcon = () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
    d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }),
]);

const ImagePlusIcon = () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 4v16m8-8H4" }),
]);

const BuildingIcon = () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }),
]);

// ——— Stats ———
const stats = ref([
  { label: "Total Posts",   value: "—", icon: FileIcon,   dark: false },
  { label: "Documents",     value: "—", icon: FolderIcon, dark: true  },
  { label: "Slider Images", value: "—", icon: PhotoIcon,  dark: false },
]);

// ——— Quick Actions ———
const quickActions = [
  { label: "New Post",       to: "/admin/new-post",        icon: PencilIcon    },
  { label: "Add Document",   to: "/admin/add-document",    icon: PlusDocIcon   },
  { label: "Add Slider",     to: "/admin/add-slider",      icon: ImagePlusIcon },
  { label: "Add Department", to: "/admin/add-department",  icon: BuildingIcon  },
];

const fetchStats = async () => {
  try {
    const [docsRes, postsRes, slidersRes] = await Promise.all([
      axios.get(`${url}/document-category`),
      axios.get(`${url}/posts`),
      axios.get(`${url}/slider`),
    ]);
    stats.value[0].value = (postsRes.data[0]?.totalLength    ?? postsRes.data[1]?.length    ?? 0).toString();
    stats.value[1].value = (docsRes.data?.length ?? 0).toString();
    stats.value[2].value = (slidersRes.data[0]?.totalLength  ?? slidersRes.data[1]?.length  ?? 0).toString();
  } catch {
    errorMessage.value = "Failed to load stats.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchStats);
</script>
