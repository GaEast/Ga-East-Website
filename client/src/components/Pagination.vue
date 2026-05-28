<template>
  <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 pb-2">

    <!-- Entry count -->
    <p class="text-xs" style="color: #6b7280;">
      Showing
      <span class="font-semibold" style="color: #111827;">{{ from }}</span>
      –
      <span class="font-semibold" style="color: #111827;">{{ to }}</span>
      of
      <span class="font-semibold" style="color: #111827;">{{ totalItems }}</span>
      entries
    </p>

    <!-- Page buttons -->
    <div class="flex items-center gap-1">

      <!-- Prev -->
      <button
        :disabled="modelValue <= 1"
        @click="emit('update:modelValue', modelValue - 1)"
        class="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
        :style="modelValue <= 1
          ? 'background:#f3f4f6; color:#9ca3af; cursor:not-allowed; border:1px solid #f3f4f6;'
          : 'background:#fff; color:#374151; cursor:pointer; border:1px solid #e5e7eb;'">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </button>

      <!-- Page numbers -->
      <template v-for="p in pageRange" :key="p">
        <span v-if="p === '...'" class="px-2 text-xs" style="color: #9ca3af;">…</span>
        <button
          v-else
          @click="emit('update:modelValue', p as number)"
          class="min-w-[2rem] h-8 text-xs font-medium rounded-lg transition-colors"
          :style="p === modelValue
            ? 'background:#6CC551; color:#fff; border:1px solid #6CC551; cursor:default;'
            : 'background:#fff; color:#374151; border:1px solid #e5e7eb; cursor:pointer;'">
          {{ p }}
        </button>
      </template>

      <!-- Next -->
      <button
        :disabled="modelValue >= totalPages"
        @click="emit('update:modelValue', modelValue + 1)"
        class="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
        :style="modelValue >= totalPages
          ? 'background:#f3f4f6; color:#9ca3af; cursor:not-allowed; border:1px solid #f3f4f6;'
          : 'background:#fff; color:#374151; cursor:pointer; border:1px solid #e5e7eb;'">
        Next
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number;
  perPage: number;
  totalItems: number;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', page: number): void }>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));

const from = computed(() => Math.min((props.modelValue - 1) * props.perPage + 1, props.totalItems));
const to   = computed(() => Math.min(props.modelValue * props.perPage, props.totalItems));

const pageRange = computed<(number | '...')[]>(() => {
  const total = totalPages.value;
  const cur   = props.modelValue;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (cur > 3) pages.push('...');

  const start = Math.max(2, cur - 1);
  const end   = Math.min(total - 1, cur + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (cur < total - 2) pages.push('...');
  pages.push(total);

  return pages;
});
</script>
