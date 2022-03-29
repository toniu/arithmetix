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

        <div class="block px-3 my-5 text-left w-full">
          <div class="shadow-lg text-sm md:text-base">
            <button @click="goTo('/student/homework')" class="p-2 w-full bg-gray-800 text-white font-semibold rounded-t-lg hover:bg-gray-700 transition 0.1s">
              <span class="p-1 float-left"> Timeline </span>
              <i class="fas fa-arrow-right float-right mx-3 my-1 text-base md:text-xl"/>
            </button>
            <div class="p-4 bg-gray-100">
              <i class="fas fa-clock text-gray-800 text-2xl md:text-3xl float-left"/>
              <span class="mx-10 p-1 flex"> 
                View upcoming deadlines
              </span>
            </div>
            <div class="block">
              <h2 class="p-2 font-semibold text-sm md:text-base"> Tuesday, 21 December </h2>
              <ul class="float-left inline-block w-full">
                <li class="p-2 m-1 bg-gray-100 box-border w-full border-l-4 border-gray-900 shadow-lg">
                  <i class="fas fa-sticky-note mx-2 px-2 py-1 text-white text-sm md:text-base bg-gray-900 rounded-full" /> 
                   <span class="text-sm md:text-base"> Quiz A </span>
                   <span class="text-sm md:text-base float-right mx-3 font-bold"> 9:00 </span>
                </li>
                <li class="p-2 m-1 bg-gray-100 box-border w-full border-l-4 border-gray-900 shadow-lg">
                  <i class="fas fa-sticky-note mx-2 px-2 py-1 text-white text-sm md:text-base bg-gray-900 rounded-full" /> 
                   <span class="text-sm md:text-base"> Quiz B </span>
                   <span class="text-sm md:text-base float-right mx-3 font-bold"> 10:00 </span>
                </li>
                <li class="p-2 m-1 bg-gray-100 box-border w-full border-l-4 border-gray-900 shadow-lg">
                  <i class="fas fa-sticky-note mx-2 px-2 py-1 text-white text-sm md:text-base bg-gray-900 rounded-full" /> 
                   <span class="text-sm md:text-base"> Quiz D </span>
                   <span class="text-sm md:text-base float-right mx-3 font-bold"> 16:00 </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="block
          md:grid md:grid-cols-2
          space-y-5
          md:space-y-3 md:space-x-3
          px-3
          py-1">
          <div class="p-2 text-left space-y-3 text-sm md:text-base">
              <div class="shadow-lg">
                <button @click="goTo('/student/quizzes')" class="p-2 w-full bg-yellow-800 text-white font-semibold rounded-t-lg hover:bg-yellow-700 transition 0.1s">
                  <span class="p-1 float-left"> Quick Quizzes </span>
                  <i class="fas fa-arrow-right float-right mx-3 my-1 text-base md:text-xl"/>
                </button>
                <div class="p-4 bg-gray-100">
                  <i class="fas fa-stopwatch text-yellow-800 text-3xl float-left"/>
                  <span class="mx-10 p-1 flex"> 
                    Quick test your knowledge on module-based questions, including: core, mechanics and statistics based questions.
                  </span>
                </div>
              </div>
              <div class="shadow-lg">
                <button @click="goTo('/student/modules')" class="p-2 w-full bg-blue-900 text-white font-semibold rounded-t-lg hover:bg-blue-800 transition 0.1s">
                  <span class="p-1 float-left"> Modules & Worksheets </span>
                  <i class="fas fa-arrow-right float-right mx-3 my-1 text-base md:text-xl"/>
                </button>
                <div class="p-4 bg-gray-100">
                  <i class="fas fa-book-open text-blue-900 text-3xl float-left"/>
                  <span class="mx-10 p-1 flex"> 
                    Gain knowledge on topics through module notes and practice on topics with provided solutions
                  </span>
                </div>
              </div>
              
          </div>
          
          <div class="h-auto space-y-5 text-sm md:text-base">
            <div class="shadow-lg">
                <button @click="goTo('/student/exam-papers')" class="p-2 w-full bg-pink-900 text-white font-semibold rounded-t-lg hover:bg-pink-800 transition 0.1s">
                  <span class="p-1 float-left"> Exam Practice </span>
                  <i class="fas fa-arrow-right float-right mx-3 my-1 text-base md:text-xl"/>
                </button>
                <div class="p-4 bg-gray-100">
                  <i class="fas fa-book-reader text-pink-900 text-3xl float-left"/>
                  <span class="mx-10 p-1 flex"> 
                    Put your knowledge into practice with provided exam papers from familiar exam boards
                  </span>
                </div>
              </div>
            <div class="block">
              <h1 class="p-3 bg-gray-900 text-white rounded-t-lg text-left font-semibold"> Upcoming Exams </h1>
              <div class="bg-gray-100">  
                <ul class="float-left inline-block w-full">
                  <li class="p-2 m-1 bg-gray-100 box-border w-full border-l-4 border-gray-900 shadow-lg">
                    <span class="text-sm md:text-base"> A-Level Paper 1 </span>
                    <span class="text-sm md:text-base float-right mx-3 font-bold lg:inline">
                      <span class="md:hidden"> Tuesday, </span>
                      7 June 2022 (PM) </span>
                  </li>
                  <li class="p-2 m-1 bg-gray-100 box-border w-full border-l-4 border-gray-900 shadow-lg">
                    <span class="text-sm md:text-base"> A-Level Paper 2 </span>
                    <span class="text-sm md:text-base float-right mx-3 font-bold">
                      <span class="md:hidden"> Tuesday, </span>
                      14 June 2022 (PM) </span>
                  </li>
                  <li class="p-2 m-1 bg-gray-100 box-border w-full border-l-4 border-gray-900 shadow-lg">
                    <span class="text-sm md:text-base"> A-Level Paper 3 </span>
                    <span class="text-sm md:text-base float-right mx-3 font-bold">
                      <span class="md:hidden"> Tuesday, </span>
                      21 June 2022 (PM) </span>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
          
              <!--
              <h1 class="p-2 w-full bg-gray-800 text-xltext-white font-semibold rounded-t-lg hover:bg-gray-700 transition 0.1s">
                <span class="p-1 float-left"> Timeline </span>
                <i class="fas fa-arrow-right float-right mx-3 my-1 text-xl"/>
              </h1>
              <div>
                <div class="p-1 rounded-xl bg-gray-900"> 
                  <span class="font-bold"> A Level Paper 1: </span> 
                  Tuesday 7 June 2022 (PM)
                </div>
              </div>
              <div class="block bg-gray-100 p-3 shadow-lg border-t-4 space-y-4 border-gray-900 rounded text-white">
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
              -->
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
  methods: {
    goTo(link) {
      this.$router.push(link);
    }
  },
};
</script>

<style></style>
