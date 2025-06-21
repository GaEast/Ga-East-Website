<template>
  <section class="staff min-h-screen py-24 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-6">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Municipal Chief Executive
        </h1>

      </div>

      <!-- MCE Profile Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-20">
        <div class="relative h-48 bg-button-bg">
          <div class="absolute inset-0 bg-opacity-75 bg-gradient-to-r from-green-600 to-green-800"></div>
        </div>
        <div class="relative px-6 pb-8 -mt-24">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Profile Card -->
            <div class="md:w-1/3">
              <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <img
                  class="w-48 h-48 mx-auto rounded-xl object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"
                  src="../assets/mce2025.jpg"
                  alt="Municipal Chief Executive"
                />
                <div class="text-center mt-6">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">HON. EDMUND AGBOH</h2>
                  <p class="text-green-600 dark:text-green-400 font-medium mt-1">Municipal Chief Executive</p>
                  
                  <!-- Social Links with improved hover states -->
                  <div class="flex justify-center gap-4 mt-4">
                    <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/></svg>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bio Section with enhanced typography -->
            <div class="md:w-2/3 h-full">
              <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
                <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">About</h3>
                <div class="space-y-6 text-gray-600 dark:text-gray-300">
                  <!-- <p class="leading-relaxed text-lg">
                    Hon. Deborah Ampofo serves as the Municipal Chief Executive of the Ga East Municipal Assembly, bringing a wealth of experience in public service and community development.
                  </p>
                  <p class="leading-relaxed text-lg">
                    Under her leadership, the Assembly has achieved significant milestones in infrastructure development, education enhancement, and social welfare improvement. Her vision for Ga East encompasses sustainable growth, technological advancement, and inclusive community participation.
                  </p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Button with improved styling -->
      <div class="text-center">
        <router-link to="/contact" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            class="inline-flex items-center px-8 py-4 border hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
          >
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Our Office
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.staff-section img {
  transition: all 0.3s ease-in-out;
}

.staff-section img:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>

