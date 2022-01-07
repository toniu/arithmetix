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
            fas fa-school
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
        <span class="block text-3xl font-semibold"> homework </span>
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
    <section class="w-full grid-rows-2 md:flex">
      <!-- -->
      <div class="w-full md:w-1/2 p-3 mx-3">
        <h1 class="p-1 m-1 font-semibold uppercase text-xl bg-gray-100 rounded-xl"> Upcoming deadlines </h1>
        <ul class="p-1 m-3 inline-block w-full bg-gray-100 rounded-lg">
          <div class="p-2">
            <h2 class="text-left mx-2 p-2 font-semibold"> Wednesday 14 December </h2>
            <li class="p-1 m-2 box-border w-full text-left bg-white shadow-xl">
              <span class="block">
                <i class="block-inline fas fa-question-circle text-black p-2 md:text-lg text-2xl"></i>
                <span class="block-inline font-normal"> Quiz, Week 10</span>
                <a class="p-1 m-1 border-2 float-right rounded-xl uppercase font-semibold border-green-600 text-green-600">
                  Submit
                </a>
              </span>
              <span class="p-1 mx-2 font-semibold md:inline-block text-gray-500"> Quiz</span>
              <hr class="my-2 mx-2 border-gray-800"/>
              <span class="block px-5 py-2 font-semibold md:inline-block uppercase "> 18:00 </span>
            </li>
            <li class="p-1 m-2 box-border w-full text-left bg-white shadow-xl">
              <span class="block">
                <i class="block-inline fas fa-question-circle text-black p-2 md:text-lg text-2xl"></i>
                <span class="block-inline font-normal"> Test - End of Term</span>
                <a class="p-1 m-1 border-2 float-right rounded-xl uppercase font-semibold border-green-600 text-green-600">
                  Submit
                </a>
              </span>
              <span class="p-1 mx-2 font-semibold md:inline-block text-gray-500"> Test</span>
              <hr class="my-2 mx-2 border-gray-800"/>
              <span class="block px-5 py-2 font-semibold md:inline-block uppercase "> 16:00 </span>
            </li>
          </div>
          <div class="p-2">
            <h2 class="text-left mx-2 p-2 font-semibold"> Friday 16 November </h2>
            <li class="p-1 m-2 box-border w-full text-left bg-white shadow-xl">
              <span class="block">
                <i class="block-inline fas fa-question-circle text-black p-2 md:text-lg text-2xl"></i>
                <span class="block-inline font-normal"> Quiz B, Week 10</span>
                <a class="p-1 m-1 border-2 float-right rounded-xl uppercase font-semibold border-green-600 text-green-600">
                  Submit
                </a>
              </span>
              <span class="p-1 mx-2 font-semibold md:inline-block text-gray-500"> Quiz</span>
              <hr class="my-2 mx-2 border-gray-800"/>
              <span class="block px-5 py-2 font-semibold md:inline-block uppercase "> 17:30 </span>
            </li>
          </div>
        </ul>
      </div>
      <div class="w-full md:w-1/2 ">
        <h1 class="p-1 m-1 font-semibold uppercase text-xl bg-gray-100 rounded-xl"> Schedule </h1>
        <div id="root" class="text-center h-96 flex flex-col ">
          <h1 class="py-2 font-semibold uppercase">{{ getMonthName(month) }}, {{ year }}</h1>
          
          <ol class="grid grid-cols-7 gap-1">
            <li v-for="dayName in dayNames" :key="dayName" class="truncate p-1 border rounded-2xl bg-gray-900 text-white">
              {{ dayName }}
            </li>
          </ol>
          
          <ol class="grid grid-cols-7 flex-grow gap-1 pt-1 font-semibold">
            <li
              v-for="dayMonth in lastDayOfTheMonth"
              :key="dayMonth"
              class="p-3 flex justify-left border bg-gray-100 shadow"
              :class="[
                `${dayMonth === 1 ? `col-start-${firstDayOfTheWeek + 1}` : ''}`,
              ]">
              <span class="py-1 px-1 bg-none w-8 h-8 align-center rounded-full"
              :class="[
                `${dayMonth === dayOfTheMonth ? 'bg-blue-600 text-white' : ''}`
              ]">
                {{ dayMonth }}
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ExamPapers',
  data() {
    return {
      monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    dayNames: [
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ]
    };
  },
  computed: {
    today() {
      return new Date()
    },
    year() {
      return this.today.getFullYear()
    },
    month() {
      return this.today.getMonth()
    },
    dayOfTheMonth() {
      return this.today.getDate()
    },
    dayOfTheWeek() {
      return this.today.getDay()
    },
    firstDay() {
      return new Date(this.year, this.month, 1)
    },
    lastDay() {
      return new Date(this.year, this.month + 1, 0)
    },
    firstDayOfTheMonth() {
      return this.firstDay.getDate()
    },
    firstDayOfTheWeek() {
      return this.firstDay.getDay()
    },
    lastDayOfTheMonth() {
      return this.lastDay.getDate()
    },
    lastDayOfTheWeek() {
      return this.lastDay.getDay()
    }
  },
  methods: {
    getMonthName(index) {
      return this.monthNames[index]
    }
  },
};
</script>