<template>
  <nav class="fixed top-0 z-50 w-full nav-header">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button  aria-controls="logo-sidebar"
            @click="toggleSidebar" type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-300">
            <span class="sr-only">Toggle sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>
          <a href="" class="flex ml-2 md:mr-24">
            <img src="../../assets/logo-transparent.png" class="h-8 mr-3" alt="GEMA Logo" />
            <span class="logo-text self-center text-2xl font-bold whitespace-nowrap">G.E.M.A</span>
          </a>
        </div>
        <div class="flex items-center gap-4 te">
          <div class="relative" ref="dropdownRef">
            <button 
              type="button" 
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <span>{{ username }}</span>
              <img class="w-8 h-8 rounded-full" src="../../assets/profile.svg" alt="user" />
            </button>
            
            <!-- Dropdown menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <div v-show="isDropdownOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu">
                <router-link 
                  to="/admin/add-user"
                  @click="isDropdownOpen = false"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                  role="menuitem">
                  Add User
                </router-link>
                <button 
                  @click="logout(); isDropdownOpen = false"
                  class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" 
                  role="menuitem">
                  <span v-if="isLoading">Signing out...</span>
                  <span v-else>Sign out</span>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside :class="['fixed top-0 left-0 z-40 w-72 h-screen pt-20 transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 sidebar-container', 
    {'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen}]">
    <div class="h-full px-3 pb-4 overflow-y-auto">
      <ul class="space-y-2">
        <!-- Existing menu items with improved styling -->
        <router-link to="/admin/dashboard" custom v-slot="{ navigate }" exact-active-class="active-nav">
          <li @click="navigate" class="sidebar-item">
            <button :class="['flex items-center w-full p-3 text-gray-900 rounded-lg transition-all duration-200',
              { 'active-nav': isRouteActive('/admin/dashboard') }]">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              Dashboard
            </button>
          </li>
        </router-link>
        
        <!-- Other menu items follow the same pattern -->
        <li>
          <button type="button" @click="toggleAccordion('posts')"
            class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Posts</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul v-if="openAccordion === 'posts'" id="dropdown-pages" class=" py-2 space-y-2">
            <router-link to="/admin/new-post" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/new-post') }"
                  class="flex items-center hover:text-button-bg-hover w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  New Post
                </button>
              </li>
            </router-link>
            <router-link to="/admin/view-posts" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/view-posts') }"
                  class="flex items-center hover:text-button-bg-hover w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View
                  Posts</button>
              </li>
            </router-link>
          </ul>
        </li>
        <li>
          <button type="button" @click="toggleAccordion('documents')"
            class="flex items-center w-full p-2 text-base font-normal hover:text-button-bg-hover text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example2">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path
                d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Documents</span>
            <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul v-if="openAccordion === 'documents'" id="dropdown-example2" class=" py-2 space-y-2">
            <router-link to="/admin/add-document" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/add-document') }"
                  class="flex items-center hover:text-button-bg-hover w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add
                  Document</button>
              </li>
            </router-link>

            <router-link to="/admin/document-categories" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/document-categories') }"
                  class="flex items-center hover:text-button-bg-hover w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Document
                  Categories</button>
              </li>
            </router-link>

            <router-link to="/admin/view-documents" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/view-documents') }"
                  class="flex items-center hover:text-button-bg-hover w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View
                  Documents</button>
              </li>
            </router-link>
          </ul>
        </li>
        <li>
          <button type="button" @click="toggleAccordion('sliders')"
            class="flex items-center hover:text-button-bg-hover w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example3">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em"
              viewBox="0 0 512 512">
              <path
                d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Slider</span>
            <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul v-if="openAccordion === 'sliders'" id="dropdown-example3" class=" py-2 space-y-2">
            <router-link to="/admin/add-slider" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/add-slider') }"
                  class="flex items-center w-full hover:text-button-bg-hover p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add
                  Slider</button>
              </li>
            </router-link>
            <router-link to="/admin/view-sliders" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/view-sliders') }"
                  class="flex items-center w-full p-2 hover:text-button-bg-hover text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View
                  Slider</button>
              </li>
            </router-link>
          </ul>
        </li>
        <li>
          <button type="button" @click="toggleAccordion('departments')"
            class="flex items-center hover:text-button-bg-hover w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example3">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h14M1 6h14M1 11h7" />
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Departments & Units</span>
            <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul v-if="openAccordion === 'departments'" id="dropdown-example3" class=" py-2 space-y-2">
            <router-link to="/admin/add-department" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/add-department') }"
                  class="flex items-center w-full hover:text-button-bg-hover p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add
                  Department or Unit</button>
              </li>
            </router-link>
            <router-link to="/admin/view-departments" custom v-slot="{ navigate }" exact-active-class="active-nav">
              <li @click="navigate">
                <button :class="{ 'active-nav': isRouteActive('/admin/view-departments') }"
                  class="flex items-center w-full p-2 hover:text-button-bg-hover text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View
                  Departments & Units</button>
              </li>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </aside>

  <main :class="['transition-all duration-300', {'ml-0': !isSidebarOpen}]">
    <div class="mt-14">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, onBeforeUnmount } from "vue";
import { initDrawers, initDropdowns, initCollapses } from "flowbite";
import { useStore } from "vuex";
import { isRouteActive } from "@/functions/index";
import router from "@/router";

const store = useStore();
const isLoading = ref(false);
const isSidebarOpen = ref(true);
const openAccordion = ref<string | null>(null);
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Add click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

// Add and remove event listeners
onMounted(() => {
  initDrawers();
  initDropdowns();
  initCollapses();
  sessionStorage.setItem('username', storeUsername.value);
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const storeUsername = computed(() => store.getters.username);
const username = sessionStorage.getItem('username') || storeUsername.value;

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleAccordion = (text: string) => {
  openAccordion.value = openAccordion.value === text ? null : text;
};

const logout = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("logout");
    router.push("/login");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.nav-header {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-container {
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.logo-text {
  background: linear-gradient(45deg, #4CAF50, #2E7D32);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.active-nav {
  background-color: #4CAF50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-item {
  transition: all 0.3s ease;
}

.sidebar-item:hover {
  background-color: #f3f4f6;
  transform: translateX(4px);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Accordion transitions */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Dropdown transitions */
.transform {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
}

.scale-95 {
  --tw-scale-x: .95;
  --tw-scale-y: .95;
}

.scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
}
</style>
