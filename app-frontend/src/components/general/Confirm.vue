<template>
  <div v-show="show" class="overlay flex items-center">
    <div class="confirm-box opacity-100 bg-blue-50
    rounded mx-auto mt-3 w-48 animate-fade-in-down">
      <!--  -->
       <div
        class=" bg-gray-900 flex justify-center rounded"
      >
        <i class="far fa-check-circle py-6 text-7xl text-white"></i>
      </div>

      <div class="confirm-box-content p-6 opacity-100">
        <h2 class="confirm-box-title p-2 text-black font-bold" v-text="title"></h2>
        <p class="confirm-box-description p-2 text-black" v-text="description"></p>
      </div>
      <hr />
      <div class="confirm-box-bottom p-3 flex items-center">
        <button
          @click="close"
          id="confirm-box-ok"
          class="bg-gray-900 hover:bg-gray-800
          transition 0.5s px-5 flex
          items-center rounded-3xl shadow-sm text-white
          text-l font-bold p-1"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show', 'title', 'description', 'close'],
  methods: {
    /*--- Conformation choices ---*/
    /**
     * Confirmation of action from dialog box.
     * Only applies for deleting items in database
     * @param answer Confirmation of action: yes or No
     */
    async confirmChoices(action, answer) {
      if (answer) {
        /* Action is confirmed */
        if (action == 'delete_class') {

        } else if (action == 'delete_student') {

        }
      } else {
        /* Action is not confirmed, close form */
        this.showForm = false;
      }
    },
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
