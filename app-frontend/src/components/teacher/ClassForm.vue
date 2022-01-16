<template>
  <div v-show="show" class="overlay flex items-center">
    <!-- Add Class -->
    <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white" v-if="form == 'add_class'">
      <form class="p-10">
          <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
                <span class="font-semibold"> {{ title }} </span>
            </h2>
          <div v-if="errorMsg != ''">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>

          <!-- name -->
          <h5 class="flex text-lg align-left w-full font-semibold my-1">class name</h5>
          <div class="p-3 mx-0 h-14 flex align-center">
            <input type="text"
            required
            autofocus
            class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
            w-5/6 outline-none inset-0 text-gray-900 transition 0.2s" 
            placeholder="class name"
            />
          </div>

          <!-- year -->
          <h5 class="flex text-lg align-left w-full font-semibold my-3">select year</h5>
          <div class="flex justify-center">
            <div class="mb-3 w-5/6">
              <select class="form-select appearance-none
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
                focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none" aria-label="Select Year">
                  <option value="12"> Year 12 </option>
                  <option value="12"> Year 13 </option>
              </select>
            </div>
          </div>

          <!-- choose students -->
          <h5 class="flex text-lg align-left w-full font-semibold my-3">select students</h5>
          <div>

          </div>

          <div class="md:flex">
            <button
                type="submit"
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
                type="submit"
                @click="close"
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
        </form>
    </div>

    <!-- Add Student -->
    <div
      class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white"
      v-if="form == 'add_student'">
      <form class="p-10">
          <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                <i class="fas fa-user text-blue-400 mx-2"></i>
                <span class="font-bold"> {{ title }} </span>
                <span class="block p-2 text-lg font-semibold text-gray-700">to class {{ params.class.class_name }} </span>
            </h2>
          <div v-if="errorMsg != ''">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>

          <!-- -->
          <div class="align-center w-full my-5 text-gray-800">
             <h5 class="inline text-lg font-semibold" >choose student</h5>
          </div>
          <div class="flex justify-center">
            <div class="mb-3 w-5/6">
              <select class="form-select appearance-none
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
                type="submit"
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
                type="submit"
                @click="close"
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
        </form>
    </div>

    <!-- Rename Class -->
     <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-white" v-if="form == 'rename_class'">
        <form class="p-10">
          <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
                <span class="font-semibold"> {{ title }} </span>
                <span class="block mx-2 font-semibold text-lg text-gray-700"> {{ params.class.class_name }} </span>
            </h2>
          <div v-if="errorMsg != ''">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>

          <div class="p-3 m-3 h-14 flex align-center">
            <i class="fas fa-pencil-alt m-3 text-gray-600"/>
            <input type="text"
            required
            autofocus
            class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
            w-full outline-none inset-0 text-gray-900 transition 0.2s" 
            placeholder="new class name"
            />
          </div>

          <div class="md:flex">
            <button
                type="submit"
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
                @click="close"
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
        </form>
      </div>
  </div>
</template>

<script>
export default {
  props: ['show', 'submit', 'close', 'title', 'form', 'params', 'errorMsg'],
  data: () => ({
      errorMssg: '',
  }),
  mounted() {

  },
  methods: {
    /*--- Add Class Functions ---*/

    /**
     * Updates list of students selected,
     * when a student (to add) is added to the list.
     * @param student - the student to add to the list
     * @param index - the index of the student
     */
    addStudentToList(student, index) {
      /* Add student to added list */
      params.studentsToAdd.push(student);
      /* Remove student from selection list */
      params.students.splice(index, 1);
    },

    /**
     * Updates list of students selected,
     * when a student (to add) is removed to the list.
     * @param student - the student to add to the list
     * @param index - the index of the student
     */
    removeStudentFromList(student, index) {
      /* Add student to selection list */
      params.students.push(student)
      /* Add student to added list */
      params.studentsToAdd.splice(index, 1);
    }
  },
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
