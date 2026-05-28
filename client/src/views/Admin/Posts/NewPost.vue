<template>
  <div class="p-6 sm:p-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Content</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">{{ isEditing ? "Edit Post" : "New Post" }}</h1>
      </div>
    </div>

    <div v-if="isEditing && postInfo.length === 0" class="flex justify-center py-20">
      <div class="w-8 h-8 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
    </div>

    <div v-else class="bg-white rounded-2xl overflow-hidden" style="border: 1px solid #f3f4f6;">

      <!-- Card header -->
      <div class="px-6 py-4 flex items-center justify-between" style="border-bottom: 1px solid #f3f4f6;">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span class="text-sm font-semibold text-[#1E2833]">{{ isEditing ? 'Edit Post' : 'New Post' }}</span>
        </div>
      </div>

      <!-- Form body -->
      <div class="p-6 space-y-6">

        <!-- Top metadata grid -->
        <div class="grid md:grid-cols-2 gap-5">
          <div class="md:col-span-2">
            <InputField label="Title" id="title" type="text" placeholder="Enter post title" :isRequired="true"
              v-model="createPostData.title" />
          </div>

          <div class="text-left">
            <label for="post-category" class="block mb-2 text-sm font-medium" style="color: #374151;">Category</label>
            <select id="post-category" v-model="createPostData.category"
              class="w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors"
              style="background: #fff; border: 1px solid #e5e7eb; color: #111827;">
              <option disabled>Select Category</option>
              <option>NEWS</option>
              <option>GALLERY</option>
              <option>EVENTS</option>
              <option>ONGOING PROJECT</option>
              <option>FINISHED PROJECT</option>
              <option>UPCOMING PROJECT</option>
            </select>
          </div>

          <InputField v-if="createPostData.category === 'EVENTS'" label="Event date" id="event-date" type="date"
            placeholder="Enter event date" :isRequired="true" v-model="createPostData.eventDate" />

          <div class="md:col-span-2 text-left">
            <p class="block mb-2 text-sm font-medium" style="color: #374151;">Cover Image</p>

            <!-- Current image preview (edit mode) -->
            <div v-if="isEditing && createPostData.image" class="mb-3 relative inline-block">
              <img :src="createPostData.image" alt="Current cover"
                class="h-36 w-auto rounded-lg object-cover" style="border: 1px solid #e5e7eb;" />
              <span class="absolute top-1.5 left-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full text-white"
                style="background: rgba(0,0,0,0.5);">Current image</span>
            </div>

            <!-- Upload new image -->
            <label for="post-image"
              class="flex flex-col items-center justify-center w-full h-28 rounded-lg cursor-pointer transition-colors group"
              style="border: 2px dashed #e5e7eb;">
              <div class="flex flex-col items-center gap-1.5 pointer-events-none">
                <svg class="w-7 h-7 transition-colors group-hover:text-[#6CC551]" style="color: #d1d5db;"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-xs font-semibold transition-colors group-hover:text-[#6CC551]" style="color: #6b7280;">
                  {{ isEditing && createPostData.image ? 'Click to replace image' : 'Click to upload' }}
                </p>
                <p class="text-[10px]" style="color: #6b7280;">JPG, PNG, WEBP, GIF supported</p>
              </div>
              <input id="post-image" type="file" class="hidden" accept="image/*" @change="handleImageChange" />
            </label>
          </div>
        </div>

        <!-- Full-width content editor -->
        <div class="text-left">
          <p class="block mb-2 text-sm font-medium" style="color: #374151;">Content <span style="color: #ef4444;">*</span></p>
          <TiptapEditor v-model="createPostData.article" />
        </div>

      </div>

      <!-- Card footer -->
      <div class="px-6 py-4 flex items-center gap-3" style="border-top: 1px solid #f3f4f6; background: #f9fafb;">
        <Button :buttonText="isEditing ? 'Update Post' : 'Publish Post'"
          :isDisabled="createPostData.title === '' || createPostData.article === '' || !createPostData.image || createPostData.category === '' || uploading"
          :uploading="uploading" :handleClick="savePost" />
      </div>

    </div>
  </div>

  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { initTooltips } from "flowbite";
import { computed, onMounted, reactive, ref } from "vue";
import axios from 'axios';
import { decodeEntities } from "@/functions";
import { decryptString } from '@/functions/encryption';
import { url } from "@/functions/endpoint";
import { useRoute, useRouter } from "vue-router";
import Loader from "@/components/Loader.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Button from "@/components/Inputs/Button.vue"
import InputField from "@/components/Inputs/InputField.vue";
import TiptapEditor from "@/components/TiptapEditor.vue";

onMounted(() => {
  initTooltips();

  getPostDetails()
});

const postInfo = ref([]);

const getPostDetails = async () => {
  if (postId.value !== undefined) {
    isEditing.value = true;
    if (isEditing.value) {
      try {
        const response = await axios.get(`${url}/posts/${parseInt(postId.value)}`);
        const postData = response.data;
        postInfo.value = postData
        createPostData.title = postData.title;
        createPostData.article = decodeEntities(postData.article);
        createPostData.image = postData.image;
        createPostData.category = postData.category.toUpperCase();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('creating');
    }
  }
}

const isEditing = ref(false)
const route = useRoute();
const postId = computed(() => decryptString(route.params.id.toString()));
const router = useRouter();

const uploading = ref(false);
let successMessage = ref('');
let showSuccessMessage = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');

const createPostData = reactive({
  title: "",
  article: "",
  image: null,
  category: "NEWS",
  eventDate: ""
});

const handleImageChange = async (event: any) => {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      uploading.value = true;
      showSuccessMessage.value = true;
      const response = await axios.post(`${url}/upload`, formData);
      createPostData.image = response.data.url;
      uploading.value = false;
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 1000)
      successMessage.value = isEditing.value ? 'New image uploaded successfully!' : 'Image uploaded successfully!';
    } catch (error: any) {
      uploading.value = false;
      errorAlert.value = true;
      setTimeout(() => {
        errorAlert.value = false;
      }, 1500)
      errorMessage.value = error?.message;
    }
  }
};


