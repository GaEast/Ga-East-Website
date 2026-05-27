<template>
  <div class="text-left" :class="className">
    <label :for="id" class="block mb-1.5 text-xs font-semibold text-gray-600">{{ label }}</label>
    <select
      :id="id"
      class="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option :value="option.id" v-for="option in options" :key="option.id">{{ option[param] }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  placeholder?: string;
  modelValue: any;
  param: string;
  selectClasses?: string;
  options: Array<{ id: any; [key: string]: any }>;
  className?: string;
}>();

defineEmits(['update:modelValue']);
</script>
