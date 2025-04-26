<template>
  <router-link 
    :to="'/single-post/' + encryptString(post.id.toString())"
    class="block group"
  >
    <article class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div
        class="relative w-full h-48 bg-cover bg-center"
        :style="{ backgroundImage: `url(${appendBaseURL(post.image)})` }"
      >
        <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
      </div>
      
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 mb-2 line-clamp-2">
          {{ decodeEntities(post.title) }}
        </h3>
        <time class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatDate(post.createdAt) }}
        </time>
      </div>
    </article>
  </router-link>
</template>

<script setup lang="ts">
import { appendBaseURL, decodeEntities } from '@/functions';
import { encryptString } from '@/functions/encryption';
import moment from 'moment';

interface Props {
  post: {
    id: number;
    title: string;
    image: string;
    createdAt: string;
  }
}

const props = defineProps<Props>();

const formatDate = (date: string) => moment(date).format('LL');
</script>