<template>
  <div class="p-6 sm:p-8 max-w-3xl">

    <!-- Header -->
    <div class="mb-8">
      <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Content</p>
      <h1 class="text-2xl font-extrabold text-[#1E2833]">{{ isEditing ? "Edit Post" : "New Post" }}</h1>
    </div>

    <div v-if="isEditing && postInfo.length === 0" class="flex justify-center py-20">
      <div class="w-8 h-8 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">

      <InputField label="Title" id="title" type="text" placeholder="Enter post title" :isRequired="true"
        v-model="createPostData.title" />

      <div class="text-left">
        <label class="block mb-2 text-xs font-semibold text-gray-600">Description</label>
        <div class="h-64">
          <QuillEditor v-model:content="createPostData.article" contentType="html" theme="snow" />
        </div>
      </div>

      <div class="text-left mt-16">
        <label for="post-category" class="block mb-1.5 text-xs font-semibold text-gray-600">Category</label>
        <select id="post-category" v-model="createPostData.category"
          class="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors">
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

      <InputField label="Upload image" id="post-image" type="file" placeholder="" :isRequired="false"
        @change="handleImageChange"
        inputClasses="'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'" />

      <Button :buttonText="isEditing ? 'Update Post' : 'Publish Post'"
        :isDisabled="createPostData.title === '' || createPostData.article === '' || !createPostData.image || createPostData.category === '' || uploading"
        :uploading="uploading" :handleClick="savePost" />

    </div>
  </div>

  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { initTooltips } from "flowbite";
import { QuillEditor } from '@vueup/vue-quill';
import "@vueup/vue-quill/dist/vue-quill.snow.css";
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
      // FIX: set only the URL, not the whole response object
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