const savePost = async () => {
  uploading.value = true;

  try {
    const postData = {
      title: createPostData.title,
      article: createPostData.article,
      category: createPostData.category,
      image: createPostData.image
    };

    const eventPostData = {
      title: createPostData.title,
      article: createPostData.article,
      image: createPostData.image,
      eventDate: createPostData.eventDate
    };

    if (createPostData.image && typeof createPostData.image !== 'string') {
      const response = await axios.post(`${url}/upload`, { image: createPostData.image });
      postData.image = response.data;
    }

    const methodName = isEditing.value ? "patch" : "post";

    const endpoint = isEditing.value
      ? createPostData.category === "EVENTS"
        ? `${url}/events/update/eventt`
        : `${url}/posts/update/${parseInt(postId.value)}`
      : createPostData.category === "EVENTS"
        ? `${url}/events/create/event`
        : `${url}/posts/create/post`;

    await axios[methodName](endpoint, createPostData.category === "EVENTS" ? eventPostData : postData);

    createPostData.title = '';
    createPostData.article = '';
    createPostData.image = null;
    createPostData.category = '';
    uploading.value = false;
    setTimeout(() => {
      showSuccessMessage.value = true;
    }, 1000)
    successMessage.value = isEditing.value ? 'Post updated successfully!' : 'Post created successfully!';

    setTimeout(() => {
      showSuccessMessage.value = false;

      if (isEditing.value) {
        router.push('/admin/view-posts');
      } else {
        window.location.href = "new-post"
      }
    }, 2000);

  } catch (error: any) {
    uploading.value = false;
    setTimeout(() => {
      errorAlert.value = true;
    }, 1500)
    errorMessage.value = error.message;
  }
};
</script>
