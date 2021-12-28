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
            fas fa-stopwatch
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
        <span class="block text-3xl font-semibold"> quizzes </span>
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
        <span class="block p-2 m-2 text-gray-300 text-base "> Quizzes increased in difficulty from A to E </span>
    </section>
    <section class="block md:grid grid-cols-3 text-base">
      <div>
        <h2 class="p-5 m-1 rounded-t-lg bg-gray-900 text-white text-xl font-semibold text-left">
          <i class="fas fa-list-ul mx-3 rounded-full p-3 bg-yellow-500"> </i>
          Core 
          </h2>
          <div class="m-1 p-1 bg-gray-900 text-white"> A mixture of topics from modules: <span class="block font-semibold"> C1, C2, C3 and C4 </span> </div>
          <ul class="p-1 m-1 bg-gray-100">
            <li class="px-3 my-1 flex justify-between bg-white shadow-lg border-l-4 border-gray-800"
            v-for="(cQuiz, cIndex) in quizTables.coreQuizzes.quizzes"
            v-bind:key="cIndex">
              <span class="m-1 truncate"> {{ cQuiz }} </span>
              <div class="inline">
                <button>
                <i class="px-3 py-2 m-1 fas fa-info rounded text-white bg-gray-800 hover:bg-gray-700 transition 0.1s"/>
              </button> 
              <button>
                <i class="p-2 m-1 fas fa-play rounded text-white bg-green-600 hover:bg-green-500 transition 0.1s"/>
              </button>
              </div>
            </li>
          </ul>
      </div>
      <div>
        <h2 class="p-5 m-1 rounded-t-lg bg-gray-900 text-white text-xl font-semibold text-left">
          <i class="fas fa-wrench mx-3 rounded-full p-3 bg-green-600"> </i>
          Mechanics 
          </h2>
          <div class="m-1 p-1 bg-gray-900 text-white"> A mixture of topics from modules: <span class="block font-semibold"> M1 </span> </div>
          <ul class="p-1 m-1 bg-gray-100">
           <li class="px-3 my-1 flex justify-between bg-white shadow-lg border-l-4 border-gray-800"
            v-for="(mQuiz, mIndex) in quizTables.mechQuizzes.quizzes"
            v-bind:key="mIndex">
              <span class="m-1 truncate"> {{ mQuiz }} </span>
              <div class="inline">
                <button>
                <i class="px-3 py-2 m-1 fas fa-info rounded text-white bg-gray-800 hover:bg-gray-700 transition 0.1s"/>
              </button> 
              <button>
                <i class="p-2 m-1 fas fa-play rounded text-white bg-green-600 hover:bg-green-500 transition 0.1s"/>
              </button>
              </div>
            </li>
          </ul>
      </div>
      <div>
        <h2 class="p-5 m-1 rounded-t-lg bg-gray-900 text-white text-xl font-semibold text-left">
          <i class="fas fa-chart-bar mx-3 rounded-full p-3 bg-blue-600"> </i>
          Statistics 
          </h2>
          <div class="m-1 p-1 bg-gray-900 text-white"> A mixture of topics from modules: <span class="block font-semibold"> S1 </span> </div>
          <ul class="p-1 m-1 bg-gray-100">
            <li class="px-3 my-1 flex justify-between bg-white shadow-lg border-l-4 border-gray-800"
            v-for="(sQuiz, sIndex) in quizTables.statQuizzes.quizzes"
            v-bind:key="sIndex">
              <span class="m-1 truncate"> {{ sQuiz }} </span>
              <div class="inline">
                <button>
                <i class="px-3 py-2 m-1 fas fa-info rounded text-white bg-gray-800 hover:bg-gray-700 transition 0.1s"/>
              </button> 
              <button>
                <i class="p-2 m-1 fas fa-play rounded text-white bg-green-600 hover:bg-green-500 transition 0.1s"/>
              </button>
              </div>
            </li>
          </ul>
      </div>
    </section>
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: 'Quizzes',
  data() {
      return {
        quizTables: {
          coreQuizzes: {
            quizzes: ['Core A','Core B','Core C','Core D'],
          },
          mechQuizzes: {
            quizzes: ['Mechanics A', 'Mechanics B','Mechanics C','Mechanics D'],
          },
          statQuizzes: {
            quizzes: ['Statistics A', 'Statistics B', 'Statistics C', 'Statistics D'],
          },
        },
      };
    },
    mounted() {

    },
    methods: {
      async getQuizzes() {

      },
    },
};
</script>
