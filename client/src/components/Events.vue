<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section header -->
      <div class="text-center mb-12">
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">What's Happening</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2833] uppercase tracking-wide">
          Municipal Events
        </h2>
        <div class="mt-3 mx-auto w-16 h-1 bg-[#6CC551] rounded-full"></div>
        <p class="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
          Stay updated with the latest events and announcements from Ga East Municipal Assembly.
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-10">
        <div class="inline-flex bg-white rounded-xl shadow-sm border border-gray-100 p-1 gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            :class="activeTab === tab.key
              ? 'bg-[#1E2833] text-white shadow-sm'
              : 'text-gray-500 hover:text-[#1E2833]'"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Events layout (Upcoming / Past) -->
      <template v-if="activeTab !== 'Notice'">

        <!-- Skeleton -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="n in 3" :key="n" class="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
            <div class="h-44 bg-gray-200"></div>
            <div class="p-5 space-y-3">
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
              <div class="h-4 bg-gray-200 rounded w-4/5"></div>
              <div class="h-4 bg-gray-200 rounded w-3/5"></div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="activeEvents.length === 0" class="text-center py-20">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-gray-500 font-medium">No {{ activeTab.toLowerCase() }} events at the moment.</p>
          <p class="text-gray-400 text-sm mt-1">Check back later for updates.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="event in activeEvents"
            :key="event.id"
            class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col"
          >
            <!-- Image with date badge -->
            <div class="relative h-44 overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                :src="appendBaseURL(event.image)"
                :alt="event.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute top-3 left-3 bg-white rounded-lg shadow-md px-2.5 py-1.5 text-center min-w-[48px]">
                <p class="text-[#6CC551] text-lg font-extrabold leading-none">
                  {{ moment(event.eventDate ?? event.createdAt).format("DD") }}
                </p>
                <p class="text-[#1E2833] text-xs font-bold uppercase">
                  {{ moment(event.eventDate ?? event.createdAt).format("MMM") }}
                </p>
              </div>
            </div>

            <!-- Body -->
            <div class="p-5 flex flex-col flex-1 text-left">
              <p class="text-gray-400 text-xs font-medium mb-1.5">
                {{ moment(event.eventDate ?? event.createdAt).format("dddd, MMMM D, YYYY") }}
              </p>
              <h3 class="text-[#1E2833] font-bold text-sm leading-snug line-clamp-2 group-hover:text-[#6CC551] transition-colors">
                {{ event.title }}
              </h3>
            </div>

            <!-- Footer bar -->
            <div class="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <span class="text-xs font-semibold text-[#6CC551] uppercase tracking-wide">
                {{ activeTab === 'Upcoming' ? 'Upcoming' : 'Past Event' }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- Notices layout -->
      <template v-else>

        <!-- Skeleton -->
        <div v-if="loading" class="max-w-3xl mx-auto space-y-3">
          <div v-for="n in 4" :key="n" class="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 animate-pulse">
            <div class="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>

        <div v-else-if="activeEvents.length === 0" class="text-center py-20">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p class="text-gray-500 font-medium">No notices at the moment.</p>
          <p class="text-gray-400 text-sm mt-1">Check back later for updates.</p>
        </div>

        <div v-else class="max-w-3xl mx-auto space-y-3">
          <div
            v-for="notice in activeEvents"
            :key="notice.id"
            class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6CC551]/30 transition-all duration-200 p-5 flex items-start gap-4 group"
          >
            <!-- Icon -->
            <div class="w-10 h-10 rounded-lg bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#6CC551] transition-colors">
              <svg class="w-5 h-5 text-[#6CC551] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 class="text-[#1E2833] font-bold text-sm leading-snug group-hover:text-[#6CC551] transition-colors">
                {{ notice.title }}
              </h3>
              <p class="text-gray-400 text-xs mt-1">
                {{ moment(notice.createdAt).format("dddd, MMMM D, YYYY") }}
              </p>
            </div>
          </div>
        </div>
      </template>

    </div>
  </section>
</template>

<script setup lang="ts">
import { url } from "@/functions/endpoint";
import axios from "axios";
import { onMounted, ref, computed, h } from "vue";
import moment from "moment";
import { appendBaseURL } from "@/functions";
import type { Event } from "@/types/event";

const UPCOMING_EVENTS = ref<Event[]>([]);
const PAST_EVENTS     = ref<Event[]>([]);
const NOTICES         = ref<Event[]>([]);
const activeTab       = ref<"Upcoming" | "Past" | "Notice">("Upcoming");
const loading         = ref(true);

const CalendarIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }),
  ]);

const ClockIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }),
  ]);

const BellIcon = () =>
  h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2",
      d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }),
  ]);

const tabs = [
  { key: "Upcoming" as const, label: "Upcoming Events", icon: CalendarIcon },
  { key: "Past"     as const, label: "Past Events",     icon: ClockIcon    },
  { key: "Notice"   as const, label: "Notices",         icon: BellIcon     },
];

onMounted(async () => {
  loading.value = true;
  const [upcoming, past, notices] = await Promise.allSettled([
    axios.get<Event[]>(`${url}/events/upevents`),
    axios.get<Event[]>(`${url}/events/pastevents`),
    axios.get<Event[]>(`${url}/events/notices`),
  ]);
  UPCOMING_EVENTS.value = upcoming.status === "fulfilled" ? upcoming.value.data ?? [] : [];
  PAST_EVENTS.value     = past.status    === "fulfilled" ? past.value.data    ?? [] : [];
  NOTICES.value         = notices.status === "fulfilled" ? notices.value.data ?? [] : [];
  loading.value = false;
});

const activeEvents = computed<Event[]>(() => {
  if (activeTab.value === "Upcoming") return UPCOMING_EVENTS.value;
  if (activeTab.value === "Past")     return PAST_EVENTS.value;
  return NOTICES.value;
});
</script>
