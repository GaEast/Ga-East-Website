<template>
  <div 
    class="w-full h-full animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
  ></div>
</template>

<style scoped>
.animate-gradient {
  background-size: 200% 100%;
  animation: gradient 2s linear infinite;
}

@keyframes gradient {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
</style>