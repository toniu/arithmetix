<template>
  <div
    id="main"
    class="container block py-12 mx-auto h-full max-w-none text-center"
  >
    <section
      class="block p-5 bg-gray-900 justify-center items-center"
    >
    <i
          class="
            fas fa-book-open
            p-5
            m-2
            flex
            text-4xl text-white
            opacity-90
            justify-center
            text-center
            align-center
          "
        ></i>
        <h1
          class="
            block
            py-2
            mx-5
            text-4xl
            font-extrabold
            text-gray-100
            md:text-center
            leading-none
          "
        >
        <span class="block text-3xl font-semibold"> modules </span>
          <span
            class="
              relative
              mt-2
              text-transparent text-3xl
              bg-clip-text bg-gradient-to-br
              from-blue-300
              to-gray-200
            "
          >
          </span>
        </h1>
    </section>
    <section>
      <div v-for="type in moduleTables" :key="type">
         <h1 class="p-2 m-2 bg-gray-400 text-2xl font-bold rounded-3xl uppercase">
           {{ type.name }}
        </h1>
        <div v-for="module in type.modules" :key="module">
          <div class="p-2 font-semibold text-xl text-left bg-gray-400">
            {{ module }}
          </div>
          <table class="min-w-full leading-normal">
        <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
              >
                Topic
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left md:text-center text-xs font-semibold text-gray-900 uppercase tracking-wider"
              >
                Exam Practice
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left md:text-center text-xs font-semibold text-gray-900 uppercase tracking-wider"
              >
                Solutions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-10 h-10">
                    <i class="fas fa-pencil-alt bg-pink-800 text-white px-2 py-1 text-base sm:text-lg rounded-full "></i>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 text-left text-xs md:text-sm uppercase font-semibold">
                      Test
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white">
                <button class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-700 transition 0.1s">
                  <i class="fas fa-file-pdf  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> download pdf </span>
                </button>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button class="block md:inline-block bg-blue-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-blue-700 transition 0.1s">
                  <i class="fas fa-marker  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> solutions </span>
                </button>
              </td>
            </tr>
          </tbody>
      </table>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
    name: 'Modules',
    data() {
      return {
        moduleTables: {
          coreModules: {
            name: 'Core Modules',
            modules: ['C1','C2','C3','C4'],
          },
          mechModules: {
            name: 'Mechanics Modules',
            modules: ['M2'],
          },
          statModules: {
            name: 'Statistics Modules',
            modules: ['S1'],
          },
        },
      };
    },
    mounted() {

    },
    methods: {

    },
}
</script>