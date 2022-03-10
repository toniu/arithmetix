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

        <div class="flex space-x-1">
          <button class="px-5 py-2 md:rounded-3xl font-bold text-sm w-full md:w-11/12 text-white bg-green-800 hover:bg-green-700 transition 0.1s"
          @click="addNewClass(12)">
            Add Year 12 Class
            <i
              class="
                m-1
                fas
                fa-plus
              "
            />
        </button>
        <button class="px-5 py-2 md:rounded-3xl font-bold text-sm w-full md:w-11/12 text-white bg-green-800 hover:bg-green-700 transition 0.1s"
        @click="addNewClass(13)">
          Add Year 13 Class
          <i
            class="
              m-1
              fas
              fa-plus
            "
          />
        </button>
        </div>
      
        <div v-for="(teacherClass, tcIndex) in classData" :key="tcIndex">
          
          <div v-if="teacherClass.teaches" class="m-1 px-5 py-2 bg-gray-900 text-white text-lg text-left">
            <span>
              Class
              <span class="font-bold"> {{ teacherClass.class_name }} </span> 
            </span>
            <div class="inline">
              <!-- Rename class -->
                <button class="mx-2"
                @click="renameClass(teacherClass)">
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
                <div class="float-right">
                  <!-- Add new student to class -->
                  <button class=""
                  @click="addNewStudent(teacherClass)">
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
                  <!-- Delete class -->
                  <button class=""
                  @click="deleteClass(teacherClass)">
                    <i
                      class="
                        p-2
                        m-1
                        fas
                        fa-trash-alt
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
                <button
                @click="removeStudent(teacherClass, student)">
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

    <!-- Alert box -->
    <Alert
      :show="showAlert"
      :close="closeAlert"
      :success="alertSuccess"
      v-bind:title="alertMessage"
      v-bind:description="alertDescription"
    />

    <!-- Confirmation box -->
    <Confirm
      :showDialog="showConfirm"
      :closeDialog="closeConfirm"
      v-bind:title="confirmMessage"
      v-bind:description="confirmDescription"
      v-bind:params="actionParams"
      :icon="actionIcon"
      :refreshData="getClassData"
      :action="actionChosen"

    />

    <!-- Form box -->
    <Form
      :showForm="formShow"
      :submit="submitMethod"
      :closeForm="formRefresh"
      v-bind:title="formTitle"
      v-bind:form="formChosen"
      v-bind:params="formParams"
      :refreshData="getClassData"
    />
  </div>
</template>

<script>
import Alert from '../general/Alert';
import Confirm from '../general/Confirm';
import Form from '../teacher/ClassForm'

