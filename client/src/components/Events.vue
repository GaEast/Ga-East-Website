<template>
  <section class="lg:w-3/4 md:w-3/4 mt-20 mx-auto sm:px-6 lg:px-4">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Municipal Events
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Stay updated with the latest events and announcements from Ga East Municipal Assembly
      </p>
    </div>

    <!-- Enhanced Tabs -->
    <div class="relative mb-12">
      <div class="text-sm font-medium text-center">
        <!-- Button Group for Larger Screens -->
        <div class="hidden sm:flex justify-center space-x-6 p-4">
          <button
            v-for="tab in ['Upcoming', 'Past', 'Notice']"
            :key="tab"
            @click="switchTab(tab as 'Upcoming' | 'Past' | 'Notice')"
            :class="{
              'bg-button-bg text-white font-bold shadow-lg transform scale-105': activeTab === tab,
              'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600': activeTab !== tab,
            }"
            class="px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <div class="flex items-center space-x-2">
              <span v-if="tab === 'Upcoming'" class="material-icons text-xl"></span>
              <span v-if="tab === 'Past'" class="material-icons text-xl"></span>
              <span v-if="tab === 'Notice'" class="material-icons text-xl"></span>
              {{ tab === 'Notice' ? 'Notice' : tab + ' Events' }}
            </div>
          </button>
        </div>

        <!-- Enhanced Dropdown for Smaller Screens -->
        <div class="sm:hidden relative mx-4">
          <select
            v-model="activeTab"
            @change="switchTab(activeTab)"
            class="block w-full p-4 text-lg border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
          >
            <option v-for="tab in ['Upcoming', 'Past', 'Notice']" :key="tab" :value="tab">
              {{ tab === 'Notice' ? 'Notice' : tab + ' Events' }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Enhanced Events Content -->
    <div class="grid pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      <!-- Main Event with enhanced styling -->
      <div 
        v-if="computedDataMain" 
        :class="{ hidden: activeTab === 'Notice' }" 
        class="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-start gap-6 transform hover:scale-[1.02] transition-all duration-300"
      >
        <div class="relative w-full overflow-hidden rounded-2xl shadow-2xl">
          <img
            v-if="computedDataMain.image"
            class="w-full h-[400px] object-cover"
            :src="appendBaseURL(computedDataMain.image)"
            alt="Main Event"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <span
              :class="{ hidden: activeTab === 'Past' }"
              class="inline-flex items-center px-4 py-2 rounded-full bg-green-500 text-white text-sm font-semibold mb-3"
            >
              <span class="material-icons text-sm mr-1"></span>
              UP NEXT
            </span>
            <span
              :class="{ hidden: activeTab === 'Upcoming' }"
              class="inline-flex items-center px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold mb-3"
            >
              <span class="material-icons text-sm mr-1"></span>
              PREVIOUSLY
            </span>
            <h2 class="text-2xl font-bold text-white mb-2">{{ computedDataMain.title }}</h2>
            <p class="text-gray-200">{{ moment(computedDataMain.createdAt).format('LL') }}</p>
          </div>
        </div>
      </div>

      <!-- Other Events with enhanced cards -->
      <div v-if="computedData.length > 0" class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in computedData.slice(0, 3)"
          :key="event.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <img 
            class="w-full h-48 object-cover" 
            :src="appendBaseURL(event.image)" 
            alt="Event"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ event.title }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400 flex items-center">
              <span class="material-icons text-sm mr-2"></span>
              {{ moment(event.eventDate).format('LL') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Enhanced Empty State -->
      <div v-else class="col-span-full text-center py-16 mx-4">
        <img src="../assets/not_found.svg" alt="No Events" class="mx-auto w-48 mb-8 animate-bounce-slow" />
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          No {{ activeTab.toLowerCase() }} events available
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          Check back later for updates
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { url } from "@/functions/endpoint";
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import moment from "moment";
import { appendBaseURL } from "@/functions";
import type { Event } from '@/types/event';

// Properly typed refs
const UPCOMING_EVENTS = ref<Event[]>([]);
const PAST_EVENTS = ref<Event[]>([]);
const NOTICES = ref<Event[]>([]);
const activeTab = ref<'Upcoming' | 'Past' | 'Notice'>('Upcoming');

const fetchData = async (): Promise<void> => {
  try {
    const [upcoming, past, notices] = await Promise.allSettled([
      axios.get<Event[]>(`${url}/events/upevents`),
      axios.get<Event[]>(`${url}/events/pastevents`),
      axios.get<Event[]>(`${url}/events/notices`),
    ]);

    UPCOMING_EVENTS.value = upcoming.status === "fulfilled" ? upcoming.value.data || [] : [];
    PAST_EVENTS.value = past.status === "fulfilled" ? past.value.data || [] : [];
    NOTICES.value = notices.status === "fulfilled" ? notices.value.data || [] : [];

    if (upcoming.status === "rejected") {
      console.error("Failed to fetch upcoming events:", upcoming.reason);
    }
    if (past.status === "rejected") {
      console.error("Failed to fetch past events:", past.reason);
    }
    if (notices.status === "rejected") {
      console.error("Failed to fetch notices:", notices.reason);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

onMounted(() => {
  fetchData();
});

const switchTab = (tab: 'Upcoming' | 'Past' | 'Notice'): void => {
  activeTab.value = tab;
};

const computedData = computed<Event[]>(() => {
  switch (activeTab.value) {
    case 'Upcoming':
      return UPCOMING_EVENTS.value;
    case 'Past':
      return PAST_EVENTS.value;
    case 'Notice':
      return NOTICES.value;
    default:
      return [];
  }
});

const computedDataMain = computed<Event | null>(() => {
  if (activeTab.value === 'Upcoming') {
    return UPCOMING_EVENTS.value.length > 0 ? UPCOMING_EVENTS.value[0] : null;
  }
  if (activeTab.value === 'Past') {
    return PAST_EVENTS.value.length > 0 ? PAST_EVENTS.value[0] : null;
  }
  return null;
});
</script>

<style scoped>
/* Tabs */
button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  color: #6cc551;
}

select {
  transition: all 0.3s ease-in-out;
}

/* Event Images */
.event-image-large {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.event-image-large:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.event-image-small {
  object-fit: cover;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.event-image-small:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Event Titles */
.event-title {
  text-transform: uppercase;
  transition: color 0.3s ease-in-out;
}

.event-title:hover {
  color: #6cc551;
}

/* Responsive Design */
@media (max-width: 768px) {
  .up-events {
    flex-direction: column;
    gap: 1rem;
  }

  .event-image-small {
    width: 100%;
    height: auto;
  }
}
</style>
