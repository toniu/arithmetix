<template>
    <div
      id="main-content"
      class="container block py-12 mx-auto h-full max-w-none text-center"
    >
      <section class="p-5 bg-gray-900 flex justify-center items-center">
        <i
          class="
            fas
            fa-chalkboard-teacher
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
        <h2
          class="
            p-5
            m-1
            rounded-t-lg
            bg-gray-900
            text-white text-xl
            font-semibold
            text-left
          "
        >
          <i class="fas fa-school mx-3 rounded-full px-3 py-4 bg-gray-300 text-gray-800"> </i>
          <span class="mx-1"> <span class="font-light"> Teaching at </span> {{ schoolInfo.school_name }}
            <span class="block font-normal text-base text-gray-300 ml-20"> {{ schoolInfo.city }}, {{ schoolInfo.county }}, United Kingdom </span> 
          </span> 
        </h2>
        <!-- Teaching -->
        <h1 class="font-semibold my-1 md:text-xl rounded-full text-left px-5 py-2"> Teaching </h1>
        <div class="block
          md:grid md:grid-cols-2
          space-y-4
          md:space-y-0 md:space-x-5
          px-3
          py-1">
              <!-- Assign -->
              <div class="shadow-lg">
                <button @click="goTo('/teacher/assignments')" class="p-2 w-full bg-green-800 text-white font-semibold rounded-t-lg hover:bg-green-700 transition 0.1s">
                  <span class="p-1 float-left"> Quick Assign </span>
                  <i class="fas fa-arrow-right float-right mx-3 my-1 text-xl"/>
                </button>
                <div class="p-4 bg-gray-100">
                  <i class="fas fa-clipboard-list text-green-800 text-3xl float-left"/>
                  <span class="mx-10 p-1 flex"> 
                    Find and assign tests and exercises for students to do
                  </span>
                </div>
              </div>
              <!-- Feedback -->
              <div class="shadow-lg">
                <button @click="goTo('/teacher/assignments')" class="p-2 w-full bg-purple-900 text-white font-semibold rounded-t-lg hover:bg-purple-800 transition 0.1s">
                  <span class="p-1 float-left"> Quick Feedback </span>
                  <i class="fas fa-arrow-right float-right mx-3 my-1 text-xl"/>
                </button>
                <div class="p-4 bg-gray-100">
                  <i class="fas fa-comments text-purple-900 text-3xl float-left"/>
                  <span class="mx-10 p-1 flex"> 
                    Send feedback to students about any questions
                  </span>
              </div>
          </div>
        </div>

        <h1 class="font-semibold my-1 md:text-xl rounded-full text-left px-5 py-2"> Manage </h1>
        <div class="block
          md:grid md:grid-cols-2
          space-y-4
          md:space-y-0 md:space-x-5
          px-3
          py-1">
              <!-- Assign -->
              <div class="shadow-lg">
                <button @click="goTo('/teacher/classes')" class="p-2 w-full bg-blue-600 text-white font-semibold rounded-t-lg hover:bg-blue-500 transition 0.1s">
                  <span class="p-1 float-left"> Manage Classes </span>
                  <i class="fas fa-arrow-right float-right mx-3 my-1 text-xl"/>
                </button>
                <div class="p-4 bg-gray-100">
                  <i class="fas fa-chalkboard text-blue-600 text-2xl float-left"/>
                  <span class="mx-10 p-1 flex"> 
                    View, edit and add/remove existing classes in the school
                  </span>
                </div>
              </div>
              <!-- Feedback -->
              <div class="shadow-lg">
                <button @click="goTo('/teacher/classes')" class="p-2 w-full bg-blue-900 text-white font-semibold rounded-t-lg hover:bg-blue-800 transition 0.1s">
                  <span class="p-1 float-left"> Manage Students </span>
                  <i class="fas fa-arrow-right float-right mx-3 my-1 text-xl"/>
                </button>
                <div class="p-4 bg-gray-100">
                  <i class="fas fa-users text-blue-900 text-3xl float-left"/>
                  <span class="mx-10 p-1 flex"> 
                    View, edit and add/remove existing students in classes
                  </span>
              </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'TeacherDB',
  data() {
    return {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      schoolID: localStorage.getItem('schoolCode'),
      schoolInfo: {},
    };
  },
  mounted() {
    this.getSchoolData();
  },
  methods: {
    goTo(link) {
      this.$router.push(link);
    },

    /**
     * Gets school information
     */
    async getSchoolData() {
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_school_info`,
          { 
            responseType: 'json',
            school_code: `${this.schoolID}`,
          },
        )
        .then((response) => {
          if (response) {
              /* School data */
              var schoolData = response.data.data;
              console.log('School is: ', schoolData);
              this.schoolInfo = schoolData;
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }
    }
  },
};
</script>

<style></style>
