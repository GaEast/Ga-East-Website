<template>
    <div class="flex flex-col justify-between min-h-screen bg-gray-50 dark:bg-gray-800">
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-green-600 to-green-700 py-8">
            <div class="max-w-7xl mx-auto px-4">
                <h1 class="text-3xl md:text-4xl font-bold mb-2 dark:text-white">Department Details</h1>
                <nav class="text-sm" aria-label="Breadcrumb">
                    <ol class="list-none p-0 inline-flex">
                        <li class="flex items-center">
                            <router-link to="/" class="text-green-400 hover:text-white">Home</router-link>
                            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                            </svg>
                        </li>
                        <li class="text-green-300">{{ departments?.name || 'Loading...' }}</li>
                    </ol>
                </nav>
            </div>
        </div>

        <section class="max-w-7xl w-full my-8 mx-auto px-4 flex-grow">
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <Loader />
            </div>

            <div v-else-if="error" class="text-center py-8 text-red-600 dark:text-red-400">
                {{ error }}
            </div>

            <div v-else-if="departments" class="department flex gap-8">
                <!-- Main Content -->
                <div class="flex-grow flex flex-col gap-6">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                        {{ departments.name }}
                    </h2>
                    <div 
                        v-html="decodeEntities(departments.about)" 
                        class="prose text-justify prose-lg max-w-none dark:prose-invert dark:text-gray-300"
                    ></div>
                </div>

                <!-- Related Units Sidebar -->
                <aside class="w-80 shrink-0">
                    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Related Units
                        </h3>
                        <ul class="text-left space-y-2">
                            <li 
                                v-for="unit in departments.unit" 
                                :key="unit.id"
                                @click="setUnit(unit)"
                                class="p-2 rounded cursor-pointer transition-colors duration-200
                                    hover:bg-green-50 dark:hover:bg-green-900
                                    text-gray-700 dark:text-gray-300
                                    hover:text-green-700 dark:hover:text-green-400"
                            >
                                {{ unit.title }}
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { url } from '@/functions/endpoint';
import Footer from '@/components/Footer.vue';
import Loader from '@/components/Loader.vue';
import { decodeEntities } from '@/functions';
import { decryptString } from '@/functions/encryption';

// Types
interface Unit {
    id: number;
    title: string;
    about: string;
}

interface Department {
    id: number;
    name: string;
    about: string;
    unit: Unit[];
}

// State
const route = useRoute();
const departments = ref<Department | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const departmentId = computed(() => {
    try {
        return decryptString(route.params.id.toString());
    } catch (err) {
        error.value = 'Invalid department ID';
        return null;
    }
});

// Methods
const fetchData = async () => {
    if (!departmentId.value) return;
    
    try {
        isLoading.value = true;
        error.value = null;
        const response = await axios.get<Department>(`${url}/departments/${parseInt(departmentId.value)}`);
        departments.value = response.data;
    } catch (err) {
        error.value = 'Failed to load department information. Please try again later.';
        console.error('Error fetching department:', err);
    } finally {
        isLoading.value = false;
    }
};

const setUnit = (unit: Unit) => {
    if (!departments.value) return;
    departments.value = {
        ...departments.value,
        name: unit.title,
        about: unit.about
    };
};

// Lifecycle
onMounted(() => {
    fetchData();
});

watch(departmentId, () => {
    fetchData();
});
</script>

<style scoped>
.department {
    @apply gap-8;
}

@media (max-width: 768px) {
    .department {
        @apply flex-col;
    }

    .department aside {
        @apply w-full mt-8;
    }
}
</style>