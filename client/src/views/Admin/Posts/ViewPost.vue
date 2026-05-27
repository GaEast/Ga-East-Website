<template>
  <div class="p-6 sm:p-8 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Content</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">View Posts</h1>
      </div>
      <router-link to="/admin/new-post"
        class="inline-flex items-center gap-2 px-4 py-2 bg-[#6CC551] hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors">
        + New Post
      </router-link>
    </div>

    <!-- Filter -->
    <div class="mb-5">
      <label for="category-filter" class="block mb-1.5 text-xs font-semibold text-gray-600">Filter by category</label>
      <select id="category-filter" v-model="category" @change="fetchNewsItems"
        class="w-56 px-4 py-2.5 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors">
        <option disabled>Select Category</option>
        <option>NEWS</option>
        <option>GALLERY</option>
        <option>UPCOMING EVENTS</option>
        <option>PAST EVENTS</option>
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
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">Live View</th>
            <th class="px-6 py-3">Edit</th>
            <th class="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in allNews" :key="item.id">
          <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 text-gray-500">{{ calculatePostNumber(index) }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">{{ item.title?.slice(0, 80) }}</td>
            <td class="px-6 py-4">
              <span class="px-2.5 py-0.5 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold rounded-full uppercase">
                {{ category === 'UPCOMING EVENTS' ? 'UPCOMING EVENTS' : category === 'PAST EVENTS' ? 'PAST EVENTS' : item?.category }}
              </span>
            </td>
            <td class="px-6 py-4">
              <a target="_blank" :href="`http://localhost:8080/single-post/${item.id}`"
                class="text-xs font-semibold text-[#6CC551] hover:underline">Live View</a>
            </td>
            <td class="px-6 py-4">
              <button @click="editPost(item.id)" class="text-xs font-semibold text-blue-500 hover:underline">Edit</button>
            </td>
            <td class="px-6 py-4">
              <button @click="openDeleteModal(item.id)" class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <EmptyState :showEmptyState="emptyState" />
    </div>

    <Pagination v-model="currentPage" :per-page="perPage" :total-items="count" :layout="'table'" />
  </div>

  <DeleteModal @deletePost="deletePost" @closeDeleteModal="closeDeleteModal" v-if="deleteModal" />
  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import DeleteModal from "@/components/DeleteModal.vue";
import { Pagination } from 'flowbite-vue';
import Loader from "@/components/Loader.vue";
import { url } from "@/functions/endpoint";
import { encryptString } from '@/functions/encryption';
import axios from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import EmptyState from "@/components/EmptyState.vue";
import { Posts } from "@/types/index";
import store from "@/store";


let count = ref(0);
const postId = ref();
const router = useRouter()
let successMessage = ref('');
let showSuccessMessage = ref(false);
const loading = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');
let emptyState = ref(false);
let emptyStateMessage = ref('');
const perPage = ref(12);
const currentPage = ref(1);
const category = ref<string>("NEWS")

const calculatePostNumber = (index: number) => {
  return (currentPage.value - 1) * perPage.value + index + 1;
};

const editPost = (postId: string) => {
  router.push({ name: 'EditPost', params: { id: encryptString(postId.toString()) } });
}

const deleteModal = ref(false);
const openDeleteModal = (id: number) => {
  postId.value = id;
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
};

const deletePost = () => {
  const categoryEndpoint = category.value === 'NEWS' || category.value === 'GALLERY' ? 'posts' : 'events';
  const apiUrl = `${url}/${categoryEndpoint}/delete/${postId.value}`;

  axios.delete(apiUrl)
    .then((response) => {
      deleteModal.value = false;
      successMessage = response.data;
      showSuccessMessage.value = true;

      const deletedIndex = allNews.value.findIndex((item: Posts) => item.id === postId.value);
      if (deletedIndex !== -1) {
        allNews.value.splice(deletedIndex, 1);
      }

      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 2000);
    })
    .catch((error) => {
      deleteModal.value = false;
      errorAlert.value = true;
      setTimeout(() => {
        errorAlert.value = false;
      }, 2500);
      errorMessage.value = error.message;
    });
};


const allNews: any = ref([]);
const fetchNewsItems = () => {
  loading.value = true;
  emptyState.value = false;
  let apiEndpoint = '';

  switch (category.value) {
    case 'NEWS':
      apiEndpoint = `${url}/posts`;
      break;
    case 'GALLERY':
      apiEndpoint = `${url}/posts`;
      break;
    case 'UPCOMING EVENTS':
      apiEndpoint = `${url}/events/upevents`;
      break;
    case 'PAST EVENTS':
      apiEndpoint = `${url}/events/pastevents`;
      break;
    default:
      console.error('Invalid category');
      loading.value = false;
      return;
  }

  const params = {
    page: currentPage.value,
    limit: perPage.value,
  };

  // Only add the 'category' parameter for NEWS and GALLERY
  if (category.value === 'NEWS' || category.value === 'GALLERY') {
    params.category = category.value;
  }

  axios
    .get(apiEndpoint, { params })
    .then((response) => {
      if (category.value === 'NEWS' || category.value === 'GALLERY') {
        allNews.value = response.data[1];
        count.value = response.data[0].totalLength;
        store.state.numberOfPosts = count.value;
      } else {
        allNews.value = response.data;
        count.value = response.data.totalLength;
      }
      if (!allNews.value) {
        emptyState.value = true;
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(currentPage, fetchNewsItems);
fetchNewsItems();
</script>
