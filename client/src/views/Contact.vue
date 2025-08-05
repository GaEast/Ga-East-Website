<template>
  <div class="bg-white dark:bg-[#1f2937]">
    <section class="max-w-6xl py-8 lg:py-16 mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 text-center sm:text-left">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          We value your feedback,<br class="hidden sm:block"/> Get in touch!
        </h1>
      </div>

      <!-- Contact Information Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
        <!-- Contact Details -->
        <div class="space-y-8">
          <div class="space-y-4">
            <div class="space-y-2 text-gray-600 dark:text-gray-400">
              <p class="text-md">
                Ga East Municipal Assembly<br />
                Head of Client Service Unit<br />
                P. O. Box AQ5 Abokobi
              </p>
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0302-962718 or 0302-528761 / 0559920954 (WhatsApp)</span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-300">
              Corporate Email
            </h2>
            <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@gema.gov.gh</span>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Your Email
            </label>
            <input 
              type="email" 
              id="email"
              v-model="formData.email"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Subject
            </label>
            <input 
              type="text" 
              id="subject"
              v-model="formData.subject"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              placeholder="How can we help you?"
              required
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Message
            </label>
            <textarea 
              id="message"
              v-model="formData.message"
              rows="6"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Footer from "@/components/Footer.vue";

const formData = ref({
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', formData.value);
  
};
</script>

<style scoped>
input, textarea {
  @apply bg-gray-50 dark:bg-gray-700;
}
</style>
