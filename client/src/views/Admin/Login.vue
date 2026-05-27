<template>
  <div class="min-h-screen bg-gray-50 flex">

    <!-- Left panel — branding -->
    <div class="hidden lg:flex lg:w-1/2 bg-[#1E2833] flex-col items-center justify-center p-12 relative overflow-hidden">
      <!-- Subtle pattern -->
      <div class="absolute inset-0 opacity-10"
        style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(108,197,81,0.4) 20px, rgba(108,197,81,0.4) 21px);">
      </div>
      <!-- Green accent bar -->
      <div class="absolute top-0 left-0 w-1 h-full bg-[#6CC551]"></div>

      <div class="relative z-10 text-center">
        <img src="../../assets/logo-transparent.png" alt="GEMA Logo" class="w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
        <h1 class="text-3xl font-extrabold text-white uppercase tracking-wide mb-2">Ga East</h1>
        <p class="text-[#6CC551] text-sm font-bold uppercase tracking-widest mb-6">Municipal Assembly</p>
        <div class="w-12 h-0.5 bg-[#6CC551] mx-auto mb-6"></div>
        <p class="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
          Secure administration portal. Authorized personnel only.
        </p>
      </div>
    </div>

    <!-- Right panel — form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">

        <!-- Mobile logo -->
        <div class="lg:hidden text-center mb-8">
          <img src="../../assets/logo-transparent.png" alt="GEMA Logo" class="w-14 h-14 mx-auto mb-3" />
          <p class="text-[#1E2833] font-extrabold text-lg uppercase tracking-wide">Ga East Municipal Assembly</p>
        </div>

        <p class="text-[#6CC551] text-xs font-bold uppercase tracking-widest mb-2">Admin Portal</p>
        <h2 class="text-3xl font-extrabold text-[#1E2833] mb-1">Welcome back</h2>
        <p class="text-gray-400 text-sm mb-8">Sign in to access the dashboard.</p>

        <form @submit.prevent="handleLogin" class="space-y-5">

          <div>
            <label for="username" class="block text-xs font-semibold text-gray-600 mb-1.5">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              required
              class="w-full px-4 py-2.5 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors"
            />
          </div>

          <div>
            <label for="password" class="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
              class="w-full px-4 py-2.5 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6CC551]/30 focus:border-[#6CC551] transition-colors"
            />
          </div>

          <!-- Feedback -->
          <p v-if="errorMessage" class="text-red-500 text-xs font-medium">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-[#6CC551] text-xs font-medium">{{ successMessage }}</p>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2.5 bg-[#6CC551] hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span v-if="isLoading" class="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            <span>{{ isLoading ? 'Signing in…' : 'Sign In' }}</span>
          </button>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { authService } from "@/services/auth";
import router from "@/router";
import store from "@/store";

const route          = useRoute();
const username       = ref("");
const password       = ref("");
const errorMessage   = ref("");
const successMessage = ref("");
const isLoading      = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  isLoading.value      = true;
  errorMessage.value   = "";
  successMessage.value = "";

  try {
    const token = await authService.login(username.value, password.value);
    if (token) {
      store.commit("login", { token, username: username.value });
      successMessage.value = "Login successful!";
      const redirect = route.query.redirect as string | undefined;
      router.push(redirect || "/admin/dashboard");
    } else {
      errorMessage.value = "Invalid username or password.";
    }
  } catch (err: any) {
    errorMessage.value = "Invalid username or password.";
  } finally {
    isLoading.value = false;
  }
};
</script>
