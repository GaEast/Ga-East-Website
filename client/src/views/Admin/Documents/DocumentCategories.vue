<template>
  <div class="p-6 sm:p-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Documents</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">Document Categories</h1>
      </div>
      <button @click="openModal = true" type="button"
        class="inline-flex items-center gap-2 px-4 py-2 bg-[#6CC551] hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors">
        + Add Category
      </button>
    </div>

    <CategoryModal v-if="openModal" @closeCategoryModal="openModal = false" @addCategory="handleAddCategory"
      :typeOfCategory="'Add Document Category'" :label="'Document Category'"
      :placeholder="'Enter document category'" />

    <!-- Table card -->
    <div class="bg-white rounded-2xl overflow-hidden" style="border: 1px solid #f3f4f6;">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-[#1E2833] uppercase bg-[#6CC551]/10" style="border-bottom: 1px solid #f3f4f6;">
          <tr>
            <th class="px-6 py-3">#</th>
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">No of Documents</th>
            <th class="px-6 py-3">Edit</th>
            <th class="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in allCategories" :key="category.id"
            class="transition-colors" style="border-bottom: 1px solid #f9fafb;"
            @mouseenter="($event.currentTarget as HTMLElement).style.background='#f9fafb'"
            @mouseleave="($event.currentTarget as HTMLElement).style.background=''">
            <td class="px-6 py-4" style="color: #6b7280;">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-medium" style="color: #111827;">{{ category.category }}</td>
            <td class="px-6 py-4" style="color: #6b7280;">{{ category?.documents?.length ?? 0 }}</td>
            <td class="px-6 py-4">
              <button @click="editDocument(category)"
                class="text-xs font-semibold text-blue-500 hover:underline">Edit</button>
            </td>
            <td class="px-6 py-4">
              <button @click="openDeleteModal(category.id)"
                class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <DeleteModal @deletePost="deleteDocument" @closeDeleteModal="closeDeleteModal" :item="'document category'" v-if="deleteModal" />
  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import CategoryModal from '@/components/CategoryModal.vue';
import { url } from "@/functions/endpoint";
import axios from 'axios';
import { ref } from 'vue';
import DeleteModal from "@/components/DeleteModal.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

const postId = ref();
const openModal = ref(false);
let successMessage = ref('');
let showSuccessMessage = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');

const deleteModal = ref(false);
const openDeleteModal = (id: number) => {
  postId.value = id;
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
};

const deleteDocument = () => {
  axios.delete(`${url}/document-category/delete/${postId.value}`)
    .then((response) => {
      deleteModal.value = false;
      successMessage.value = response.data?.message ?? 'Deleted successfully';
      showSuccessMessage.value = true;

      const deletedIndex = allCategories.value.findIndex((item: any) => item.id === postId.value);
      if (deletedIndex !== -1) allCategories.value.splice(deletedIndex, 1);

      setTimeout(() => { showSuccessMessage.value = false; }, 2000);
    })
    .catch((error) => {
      deleteModal.value = false;
      errorAlert.value = true;
      setTimeout(() => { errorAlert.value = false; }, 2500);
      errorMessage.value = error.message;
    });
};

const editDocument = (category: any) => {
  openModal.value = true;
};

const handleAddCategory = (enteredCategory: string) => {
  axios.post(`${url}/document-category/create/category`, { category: enteredCategory })
    .then(response => {
      openModal.value = false;
      showSuccessMessage.value = true;
      successMessage.value = response.data?.message ?? 'Category added successfully';
      globalThis.location.href = "/admin/document-categories";
      setTimeout(() => { showSuccessMessage.value = false; }, 2000);
    })
    .catch(error => {
      openModal.value = false;
      errorAlert.value = true;
      errorMessage.value = error.message;
      setTimeout(() => { errorAlert.value = false; }, 5000);
    });
};

const allCategories: any = ref([]);
axios.get(`${url}/document-category`)
  .then((response: any) => {
    allCategories.value = response.data;
  })
  .catch((error: string) => {
    console.error(error);
  });
</script>
