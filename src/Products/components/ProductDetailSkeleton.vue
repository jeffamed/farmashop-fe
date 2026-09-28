<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <!-- Header -->
    <div class="col-span-12">
      <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
      <div class="flex justify-between items-start mt-2">
        <div class="flex-1">
          <div class="skeleton-shimmer h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-3"></div>
          <div class="skeleton-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div class="skeleton-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div class="skeleton-shimmer h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-32 flex-shrink-0"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-8 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark mb-8"
    >
      <!-- Left Side - Image & Quick Stats -->
      <div class="flex flex-col gap-6">
        <div
          class="skeleton-shimmer bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden aspect-square"
        ></div>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50 space-y-3"
          >
            <div class="skeleton-shimmer h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50 space-y-3"
          >
            <div class="skeleton-shimmer h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>

      <!-- Right Side - Details -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Status Badges & Margin -->
        <div class="flex justify-between items-start">
          <div class="flex gap-3">
            <div class="skeleton-shimmer h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-28"></div>
            <div class="skeleton-shimmer h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
          </div>
          <div class="text-right">
            <div class="skeleton-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
            <div class="skeleton-shimmer h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-auto"></div>
          </div>
        </div>

        <!-- Product Title & ID -->
        <div class="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div class="skeleton-shimmer h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div class="skeleton-shimmer h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="i in 8"
            :key="i"
            class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50 space-y-3"
          >
            <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-6"></div>
            <div class="skeleton-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div class="skeleton-shimmer h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>

        <!-- Inventory Level -->
        <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div class="flex justify-between items-center mb-3">
            <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div class="skeleton-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-56 mb-4"></div>
          <div class="skeleton-shimmer w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>

    <!-- Additional Info Sections -->
    <div class="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark space-y-4"
      >
        <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div v-for="i in 4" :key="`supplier-${i}`" class="space-y-2">
          <div class="skeleton-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div class="skeleton-shimmer h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark space-y-4"
      >
        <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div v-for="i in 2" :key="`lab-${i}`" class="space-y-2">
          <div class="skeleton-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div class="skeleton-shimmer h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>

      <div
        class="lg:col-span-2 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-dark"
      >
        <div class="skeleton-shimmer h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div class="flex gap-4">
          <div
            v-for="i in 3"
            :key="`usage-${i}`"
            class="skeleton-shimmer h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton-shimmer {
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

:global(.dark) .skeleton-shimmer {
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
}
</style>