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
          fa-clipboard-list
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
        <span class="block text-3xl font-semibold"> assignments </span>
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

    </section>

    <section>
      <div class="m-2 p-2">
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
          My assignments
        </h2>
      
        <div v-for="(teacherClass, tcIndex) in classData" :key="tcIndex">
          
          <div v-if="teacherClass.teaches" class="m-1 px-5 py-2 bg-gray-900 text-white text-lg text-left">
            <span>
              Class
              <span class="font-bold"> {{ teacherClass.class_name }} </span> 
            </span>      
            <button
              class="p-1"
              @click="addNewAssignment(teacherClass)">
              <i
                class="
                  p-2
                  my-1
                  mx-2
                  fas fa-plus
                  rounded
                  text-white
                  bg-green-800
                  hover:bg-green-700
                  transition
                  0.1s
                "
              />
            </button>             
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

              v-for="(assignment, aIndex) in teacherClass.assignments" :key="aIndex"
            >
              <span class="m-1 font-bold truncate">
                <i class="fas fa-user p-1 m-1 text-lg text-left"></i>
                {{ assignment.assignment_name }} </span>
              <div class="inline">
                <button
                @click="seeSubmissions(teacherClass, assignment)"
                >
                  <i
                    class="
                      p-2
                      my-1
                      mx-2
                      fas
                      fa-folder-open
                      rounded
                      text-white
                      bg-gray-900
                      hover:bg-gray-700
                      transition
                      0.1s
                    "
                  />
                </button>
                <button
                @click="editAssignment(assignment)"
                >
                  <i
                    class="
                      p-2
                      my-1
                      mx-2
                      fas
                      fa-pencil-alt
                      rounded
                      text-white
                      bg-gray-900
                      hover:bg-gray-700
                      transition
                      0.1s
                    "
                  />
                </button>
                <button
                @click="deleteAssignment(teacherClass, assignment)"
                >
                  <i
                    class="
                      p-2
                      my-1
                      mx-2
                      fa
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
            </li>
          </ul>
        </div>
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
      :refreshData="getAssignmentsData"
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
      :refreshData="getAssignmentsData"
    />
  </div>
</template>

<script>
import Alert from '../general/Alert';
import Confirm from '../general/Confirm';
import Form from '../teacher/ClassForm'

export default {
    name: 'Assignments',
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
      this.getAssignmentsData();
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
        if (action == 'delete_assignment') {
          var assignmentName = params.assignment.assignment_name;

          this.confirmMessage = 'Delete assignment';
          this.confirmDescription = 'Confirm deleting assignment ' +
          assignmentName + '?';
          this.actionIcon = 'fa fa-trash-alt py-6 text-7xl text-white';
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
      openForm(form, params) {
        var title = '';
        if (form == 'add_assignment') {
          title = 'add assignment for class ' + params.class.class_name;
        } else if (form == 'edit_assignment') {
          title = 'edit assignment';
        } else if (form == 'see_submissions') {
          title = 'submissions of ' + params.assignment.assignment_name;
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
        await this.getAssignmentsData();

        /* Close form */
        this.formShow = false;
        (this.formTitle = ''), (this.formChosen = ''),
        (this.formParams = {});
      },

      /*--- Retrieve Data ---*/

      async getAssignmentsData() {
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
                if (teachedClasses[tc]) {
                  /* Checks for classes that teacher teaches in */
                  if (classData[i].class_code == teachedClasses[tc].class_code) {
                    classData[i].teaches = true;
                  }
                }
              }

              /* Get assignments of class */
              var assignmentsOfClass = await this.getAssignmentsOfClass(classData[i].class_code);
              classData[i].assignments = assignmentsOfClass.data;
            }
          }

          this.classData = classData;
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
       * Gets all assignments in a given class
       */
      async getAssignmentsOfClass(classCode) {
        var assignments = null;
        /* Get list of assignments */
        try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_class_assignments_by_teacher`,
          { 
            responseType: 'json',
            school_code: `${this.schoolID}`,
            class_code: `${classCode}`,
            teacher_email: `${this.email}`,
          },
        )
        .then((response) => {
          if (response) {
              /* Assignments found */
              assignments = response.data;
            }
        })
        .catch((error) => console.log(error));
        } catch (e) {
          console.log(e);
        }
        return assignments;
      },

      async getSubmissions(classCode, assignmentCode) {
        var submissions = null;
        /* Get list of submissions */
        try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_submissions`,
          { 
            responseType: 'json',
            school_code: `${this.schoolID}`,
            class_code: `${classCode}`,
            assignment_code: `${assignmentCode}`,
          },
        )
        .then((response) => {
          if (response) {
              /* Submissions found */
              submissions = response.data.data;
            }
        })
        .catch((error) => console.log(error));
        } catch (e) {
          console.log(e);
        }
        return submissions;
      },

      /*--- Button Actions ---*/

      /**
       * Opens a dialog box to confirm the action of 
       * deleting an assignment
       * @param selAssignment - the class selected
       */
      deleteAssignment(selClass, selAssignment) {
        /* --- */
        this.confirmAction('delete_assignment', {class: selClass, assignment: selAssignment})
      },

      /**
       * Opens a form to add a new assignment for a class;
       * @param selClass - The selected class
       */
      addNewAssignment(selClass) {
        this.openForm('add_assignment', {class: selClass})
      },

      /**
       * Opens a form to edit an existing assignment
       * @param selAssignment The selected assignment
       */
      editAssignment(selAssignment) {
        this.openForm('edit_assignment', {assignment: selAssignment});
      },

      /**
       * Opens a form to see submissions
       * @param selClass - The selected class
       * @param selAssignment The selected assignment
       */
      async seeSubmissions(selClass, selAssignment) {
        /* Request to get all submissions of selected assingment */
        var submissionsFound = await this.getSubmissions(selClass.class_code, selAssignment.assignment_code);
      
        this.openForm('see_submissions', {assignment: selAssignment,
        submissions: submissionsFound});
      },
    },
};
</script>

<style></style>
