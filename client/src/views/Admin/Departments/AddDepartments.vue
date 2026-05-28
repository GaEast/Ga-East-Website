<template>
  <div class="p-6 sm:p-8">

    <div class="mb-6">
      <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Departments</p>
      <h1 class="text-2xl font-extrabold text-[#1E2833]">
        <span v-if="isUnit || editType === 'EditUnit'">{{ isEditing ? "Edit Unit" : "Add Unit" }}</span>
        <span v-else>{{ isEditing ? "Edit Department" : "Add Department" }}</span>
      </h1>
    </div>

    <div class="bg-white rounded-2xl overflow-hidden" style="border: 1px solid #f3f4f6;">

      <!-- Card header -->
      <div class="px-6 py-4 flex items-center gap-3" style="border-bottom: 1px solid #f3f4f6;">
        <div class="w-8 h-8 rounded-lg bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-[#1E2833]">
            {{ isUnit || editType === 'EditUnit' ? 'Unit Details' : 'Department Details' }}
          </p>
          <p class="text-xs" style="color: #6b7280;">
            Fill in the information below to
            {{ isEditing ? 'update the' : 'create a new' }}
            {{ isUnit || editType === 'EditUnit' ? 'unit' : 'department' }}
          </p>
        </div>
      </div>

      <!-- Form body -->
      <div class="p-6 space-y-6">

        <InputField v-if="!isEditing"
          label="Is this a unit? Check to create a unit, uncheck to create a department"
          id="isUnitCheckbox" :value="isUnit" type="checkbox" placeholder="Unit" :isRequired="false"
          @input="isUnit = $event.target.checked" />

        <InputField label="Title" id="title" type="text"
          :placeholder="isUnit ? 'Enter unit title' : 'Enter department title'"
          :isRequired="true" v-model="data.title" />

        <div class="text-left">
          <p class="block mb-2 text-sm font-medium" style="color: #374151;">
            Description <span style="color: #ef4444;">*</span>
          </p>
          <TiptapEditor v-model="data.description" />
        </div>

        <SelectField v-if="isUnit || editType === 'EditUnit'" label="Select department"
          id="departments" placeholder="Select department" v-model="data.department" :options="allDepartments"
          :param="'name'" />

      </div>

      <!-- Card footer -->
      <div class="px-6 py-4 flex items-center gap-3" style="border-top: 1px solid #f3f4f6; background: #f9fafb;">
        <Button v-if="isUnit || editType === 'EditUnit'"
          :buttonText="isEditing ? 'Update Unit' : 'Add Unit'"
          :isDisabled="data.title === '' || data.description === '' || !data.department || uploading"
          :uploading="uploading" :handleClick="handleAddUnit" />

        <Button v-else
          :buttonText="isEditing ? 'Update Department' : 'Add Department'"
          :isDisabled="data.title === '' || data.description === '' || uploading"
          :uploading="uploading" :handleClick="handleAddDepartment" />
      </div>

    </div>
  </div>

  <SuccessMessage :showSuccessMessage="showSuccessMessage" :successMessage="successMessage" />
  <ErrorMessage :errorAlert="errorAlert" :errorMessage="errorMessage" />
</template>

<script setup lang="ts">
import { initTooltips } from "flowbite";
import { onMounted } from "vue";
import { reactive, ref, computed } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Button from "@/components/Inputs/Button.vue";
import InputField from "@/components/Inputs/InputField.vue";
import SelectField from "@/components/Inputs/SelectField.vue";
import TiptapEditor from "@/components/TiptapEditor.vue";
import { url } from '@/functions/endpoint';

const uploading = ref(false);
let successMessage = ref<string>('');
let showSuccessMessage = ref<boolean>(false);
let errorAlert = ref<boolean>(false);
let errorMessage = ref<string>('');
let isUnit = ref<boolean>(false)
const isEditing = ref<boolean>(false);
const route = useRoute();
const postId = computed(() => route.params.id);
const editType = computed(() => route.name);

const router = useRouter();
const data = reactive({
  title: '',
  description: '',
  department: ''
})

onMounted(() => {
  initTooltips();
  getDepartmentDetails();
});

const departmentInfo = ref([]);
const getDepartmentDetails = async () => {
  if (postId.value !== undefined) {
    isEditing.value = true;
    if (isEditing.value) {
      try {
        const response = await axios.get(editType.value === "EditDepartment" ? `${url}/departments/${postId.value}` : `${url}/unit/${postId.value}`);
        const documentData = response.data;
        departmentInfo.value = documentData
        data.title = editType.value === "EditDepartment" ? documentData.name : documentData.title;
        data.description = documentData.about;
        data.department = documentData?.department?.id;
      } catch (error: any) {
        errorAlert.value = true;
        errorMessage.value = error.message
      }
    }
  }
}

const handleAddUnit = async () => {
  try {
    if (!isEditing.value) {
      await axios.post(`${url}/unit`, { title: data.title, about: data.description, departmentId: Number.parseInt(data.department) })
        .then((response) => {
          showSuccessMessage.value = true
          successMessage.value = response.data.message;
        })
    } else {
      await axios.patch(`${url}/unit/update/${postId.value}`, { title: data.title, about: data.description, departmentId: Number.parseInt(data.department) })
        .then((response) => {
          showSuccessMessage.value = true
          successMessage.value = response.data.message;
        })
    }

    setTimeout(() => {
      showSuccessMessage.value = false;

      if (isEditing.value) {
        router.push('/admin/view-departments');
      } else {
        globalThis.location.href = "/admin/add-department"
      }
    }, 1000);
  }
  catch (error: any) {
    errorAlert.value = true;
    errorMessage.value = error.message;
    setTimeout(() => {
      errorAlert.value = false;
    }, 5000)
  }
};

const handleAddDepartment = async () => {
  try {
    if (!isEditing.value) {
      await axios.post(`${url}/departments/create/department`, { name: data.title, about: data.description })
        .then((response) => {
          showSuccessMessage.value = true
          successMessage.value = response.data.message;
        })
    } else {
      await axios.patch(`${url}/departments/update/${postId.value}`, { name: data.title, about: data.description })
        .then((response) => {
          showSuccessMessage.value = true
          successMessage.value = response.data.message;
        })
    }
    setTimeout(() => {
      showSuccessMessage.value = false;

      if (isEditing.value) {
        router.push('/admin/view-departments');
      } else {
        globalThis.location.href = "/admin/add-department"
      }
    }, 1000);
  }
  catch (error: any) {
    errorAlert.value = true;
    errorMessage.value = error.message;
    setTimeout(() => {
      errorAlert.value = false;
    }, 5000)
  }
};

const allDepartments: any = ref([]);
axios.get(`${url}/departments`)
  .then((response: any) => {
    allDepartments.value = response.data;
  })
  .catch((error: string) => {
    console.error(error);
  });

</script>
