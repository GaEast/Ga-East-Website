<template>
  <section class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
    <div
      class="w-3/5 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-3xl font-bold text-white"
      >
        <img
          class="w-10 h-10 mr-3"
          src="../../assets/logo-transparent.png"
          alt="logo"
        />
        Admin Portal
      </a>
      <div
        class="w-full bg-white rounded-lg shadow-lg dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 text-left space-y-6 sm:p-8">
          <h1
            class="text-2xl text-center font-extrabold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
          >
            Welcome Back!
          </h1>
          <p class="text-center text-gray-600 dark:text-gray-400">
            Sign in to access your dashboard
          </p>
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Username</label
              >
              <input
                type="text"
                v-model="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Password</label
              >
              <input
                type="password"
                v-model="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div class="flex items-center justify-between">
              <a
                href="#"
                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full button uppercase font-semibold border border-button-bg focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-5 py-2.5 text-center transition-all duration-300"
            >
              <span v-if="isLoading" class="loader"></span>
              <span v-else>Sign in</span>
            </button>
            <p v-if="successMessage" class="text-center text-green-600 font-medium">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-center text-red-600 font-medium">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { authService } from "@/services/auth";
import router from "@/router";
import store from "@/store";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const token = await authService.login(username.value, password.value);
    if (token) {
      store.commit("login", { token, username: username.value });
      successMessage.value = "Login successful!";
      router.push("/admin/dashboard");
    } else {
      errorMessage.value = "Invalid username or password.";
    }
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message || "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
