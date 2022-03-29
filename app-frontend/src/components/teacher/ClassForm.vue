<template>
  <div>
    <div v-show="showForm" class="overlay flex items-center">
      <!--------- Forms --------->

      <!-- Add Class -->
      <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white" v-if="form == 'add_class'">
        <div class="p-10">
            <h2 class="text-2xl p-2 mt-6 md:mt-0 text-center font-light text-gray-900 mb-4">
                  <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
                  <span class="font-semibold"> {{ title }} </span>
              </h2>
            <div v-if="errorMsg.length > 0">
              <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
                {{ errorMsg }}
              </p>
            </div>

            <!-- Input: Name -->
            <h5 class="flex text-lg align-left w-full font-semibold my-1">class name</h5>
            <div class="p-3 mx-0 h-14 flex align-center">
              <input type="text"
              v-model="inputs.addClass.name"
              class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
              w-5/6 outline-none inset-0 text-gray-900 transition 0.2s" 
              placeholder="class name"
              />
            </div>

            <!-- Input: Choose students -->
            <h5 class="flex text-lg align-left w-full font-semibold my-3">select students</h5>
            <div class="block md:flex md:space-x-5">
              <div class="w-full md:w-1/2">
                <h2 class=""> students to add </h2>
                <ul class="w-full h-32 md:h-48 overflow-y-scroll">
                  <li class="px-3 py-1 m-2 bg-gray-100 border-gray-700 border-l-2 w-full" v-if="params.students.length == 0">
                    -
                  </li>
                  <li class="px-3 py-1 m-2 bg-gray-100 border-gray-700 border-l-2 w-full" v-for="(student, studentIndex) in params.students" :key="studentIndex">
                  {{ student.last_name }}, {{ student.first_name }}

                  <button class="p-1 float-right rounded text-white bg-green-700 hover:bg-green-600 transition 0.1s"
                  type="button"
                  @click="addStudentToList(student, studentIndex)">
                    <i class="fas fa-plus"/>
                  </button>
                  </li>
                </ul>
              </div>
              <div class="w-full md:w-1/2">
                <h2> added students to class </h2>
                <ul class="w-full h-32 md:h-48 overflow-y-scroll">
                  <li class="px-3 py-1 m-2 bg-gray-100 border-gray-700 border-l-2 w-full" v-if="params.studentsToAdd.length == 0">
                    <span class="font-semibold"> No students </span>
                  </li>
                  <li class="px-3 py-1 m-2 bg-gray-100 border-gray-700 border-l-2 w-full" v-for="(student, studentIndex) in params.studentsToAdd" :key="studentIndex">
                    {{ student.last_name }}, {{ student.first_name }}

                    <button class="p-1 float-right rounded text-white bg-red-700 hover:bg-red-600 transition 0.1s"
                    type="button"
                    @click="removeStudentFromList(student, studentIndex)">
                      <i class="fas fa-minus"/>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="md:flex">
              <button
                  type="button"
                  @click="validateChoices()"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-green-600
                  hover:bg-green-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  confirm 
              </button>
              <button
                  type="text"
                  @click="closeForm"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-red-600
                  hover:bg-red-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  cancel 
              </button>
            </div>
          </div>
      </div>

      <!-- Add Student -->
      <div
        class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white"
        v-if="form == 'add_student'">
        <div class="p-10">
            <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                  <i class="fas fa-user text-blue-400 mx-2"></i>
                  <span class="font-bold"> {{ title }} </span>
                  <span class="block p-2 text-lg font-semibold text-gray-700">to class {{ params.class.class_name }} </span>
              </h2>
            <div v-if="errorMsg.length > 0">
              <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
                {{ errorMsg }}
              </p>
            </div>

            <!-- Input: Choose student -->
            <div class="align-center w-full my-5 text-gray-800">
              <h5 class="inline text-lg font-semibold" >choose student</h5>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 w-5/6">
                <select v-model="inputs.addStudent.student"
                class="form-select appearance-none
                  block
                  w-full
                  px-4
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded-3xl
                  transition
                  ease-in-out
                  m-0
                  hover:border-blue-500 hover:bg-gray-100
                  focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none" aria-label="Select student">
                    <option v-for="(student, studentIndex) in params.students"
                    :key="studentIndex"
                    :value="student">
                      {{ student.last_name}}, {{ student.first_name}}
                    </option>
                </select>
              </div>
            </div>
                    
            <!-- -->

            <div>
            </div>

            <div class="md:flex">
              <button
                  type="button"
                  @click="validateChoices()"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-green-600
                  hover:bg-green-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  confirm 
              </button>
              <button
                  type="text"
                  @click="closeForm"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-red-600
                  hover:bg-red-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  cancel 
              </button>
            </div>
          </div>
      </div>

      <!-- Rename Class -->
      <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white" v-if="form == 'rename_class'">
          <div class="p-10">
            <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                  <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
                  <span class="font-semibold"> {{ title }} </span>
                  <span class="block mx-2 font-semibold text-lg text-gray-700"> {{ params.class.class_name }} </span>
              </h2>
            <div v-if="errorMsg.length > 0">
              <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
                {{ errorMsg }}
              </p>
            </div>

            <!-- Input: New class to rename to -->
            <div class="p-3 m-3 h-14 flex align-center">
              <i class="fas fa-pencil-alt m-3 text-gray-600"/>
              <input type="text"
              v-model="inputs.renameClass.name"
              class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
              w-full outline-none inset-0 text-gray-900 transition 0.2s" 
              placeholder="new class name"
              />
            </div>

            <div class="md:flex">
              <button
                  type="button"
                  @click="validateChoices()"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-green-600
                  hover:bg-green-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  confirm 
              </button>
              <button
                  @click="closeForm"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-red-600
                  hover:bg-red-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  cancel 
              </button>
            </div>
          </div>
        </div>

    <!-- Add assignment -->
    <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white" v-if="form == 'add_assignment'">
      <div class="p-10">
         <h2 class="text-2xl p-2 mt-6 md:mt-0 text-center font-light text-gray-900 mb-4">
            <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
            <span class="font-semibold"> {{ title }} </span>
          </h2>
          <div v-if="errorMsg.length > 0">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>

          <!-- Inputs: Name (text-field) -->
          <h5 class="flex text-lg align-left w-full font-semibold my-1">assignment name</h5>
          <div class="p-3 mx-0 h-14 flex align-center">
            <input type="text"
            v-model="inputs.addAssignment.name"
            class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
            w-5/6 outline-none inset-0 text-gray-900 transition 0.2s" 
            placeholder="assignment name"
            />
          </div>

          <!-- Inputs: Description (text-area) -->
          <h5 class="flex text-lg align-left w-full font-semibold my-1">assignment description</h5>
          <div class="p-3 mx-0 h-14 flex align-center">
            <textarea type="text"
            v-model="inputs.addAssignment.description"
            class="block p-1 m-1 h-full border-b-2 z-10 bg-gray-50 hover:border-blue-400 focus:border-blue-400
            w-5/6 outline-none inset-0 text-gray-900 transition 0.2s" 
            placeholder="assignment description"
            />
          </div>

          <!-- Inputs: URL (uploads pdf into system; url for pdf is created) -->
          <h5 class="flex text-lg align-left w-full font-semibold my-1">assignment PDF</h5>
          <div class="p-3 mx-0 h-16 flex align-center">
            <input type="file"
            accept=".pdf"
            class="block p-1 m-1 h-full rounded-lg border-2 border-gray-300 hover:border-blue-500
            w-5/6 outline-none inset-0 text-gray-900 hover:text-gray-500 transition 0.2s" 
            placeholder="assignment description"
            />
          </div>

          <!-- Inputs: Deadline (dateTime input) -->
          <h5 class="flex text-lg align-left w-full font-semibold my-1">assignment deadline</h5>
          <div class="p-3 mx-0 h-14 flex align-center">
            <input type="datetime-local"
            v-model="inputs.addAssignment.deadline"
            class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
            w-5/6 outline-none inset-0 text-gray-900 transition 0.2s" 
            placeholder="deadline"
            />
          </div>

        <!-- -->
        <div class="md:flex">
              <button
                  type="button"
                  @click="validateChoices()"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-green-600
                  hover:bg-green-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  confirm 
              </button>
              <button
                  @click="closeForm"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-red-600
                  hover:bg-red-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  cancel 
              </button>
        </div>
      </div>
    </div>

     <!-- Edit assignment -->
    <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white" v-if="form == 'edit_assignment'">
      <div class="p-10">
          <h2 class="text-2xl p-2 mt-6 md:mt-0 text-center font-light text-gray-900 mb-4">
            <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
            <span class="font-semibold"> {{ title }} </span>
          </h2>
          <div v-if="errorMsg.length > 0">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div> 
          <!-- -->
          <div class="md:flex">
              <button
                  type="button"
                  @click="validateChoices()"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-green-600
                  hover:bg-green-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  confirm 
              </button>
              <button
                  @click="closeForm"
                  class="
                  md:w-4/6
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-red-600
                  hover:bg-red-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  cancel 
              </button>
          </div>
      </div>
    </div>

     <!-- See submissions -->
    <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white" v-if="form == 'see_submissions'">
      <div class="p-10">
         <h2 class="text-2xl p-2 mt-6 md:mt-0 text-center font-light text-gray-900 mb-4">
            <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
            <span class="font-semibold"> {{ title }} </span>
          </h2>
          <div v-if="errorMsg.length > 0">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>

          <!-- Submissions -->
          <div class="block m-2 p-2 md:grid md:grid-cols-2 col">
            <!-- Submissions list -->
            <div class="m-1 p-1 w-full text-left">
              <h2 class="p-2 m-1 text-white font-semibold bg-gray-900 rounded-t-lg"> submissions </h2>
              <ul class="w-full overflow-y-scroll h-28 md:h-60">
                <li class="m-1 text-base bg-gray-200 border-l-4 rounded-sm border-gray-800 truncate"
                v-for="(submission, subIndex) in params.submissions" :key="subIndex">
                  <span class="m-1 font-bold truncate">
                  <i class="fas fa-user p-1 m-1 text-lg text-left"></i>
                  {{ submission.last_name }},<span class="font-normal"> {{ submission.first_name}} </span> </span>


                  <button class="p-1 m-1 bg-gray-900 rounded hover:bg-gray-700 float-right transition 0.1s"
                  @click="selectSubmission(submission)">
                    <i class="fas fa-pencil-alt m-2 text-white"/>
                  </button>
                  <button class="p-1 m-1 bg-blue-900 rounded hover:bg-blue-700 float-right transition 0.1s"
                  @click="openFile(submission)">
                    <i class="fas fa-file m-2 text-white"/>
                  </button>
                </li>              
              </ul>
            </div>

            <!-- Feedback -->
            <div class="m-1 p-2 w-full text-left">
              <!-- Rendering depending on if a submission has been selected -->
              <h2 v-if="!selectedStudent" class="p-2 m-1 text-white font-semibold bg-gray-900 rounded-t-lg"> feedback </h2>
              <h2 v-if="selectedStudent" class="p-2 m-1 text-white font-semibold bg-gray-900 rounded-t-lg"> {{ selectedStudent.last_name }}, {{ selectedStudent.first_name }} </h2>

              <div v-if="!selectedStudent" class="p-5 m-1 h-auto bg-gray-200 font-bold text-gray-800 text-center">
                No submission currently selected
              </div>

              <div v-if="selectedStudent" class="p-1 m-1">    
                <!-- Inputs: Grade (text-field) -->
                <h5 class="mt-3 flex text-base w-full font-semibold my-1">grade</h5>
                <div class="p-3 mx-0 h-14 flex w-full align-center">
                  <input id="feedback-grade" type="text"
                  v-model="inputs.editFeedback.grade"
                  class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
                  w-5/6 outline-none inset-0 text-gray-900 transition 0.2s"
                  />
                </div>

                <!-- Inputs: Comments (text-area) -->
                <h5 class="flex text-base w-full font-semibold my-1">comments</h5>
                <div class="p-3 mx-0 h-14 flex align-center">
                  <textarea id="feedback-comments" type="text"
                  v-model="inputs.editFeedback.comments"
                  class="block p-1 m-1 h-full border-b-2 z-10 bg-gray-50 hover:border-blue-400 focus:border-blue-400
                  w-5/6 outline-none inset-0 text-gray-900 transition 0.2s" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="md:flex">
            <!-- -->
              <button
                  v-if="selectedStudent"
                  type="button"
                  @click="validateChoices()"
                  class="
            
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-green-600
                  hover:bg-green-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  confirm 
              </button>
              <button
                
                  @click="submissionFormCloseHandler()"
                  class="
    
                  w-full
                  py-2
                  my-6
                  md:mx-10
                  rounded-full
                  block
                  md:inline
                  font-bold
                  text-base
                  md:text-lg
                  bg-red-600
                  hover:bg-red-700
                  text-gray-100
                  focus:outline-none
                  "
              >
                  cancel 
              </button>
          </div>
      </div>
    </div>
     <!-- Alert Box: Form validation -->
        <Alert
          :show="showAlert"
          :close="closeAlert"
          :success="alertSuccess"
          v-bind:title="alertMessage"
          v-bind:description="alertDescription"
        />
    </div>
  </div>
