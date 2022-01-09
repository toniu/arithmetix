<template>
  <!-- Main -->
  <div
    id="main"
    class="container block py-12 mx-auto h-full max-w-none text-center"
  >
    <section class="block p-5 bg-gray-900 justify-center items-center">
      <i
        class="
          fas
          fa-chalkboard
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
        <span class="block text-3xl font-semibold"> classes </span>
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
      <div>
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
          <i class="fas fa-list-ul mx-3 rounded-full p-3 bg-blue-500"> </i>
          Core
        </h2>
        <div class="m-1 p-1 bg-gray-900 text-white">
          Students of class        
        </div>
        <ul class="p-1 m-1 bg-gray-100">
          <li
            class="
              px-3
              my-1
              flex
              justify-between
              bg-white
              shadow-lg
              border-l-4 border-gray-800
              w-full
            "
            v-for="(s, index) in selectedClass"
            v-bind:key="index"
          >
            <span class="m-1 truncate"> {{ s.name }} </span>
            <div class="inline">
              <button>
                <i
                  class="
                    px-3
                    py-2
                    m-1
                    fas
                    fa-info
                    rounded
                    text-white
                    bg-gray-800
                    hover:bg-gray-700
                    transition
                    0.1s
                  "
                />
              </button>
              <button>
                <i
                  class="
                    p-2
                    m-1
                    fas
                    fa-play
                    rounded
                    text-white
                    bg-green-600
                    hover:bg-green-500
                    transition
                    0.1s
                  "
                />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Classes',
  components: {},
  data: () => ({
    email: localStorage.getItem('user'),
    schoolID: '',
    classData: {
      classes: [{id: '1', name: 'C128', students: ['John','Abel']},
      {id: '2', name: 'C129', students: []},
      {id: '3', name: 'C123', students: []}],
    },
    selectedClass: classData.classes[0],
  }),
  mounted() {},
  methods: {
    /**
     * Gets all the classes the teacher teaches in
     */
     async getClassesTeachedBy() {
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_classes_teached_by`,
          { 
            responseType: 'json',
            email: `${this.email}`,
          },
        )
        .then((response) => {
          if (response) {
              /* Classes */
              var classes = response.data;
              console.log('Classes teached by user: ', classes);
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Gets all the classes of particular school
     */
    async getClassesInSchool() {
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_all_school_classes`,
          { 
            responseType: 'json',
            school_code: `${this.schoolID}`,
          },
        )
        .then((response) => {
          if (response) {
              /* Classes */
              var classes = response.data;
              console.log('Classes: ', classes);
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Gets all students in a given class
     */
    async getStudentsInClass(classID) {
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_students_of_class`,
          { 
            responseType: 'json',
            school_code: `${this.schoolID}`,
            class_code: `${classID}`
          },
        )
        .then((response) => {
          if (response) {
              /* Students in class */
              var students = response.data;
              console.log('Students in class ' + classID + ': ', students);
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
