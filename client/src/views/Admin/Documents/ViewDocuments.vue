<template>
  <div class="p-6 sm:p-8 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Documents</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">View Documents</h1>
      </div>
      <router-link to="/admin/add-document"
        class="inline-flex items-center gap-2 px-4 py-2 bg-[#6CC551] hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors">
        + Add Document
      </router-link>
    </div>

    <!-- Table card -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5">
      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
      </div>
      <table v-else class="w-full text-sm text-left">
        <thead class="text-xs text-[#1E2833] uppercase bg-[#6CC551]/10 border-b border-gray-100">
          <tr>
            <th class="px-6 py-3">#</th>
            <th class="px-6 py-3">Title</th>
            <th class="px-6 py-3">Download</th>
            <th class="px-6 py-3">Edit</th>
            <th class="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in allDocuments" :key="item.id">
          <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 text-gray-500">{{ calculatePostNumber(index) }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">{{ item?.title?.slice(0, 80) }}</td>
            <td class="px-6 py-4">
              <a target="_blank" :href="item.filename"
                class="text-xs font-semibold text-[#6CC551] hover:underline">Download</a>
            </td>
            <td class="px-6 py-4">
              <button @click="editDocument(item.id)"
                class="text-xs font-semibold text-blue-500 hover:underline">Edit</button>
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

    <Pagination v-if="allDocuments.length > 12" v-model="currentPage" :per-page="perPage" :total-items="count" :layout="'table'" />
  </div>

  <DeleteModal @deletePost="deleteDocument" @closeDeleteModal="closeDeleteModal" :item="'document'" v-if="deleteModal" />
  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { url } from '@/functions/endpoint';
import { encryptString } from '@/functions/encryption';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import { Pagination } from 'flowbite-vue';
import { Posts } from "@/types/index";
import Loader from "@/components/Loader.vue";
import EmptyState from "@/components/EmptyState.vue";
import store from '@/store';

let count = ref(0);
const documentId = ref();
const router = useRouter()
let successMessage = ref('');
let showSuccessMessage = ref(false);
const loading = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');
let emptyState = ref(false);
const perPage = ref(12);
const currentPage = ref(1);

const calculatePostNumber = (index: number) => {
  return (currentPage.value - 1) * perPage.value + index + 1;
};

const editDocument = (documentId: number) => {
  router.push({ name: 'EditDocument', params: { id: encryptString(documentId.toString()) } });
};

const deleteModal = ref(false);
const openDeleteModal = (id: number) => {
  documentId.value = id;
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
};

const deleteDocument = () => {
  axios.delete(`${url}/department-document/delete/${documentId.value}`)
    .then((response) => {
      deleteModal.value = false;
      successMessage = response.data
      showSuccessMessage.value = true;
      const deletedIndex = allDocuments.value.findIndex((item: Posts) => item.id === parseInt(documentId.value));
      if (deletedIndex !== -1) {
        allDocuments.value.splice(deletedIndex, 1);
      }
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 2000)
    })
    .catch((error) => {
      deleteModal.value = false;
      errorAlert.value = true;
      setTimeout(() => {
        errorAlert.value = false;
      }, 2500)
      errorMessage.value = error.message
    });
};

const allDocuments: any = ref([]);
const fetchNewsItems = () => {
  loading.value = true;
  emptyState.value = false;
  axios
    .get(`${url}/department-document`, {
      params: {
        page: currentPage.value,
        limit: perPage.value
      }
    })
    .then((response: any) => {
      allDocuments.value = response.data;
      // count.value = response.data[0].totalLength;
    })
    .catch((error: string) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(currentPage, fetchNewsItems);
fetchNewsItems();
</script>
