<template>
  <div class="p-6 sm:p-8 max-w-2xl mx-auto">

    <div class="mb-8">
      <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Documents</p>
      <h1 class="text-2xl font-extrabold text-[#1E2833]">{{ isEditing ? "Update Document" : "Add Document" }}</h1>
    </div>

    <div v-if="isEditing && documentInfo.length === 0" class="flex justify-center py-20">
      <div class="w-8 h-8 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      <!-- Card header -->
      <div class="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-[#1E2833]">Document Details</p>
          <p class="text-xs text-gray-500">Fill in the information below to {{ isEditing ? 'update the' : 'upload a new' }} document</p>
        </div>
      </div>

      <!-- Form body -->
      <div class="p-8 space-y-6">
        <InputField label="Title" id="title" type="text" placeholder="Enter document title" :isRequired="true"
          v-model="createDocumentData.title" />

        <SelectField label="Category" id="categories" placeholder="Select category"
          v-model="createDocumentData.category" :options="allCategories" :param="'category'" />

        <InputField label="Upload document" id="doc-file" type="file" :isRequired="false"
          @change="handleImageChange" />
      </div>

      <!-- Card footer -->
      <div class="px-8 py-5 border-t border-gray-100 bg-gray-50/50">
        <Button :buttonText="isEditing ? 'Update Document' : 'Publish Document'"
          :isDisabled="createDocumentData.title === '' || !createDocumentData.image || createDocumentData.category === '' || uploading"
          :uploading="uploading" :handleClick="saveDocument" />
      </div>

    </div>
  </div>

  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { url } from "@/functions/endpoint";
import { decryptString } from '@/functions/encryption';
import axios from "axios";
import { initTooltips } from "flowbite";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Loader from "@/components/Loader.vue";
import Button from "@/components/Inputs/Button.vue"
import InputField from "@/components/Inputs/InputField.vue";
import SelectField from "@/components/Inputs/SelectField.vue";

onMounted(() => {
  initTooltips();
  getDocumentDetails();
});


const documentInfo = ref([]);
const getDocumentDetails = async () => {
  if (documentId.value !== undefined) {
    isEditing.value = true;
    if (isEditing.value) {
      try {
        const response = await axios.get(`${url}/department-document/${parseInt(documentId.value)}`);
        const documentData = response.data;
        documentInfo.value = documentData;
        createDocumentData.title = documentData.title;
        createDocumentData.image = documentData.image;
        createDocumentData.category = documentData.category;
      } catch (error: any) {
        errorAlert.value = true;
        errorMessage.value = error.message;
      }
    } else {
      console.log('creating');
    }
  }
}

let isEditing = ref(false);
const route = useRoute();
const documentId = computed(() => decryptString(route.params.id.toString()));
const router = useRouter();

const uploading = ref(false);
let successMessage = ref('');
let showSuccessMessage = ref(false);
let errorAlert = ref(false);
let errorMessage = ref('');

const createDocumentData = reactive({
  title: "",
  image: null,
  category: ""
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
      createDocumentData.image = response.data.url;
      uploading.value = false;
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 1000)
      successMessage.value = isEditing.value ? 'New document uploaded successfully!' : 'Document uploaded successfully!';
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


const saveDocument = async () => {
  uploading.value = true;

  try {
    const documentData = {
      title: createDocumentData.title,
      categoryId: parseInt(createDocumentData.category),
      filename: createDocumentData.image
    };

    if (createDocumentData.image && typeof createDocumentData.image !== 'string') {
      const response = await axios.post(`${url}/upload`, { image: createDocumentData.image });
      documentData.filename = response.data;
    }

    if (!isEditing.value) {
      await axios.post(`${url}/department-document`, documentData);
    } else {
      await axios.patch(`${url}/department-document/update/${parseInt(documentId.value)}`, documentData);
    }

    createDocumentData.title = '';
    createDocumentData.image = null;
    createDocumentData.category = '';
    uploading.value = false;
    showSuccessMessage.value = true;
    successMessage.value = isEditing.value ? 'Document updated successfully!' : 'Document created successfully!';

    setTimeout(() => {
      showSuccessMessage.value = false;

      if (isEditing.value) {
        router.push('/admin/view-documents');
      } else {
        window.location.href = "add-document";
      }
    }, 2000);

  } catch (error: any) {
    uploading.value = false;
    errorAlert.value = true;
    setTimeout(() => {
      errorAlert.value = false;
    }, 1500)
    errorMessage.value = error.message;
  }
};

const allCategories: any = ref([]);
axios.get(`${url}/document-category`)
  .then((response: any) => {
    allCategories.value = response.data;
    console.error(allCategories.value);
  })
  .catch((error: string) => {
    console.error(error);
  });

</script>
