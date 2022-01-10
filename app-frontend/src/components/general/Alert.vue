<template>
  <div v-show="show" class="overlay flex items-center">
    <div class="alert opacity-100 bg-blue-50
    rounded mx-auto mt-3 w-48 animate-fade-in-down">
      <!-- If the alert box is about SUCCESS -->
      <div
        v-if="(success)"
        id="success"
        class=" bg-green-500 flex justify-center rounded"
      >
        <i class="far fa-check-circle py-6 text-7xl text-white"></i>
      </div>
      <!-- If the alert box is about FAILURE -->
      <div v-else
      id="failure"
      class=" bg-red-800 flex justify-center rounded">
        <i class="far fa-times-circle py-6 text-7xl text-white"></i>
      </div>

      <div class="alert-content p-6 opacity-100">
        <h2 class="alert-title p-2 text-black font-bold" v-text="title"></h2>
        <p class="alert-description p-2 text-black" v-text="description"></p>
      </div>
      <hr />
      <div class="alert-bottom p-3 flex items-center">
        <button
          @click="close"
          id="alert-ok"
          class="bg-gray-900 hover:bg-gray-800
          transition 0.5s px-5 flex
          items-center rounded-3xl shadow-sm text-white
          text-l font-bold p-1"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show', 'title', 'description', 'close', 'success'],
};
</script>

<style scoped>
.overlay {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
  --tw-bg-opacity: 0.5;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 10;
}

.alert {
  max-width: 100%;
  width: 24rem;
}
</style>
