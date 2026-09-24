<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  open?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const isOpen = ref(props.open ?? false)

const closeDrawer = () => {
  isOpen.value = false
  emit('update:open', false)
  emit('close')
}

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    closeDrawer()
  }
}
</script>

<template>
  <!-- drawer backdrop -->
  <div
    v-show="isOpen || open"
    class="fixed inset-0 z-30 bg-black/50 transition-opacity"
    @click="handleBackdropClick"
  />

  <!-- drawer component -->
  <div
    v-show="isOpen || open"
    class="fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 w-80 border-l border-gray-200 dark:border-gray-700"
    tabindex="-1"
    aria-labelledby="drawer-contact-label"
  >
    <div class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-5 flex items-center justify-between">
      <h5 id="drawer-label-contact" class="inline-flex items-center text-lg font-medium text-gray-900 dark:text-white">
        <svg
          class="w-5 h-5 me-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.283 8h-4.285m3.85 3h-3.85m4.061-6H11v11h8.27l1.715-9.847A.983.983 0 0 0 20.059 5ZM6.581 13.23h-.838A13.752 13.752 0 0 1 5.622 11c-.02-.745.02-1.49.12-2.23h1.04c.252 0 .496-.088.683-.245a.927.927 0 0 0 .329-.61l.2-1.872a.888.888 0 0 0-.045-.39.936.936 0 0 0-.212-.34 1.017 1.017 0 0 0-.341-.231A1.08 1.08 0 0 0 6.983 5h-2.06a1.27 1.27 0 0 0-.699.204 1.135 1.135 0 0 0-.442.543A15.066 15.066 0 0 0 3.007 11a15.656 15.656 0 0 0 .795 5.229c.165.462 1.342.771 1.864.771h1.116c.142 0 .283-.028.413-.082.13-.053.246-.132.341-.23a.936.936 0 0 0 .212-.34.889.889 0 0 0 .046-.391l-.201-1.873a.927.927 0 0 0-.33-.609 1.059 1.059 0 0 0-.682-.245ZM10 18v1h10v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2Z"
          />
        </svg>
        Contact Us
      </h5>
      <button
        type="button"
        @click="closeDrawer"
        class="text-gray-500 dark:text-gray-400 bg-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <form class="mb-6 space-y-4">
      <label for="input-group-1" class="block mb-2.5 text-sm font-medium text-heading"
        >Your Email<span class="ms-1 text-fg-danger">*</span></label
      >
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="input-group-1"
          class="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <label for="input-group-2" class="block mb-2.5 text-sm font-medium text-heading"
        >Subject<span class="ms-1 text-fg-danger">*</span></label
      >
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="input-group-2"
          class="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Let us know how we can help you"
          required
        />
      </div>
      <label for="message" class="block mb-2.5 text-sm font-medium text-heading"
        >Your message</label
      >
      <textarea
        id="message"
        rows="4"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
        placeholder="Write your thoughts here..."
      ></textarea>
      <button
        type="submit"
        class="w-full text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        Send message
      </button>
    </form>
    <p class="mb-2 text-sm text-body">
      <a href="#" class="hover:underline">info@company.com</a>
    </p>
    <p class="text-sm text-body">
      <a href="#" class="hover:underline">212-456-7890</a>
    </p>
  </div>
</template>

<style scoped></style>
