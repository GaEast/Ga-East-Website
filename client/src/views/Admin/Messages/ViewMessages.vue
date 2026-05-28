<template>
  <div class="p-6 sm:p-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-1">Inbox</p>
        <h1 class="text-2xl font-extrabold text-[#1E2833]">Contact Messages</h1>
      </div>
      <div v-if="unreadCount" class="px-3 py-1 bg-[#6CC551] text-white text-xs font-bold rounded-full">
        {{ unreadCount }} unread
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 rounded-full border-4 border-[#6CC551] border-t-transparent animate-spin"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="!messages.length" class="bg-white rounded-2xl py-16 text-center"
      style="border: 1px dashed #e5e7eb;">
      <svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        style="color: #d1d5db;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <p class="text-sm" style="color: #9ca3af;">No messages yet.</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-2xl overflow-hidden" style="border: 1px solid #f3f4f6;">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-[#1E2833] uppercase bg-[#6CC551]/10" style="border-bottom: 1px solid #f3f4f6;">
          <tr>
            <th class="px-5 py-3">Status</th>
            <th class="px-5 py-3">From</th>
            <th class="px-5 py-3">Subject</th>
            <th class="px-5 py-3">Date</th>
            <th class="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="msg in messages"
            :key="msg.id"
            class="transition-colors"
            :style="!msg.isRead ? 'background: rgba(108,197,81,0.05); border-bottom: 1px solid #f9fafb;' : 'border-bottom: 1px solid #f9fafb;'"
            @mouseenter="($event.currentTarget as HTMLElement).style.background='#f9fafb'"
            @mouseleave="($event.currentTarget as HTMLElement).style.background = !msg.isRead ? 'rgba(108,197,81,0.05)' : ''">
            <td class="px-5 py-4">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                :style="msg.isRead
                  ? 'background: #f3f4f6; color: #6b7280;'
                  : 'background: rgba(108,197,81,0.15); color: #6CC551;'">
                {{ msg.isRead ? 'Read' : 'New' }}
              </span>
            </td>
            <td class="px-5 py-4 font-medium" style="color: #374151;">{{ msg.email }}</td>
            <td class="px-5 py-4 max-w-xs truncate" style="color: #6b7280;">{{ msg.subject }}</td>
            <td class="px-5 py-4 whitespace-nowrap" style="color: #9ca3af;">{{ formatDate(msg.createdAt) }}</td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <button @click="openMessage(msg)"
                  class="text-xs font-semibold text-[#6CC551] hover:underline">View</button>
                <button @click="deleteMessage(msg.id)"
                  class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message modal -->
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" @click.self="selected = null">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

          <!-- Modal header -->
          <div class="flex items-start justify-between px-6 py-5" style="border-bottom: 1px solid #f3f4f6;">
            <div class="min-w-0 pr-4">
              <p class="text-xs mb-0.5" style="color: #9ca3af;">{{ formatDate(selected.createdAt) }}</p>
              <h2 class="text-base font-bold text-[#1E2833] leading-snug">{{ selected.subject }}</h2>
              <p class="text-sm text-[#6CC551] mt-1">{{ selected.email }}</p>
            </div>
            <button @click="selected = null" class="flex-shrink-0 transition-colors"
              style="color: #9ca3af;"
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
          <div class="px-6 py-4 flex items-center justify-between gap-3"
            style="background: #f9fafb; border-top: 1px solid #f3f4f6;">
            <a
              :href="`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`"
              class="flex items-center gap-1.5 px-4 py-2 bg-[#6CC551] text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Reply via Email
            </a>
            <button
              @click="deleteMessage(selected.id); selected = null"
              class="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">Delete</button>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { url } from '@/functions/endpoint';
import { authService } from '@/services/auth';

interface Message {
  id: number;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const messages = ref<Message[]>([]);
const loading  = ref(true);
const selected = ref<Message | null>(null);

const unreadCount = computed(() => messages.value.filter((m) => !m.isRead).length);

const headers = () => ({ Authorization: authService.getToken() ?? '' });

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const fetchMessages = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${url}/contact-message`, { headers: headers() });
    messages.value = res.data;
  } finally {
    loading.value = false;
  }
};

const openMessage = async (msg: Message) => {
  selected.value = msg;
  if (!msg.isRead) {
    try {
      await axios.patch(`${url}/contact-message/${msg.id}/read`, {}, { headers: headers() });
      msg.isRead = true;
    } catch {}
  }
};

const deleteMessage = async (id: number) => {
  if (!confirm('Delete this message?')) return;
  try {
    await axios.delete(`${url}/contact-message/${id}`, { headers: headers() });
    messages.value = messages.value.filter((m) => m.id !== id);
  } catch {}
};

onMounted(fetchMessages);
</script>
