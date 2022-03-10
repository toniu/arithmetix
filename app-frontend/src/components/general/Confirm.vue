<template>
  <div>
    <div v-show="showDialog" class="overlay flex items-center">
      <div class="confirm-box opacity-100 bg-white
      rounded-lg mx-auto mt-3 w-48 animate-fade-in-down">
        <!--  -->
        <div
          class=" bg-gray-900 flex justify-center rounded"
        >
          <i :class="icon"></i>
        </div>

        <div class="confirm-box-content p-6 opacity-100">
          <h2 class="confirm-box-title p-2 text-black font-bold" v-text="title"></h2>
          <p class="confirm-box-description p-2 text-black" v-text="description"></p>
        </div>
        <hr/>

        <div class="flex">
              <button
                  type="button"
                  @click="confirmChoices(action)"
                  class="
                  w-4/6
                  py-2
                  my-6
                  mx-10
                  rounded-full
                  inline
                  font-bold
                  text-lg
                  bg-green-600
                  hover:bg-green-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  <i class="fas fa-check"></i> 
              </button>
              <button
                  @click="closeDialog"
                  class="
                  w-4/6
                  py-2
                  my-6
                  mx-10
                  rounded-full
                  inline
                  font-bold
                  text-lg
                  bg-red-600
                  hover:bg-red-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  <i class="fas fa-times"></i> 
              </button>
            </div>
      </div>
    </div>
    <!-- Alert Box: Dialog Success -->
    <Alert
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
  props: ['showDialog', 'closeDialog', 'title', 'params', 'icon', 'description', 'action', 'refreshData'],
  components: {
    Alert
  },
  data: () => ({
    /* The teacher's email and the school code */
    email: localStorage.getItem('user'),
    schoolID: localStorage.getItem('schoolCode'),

    /* The alert information */
    showAlert: false,
    alertMessage: '',
    alertDescription: '',
    alertSuccess: false
  }),
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
      this.showDialog = false;
      (this.alertMessage = ''), (this.alertDescription = '');
    },

    /*--- Action methods ---*/
    async deleteClass(inputs) {
      console.log('e2');
      var success = false;
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/delete_class`,
          { 
            responseType: 'json',
            class_code: `${inputs.class_code}`,
            student_emails: `${inputs.student_emails}`,
            school_code: `${this.schoolID}`,
          },
        )
        .then((response) => {
          console.log('e3');
          var res = response.data
          if (res.success) {
            /* Request for database update successful */
            console.log('Success');
            success = true;
          }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        /* Request unsuccessful - alert user */
        console.log(e);
        success = false;
      }

      return success;
    },

    async removeStudentFromClass(inputs) {
      console.log('e2');
      var success = false;
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/remove_students_from_class`,
          { 
            responseType: 'json',
            student_emails: `${inputs.student_emails}`,
            school_code: `${this.schoolID}`,
          },
        )
        .then((response) => {
          console.log('e3');
          var res = response.data
          if (res.success) {
            /* Request for database update successful */
            console.log('Success');
            success = true;
          }
        })
        .catch((error) => console.log(error));
      } catch (e) {
        /* Request unsuccessful - alert user */
        console.log(e);
        success = false;
      }

      return success;
    },

    /*--- Confirm choices ---*/
    async confirmChoices(action) {
      console.log('e');
      if (action == 'delete_class') {
        console.log('a1');
        /* Inputs: class code... */
        var classCode = this.params.class.class_code;
        /* The list of students to remove from deleted class */
        var studentsToRemove = this.params.class.students;
         /* ... and their emails */
        var studentEmails = studentsToRemove.map((student) => student.student_email);

        /* Call request to delete class and update database... */
        var success = await this.deleteClass({
          class_code: classCode,
          student_emails: studentEmails.toString()
        });

        /* Alert if the database update is successful */
        if (success) {
          this.alertUser('Successfully removed class',
          'Class ' + this.params.class.class_name +
          ' deleted from school',
          true)

          this.closeDialog()
          /* Refresh data */
          this.refreshData();
        } else {
          this.alertUser('Unable to delete class',
          'Try again later',
          false)
        }
      } else if (action == 'remove_student') {
        console.log('a1');
        /* Inputs: the student to remove */
        var studentToRemove = [];
        studentToRemove.push(this.params.student);

        /* ...and their email */
        var studentEmail = studentToRemove.map((student) => student.student_email);

        /* Call request to remove student from class and update database... */
        var success = await this.removeStudentFromClass({
          student_emails: studentEmail.toString()
        });

        /* Alert if the database update is successful */
        if (success) {
          this.alertUser('Successfully removed student from class ' +
          this.params.class.class_name,
          this.params.student.first_name + ' ' +
          this.params.student.last_name,
          true)

          this.closeDialog()
          /* Refresh data */
          this.refreshData();
        } else {
          this.alertUser('Unable to remove student from class',
          'Try again later',
          false)
        }
      }
    }
  }
};
</script>

<style scoped>
.overlay {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
  --tw-bg-opacity: 0.5;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 10;
}

.confirm-box {
  max-width: 100%;
  width: 24rem;
}
</style>
