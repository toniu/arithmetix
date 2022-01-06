<template>
  <div class="container block py-12 w-full mx-auto h-full max-w-none text-center">
    <div>
      <!-- 404 -->
      <section class="p-2 text-black items-center">
        <h2 class="pt-5 text-3xl text-center font-light text-gray-900 mb-4">
          <i class="fas fa-calculator text-blue-400 mx-2"></i>
          <span class="font-bold">arith</span>metix.
        </h2>
        <h1 class="text-7xl pt-5 font-bold text-center">404</h1>
        <i
          class="
            fas
            fa-route
            px-10
            py-6
            mt-7
            text-7xl
            text-gray-400
            rounded-full
          "
        ></i>
        <h2 class="text-2xl pt-10 font-semibold text-center">
          Oh no! Looks like you're lost
        </h2>
        <h3 class="text-lg font-normal text-center">
          The page you're looking for is not available
        </h3>
        <button
          class="
            px-10
            py-2
            mt-7
            justify-center
            text-center
            align-center
            bg-gray-900
            text-lg text-white
            rounded-3xl
            hover:bg-gray-700
            transition
            0.1s
          "
          @click="goBack"
        >
          Go back
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  mounted() {},
  methods: {
    /**
     * Returns back to previous page
     */
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
