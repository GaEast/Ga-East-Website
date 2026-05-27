<template>
  <div>

    <!-- Page Hero -->
    <div class="bg-white border-b border-gray-100 py-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#6CC551]">Documents</span>
        </div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Public Records</p>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1E2833] uppercase tracking-wide">
          Documents
        </h1>
        <div class="mt-3 w-12 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-3 text-gray-500 text-sm max-w-2xl leading-relaxed text-center mx-auto">
          Browse and download official documents, reports, and publications from the Ga East Municipal Assembly.
        </p>
      </div>
    </div>

    <!-- Main content -->
    <section class="py-10 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-24">
          <div class="flex flex-col items-center gap-4">
            <div class="w-10 h-10 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
            <p class="text-gray-400 text-sm">Loading documents…</p>
          </div>
        </div>

        <template v-else>

          <!-- Mobile: horizontal scrollable tab strip -->
          <div class="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto">
            <div class="flex gap-2 w-max pb-2">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="activeId = cat.id"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                :class="activeId === cat.id
                  ? 'bg-[#1E2833] text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#6CC551] hover:text-[#6CC551]'"
              >
                {{ cat.category }}
                <span
                  class="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  :class="activeId === cat.id ? 'bg-[#6CC551] text-white' : 'bg-gray-100 text-gray-500'"
                >
                  {{ cat.documents?.length ?? 0 }}
                </span>
              </button>
            </div>
          </div>

          <!-- Desktop: sidebar + content -->
          <div class="flex gap-8 items-start">

            <!-- Sidebar -->
            <aside class="hidden lg:block w-72 flex-shrink-0 sticky top-28">
              <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div class="bg-[#1E2833] px-5 py-4">
                  <p class="text-white text-xs font-bold uppercase tracking-widest">Categories</p>
                </div>
                <ul class="divide-y divide-gray-50">
                  <li v-for="cat in categories" :key="cat.id">
                    <button
                      @click="activeId = cat.id"
                      class="w-full flex items-center justify-between px-5 py-3.5 text-sm transition-all border-l-4"
                      :class="activeId === cat.id
                        ? 'bg-[#6CC551]/8 text-[#6CC551] font-semibold border-[#6CC551]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1E2833] border-transparent'"
                    >
                      <span class="text-left">{{ cat.category }}</span>
                      <span
                        class="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ml-2"
                        :class="activeId === cat.id ? 'bg-[#6CC551] text-white' : 'bg-gray-100 text-gray-400'"
                      >
                        {{ cat.documents?.length ?? 0 }}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </aside>

            <!-- Document panel -->
            <div class="flex-1 min-w-0">

              <!-- Panel header -->
              <div class="mb-5">
                <h2 class="text-xl font-bold text-[#1E2833]">{{ activeCategory?.category }}</h2>
                <p class="text-gray-400 text-xs mt-0.5">
                  {{ activeCategory?.documents?.length ?? 0 }}
                  {{ (activeCategory?.documents?.length ?? 0) === 1 ? 'document' : 'documents' }}
                </p>
              </div>

              <!-- Empty state -->
              <div
                v-if="!activeCategory?.documents?.length"
                class="bg-white rounded-2xl border border-gray-100 py-20 text-center"
              >
                <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p class="text-gray-500 font-medium text-sm">No documents in this category yet.</p>
                <p class="text-gray-400 text-xs mt-1">Check back later for updates.</p>
              </div>

              <!-- Document list -->
              <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  v-for="doc in activeCategory.documents"
                  :key="doc.id"
                  :href="doc.filename"
                  target="_blank"
                  rel="noreferrer"
                  class="group bg-white rounded-xl border border-gray-100 hover:border-[#6CC551]/40 hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4"
                >
                  <!-- File type badge -->
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs tracking-wide"
                    :class="fileType(doc.filename).bg"
                  >
                    {{ fileType(doc.filename).label }}
                  </div>

                  <!-- Title + meta -->
                  <div class="flex-1 min-w-0">
                    <p class="text-[#1E2833] text-sm font-semibold group-hover:text-[#6CC551] transition-colors capitalize leading-snug truncate">
                      {{ doc.title }}
                    </p>
                    <p class="text-gray-400 text-xs mt-0.5">
                      {{ fileType(doc.filename).label }} &nbsp;·&nbsp; Click to open
                    </p>
                  </div>

                  <!-- Open button -->
                  <span class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 group-hover:bg-[#6CC551] text-gray-500 group-hover:text-white text-xs font-semibold rounded-lg transition-all">
                    Open
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { url } from "@/functions/endpoint";
import Footer from "@/components/Footer.vue";

interface Document {
  id: number;
  title: string;
  filename: string;
}

interface Category {
  id: number;
  category: string;
  documents: Document[];
}

const fileType = (filename: string) => {
  const ext = (filename ?? '').split('.').pop()?.toLowerCase() ?? '';
  if (ext === 'pdf')                               return { label: 'PDF', bg: 'bg-rose-100 text-rose-600' };
  if (['doc', 'docx'].includes(ext))               return { label: 'DOC', bg: 'bg-blue-100 text-blue-600' };
  if (['xls', 'xlsx'].includes(ext))               return { label: 'XLS', bg: 'bg-emerald-100 text-emerald-600' };
  if (['ppt', 'pptx'].includes(ext))               return { label: 'PPT', bg: 'bg-orange-100 text-orange-600' };
  if (['zip', 'rar', '7z'].includes(ext))          return { label: 'ZIP', bg: 'bg-purple-100 text-purple-600' };
  if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return { label: 'IMG', bg: 'bg-pink-100 text-pink-600' };
  return { label: ext.toUpperCase() || 'FILE',     bg: 'bg-gray-100 text-gray-500' };
};

const categories = ref<Category[]>([]);
const activeId   = ref<number | null>(null);
const loading    = ref(true);

const activeCategory = computed<Category | undefined>(
  () => categories.value.find(c => c.id === activeId.value)
);

onMounted(() => {
  axios.get<Category[]>(`${url}/document-category`)
    .then(r => {
      categories.value = r.data;
      if (r.data.length > 0) activeId.value = r.data[0].id;
    })
    .catch(console.error)
    .finally(() => { loading.value = false; });
});
</script>
