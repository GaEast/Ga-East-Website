<template>
  <div class="p-6 sm:p-8 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Departments</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">View Departments</h1>
      </div>
      <router-link to="/admin/add-department"
        class="inline-flex items-center gap-2 px-4 py-2 bg-[#6CC551] hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors">
        + Add Department
      </router-link>
    </div>

    <!-- Filter -->
    <div class="mb-5">
      <label for="dept-filter" class="block mb-1.5 text-xs font-semibold text-gray-600">Filter by type</label>
      <select id="dept-filter" v-model="category" @change="fetchNewsItems"
        class="w-56 px-4 py-2.5 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors">
        <option disabled>Select Category</option>
        <option>DEPARTMENTS</option>
        <option>UNITS</option>
      </select>
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
            <th v-if="category === 'UNITS'" class="px-6 py-3">Department</th>
            <th class="px-6 py-3">Edit</th>
            <th class="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in allDepartments" :key="item.id"
            class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 text-gray-500">{{ calculatePostNumber(index) }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">
              {{ category === "DEPARTMENTS" ? item?.name?.slice(0, 80) : item?.title?.slice(0, 80) }}
            </td>
            <td v-if="category === 'UNITS'" class="px-6 py-4 text-gray-600">{{ item?.departmentId }}</td>
            <td class="px-6 py-4">
              <button @click="editDepartment(item.id)"
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

    <Pagination v-model="currentPage" :per-page="perPage" :total-items="count" :layout="'table'" />
  </div>

  <DeleteModal @deletePost="deleteDocument" @closeDeleteModal="closeDeleteModal" :item="'department'" v-if="deleteModal" />
  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Pagination } from 'flowbite-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { url } from '@/functions/endpoint';
import { decodeEntities } from "@/functions";
import DeleteModal from "@/components/DeleteModal.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Loader from "@/components/Loader.vue";
import EmptyState from "@/components/EmptyState.vue";
import { Posts } from '@/types';

let count = ref(0);
const postId = ref();
const router = useRouter()
let successMessage = ref('');
let showSuccessMessage = ref(false);
const loading = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');
let emptyState = ref(false);
const perPage = ref(12);
const currentPage = ref(1);
const category = ref<string>("DEPARTMENTS")

const calculatePostNumber = (index: number) => {
  return (currentPage.value - 1) * perPage.value + index + 1;
};

const editDepartment = (departmentId: number) => {
  category.value === 'DEPARTMENTS' ? router.push({ name: 'EditDepartment', params: { id: departmentId } }) : router.push({ name: 'EditUnit', params: { id: departmentId } });
};

const deleteModal = ref(false);
const openDeleteModal = (id: number) => {
  postId.value = id;
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
};

const deleteDocument = async () => {
  try {
    const response = await axios.delete(
      category.value === 'DEPARTMENTS'
        ? `${url}/departments/delete/${postId.value}`
        : `${url}/unit/delete/${postId.value}`
    );

    deleteModal.value = false;
    successMessage = response.data;
    showSuccessMessage.value = true;

    const deletedIndex = allDepartments.value.findIndex((item: any) => item.id === postId.value);
    if (deletedIndex !== -1) {
      allDepartments.value.splice(deletedIndex, 1);
    }

    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 2000);
  } catch (error: any) {
    deleteModal.value = false;
    errorAlert.value = true;
    errorMessage.value = error.message;

    setTimeout(() => {
      errorAlert.value = false;
    }, 2500);
  }
};


const allDepartments: any = ref([]);
const fetchNewsItems = () => {
  loading.value = true;
  emptyState.value = false;
  category.value === 'DEPARTMENTS' ?
  axios
    .get(`${url}/departments`, {
      params: {
        page: currentPage.value,
        limit: perPage.value
      }
    })
    .then((response: any) => {
      allDepartments.value = response.data;
      count.value = response.data?.length;
    })
    .catch((error: string) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    }) : axios
    .get(`${url}/unit`, {
      params: {
        page: currentPage.value,
        limit: perPage.value
      }
    })
    .then((response: any) => {
      allDepartments.value = response.data[1];
      count.value = response.data[0].totalLength;
    })
    .catch((error: string) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    })
};

watch(currentPage, fetchNewsItems);
fetchNewsItems();
</script>
