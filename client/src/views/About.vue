<template>
  <div class="relative about-container bg-about-bg dark:bg-[#111827] text-gray-900 dark:text-gray-100">
    <div class="flex flex-col gap-20">
      <!-- Hero Section -->
      <div class="hero-section text-center py-20 bg-gradient-to-r from-green-400 to-green-600 text-white">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide">
          About Us
        </h1>
        <p class="mt-4 text-lg md:text-xl lg:text-2xl font-light">
          Discover who we are and what we stand for.
        </p>
      </div>

      <!-- Introduction Section -->
      <div class="about-section w-11/12 lg:w-3/4 mx-auto flex flex-col lg:flex-row gap-12">
        <div class="section flex-1 flex flex-col gap-5">
          <h2 class="text-2xl font-bold capitalize">Introduction</h2>
          <p class="text-justify leading-relaxed">
            The Ga East Municipality with a projected population of 186,230 is
            one of the 29 districts in the Greater Accra Region. Ga East is unique
            for its hosting of the elite population in the nation’s capital and is
            also noted for its well-planned physical layout, which has attracted
            many Real Estate Companies such as Oak Villa, Regimanuel Gray, Edlorm
            Estate, etc., to the municipality.
          </p>
        </div>
        <div class="section flex-1 flex flex-col gap-5">
          <h2 class="text-2xl font-bold capitalize">Political Administration</h2>
          <p class="text-justify leading-relaxed">
            The Ga East Municipal Assembly has a General Assembly membership of
            18 comprising 12 elected members, 6 government appointees, 1 Member of
            Parliament with the Municipal Chief Executive as the representative of
            the Head of State at the Municipal level. The General Assembly has 2
            committees which are the Executive Committee and Public Relations
            Complaints Committee (PRCC). It also has 5 statutory Sub-Committees
            and 6 other non-statutory sub-committees.
          </p>
        </div>
      </div>

      <!-- Vision, Mission, and Geo Location Section -->
      <div class="values-section w-11/12 mb-10 lg:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div class="value-card bg-white dark:bg-[#1f2937] shadow-lg rounded-lg p-6 text-center">
          <img class="values-logo mx-auto mb-4" src="../assets/our-vision.svg" alt="Our Vision" />
          <h3 class="text-xl font-bold capitalize mb-2">Our Vision</h3>
          <p class="text-justify leading-relaxed">
            To become a highly professional, dynamic, and client-sensitive
            Assembly, focusing on sustainable development.
          </p>
        </div>
        <div class="value-card bg-white dark:bg-[#1f2937] shadow-lg rounded-lg p-6 text-center">
          <img class="values-logo mx-auto mb-4" src="../assets/our-mission.svg" alt="Our Mission" />
          <h3 class="text-xl font-bold capitalize mb-2">Our Mission</h3>
          <p class="text-justify leading-relaxed">
            To facilitate improvement in the quality of life of the people through
            the provision and promotion of basic socio-economic services within the
            context of good governance.
          </p>
        </div>
        <div class="value-card bg-white dark:bg-[#1f2937] shadow-lg rounded-lg p-6 text-center">
          <img class="values-logo mx-auto mb-4" src="../assets/geo-location.svg" alt="Geo Location" />
          <h3 class="text-xl font-bold capitalize mb-2">Geo Location</h3>
          <p class="text-justify leading-relaxed">
            Ga East Municipal District is bordered on the north by the Akuapim
            South District in the Eastern Region of Ghana. It is bordered on its
            other three sides by other districts in the Greater Accra Region of
            Ghana.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
</script>

<style scoped>
.about-container {
  /* background-color: #f4fff6; */
}

.hero-section {
  background: linear-gradient(90deg, #28a745, #218838);
}

.values-logo {
  width: 4em;
  height: 4em;
}

.value-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .about-section {
    flex-direction: column;
    gap: 8px;
  }

  .values-section {
    grid-template-columns: 1fr;
  }
}
</style>
