<template>
  <div class="p-6 sm:p-8 max-w-2xl mx-auto">

    <div class="mb-8">
      <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Sliders</p>
      <h1 class="text-2xl font-extrabold text-[#1E2833]">Add Slider</h1>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      <!-- Card header -->
      <div class="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-[#1E2833]">Slider Details</p>
          <p class="text-xs text-gray-500">Fill in the information below to add a new slider image</p>
        </div>
      </div>

      <!-- Form body -->
      <div class="p-8 space-y-6">
        <InputField label="Title" id="title" type="text" placeholder="Enter slider title" :isRequired="true"
          v-model="slider.title" />

        <InputField label="Short description" id="description" type="text" placeholder="Enter a short description"
          :isRequired="false" v-model="slider.description" />

        <InputField label="Upload slider image" id="slider-image" type="file" :isRequired="false"
          @change="handleImageChange" />
      </div>

      <!-- Card footer -->
      <div class="px-8 py-5 border-t border-gray-100 bg-gray-50/50">
        <Button :buttonText="'Add Slider'" :isDisabled="slider.title === '' || !slider.image || uploading"
          :uploading="uploading" :handleClick="handleAddSlider" />
      </div>

    </div>
  </div>

  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { url } from "@/functions/endpoint";
import router from "@/router";
import axios from "axios";
import { initTooltips } from "flowbite";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Button from "@/components/Inputs/Button.vue";
import InputField from "@/components/Inputs/InputField.vue";

onMounted(() => {
  initTooltips();
});

let successMessage = ref<string>('');
let showSuccessMessage = ref<boolean>(false);
let errorAlert = ref<boolean>(false);
let errorMessage = ref<string>('');
const route = useRoute();
const isEditing = ref<boolean>(false);
const postId = computed(() => route.params.id);
const uploading = ref(false);

const slider = reactive({
  title: '',
  description: '',
  image: ''
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
      slider.image = response.data.url;
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

const handleAddSlider = async () => {
  uploading.value = true;

  try {
    const sliderData = {
      title: slider.title,
      description: slider.description,
      image: slider.image
    };

    if (slider.image && typeof slider.image !== 'string') {
      const response = await axios.post(`${url}/upload`, { image: slider.image });
      sliderData.image = response.data;
    }

    if (!isEditing.value) {
      await axios.post(`${url}/slider`, sliderData);
    } else {
      await axios.patch(`${url}/slider/update/${postId.value}`, sliderData);
    }

    slider.title = '';
    slider.description = '';
    slider.image = '';
    uploading.value = false;

    setTimeout(() => {
      showSuccessMessage.value = true;
    }, 1000)
    successMessage.value = isEditing.value ? 'Slider updated successfully!' : 'Slider added successfully!';

    setTimeout(() => {
      showSuccessMessage.value = false;

      if (isEditing.value) {
        router.push('/admin/view-sliders');
      } else {
        window.location.href = "add-slider"
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
