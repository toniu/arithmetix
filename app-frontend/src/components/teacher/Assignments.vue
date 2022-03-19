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

        <div class="flex space-x-1">
          <button class="px-5 py-2 md:rounded-3xl font-bold text-sm w-full  text-white bg-green-800 hover:bg-green-700 transition 0.1s"
          @click="addNewAssignment()">
            Add Assignment
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
                  >
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
                  >
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
                >
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
        
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: 'Assignments',
    components: {},
    data: () => ({
      email: localStorage.getItem('user'),
      schoolID: localStorage.getItem('schoolCode'),
      assignmentsData: {},

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
      this.getAssignments();
    },
    methods: {},
};
</script>

<style></style>
