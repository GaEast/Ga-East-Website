<template>
  <div class="p-6 sm:p-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Sliders</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">View Sliders</h1>
      </div>
      <router-link to="/admin/add-slider"
        class="inline-flex items-center gap-2 px-4 py-2 bg-[#6CC551] hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors">
        + Add Slider
      </router-link>
    </div>

    <!-- Table card -->
    <div class="bg-white rounded-2xl overflow-hidden mb-5" style="border: 1px solid #f3f4f6;">
      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
      </div>
      <table v-else class="w-full text-sm text-left">
        <thead class="text-xs text-[#1E2833] uppercase bg-[#6CC551]/10" style="border-bottom: 1px solid #f3f4f6;">
          <tr>
            <th class="px-6 py-3">#</th>
            <th class="px-6 py-3">Title</th>
            <th class="px-6 py-3">View Slider</th>
            <th class="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in allSliders" :key="item.id"
            class="transition-colors" style="border-bottom: 1px solid #f9fafb;"
            @mouseenter="($event.currentTarget as HTMLElement).style.background='#f9fafb'"
            @mouseleave="($event.currentTarget as HTMLElement).style.background=''">
            <td class="px-6 py-4" style="color: #6b7280;">{{ calculatePostNumber(index) }}</td>
            <td class="px-6 py-4 font-medium" style="color: #111827;">{{ item?.title?.slice(0, 80) }}</td>
            <td class="px-6 py-4">
              <a target="_blank" :href="`${imagesUrl}/uploads/${item.image}`"
                class="text-xs font-semibold text-[#6CC551] hover:underline">View Slider</a>
            </td>
            <td class="px-6 py-4">
              <button @click="openDeleteModal(item.id)"
                class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <EmptyState :showEmptyState="emptyState" />
    </div>

    <Pagination v-model="currentPage" :per-page="perPage" :total-items="count" />
  </div>

  <DeleteModal @deletePost="deleteSlider" @closeDeleteModal="closeDeleteModal" :item="'slider'" v-if="deleteModal" />
  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { url, imagesUrl } from '@/functions/endpoint';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import DeleteModal from "@/components/DeleteModal.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import EmptyState from "@/components/EmptyState.vue";
import Pagination from '@/components/Pagination.vue';

let count = ref(0);
const sliderId = ref();
const router = useRouter();
let successMessage = ref('');
let showSuccessMessage = ref(false);
const loading = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');
const perPage = ref(12);
const currentPage = ref(1);
let emptyState = ref(false);

const calculatePostNumber = (index: number) => {
  return (currentPage.value - 1) * perPage.value + index + 1;
};

const deleteModal = ref(false);
const openDeleteModal = (id: number) => {
  sliderId.value = id;
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
};

const deleteSlider = async () => {
  try {
    const response = await axios.delete(`${url}/slider/delete/${sliderId.value}`);

    deleteModal.value = false;
    successMessage.value = response.data?.message ?? 'Deleted successfully';
    showSuccessMessage.value = true;

    const deletedIndex = allSliders.value.findIndex((item: any) => item.id === sliderId.value);
    if (deletedIndex !== -1) allSliders.value.splice(deletedIndex, 1);
    if (allSliders.value.length === 0) emptyState.value = true;

    setTimeout(() => { showSuccessMessage.value = false; }, 2000);
  } catch (error: any) {
    deleteModal.value = false;
    errorAlert.value = true;
    errorMessage.value = error.message;
    setTimeout(() => { errorAlert.value = false; }, 2500);
  }
};

const allSliders: any = ref([]);

const fetchNewsItems = () => {
  loading.value = true;
  emptyState.value = false;

  axios.get(`${url}/slider`, { params: { page: currentPage.value, limit: perPage.value } })
    .then((response: any) => {
      const data = response.data;
      if (Array.isArray(data[1])) {
        allSliders.value = data[1];
      } else {
        allSliders.value = Array.isArray(data) ? data : [];
      }
      count.value = data[0]?.totalLength ?? allSliders.value.length;
      emptyState.value = allSliders.value.length === 0;
    })
    .catch((error: any) => {
      console.error(error);
      allSliders.value = [];
      emptyState.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(currentPage, fetchNewsItems);
fetchNewsItems();
</script>
