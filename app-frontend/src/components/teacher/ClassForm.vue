<template>
  <div v-show="show" class="overlay flex items-center">
    <!-- Add Class -->
    <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-blue-50" v-if="form == 'add_class'">
      <form class="p-10">
          <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
                <span class="font-bold">add class</span>
            </h2>
          <div v-if="errorMsg != ''">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>
          <div
            class="
              input-div
              border-b-2
              relative
              grid
              my-5
              py-1
              focus:outline-none
            "
            style="grid-template-columns: 7% 93%"
          >
            <div class="i">
              <i class="fas fa-pencil-alt"></i>
            </div>
            <div class="div">
              <h5>class name</h5>
              <input
                id="name"
                type="text"
                v-model="name"
                required
                autofocus
                class="
                  absolute
                  w-full
                  h-full
                  py-2
                  px-3
                  outline-none
                  inset-0
                  bg-none
                  text-gray-700
                "
                style="background: none"
              />
            </div>
          </div>

          <div>
          </div>

          <div class="md:flex">
            <button
                type="submit"
                @click="handleSubmit"
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
                @click="cancel"
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
      class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-blue-50"
      v-if="form == 'add_student'">
      <form class="p-10">
          <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                <i class="fas fa-user text-blue-400 mx-2"></i>
                <span class="font-bold">add student</span>
                <span class="block p-2 text-lg font-semibold text-gray-700">to class C3500</span>
            </h2>
          <div v-if="errorMsg != ''">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>
          <div
            class="
              input-div
              border-b-2
              relative
              grid
              my-5
              py-1
              focus:outline-none
            "
            style="grid-template-columns: 7% 93%"
          >
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="div">
              <h5>choose student</h5>
              <input
                id="name"
                type="text"
                v-model="name"
                required
                autofocus
                class="
                  absolute
                  w-full
                  h-full
                  py-2
                  px-3
                  outline-none
                  inset-0
                  bg-none
                  text-gray-700
                "
                style="background: none"
              />
            </div>
          </div>

          <div>
          </div>

          <div class="md:flex">
            <button
                type="submit"
                @click="handleSubmit"
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
                @click="cancel"
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
     <div class="form-box align-center m-auto w-full md:w-5/6 justify-center p-2 rounded opacity-100 bg-blue-50" v-if="form == 'rename_class'">
        <form class="p-10">
          <h2 class="text-2xl p-2 text-center font-light text-gray-900 mb-4">
                <i class="fas fa-chalkboard-teacher text-blue-400 mx-2"></i>
                <span class="font-bold">rename class</span>
            </h2>
          <div v-if="errorMsg != ''">
            <p class="block m-2 p-2 w-full text-center text-base bg-red-100 text-red-900">
              {{ errorMsg }}
            </p>
          </div>

            <div class="p-3 border-b-2 border-gray-800 text-left"> 
                 <i class="fas fa-pencil-alt"></i>
                 <span class="mx-2 font-semibold"> CS500 </span>
            </div>
          
          <div
            class="
              input-div
              border-b-2
              relative
              grid
              my-5
              py-1
              focus:outline-none
            "
            style="grid-template-columns: 7% 93%"
          >
            <div class="i">
              <i class="fas fa-pencil-alt"></i>
            </div>
            <div class="div">
              <h5>new class name</h5>
              <input
                id="name"
                type="text"
                v-model="name"
                required
                autofocus
                class="
                  absolute
                  w-full
                  h-full
                  py-2
                  px-3
                  outline-none
                  inset-0
                  bg-none
                  text-gray-700
                "
                style="background: none"
              />
            </div>
          </div>

          <div>
          </div>

          <div class="md:flex">
            <button
                type="submit"
                @click="handleSubmit"
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
  props: ['show', 'close', 'title', 'form', 'object'],
  data: () => ({
      errorMsg: ''
  }),
  mounted() {
    const inputs = document.querySelectorAll("input");

    function addC() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function removeC() {
      let parent = this.parentNode.parentNode;
      if (this.value == "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addC);
      input.addEventListener("blur", removeC);
    });
  },
  methods: {},
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

.i {
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  transition: 0.3s;
}

.input-div > div {
  position: relative;
  height: 45px;
}

.input-div > div > h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input-div:before,
.input-div:after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #60a5fa;
  transition: 0.4s;
}

.input-div:before {
  right: 50%;
}

.input-div:after {
  left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div.focus > div > h5 {
  top: -5px;
  font-size: 15px;
}

.input-div.focus > .i > i {
  color: #60a5fa;
}

</style>