export default {
  name: 'Classes',
  components: {
    Alert,
    Confirm,
    Form
  },
  data: () => ({
    email: localStorage.getItem('user'),
    schoolID: localStorage.getItem('schoolCode'),
    classData: {},
    
    /* Alert information */
    showAlert: false,
    alertMessage: '',
    alertDescription: '',
    alertSuccess: false,

     /* Confirm information */
    showConfirm: false,
    confirmMessage: '',
    confirmDescription: '',
    actionChosen: '',
    actionParams: null,
    actionIcon: '',
    confirmAnswer: false,

    /* Form information */
    formShow: false,
    submitMethod: null,
    formTitle: '',
    formChosen: '',
    formParams: null,
  }),
  mounted() {
    this.getClassData();
  },
  methods: {
    /*--- Alert methods ---*/
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

    /*--- Confirm methods ---*/
    /**
     * Open dialog to confirm action: YES or NO buttons
     * @param {String} action - the action to execute if confirmed
     * @param {String} params - the parameters required for the action
     */
    confirmAction(action, params) {
      if (action == 'delete_class') {
        var className = params.class.class_name;

        this.confirmMessage = 'Delete class';
        this.confirmDescription = 'Confirm deleting class ' +
        className + '?';
        this.actionIcon = 'fa fa-trash-alt py-6 text-7xl text-white';
      } else if (action == 'remove_student') {
        var className = params.class.class_name;

        this.confirmMessage = 'Remove student';
        this.confirmDescription = 'Confirm removing student ' +
        params.student.first_name + ' ' + params.student.last_name +
        ' from class ' +
        className + '?';
        this.actionIcon = 'fa fa-user-minus py-6 text-7xl text-white';
      }

      this.actionChosen = action;
      this.actionParams = params;
      this.showConfirm = true;
    },

    /**
     * Closes the alert dialog box.
     */
    closeConfirm() {
      this.showConfirm = false;
      this.actionParams = null;
      (this.confirmMessage = ''), (this.confirmDescription = '');
    },

    /*--- Form Methods ---*/
    
    /**
     * Opens the form based on user's chosen action
     * @param {String} form - the form chosen based on action
     * @param {String} object - the selected model (a student or class)
     */
    openForm(form, params, year) {
      console.log('Opened form params: ', params);
      var title = '';
      if (form == 'add_class') {
        title = 'add year ' + year + ' class'
      } else if (form == 'add_student') {
        title = 'add student'
      } else if (form == 'rename_class') {
        title = 'rename class'
      } 

      this.formTitle = title;
      this.formChosen = form;
      this.formParams = params;
      this.formShow = true;
    },

    /**
     * Closes the form
     */
    async formRefresh() {
      
      /* Refresh data */
      await this.getClassData();

      /* Close form */
      this.formShow = false;
      (this.formTitle = ''), (this.formChosen = ''),
      (this.formParams = {});
    },

    /*--- Retrieve Data ---*/

    /**
     * Gets class data of logged in user's school
     */
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

    /**
     * Gets all students in a specific year
     * @param yearOfSchool the year
     * @return The students found in the specific year of a school
     */
    async getStudentsByYear(yearOfSchool) {
      var students = null;

      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_students_by_year`,
          { 
            responseType: 'json',
            school_code: `${this.schoolID}`,
            year: `${yearOfSchool}`
          },
        )
        .then((response) => {
          if (response) {
              /* Students in class */
              students = response.data;
              console.log('Students by year ' + yearOfSchool + + ': ', students);
            }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }

      return students;
    },

    /*--- Button Actions ---*/

    /**
     * Opens a dialog box to confirm the action of 
     * deleting a class
     * @param teacherClass - the class selected
     */
    deleteClass(teacherClass) {
      /* --- */
      this.confirmAction('delete_class', {class: teacherClass})
    },

    /**
     * Opens a dialog box to confirm the action of 
     * removing a student from a class
     */
    removeStudent(teacherClass, studentSelected) {
      /* --- */
      this.confirmAction('remove_student',
      {class: teacherClass, student: studentSelected})
    },


    /**
     * Opens a form to add a new class into a school;
     * provides a list of students the user can add into the
     * new class as well.
     * @param year - The year
     */
    async addNewClass(year) {
      /* Generate new class code */
      var classesCount = this.classData.length
      var newClassCode = 1;

      /* Auto-increment, otherwise new class code is 1 */
      if (classesCount > 0) {
        var latestClass = this.classData[classesCount - 1];
        newClassCode = latestClass.class_code + 1;
      }

      console.log('NEW CC IS... ', newClassCode);

      console.log('new class code of class to add: ', newClassCode);
       /* Get all students of year */
       var studentsOfYear = await this.getStudentsByYear(year);
       var SOYArray = studentsOfYear.data;

       /* Students to choose from (i.e. students of the same year who are not in any class) */
      const studentsToChooseFrom = SOYArray.filter(student => student.class_code == 0);
      console.log('Students to add from', studentsToChooseFrom);

       this.openForm('add_class',
       {students: studentsToChooseFrom,
       studentsToAdd: [],
       year: year,
       classCode: newClassCode},
       year);
      /* ... */
    },

    /**
     * Opens a form to select a student to add into a class
     * @param classID - The selected class code to add the student into
     * @param year - The year
     */
    async addNewStudent(teacherClass) {
      var classID = teacherClass.class_code;
      var year = teacherClass.year;

      /* Get all students of year */
       var studentsOfYear = await this.getStudentsByYear(year);
       var SOYArray = studentsOfYear.data;
       console.log('SOY ', SOYArray );

      /* Only pick from students who are not in a class */
      var studentsToChooseFrom = SOYArray.filter(student => student.class_code == 0);
      console.log('Students to add from', studentsToChooseFrom);

      if (studentsToChooseFrom.length > 0) {
        this.openForm(
        'add_student',
        {class: teacherClass,
        students: studentsToChooseFrom,
        studentsToAdd: []},
        year);
      } else {
        console.log('There are no students of this year to add');
        this.alertUser('Cannot add student',
        'There are no students from Year ' + year + ' (who is not in a class) to add in this class',
        false);
      }
    },

    /**
     * 
     */
    renameClass(teacherClass) {
      this.openForm('rename_class', {class: teacherClass}, null);
    },


    /*--- Submit methods ---*/

    async submitDeleteStudent(student) {
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