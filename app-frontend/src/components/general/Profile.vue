<template>
  <div
    class="
      block
      fixed
      pt-2xw
      top-16
      h-auto
      w-full
      md:w-96
      right-0
      z-50
      bg-white
      shadow-xl
      rounded-b-lg
    "
    v-if="isOpen"
  >
    <div class="flex">
      <i
        class="
          fas
          fa-user
          text-white text-center
          align-center
          py-3
          text-3xl
          m-5
          bg-gray-900
          rounded-full
          w-16
          h-16
        "
        v-if="role == 'student'"
      />
      <i
        class="
          fas
          fa-chalkboard-teacher
          text-white text-center
          align-center
          py-3
          text-3xl
          m-5
          bg-gray-900
          rounded-full
          w-16
          h-16
        "
        v-else
      />
      <div class="my-7">
        <span id="profile-name" class="block text-black font-medium">
          {{ firstName }} {{ lastName }}</span
        >
        <span id="profile-email" class="block text-gray-800 font-normal">
          {{ email }}
        </span>
      </div>
    </div>
    <hr class="border-gray-900 m-3" />
    <div class="text-black">
      <!-- Profile menu buttons -->
      <div class="">
        <a
          href="#"
          class="
            px-4
            py-2
            flex
            align-center
            hover:bg-gray-200
            border-transparent border-l-4
            hover:border-gray-800
            transition
            0.1s
          "
        >
          <i class="fas fa-user-circle text-lg mx-3"></i>
          <span class="flex-auto">Your profile</span>
        </a>
        <a
          href="#"
          class="
            px-4
            py-2
            flex
            align-center
            hover:bg-gray-200
            border-transparent border-l-4
            hover:border-gray-800
            transition
            0.1s
          "
        >
          <i class="fas fa-cog text-lg mx-3"></i>
          <span class="flex-auto">Settings</span>
        </a>
        <button
          href="#"
          @click="handleLogout()"
          class="
            px-4
            py-2
            flex
            w-full
            text-white
            bg-gray-800
            hover:bg-gray-700
            transition
            0.1s
          "
        >
          <i class="fas fa-sign-out-alt text-lg mx-3"></i>
          <span class="font-semibold">Sign out</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: ['isOpen'],
  mounted() {
    /* Student information */
    this.role = localStorage.getItem('role'),
    this.email = localStorage.getItem('user'),
    this.firstName = localStorage.getItem('firstName'),
    this.lastName = localStorage.getItem('lastName')
  },
  methods: {
    /**
     * Removes all webtokens which were assigned to the logged-in user
     */
    handleLogout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('student');
      localStorage.removeItem('teacher');
      window.location.href = '/';
    },
  }
};
</script>

<style></style>
