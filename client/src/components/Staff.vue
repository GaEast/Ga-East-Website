<template>
  <section class="staff lg:w-3/4 md:w-3/4 my-36 mx-auto lg:px-4">
    <article>
      <!-- Section Heading -->
      <div class="staff-section-heading flex flex-col md:flex-row justify-between items-center mb-16">
        <h2 class="text-left uppercase text-3xl md:text-4xl font-bold dark:text-white text-center md:text-left">
          Municipal Chief <br />
          Executive
        </h2>
        <router-link to="/about" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            type="button"
            class="button uppercase font-semibold bg-button-bg text-white hover:bg-button-bg-hover focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-6 py-3 transition-all duration-300 mt-4 md:mt-0"
          >
            About Us
          </button>
        </router-link>
      </div>

      <!-- Staff Section -->
      <section class="staff-section mt-6 flex flex-col md:flex-row justify-center items-center gap-8">
        <!-- Image and Name -->
        <div class="w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <img
            class="w-full h-auto rounded-lg object-cover"
            src="../assets/mce.jpg"
            alt="Municipal Chief Executive"
          />
          <p class="font-bold text-center text-lg dark:text-white mt-4 uppercase">
            Hon. Deborah Ampofo
          </p>
        </div>

        <!-- Description -->
        <div class="w-full md:w-2/3 text-center md:text-left">
          <p class="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            Hon. Deborah Ampofo is the Municipal Chief Executive of the Ga East Municipal Assembly. She is committed to
            driving development and ensuring the well-being of the residents of the municipality. Her leadership is
            focused on transparency, accountability, and fostering community growth.
          </p>
          <p class="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed mt-4">
            Under her guidance, the Assembly has implemented numerous initiatives aimed at improving infrastructure,
            education, healthcare, and local governance. Hon. Ampofo is dedicated to creating a sustainable and
            inclusive environment for all.
          </p>
        </div>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.staff-section-heading h2 {
  letter-spacing: 0.05em;
}

.staff-section img {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.staff-section img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.button {
  border-radius: 0.375rem;
}

@media (max-width: 768px) {
  .staff-section {
    flex-direction: column;
    text-align: center;
  }

  .staff-section img {
    width: 100%;
  }
}
</style>

