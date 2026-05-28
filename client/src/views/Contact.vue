<template>
  <div>

    <!-- Page Hero -->
    <div class="bg-white border-b border-gray-100 py-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
          <router-link to="/" class="hover:text-[#6CC551] transition-colors">Home</router-link>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#6CC551]">Contact</span>
        </div>
        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2 text-center">Reach Out</p>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1E2833] uppercase tracking-wide text-center">
          Get in Touch
        </h1>
        <div class="mt-3 w-12 h-1 bg-[#6CC551] rounded-full mx-auto"></div>
        <p class="mt-3 text-gray-500 text-sm max-w-2xl leading-relaxed text-center mx-auto">
          We value your feedback and inquiries. Reach out to us through any of the channels below.
        </p>
      </div>
    </div>

    <!-- Content -->
    <section class="py-12 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <!-- Contact Info -->
          <div class="space-y-4 text-left">

            <div class="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-[#1E2833] text-sm font-bold mb-1">Address</p>
                <p class="text-gray-500 text-sm leading-relaxed">
                  Ga East Municipal Assembly<br />
                  Head of Client Service Unit<br />
                  P.O. Box AQ5, Abokobi
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="text-[#1E2833] text-sm font-bold mb-1">Phone</p>
                <p class="text-gray-500 text-sm">0302-962718 &nbsp;/&nbsp; 0302-528761</p>
                <p class="text-gray-500 text-sm">0559920954 (WhatsApp)</p>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-[#6CC551]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[#6CC551]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-[#1E2833] text-sm font-bold mb-1">Email</p>
                <a href="mailto:info@gema.gov.gh" class="text-[#6CC551] text-sm hover:underline">info@gema.gov.gh</a>
              </div>
            </div>

          </div>

          <!-- Contact Form -->
          <div class="bg-white rounded-2xl border border-gray-100 p-8">
            <h2 class="text-[#1E2833] text-base font-bold mb-6">Send us a Message</h2>

            <!-- Success -->
            <div v-if="submitSuccess" class="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Your message has been sent! We'll get back to you soon.
            </div>

            <!-- Error -->
            <div v-if="submitError" class="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ submitError }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div>
                <label for="email" class="block text-xs font-semibold text-gray-600 mb-1.5">Your Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  placeholder="your.email@example.com"
                  required
                  :disabled="submitting"
                  class="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors disabled:opacity-60"
                />
              </div>

              <div>
                <label for="subject" class="block text-xs font-semibold text-gray-600 mb-1.5">Subject</label>
                <input
                  type="text"
                  id="subject"
                  v-model="formData.subject"
                  placeholder="How can we help you?"
                  required
                  :disabled="submitting"
                  class="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors disabled:opacity-60"
                />
              </div>

              <div>
                <label for="message" class="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="6"
                  placeholder="Your message…"
                  required
                  :disabled="submitting"
                  class="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors resize-none disabled:opacity-60"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="w-full flex items-center justify-center gap-2 py-2.5 bg-[#6CC551] hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                {{ submitting ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          </div>

        </div>

        <!-- Map -->
        <div class="mt-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-1 h-6 bg-[#6CC551] rounded-full flex-shrink-0"></div>
            <div>
              <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest">Find Us</p>
              <h2 class="text-xl font-bold text-[#1E2833]">Our Location</h2>
            </div>
          </div>
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <iframe
              title="Ga East Municipal Assembly location"
              src="https://maps.google.com/maps?q=Ga+East+Municipal+Assembly,+Abokobi,+Ghana&output=embed&z=15"
              width="100%"
              height="420"
              style="border:0; display:block;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div class="px-6 py-4 flex items-center justify-between flex-wrap gap-3 border-t border-gray-100">
              <p class="text-gray-500 text-sm">
                Ga East Municipal Assembly, P.O. Box AQ5, Abokobi, Greater Accra
              </p>
              <a
                href="https://maps.google.com/maps?q=Ga+East+Municipal+Assembly,+Abokobi,+Ghana"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-sm font-semibold text-[#6CC551] hover:text-green-700 transition-colors flex-shrink-0"
              >
                Open in Google Maps
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import Footer from '@/components/Footer.vue';
import { url } from '@/functions/endpoint';

const formData    = ref({ email: '', subject: '', message: '' });
const submitting  = ref(false);
const submitSuccess = ref(false);
const submitError = ref<string | null>(null);

const handleSubmit = async () => {
  submitting.value    = true;
  submitSuccess.value = false;
  submitError.value   = null;
  try {
    await axios.post(`${url}/contact-message`, {
      email:   formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message,
    });
    formData.value    = { email: '', subject: '', message: '' };
    submitSuccess.value = true;
    setTimeout(() => { submitSuccess.value = false; }, 5000);
  } catch (err: any) {
    const msg = err?.response?.data?.message;
    submitError.value = Array.isArray(msg) ? msg.join(' ') : (msg ?? 'Failed to send message. Please try again.');
  } finally {
    submitting.value = false;
  }
};
</script>
