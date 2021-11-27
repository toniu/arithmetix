<template>
  <div
    class="
      block
      fixed
      pt-2
      top-16
      h-auto
      w-full
      md:w-96
      right-0
      z-50
      bg-gray-900 bg-opacity-95
      shadow-lg
    "
    v-if="isOpen"
  >
    <h1 class="p-2 text-white text-center font-medium">Notifications (0)</h1>
    <hr class="m-2" />
    <div class="p-3 text-black h-96">
      <!-- Show when no notifications -->
      <div class="text-center">
        <i class="far fa-bell block text-9xl p-3 m-2 text-gray-600 w-full"> </i>
        <span class="block text-gray-400 text-lg font-bold mx-2 my-2 w-full">
          Currently no notifications
        </span>
        <span
          class="block text-gray-400 text-base font-normal px-5 my-3 w-full"
        >
          You will receive notifications about assignment deadlines, feedback
          and other information here
        </span>
      </div>
      <!-- Show when notifications available -->
      <ul class="hidden space-y-1 text-sm md:text-base">
        <li
          class="
            bg-gray-50
            p-2
            rounded
            flex
            justify-between
            align-center
            border-solid border-l-8 border-blue-500
          "
        >
          <span class="p-1"> Assignment #564 due in 2 days! </span>
          <button
            class="p-1 mx-2 hover:bg-gray-200 w-8 rounded-full transition 0.1s"
          >
            <i class="fas fa-times flex-auto"> </i>
          </button>
        </li>
        <li
          class="
            bg-gray-50
            p-2
            rounded
            flex
            justify-between
            align-center
            border-solid border-l-8 border-blue-500
          "
        >
          <span class="p-1"> Assignment #231 due in 5 days! </span>
          <button
            class="p-1 mx-2 hover:bg-gray-200 w-8 rounded-full transition 0.1s"
          >
            <i class="fas fa-times flex-auto"> </i>
          </button>
        </li>
        <li
          class="
            bg-gray-50
            p-2
            rounded
            flex
            justify-between
            align-center
            border-solid border-l-8 border-blue-500
          "
        >
          <span class="p-1"> Assignment #923 due in 11 days! </span>
          <button
            class="p-1 mx-2 hover:bg-gray-200 w-8 rounded-full transition 0.1s"
          >
            <i class="fas fa-times flex-auto"> </i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  props: ['isOpen'],
  data: () => ({
    
  }),
};
</script>

<style></style>
