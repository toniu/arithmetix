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
    <section class="block md:grid md:grid-cols-2">
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
        <button class="px-5 py-2 md:rounded-3xl font-bold w-full md:w-11/12 text-white bg-green-800 hover:bg-green-700 transition 0.1s">
            Add new class
            <i
              class="
                m-1
                fas
                fa-plus
              "
            />
          </button>
        <div v-for="(teacherClass, tcIndex) in classData" :key="tcIndex">
          
          <div v-if="teacherClass.teaches" class="m-1 px-5 py-2 bg-gray-900 text-white text-lg text-left">
            <input type="text" class="p-1 bg-none bg-gray rounded-t border-b-2 border-blue-400
            text-black"
            v-bind:placeholder="teacherClass.class_name"
            v-show="teacherClass.edit">
            <span v-show="!teacherClass.edit">
              Class
              <span class="font-bold"> {{ teacherClass.class_name }} </span> 
            </span>
            <div class="inline">
                <button class="mx-2" v-show="!teacherClass.edit"
                @click="teacherClass.edit = true">
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
                <button class="mx-2" v-show="teacherClass.edit"
                @click="confirmEditClassName(teacherClass, true)">
                  <i
                    class="
                      px-2
                      py-2
                      m-1
                      fas
                      fa-check
                      rounded
                      text-white
                      bg-green-800
                      hover:bg-green-700
                      transition
                      0.1s
                    "
                  />
                </button>
                <button class="mx-2" v-show="teacherClass.edit"
                @click="confirmEditClassName(teacherClass, false)">
                  <i
                    class="
                      px-2
                      py-2
                      m-1
                      fas
                      fa-times
                      rounded
                      text-white
                      bg-red-800
                      hover:bg-red-700
                      transition
                      0.1s
                    "
                  />
                </button>
                <button class="float-right">
                  <i
                    class="
                      p-2
                      m-1
                      fas
                      fa-user-plus
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
          </div>
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
              <span class="m-1 font-bold truncate">
                <i class="fas fa-user p-1 m-1 text-lg text-left"></i>
                {{ student.last_name }},<span class="font-normal"> {{ student.first_name }} </span> </span>
              <div class="inline">
                <button>
                  <i
                    class="
                      p-2
                      my-1
                      mx-2
                      fas
                      fa-user-minus
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

      <!-- Rest of classes -->

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
          <i class="fas fa-chalkboard-teacher mx-3 rounded-full p-3 bg-blue-700"> </i>
          Rest of classes
        </h2>
        <div v-for="(teacherClass, tcIndex) in classData" :key="tcIndex">
          
          <div v-if="!teacherClass.teaches" class="m-1 px-5 py-2 bg-gray-900 text-white text-lg text-left">
          Class
          <span class="font-bold"> {{ teacherClass.class_name }} </span>   
          </div>
          <ul v-if="!teacherClass.teaches" class="p-1 m-1 bg-gray-100 inline-block w-full">
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
              <span class="m-1 font-bold truncate">
                <i class="fas fa-user p-1 m-1 text-lg text-left"></i>
                {{ student.last_name }},<span class="font-normal"> {{ student.first_name }} </span> </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <alert
      :show="showAlert"
      :close="closeAlert"
      :success="alertSuccess"
      v-bind:title="alertMessage"
      v-bind:description="alertDescription"
    />
  </div>
</template>

<script>
import Alert from '../general/Alert';

export default {
  name: 'Classes',
  components: {
    Alert
  },
  data: () => ({
    email: localStorage.getItem('user'),
    schoolID: localStorage.getItem('schoolCode'),
    classData: {},
    
    /* Alert information */
    showAlert: true,
    alertMessage: '',
    alertDescription: '',
    alertSuccess: false,
  }),
  mounted() {
    this.getClassData();
  },
  methods: {
    /* Alert methods */
    /**
     * Alerts the user with a dialog box
     * @param {String} message - the message to alert
     * @param {String} description - the description of the message
     * @param {Boolean} success - is the alert about a success or failure?
     */
    alertUser(message, description, success) {
      this.alertMessage = message;
      this.alertDescription = description;
      this.alertSuccess = success;
      this.showAlert = true;
    },

    /**
     * Closes the alert dialog box.
     */
    closeAlert() {
      this.showAlert = false;
      (this.alertMessage = ''), (this.alertDescription = '');
    },

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
            classData[i].edit = false;
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
     * @return The classes found
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
     * @return The classes found
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
     * @param classID the class code
     * @return The students found with the class code
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

    addNewClass() {
       /* Form code */
      /* ... */
    },

    confirmEditClassName(teacherClass, confirm) {
      teacherClass.edit = false;
      if (confirm) {

      } else {

      }
    },

    async deleteStudent(student) {
      var confirm = false;
      /* Confirm delete code */
      /* ... */
      if (confirm) {
        try {
          await this.$axios
          .post(
            `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/delete_student`,
            { 
              responseType: 'json',
              email: `${student.email}`,
            },
          )
          .then((response) => {
            if (response) {
                /* Students in class */
                success = response.data;
              }
          })
          .catch((error) => console.log(error));
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>

<style></style>
