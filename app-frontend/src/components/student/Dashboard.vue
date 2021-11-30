<template>
    <div
      id="main-content"
      class="container block py-12 mx-auto h-full max-w-none text-center"
    >
      <section class="p-5 bg-gray-900 flex justify-center items-center">
        <i
          class="
            fas
            fa-user
            p-3
            m-3
            flex
            text-6xl text-white
            opacity-90
            justify-center
            text-center
            align-center
          "
        ></i>
        <h1
          class="
            py-10
            mx-5
            text-4xl
            inline
            font-extrabold
            text-gray-100
            md:text-center
            leading-none
          "
        >
          <span class="block text-2xl font-normal"> Welcome back </span>
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
            {{ firstName }} {{ lastName }}
          </span>
        </h1>
      </section>
      <!-- -->
      <section
        class="
          block
          text-base
        "
      >
        <div class="px-3 m-4 text-left">
          <h1 class="font-semibold my-4 md:text-xl uppercase bg-gray-100 rounded-full px-5 py-2"> Timeline </h1>
          <div class="bg-gray-100 p-2 shadow-lg  border-t-4 border-gray-900 rounded">
                <ul class="p-2 space-y-2 text-black">
                  <li class="md:text-lg"> <i class="fas fa-sticky-note bg-gray-900 text-white p-3 mr-2 rounded-full "></i> 
                  Quiz - Week 5  <span class="float-right font-semibold"> 10:00 </span>
                  </li>
                  <li class="md:text-lg"> <i class="fas fa-sticky-note bg-gray-900 text-white p-3 mr-2 rounded-full "></i> 
                  Assignment 2  <span class="float-right font-semibold"> 16:00 </span>
                  </li>
                  <li class="md:text-lg"> <i class="fas fa-sticky-note bg-gray-900 text-white p-3 mr-2 rounded-full "></i> 
                  Quiz - Week 6 <span class="float-right font-semibold"> 12:00 </span>
                  </li>
                </ul>
            </div>
        </div>
        <div class="block
          md:grid md:grid-cols-2
          space-y-4
          md:space-y-0 md:space-x-5
          px-3
          py-1">
          <div class="p-2 text-left ">
              <h1 class="font-semibold my-4 md:text-xl uppercase bg-gray-100 rounded-full px-5 py-2"> Learning progress </h1>
              <div class="bg-gray-100 p-2 shadow-lg h-auto border-t-4 border-gray-900 rounded text-black">
                  <div class="relative pt-1">
                    <div class="flex mb-2 items-center justify-between">
                      <div>
                        <span
                          class="
                            text-xs
                            font-semibold
                            inline-block
                            py-1
                            px-2
                            uppercase
                            rounded-full
                            text-yellow-600
                            bg-yellow-200
                          "
                        >
                       <i class="fas fa-list-ul mx-2"></i>
                          Core
                        </span>
                      </div>
                      <div class="text-right">
                        <span class="text-xs font-semibold inline-block text-yellow-600">
                          30%
                        </span>
                      </div>
                  </div>
                  <div class="overflow-hidden h-2 mb-4 text-xs shadow-md flex rounded bg-yellow-100">
                    <div
                      style="width: 30%"
                      class="
                        shadow-none
                        flex flex-col
                        text-center
                        whitespace-nowrap
                        text-white
                        justify-center
                        bg-yellow-500
                      "
                    >
                    </div>
                  </div>
                </div>
                  <!-- -->
                  <div class="relative pt-1">
                    <div class="flex mb-2 items-center justify-between">
                      <div>
                        <span
                          class="
                            text-xs
                            font-semibold
                            inline-block
                            py-1
                            px-2
                            uppercase
                            rounded-full
                            text-blue-600
                            bg-blue-200
                          "
                        >
                        <i class="fas fa-chart-bar mx-2"></i>
                          Statistics
                        </span>
                      </div>
                      <div class="text-right">
                        <span class="text-xs font-semibold inline-block text-blue-600">
                          68%
                        </span>
                      </div>
                  </div>
                  <div class="overflow-hidden h-2 mb-4 text-xs shadow-md flex rounded bg-blue-100">
                    <div
                      style="width: 68%"
                      class="
                        shadow-none
                        flex flex-col
                        text-center
                        whitespace-nowrap
                        text-white
                        justify-center
                        bg-blue-500
                      "
                    >
                    </div>
                  </div>
                </div>
                  <!-- -->
                  <div class="relative pt-1">
                    <div class="flex mb-2 items-center justify-between">
                      <div>
                        <span
                          class="
                            text-xs
                            font-semibold
                            inline-block
                            py-1
                            px-2
                            uppercase
                            rounded-full
                            text-green-600
                            bg-green-200
                          "
                        >
                        <i class="fas fa-wrench mx-2"></i>
                          Mechanics
                        </span>
                      </div>
                      <div class="text-right">
                        <span class="text-xs font-semibold inline-block text-green-600">
                          70%
                        </span>
                      </div>
                  </div>
                  <div class="overflow-hidden h-2 mb-4 text-xs shadow-md flex rounded bg-green-100">
                    <div
                      style="width: 70%"
                      class="
                        shadow-none
                        flex flex-col
                        text-center
                        whitespace-nowrap
                        text-white
                        justify-center
                        bg-green-500
                      "
                    >
                    </div>
                  </div>
                </div>
                  <!-- -->
              </div>
          </div>
          <div class="p-2 justify-center ">
              <h1 class="font-semibold my-4 md:text-xl uppercase bg-gray-100 rounded-full px-5 py-2"> Upcoming exams </h1>
              <div class="bg-gray-100 p-3 shadow-lg border-t-4 space-y-4 border-gray-900 rounded text-white">
                <div class="p-1 rounded-xl bg-gray-900"> 
                  <span class="font-bold"> A Level Paper 1: </span> 
                  Tuesday 7 June 2022 (PM)
                </div>
                <div class="p-1 rounded-xl bg-gray-900"> 
                  <span class="font-bold"> A Level Paper 2: </span> 
                  Tuesday 14 June 2022 (PM)
                </div>
                <div class="p-1 rounded-xl bg-gray-900"> 
                  <span class="font-bold"> A Level Paper 3: </span> 
                  Tuesday 21 June 2022 (PM)
                </div>  
              </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),

      /* Progress bar */
    circumference: 30 * 2 * Math.PI,
    };
  },
};
</script>

<style></style>