</template>

<script>
import Alert from '../general/Alert';

export default {
  props: ['showForm', 'submit', 'closeForm', 'title', 'form', 'params', 'refreshData'],
  components: {
    Alert
  },
  data: () => ({
    /* The teacher's email and the school code */
    email: localStorage.getItem('user'),
    schoolID: localStorage.getItem('schoolCode'),

    /* The inputs of the form that will be validated */
    inputs: {
      addClass: {
        name: '',
      },
      addStudent: {
        student: null,
      },
      renameClass: {
        name: ''
      },
      addAssignment: {
        name: '',
        description: '',
        file_upload: null,
        deadline: '',
      },
      editAssignment: {
        name: '',
        description: '',
        file_upload: null,
        deadline: '',
      },
      editFeedback: {
        grade: '',
        comments: '',
      },
    },

    /* Selected student (for submissions) */
    selectedStudent: {
      feedback: {}
    },

    /* The alert information */
    showAlert: false,
    alertMessage: '',
    alertDescription: '',
    alertSuccess: false,

    /* Form info */
    errorMsg: '',

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
      this.showForm = false;
    },

    /**
     * Closes the alert dialog box.
     */
    closeAlert() {
      this.showAlert = false;
      this.showForm = false;
      (this.alertMessage = ''), (this.alertDescription = '');
    },

    /*--- Submission and Feedback functions  ---*/
    submissionFormCloseHandler() {
      this.closeForm();
      this.selectedStudent = null;
    },

    openFile(submission) {
      /* Opens file of selected submisison */
    },

    async selectSubmission(submission) {
      /* Get current feedback of selected student */
      var feedback = await this.getFeedback(submission.submission_code, this.params.assignment.assignment_code);

      this.inputs.editFeedback.grade = feedback.grade;
      this.inputs.editFeedback.comments = feedback.comments;

      submission.feedback = feedback;

      /* Set selected submission */
      this.selectedStudent = submission;
    },

    async getFeedback(submissionCode, assignmentCode) {
      var feedback = null;
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_submission_feedback`,
          { 
            responseType: 'json',
            submission_code: `${submissionCode}`,
            assignment_code: `${assignmentCode}`,
          },
        )
        .then((response) => {
          if (response) {
            feedback = response.data.data;
            console.log('Feedback for selected submission: ', feedback);
          }
        })
      } catch (e) {
        console.log(e);
      }
      return feedback;
    },

    /*--- Request functions  ---*/

    /**
     * Request to add a new class into school and update database
     * @param inputs - the inputs required
     */
    async addClass(inputs) {
      var success = false;
      console.log('ADD CLASS REQUEST; Inputs: ', inputs);
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/add_class`,
          { 
            responseType: 'json',
            class_code: `${inputs.class_code}`,
            class_name: `${inputs.class_name}`,
            year: `${inputs.year}`,
            student_emails: `${inputs.student_emails}`,
            school_code: `${this.schoolID}`,
            teacher_email: `${this.email}`,
          },
        )
        .then((response) => {
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

    /**
     * Request to add a new student into school and update database
     * @param inputs - the inputs required
     */
    async addStudent(inputs) {
      var success = false;
      console.log('ADD STUDENT REQUEST; Inputs: ', inputs);
      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/add_students_to_class`,
          { 
            responseType: 'json',
            class_code: `${inputs.class_code}`,
            student_emails: `${inputs.student_emails}`,
            school_code: `${this.schoolID}`,
          },
        )
        .then((response) => {
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

    /**
     * Request to rename class and update database
     * @param inputs - the inputs required
     */
    async renameClass(inputs) {
      var success = false;
      console.log('RENAME CLASS REQUEST; Inputs: ', inputs);

      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/rename_class`,
          { 
            responseType: 'json',
            class_code: `${inputs.class_code}`,
            new_name: `${inputs.class_name}`,
            school_code: `${this.schoolID}`,
          },
        )
        .then((response) => {
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
    
    /**
     * Request to update feedback on a submission
     * @param inputs - the inputs required
     */
    async updateFeedback(inputs) {
      var success = false;
      console.log('UPDATE FEEDBACK REQUEST; Inputs: ', inputs);

      try {
        await this.$axios
        .post(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/update_feedback`,
          { 
            responseType: 'json',
            grade: `${inputs.class_code}`,
            teacher_email: `${this.email}`,
            comments: `${inputs.comments}`,
            feedback_no: `${inputs.feedback_no}`,
            submission_code: `${inputs.submission_code}`,
            assignment_code: `${inputs.assignment_code}`
          },
        )
        .then((response) => {
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

    /*--- Validation choices ---*/

    /**
     * Validates the inputs of the form
     * @param action The form to make action on (i.e. add class, 
     * add student or renaming a class)
     */
    async validateChoices() {
      console.log('Inputs: ', this.inputs);
      console.log('Params: ', this.params);
      if (this.form == 'add_class') {
        /* Form Inputs: name, students to add */
        var name = this.inputs.addClass.name;

        /* The list of students to add to newly added class */
        var studentsToAdd = this.params.studentsToAdd;
        
        /* ... and their emails */
        var studentEmails = studentsToAdd.map((student) => student.student_email);

        /* Other inputs: year, assigned class code */
        var year = this.params.year;
        var classCode = this.params.classCode;

        /* Validate name: must be between length 3-30 characters */
        if (name.trim().length == 0) {
          this.errorMsg = 'Must enter a class name'
        } else if (name.trim().length < 3) {
          this.errorMsg = 'Class name must be at least 3 characters long'
        } else if (name.trim().length > 30) {
          this.errorMsg = 'Class name can only be 30 characters max'
        } else {
          /* The form input is valid */
          this.errorMsg = '';

          /* Call request to add class into database... */
          var success = await this.addClass({
            class_code: classCode,
            class_name: name,
            year: year,
            student_emails: studentEmails.toString(),
          });
          
          /* Alert if the database update is successful */
          if (success) {
            this.alertUser('Successfully added class',
            'Class ' + this.inputs.addClass.name +
            ' added to school',
            true)

            /* Refresh data */
          this.refreshData();
          } else {
            this.alertUser('Unable to add class',
            'Try again later',
            false)
          }
        }
      } else if (this.form == 'add_student') {
        /* Form Inputs: student to add */
        var studentToAdd = [];
        studentToAdd.push(this.inputs.addStudent.student);

        /* ...and their email */
        var studentEmail = studentToAdd.map((student) => student.student_email);

        /* Other inputs: class code */
        var classCode = this.params.class.class_code;
        
        /* Validate student */
        if (studentEmail != null) {
          /* The form input is valid */
          this.errorMsg = '';

          /* Call request to add student into class and update database... */
          var success = await this.addStudent({
           class_code: classCode,
           student_emails: studentEmail.toString(),
          });

          /* Alert if the database update is successful */
          if (success) {
            this.alertUser('Successfully added student to class',
            this.inputs.addStudent.student.first_name + ' ' +
            this.inputs.addStudent.student.last_name,
            true)

            /* Refresh data */
            this.refreshData();
          } else {
            this.alertUser('Unable to add student',
            'Try again later',
            false)
          }
        } else {
          this.errorMsg = 'Must select a student';
        }
      } else if (this.form == 'rename_class') {
        /* Form Inputs: new name for class */
        var name = this.inputs.renameClass.name;

         /* Other inputs: class code, school */
        var classCode = this.params.class.class_code;

         /* Validate name: must be length > 0 */
        if (name.length == 0 || name == this.params.class.class_name) {
          this.errorMsg = 'Must enter a new name for class'
        } if (name.length < 3) {
          this.errorMsg = 'New class name must be at least 3 characters long'
        } else {
          /* The form input is valid */
          this.errorMsg = '';

         /* Call request to rename class and update database... */
         var success = await this.renameClass({
           class_code: classCode,
           class_name: name,
          });
          
          /* Alert if the database update is successful */
          if (success) {
            this.alertUser('Successfully renamed class',
            'Class renamed to ' + this.inputs.renameClass.name,
            true)
            /* Refresh data */
            this.refreshData();
          } else {
            this.alertUser('Unable to rename class',
            'Try again later',
            false)
          }
        }
      }

      /* Clear inputs */
      this.inputs.addClass.name = '';
      this.inputs.addStudent.student = null;
      this.inputs.renameClass.name = '';

      this.selectedStudent = null;
    },

    /*--- Add Class Functions ---*/

    /**
     * Updates list of students selected,
     * when a student (to add) is added to the list.
     * @param student - the student to add to the list
     * @param index - the index of the student
     */
    addStudentToList(student, index) {
      /* Add student to added list */
      this.params.studentsToAdd.push(student);
      /* Remove student from selection list */
      this.params.students.splice(index, 1);
    },

    /**
     * Updates list of students selected,
     * when a student (to add) is removed to the list.
     * @param student - the student to add to the list
     * @param index - the index of the student
     */
    removeStudentFromList(student, index) {
      /* Add student to selection list */
      this.params.students.push(student)
      /* Add student to added list */
      this.params.studentsToAdd.splice(index, 1);
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

</style>
