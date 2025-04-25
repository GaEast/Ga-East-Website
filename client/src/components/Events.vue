<template>
  <section class="lg:w-3/4 md:w-3/4 mt-20 mx-auto sm:px-6 lg:px-4">
    <!-- Tabs -->
    <div class="text-sm  font-medium text-center text-gray-500 border-b border-gray-300 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex text-center text-lg p-3 flex-wrap justify-between">
        <li v-for="tab in ['Upcoming', 'Past', 'Notice']" :key="tab" class="mr-2">
          <button
            @click="switchTab(tab)"
            :class="{
              'text-button-bg-hover font-bold border-b-2 border-button-bg-hover': activeTab === tab,
              'hover:text-button-bg-hover': activeTab !== tab,
            }"
            class="transition-all duration-300"
          >
            {{ tab === 'Notice' ? 'Notice' : tab + ' Events' }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Events Content -->
    <div class="grid pb-10 grid-cols-1 mx-4 lg:mx-0 md:mx-0 md:grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6 mt-10 h-auto">
      <!-- Main Event -->
      <div v-if="computedDataMain" :class="{ hidden: activeTab === 'Notice' }" class="flex flex-col mb-20 items-start gap-5">
        <img
          v-if="computedDataMain.image"
          class="event-image-large rounded-lg shadow-lg"
          :src="appendBaseURL(computedDataMain.image)"
          alt="Main Event"
        />
        <span
          :class="{ hidden: activeTab === 'Past' }"
          class="text-white uppercase font-semibold bg-button-bg focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-button-bg dark:focus:bg-button-bg-hover rounded-md"
        >
          <img class="inline-block mr-1.5" src="../assets/tag.svg" alt="Tag" />
          UP NEXT
        </span>
        <span
          :class="{ hidden: activeTab === 'Upcoming' }"
          class="text-white uppercase font-semibold bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-800 dark:focus:bg-button-bg-hover rounded-md"
        >
          <img class="inline-block mr-1.5" src="../assets/tag.svg" alt="Tag" />
          PREVIOUSLY
        </span>
        <span class="w-3/4 text-lg uppercase font-light text-left text-gray-900 dark:text-white">
          {{ computedDataMain.title }}
        </span>
        <span class="text-gray-400">
          {{ moment(computedDataMain.createdAt).format('LL') }}
        </span>
      </div>

      <!-- Other Events -->
      <div v-if="computedData.length > 0">
        <div
          v-for="event in computedData.slice(0, 3)"
          :key="event.id"
          class="up-events flex gap-10 justify-between pb-4 border-b border-gray-300 dark:border-gray-700"
        >
          <div class="event-details flex flex-col items-start gap-5 w-3/5">
            <span class="event-title uppercase text-lg font-light text-left text-gray-900 dark:text-white">
              {{ event.title }}
            </span>
            <span class="text-gray-400">{{ moment(event.eventDate).format('LL') }}</span>
          </div>
          <div>
            <img class="event-image-small h-auto rounded-lg shadow-md" :src="appendBaseURL(event.image)" alt="Event" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center col-span-2 mt-10">
        <img src="../assets/not_found.svg" alt="No Events" class="mx-auto w-1/2 md:w-1/3 lg:w-1/4 mb-6" />
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          No {{ activeTab === 'Upcoming events' ? 'upcoming events' : activeTab === 'Past' ? 'past' : 'notices' }} available at the moment.
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

const UPCOMING_EVENTS = ref([]);
const PAST_EVENTS = ref([]);
const NOTICES = ref([]);
const activeTab = ref("Upcoming");

const fetchData = async () => {
  try {
    const [upcomingResponse, pastResponse, noticesResponse] = await Promise.all([
      axios.get(`${url}/events/upevents`),
      axios.get(`${url}/events/pastevents`),
      axios.get(`${url}/events/notices`),
    ]);

    UPCOMING_EVENTS.value = upcomingResponse.data || [];
    PAST_EVENTS.value = pastResponse.data || [];
    NOTICES.value = noticesResponse.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

onMounted(() => {
  fetchData();
});

const switchTab = (tab: string) => {
  activeTab.value = tab;
};

const computedData = computed(() => {
  if (activeTab.value === "Upcoming") {
    return UPCOMING_EVENTS.value;
  } else if (activeTab.value === "Past") {
    return PAST_EVENTS.value;
  } else if (activeTab.value === "Notice") {
    return NOTICES.value;
  } else {
    return [];
  }
});

const computedDataMain = computed(() => {
  if (activeTab.value === "Upcoming") {
    return UPCOMING_EVENTS.value.length > 0 ? UPCOMING_EVENTS.value[0] : null;
  } else if (activeTab.value === "Past") {
    return PAST_EVENTS.value.length > 0 ? PAST_EVENTS.value[0] : null;
  } else {
    return null;
  }
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
  width: 100px;
  height: 100px;
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
