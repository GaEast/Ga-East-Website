<template>
  <div class="p-6 sm:p-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Engagement</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">Post Comments</h1>
      </div>
      <div v-if="comments.length" class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
        {{ comments.length }} total
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="!comments.length" class="bg-white rounded-2xl py-16 text-center"
      style="border: 1px dashed #e5e7eb;">
      <svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        style="color: #d1d5db;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <p class="text-sm" style="color: #9ca3af;">No comments yet.</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-2xl overflow-hidden" style="border: 1px solid #f3f4f6;">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-[#1E2833] uppercase bg-[#6CC551]/10" style="border-bottom: 1px solid #f3f4f6;">
          <tr>
            <th class="px-5 py-3">From</th>
            <th class="px-5 py-3">Post</th>
            <th class="px-5 py-3">Comment</th>
            <th class="px-5 py-3">Type</th>
            <th class="px-5 py-3">Date</th>
            <th class="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in comments"
            :key="c.id"
            class="transition-colors"
            style="border-bottom: 1px solid #f9fafb;"
            @mouseenter="($event.currentTarget as HTMLElement).style.background='#f9fafb'"
            @mouseleave="($event.currentTarget as HTMLElement).style.background=''">
            <td class="px-5 py-4">
              <p class="font-medium" style="color: #111827;">{{ c.user?.name ?? '—' }}</p>
              <p class="text-xs" style="color: #9ca3af;">{{ c.user?.email ?? '' }}</p>
            </td>
            <td class="px-5 py-4 max-w-[180px]">
              <p class="truncate text-xs font-medium" style="color: #374151;" :title="c.post?.title">
                {{ c.post?.title ?? '—' }}
              </p>
            </td>
            <td class="px-5 py-4 max-w-xs">
              <p class="truncate text-xs" style="color: #6b7280;" :title="c.message">{{ c.message }}</p>
            </td>
            <td class="px-5 py-4">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                :style="c.replyTo
                  ? 'background: rgba(108,197,81,0.12); color: #6CC551;'
                  : 'background: #f3f4f6; color: #6b7280;'">
                {{ c.replyTo ? 'Reply' : 'Comment' }}
              </span>
            </td>
            <td class="px-5 py-4 whitespace-nowrap text-xs" style="color: #9ca3af;">{{ formatDate(c.createdAt) }}</td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <button @click="selected = c" class="text-xs font-semibold text-[#6CC551] hover:underline">View</button>
                <button @click="deleteComment(c.id)" class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail modal -->
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
        @click.self="selected = null">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

          <!-- Modal header -->
          <div class="flex items-start justify-between px-6 py-5" style="border-bottom: 1px solid #f3f4f6;">
            <div class="min-w-0 pr-4">
              <p class="text-xs mb-0.5" style="color: #9ca3af;">{{ formatDate(selected.createdAt) }}</p>
              <p class="text-sm font-bold text-[#1E2833] leading-snug truncate">{{ selected.post?.title ?? 'Unknown post' }}</p>
              <p class="text-sm text-[#6CC551] mt-0.5">{{ selected.user?.name ?? 'Anonymous' }}
                <span v-if="selected.user?.email" class="text-xs font-normal" style="color: #9ca3af;">
                  · {{ selected.user.email }}
                </span>
              </p>
              <span v-if="selected.replyTo"
                class="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                style="background: rgba(108,197,81,0.12); color: #6CC551;">
                Reply
              </span>
            </div>
            <button @click="selected = null" style="color: #9ca3af; flex-shrink: 0;"
              @mouseenter="($event.currentTarget as HTMLElement).style.color='#4b5563'"
              @mouseleave="($event.currentTarget as HTMLElement).style.color='#9ca3af'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="px-6 py-5">
            <p class="text-sm leading-relaxed whitespace-pre-wrap" style="color: #374151;">{{ selected.message }}</p>
          </div>

          <!-- Modal footer -->
          <div class="px-6 py-4 flex items-center justify-end gap-3"
            style="background: #f9fafb; border-top: 1px solid #f3f4f6;">
            <button
              @click="deleteComment(selected.id); selected = null"
              class="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              Delete
            </button>
            <button @click="selected = null"
              class="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
              Close
            </button>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { url } from '@/functions/endpoint';
import { authService } from '@/services/auth';

interface CommentUser {
  id: number;
  name: string;
  email: string;
}

interface CommentPost {
  id: number;
  title: string;
}

interface Comment {
  id: number;
  message: string;
  createdAt: string;
  user: CommentUser | null;
  post: CommentPost | null;
  replyTo: { id: number } | null;
}

const comments = ref<Comment[]>([]);
const loading  = ref(true);
const selected = ref<Comment | null>(null);

const headers = () => ({ Authorization: authService.getToken() ?? '' });

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const fetchComments = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${url}/comment`, { headers: headers() });
    comments.value = res.data;
  } finally {
    loading.value = false;
  }
};

const deleteComment = async (id: number) => {
  if (!confirm('Delete this comment?')) return;
  try {
    await axios.delete(`${url}/comment/${id}`, { headers: headers() });
    comments.value = comments.value.filter((c) => c.id !== id);
  } catch {}
};

onMounted(fetchComments);
</script>
