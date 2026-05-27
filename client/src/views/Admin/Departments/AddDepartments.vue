<template>
  <div class="p-6 sm:p-8 max-w-2xl mx-auto">

    <div class="mb-8">
      <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Departments</p>
      <h1 class="text-2xl font-extrabold text-[#1E2833]">
        <span v-if="isUnit || editType === 'EditUnit'">{{ isEditing ? "Edit Unit" : "Add Unit" }}</span>
        <span v-else>{{ isEditing ? "Edit Department" : "Add Department" }}</span>
      </h1>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      <!-- Card header -->
      <div class="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-[#1E2833]">
            {{ isUnit || editType === 'EditUnit' ? 'Unit Details' : 'Department Details' }}
          </p>
          <p class="text-xs text-gray-500">
            Fill in the information below to
            {{ isEditing ? 'update the' : 'create a new' }}
            {{ isUnit || editType === 'EditUnit' ? 'unit' : 'department' }}
          </p>
        </div>
      </div>

      <!-- Form body -->
      <div class="p-8 space-y-6">

        <InputField v-if="!isEditing"
          label="Is this a unit? Check to create a unit, uncheck to create a department"
          id="isUnitCheckbox" :value="isUnit" type="checkbox" placeholder="Unit" :isRequired="false"
          @input="isUnit = $event.target.checked" />

        <InputField label="Title" id="title" type="text"
          :placeholder="isUnit ? 'Enter unit title' : 'Enter department title'"
          :isRequired="true" v-model="data.title" />

        <div class="text-left">
          <label class="block mb-1.5 text-xs font-semibold text-gray-600">Description <span class="text-red-400">*</span></label>
          <div class="h-64">
            <QuillEditor contentType="html" theme="snow" v-model:content="data.description" />
          </div>
        </div>

        <SelectField v-if="isUnit || editType === 'EditUnit'" class="mt-20" label="Select department"
          id="departments" placeholder="Select department" v-model="data.department" :options="allDepartments"
          :param="'name'" />

      </div>

      <!-- Card footer -->
      <div class="px-8 py-5 border-t border-gray-100 bg-gray-50/50">
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
import { QuillEditor } from '@vueup/vue-quill';
import { reactive, ref, computed } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Button from "@/components/Inputs/Button.vue";
import InputField from "@/components/Inputs/InputField.vue";
import SelectField from "@/components/Inputs/SelectField.vue";
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
console.log(editType, 'edit');

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

const handleChecked = () => {
  isUnit.value = !isUnit.value;
}

const departmentInfo = ref([]);
const getDepartmentDetails = async () => {
  if (postId.value !== undefined) {
    isEditing.value = true;
    if (isEditing.value) {
      try {
        const response = await axios.get( editType.value === "EditDepartment" ? `${url}/departments/${postId.value}` : `${url}/unit/${postId.value}`);
        const documentData = response.data;
        departmentInfo.value = documentData
        data.title = editType.value === "EditDepartment" ? documentData.name : documentData.title;
        data.description = documentData.about;
        data.department = documentData?.department?.id;
      } catch (error: any) {
        errorAlert.value = true;
        errorMessage.value = error.message
      }
    } else {
      console.log('creating');
    }
  }
}

const handleAddUnit = async () => {
  try {
    if (!isEditing.value) {
      await axios.post(`${url}/unit`, { title: data.title, about: data.description, departmentId: parseInt(data.department) })
        .then((response) => {
          showSuccessMessage.value = true
          successMessage.value = response.data.message;
        })
    } else {
      await axios.patch(`${url}/unit/update/${postId.value}`, { title: data.title, about: data.description, departmentId: parseInt(data.department) })
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
        window.location.href = "/admin/add-department"
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
      await axios.post(`${url}/departments/create/department`, { name: data.title, about: data.description, })
        .then((response) => {
          showSuccessMessage.value = true
          successMessage.value = response.data.message;
        })
    } else {
      await axios.patch(`${url}/departments/update/${postId.value}`, { name: data.title, about: data.description, })
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
        window.location.href = "/admin/add-department"
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
    console.error(allDepartments.value);
  })
  .catch((error: string) => {
    console.error(error);
  });

</script>
