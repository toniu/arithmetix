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
          <i class="fas fa-chalkboard-teacher mx-3 rounded-full p-3 bg-blue-500"> </i>
          My classes
        </h2>
        <div v-for="(teacherClass, tcIndex) in classData" :key="tcIndex">
          
          <div v-if="teacherClass.teaches" class="m-1 px-5 py-2 bg-gray-900 text-white text-lg text-left">
          Class
          <span class="font-bold"> {{ teacherClass.class_name }} </span>   
          </div>
          <button v-if="teacherClass.teaches" class="px-5 py-2 m-1 rounded w-full md:w-auto text-white bg-green-800 hover:bg-green-700 transition 0.1s">
            Add new student
            <i
              class="
                m-1
                fas
                fa-pencil-alt
              "
            />
          </button>
          <ul v-if="teacherClass.teaches" class="p-1 m-1 bg-gray-100 inline-block w-full">
            <li
              class="
                px-3
                my-1
                flex
                justify-between
                bg-white
                shadow-lg
                border-l-4 border-gray-800
                box-border
                w-full
              "

              v-for="(student, studentIndex) in teacherClass.students" :key="studentIndex"
            >
              <span class="m-1 font-bold truncate"> {{ student.last_name }},<span class="font-normal"> {{ student.first_name }} </span> </span>
              <div class="inline">
                <button>
                  <i
                    class="
                      px-2
                      py-2
                      m-1
                      fas
                      fa-pencil-alt
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
                      fa-trash
                      rounded
                      text-white
                      bg-red-600
                      hover:bg-red-500
                      transition
                      0.1s
                    "
                  />
                </button>
              </div>
            </li>
          </ul>
        </div>
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
    schoolID: localStorage.getItem('schoolCode'),
    classData: {},
  }),
  mounted() {
    this.getClassData();
  },
  methods: {
    async getClassData() {
      /* All existing classes of school */
      var classData = await this.getClassesInSchool();
      /* Classes that teacher teaches in */
      var teachedClasses = await this.getClassesTeachedBy();

      /* Only create class data if the data actually exists */
      if (classData) {
        for (const i in classData) {
          if (classData[i]) {
            classData[i].teaches = false;
            for (const tc in teachedClasses) {
              console.log(tc);
              if (teachedClasses[tc]) {
                /* Checks for classes that teacher teaches in */
                if (classData[i].class_code == teachedClasses[tc].class_code) {
                  classData[i].teaches = true;
                }
              }
            }

            /* Get students of class */
            var studentsInClass = await this.getStudentsInClass(classData[i].class_code);
            classData[i].students = studentsInClass.data;
          }
        }

        this.classData = classData;

        console.log('hello there: ', this.classData);
      }
    },
    /**
     * Gets all the classes the teacher teaches in
     */
     async getClassesTeachedBy() {
      var classes = null;
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
              classes = response.data.data;
              console.log('Classes teached by user: ', classes);
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }

      return classes;
    },

    /**
     * Gets all the classes of particular school
     */
    async getClassesInSchool() {
      var classes = null;

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
              classes = response.data.data;
              console.log('Classes: ', classes);
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }
      
      return classes;
    },

    /**
     * Gets all students in a given class
     */
    async getStudentsInClass(classID) {
      var students = null;

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
              students = response.data;
              console.log('Students in class ' + classID + ': ', students);
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }

      return students;
    },
  },
};
</script>

<style></style>
