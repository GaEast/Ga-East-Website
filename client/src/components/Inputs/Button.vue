<template>
  <div :class="className">
    <button
      @click="handleClick"
      :disabled="isDisabled"
      type="button"
      class="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#6CC551] hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#6CC551]/40 focus:ring-offset-2"
    >
      <svg v-if="uploading" class="w-4 h-4 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {{ uploading ? 'Processing…' : buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { buttonText, isDisabled, uploading, handleClick } = defineProps<{
  buttonText: string;
  isDisabled: boolean;
  uploading: boolean;
  className?: string;
  handleClick: () => void;
}>();
</script>
