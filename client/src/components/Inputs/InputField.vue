<template>
  <div>
    <!-- Checkbox variant -->
    <div v-if="type === 'checkbox'" class="flex items-start gap-3" :class="className">
      <input
        v-bind="$attrs"
        :id="id"
        type="checkbox"
        class="mt-0.5 w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#6CC551]"
        :required="isRequired"
      />
      <label :for="id" class="text-xs font-medium text-gray-700 leading-relaxed cursor-pointer">{{ label }}</label>
    </div>

    <!-- File upload variant -->
    <div v-else-if="type === 'file'" class="text-left" :class="className">
      <p class="block mb-1.5 text-xs font-semibold text-gray-600">{{ label }}</p>
      <label :for="id"
        class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#6CC551]/60 hover:bg-[#6CC551]/5 transition-colors group">
        <div class="flex flex-col items-center gap-1.5 pointer-events-none">
          <svg class="w-7 h-7 text-gray-300 group-hover:text-[#6CC551] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p class="text-xs font-semibold text-gray-400 group-hover:text-[#6CC551] transition-colors">Click to upload</p>
          <p class="text-[10px] text-gray-400">Any supported file format</p>
        </div>
        <input v-bind="$attrs" :id="id" type="file" class="hidden" :required="isRequired" />
      </label>
    </div>

    <!-- Default: text, date, number, etc. -->
    <div v-else class="text-left" :class="className">
      <label :for="id" class="block mb-1.5 text-xs font-semibold text-gray-600">
        {{ label }}<span v-if="isRequired" class="text-red-400 ml-0.5">*</span>
      </label>
      <input
        v-bind="$attrs"
        :type="type"
        :id="id"
        class="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors placeholder:text-gray-400"
        :placeholder="placeholder"
        :required="isRequired"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  modelValue?: any;
  className?: string;
}>();

defineEmits(['update:modelValue']);
</script>
