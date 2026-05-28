<template>
  <div class="p-6 sm:p-8">

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
      <label for="category-filter" class="block mb-1.5 text-xs font-semibold" style="color: #4b5563;">Filter by category</label>
      <select id="category-filter" v-model="category" @change="onCategoryChange"
        class="w-64 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors"
        style="background: #fff; border: 1px solid #e5e7eb; color: #111827;">
        <option value="NEWS">News</option>
        <option value="GALLERY">Gallery</option>
        <option value="EVENTS">Events</option>
        <option value="ONGOING PROJECT">Ongoing Projects</option>
        <option value="FINISHED PROJECT">Finished Projects</option>
        <option value="UPCOMING PROJECT">Upcoming Projects</option>
        <option value="UPCOMING EVENTS">Upcoming Events</option>
        <option value="PAST EVENTS">Past Events</option>
      </select>
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
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">Live View</th>
            <th class="px-6 py-3">Edit</th>
            <th class="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in allNews" :key="item.id">
          <tr class="transition-colors" style="border-bottom: 1px solid #f9fafb;"
            @mouseenter="($event.currentTarget as HTMLElement).style.background='#f9fafb'"
            @mouseleave="($event.currentTarget as HTMLElement).style.background=''">
            <td class="px-6 py-4" style="color: #6b7280;">{{ calculatePostNumber(index) }}</td>
            <td class="px-6 py-4 font-medium" style="color: #111827;">{{ item.title?.slice(0, 80) }}</td>
            <td class="px-6 py-4">
              <span class="px-2.5 py-0.5 bg-[#6CC551]/10 text-[#6CC551] text-xs font-bold rounded-full uppercase">
                {{ categoryLabel }}
              </span>
            </td>
            <td class="px-6 py-4">
              <a target="_blank" :href="`/single-post/${encryptString(item.id.toString())}`"
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

    <Pagination v-model="currentPage" :per-page="perPage" :total-items="count" />
  </div>

  <DeleteModal @deletePost="deletePost" @closeDeleteModal="closeDeleteModal" v-if="deleteModal" />
  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import DeleteModal from "@/components/DeleteModal.vue";
import Pagination from "@/components/Pagination.vue";
import { url } from "@/functions/endpoint";
import { encryptString } from '@/functions/encryption';
import axios from "axios";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import EmptyState from "@/components/EmptyState.vue";
import { Posts } from "@/types/index";
import store from "@/store";

const EVENT_CATEGORIES = new Set(['UPCOMING EVENTS', 'PAST EVENTS']);

let count = ref(0);
const postId = ref();
const router = useRouter();
let successMessage = ref('');
let showSuccessMessage = ref(false);
const loading = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');
let emptyState = ref(false);
const perPage = ref(12);
const currentPage = ref(1);
const category = ref<string>('NEWS');

const categoryLabel = computed(() => {
  const labels: Record<string, string> = {
    'UPCOMING EVENTS': 'Upcoming Events',
    'PAST EVENTS': 'Past Events',
    'ONGOING PROJECT': 'Ongoing Project',
    'FINISHED PROJECT': 'Finished Project',
    'UPCOMING PROJECT': 'Upcoming Project',
  };
  return labels[category.value] ?? category.value;
});

const calculatePostNumber = (index: number) => {
  return (currentPage.value - 1) * perPage.value + index + 1;
};

const editPost = (id: string) => {
  router.push({ name: 'EditPost', params: { id: encryptString(id.toString()) } });
};

const deleteModal = ref(false);
const openDeleteModal = (id: number) => {
  postId.value = id;
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
};

const deletePost = () => {
  const isEvent = EVENT_CATEGORIES.has(category.value);
  const categoryEndpoint = isEvent ? 'events' : 'posts';
  const apiUrl = `${url}/${categoryEndpoint}/delete/${postId.value}`;

  axios.delete(apiUrl)
    .then((response) => {
      deleteModal.value = false;
      successMessage.value = response.data?.message ?? 'Deleted successfully';
      showSuccessMessage.value = true;

      const deletedIndex = allNews.value.findIndex((item: Posts) => item.id === postId.value);
      if (deletedIndex !== -1) allNews.value.splice(deletedIndex, 1);
      if (allNews.value.length === 0) emptyState.value = true;

      setTimeout(() => { showSuccessMessage.value = false; }, 2000);
    })
    .catch((error) => {
      deleteModal.value = false;
      errorAlert.value = true;
      setTimeout(() => { errorAlert.value = false; }, 2500);
      errorMessage.value = error.message;
    });
};

const allNews = ref<any[]>([]);

const fetchNewsItems = () => {
  loading.value = true;
  emptyState.value = false;

  const isEvent = EVENT_CATEGORIES.has(category.value);

  let apiEndpoint = '';
  if (category.value === 'UPCOMING EVENTS') {
    apiEndpoint = `${url}/events/upevents`;
  } else if (category.value === 'PAST EVENTS') {
    apiEndpoint = `${url}/events/pastevents`;
  } else {
    apiEndpoint = `${url}/posts`;
  }

  const params: Record<string, any> = {
    page: currentPage.value,
    limit: perPage.value,
  };

  if (isEvent) {
    // no category param for event endpoints
  } else {
    params.category = category.value;
  }

  axios.get(apiEndpoint, { params })
    .then((response) => {
      if (isEvent) {
        const data = response.data;
        allNews.value = Array.isArray(data) ? data : (data.items ?? data.data ?? []);
        count.value = data.total ?? data.totalLength ?? allNews.value.length;
      } else {
        const data = response.data;
        allNews.value = Array.isArray(data[1]) ? data[1] : [];
        count.value = data[0]?.totalLength ?? 0;
        store.state.numberOfPosts = count.value;
      }
      emptyState.value = allNews.value.length === 0;
    })
    .catch((error) => {
      console.error(error);
      allNews.value = [];
      emptyState.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};

const onCategoryChange = () => {
  currentPage.value = 1;
  fetchNewsItems();
};

watch(currentPage, fetchNewsItems);
fetchNewsItems();
</script>
