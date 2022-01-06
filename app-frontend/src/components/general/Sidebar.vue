<template>
  <nav
    class="
      fixed
      inset-0
      transform
      duration-100
      top-16
      z-50
      w-80
      bg-gray-800
      text-white
      h-full
    "
    :class="{
      'translate-x-0 ease-in opacity-100': isOpen === true,
      '-translate-x-full ease-out opacity-100': isOpen === false,
    }"
  >  
    <div class="mt-4">
      <!-- Rendering of menu buttons and icons-->
      <router-link v-for="(menuItem, index) in menu" v-bind:key="index"
        v-bind:to="menuItem.to"
        class="
          px-4
          py-2
          flex
          align-center
          hover:bg-gray-700
          border-transparent border-l-4
          hover:border-white
          transition
          0.1s
        ">
        <i v-bind:class="menuItem.icon"></i>
        <span class="flex-auto"> {{ menuItem.name }} </span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  /* For each button in the sidebar -- 
  Name, Icon, subMenuButtons if exists */
  name: 'Sidebar',
  props: ['isOpen', 'role'],
  data: () => ({
    menuItem: -1,
    menuHover: false,
    menu: [],
  }),
  mounted() {
    this.getRoutes(this.role);
  },
  methods: {
    /** Sets menu depending on user's role 
     * @param role The role of user
    */
    getRoutes(role) {
      /* Student Menu */
      var studentRoutes = [{
        name: 'home',
        to: '/student',
        icon: 'fas fa-home text-lg mx-3'
      },
      {
        name: 'quizzes',
        to: '/student/quizzes',
        icon: 'fas fa-stopwatch text-lg mx-3'
      },
      {
        name: 'modules',
        to: '/student/modules',
        icon: 'fas fa-book-open text-lg mx-3'
      },
      {
        name: 'homework',
        to: '/student/homework',
        icon: 'fas fa-school text-lg mx-3'
      },
      {
        name: 'exam papers',
        to: '/student/exam-papers',
        icon: 'fas fa-book-reader text-lg mx-3'
      }];

      /* Teacher Menu */
      var teacherRoutes = [{
        name: 'home',
        to: '/teacher',
        icon: 'fas fa-home text-lg mx-3'
      },
      {
        name: 'classes',
        to: '/teacher/classes',
        icon: 'fas fa-chalkboard text-lg mx-3'
      },
      {
        name: 'feedback',
        to: '/teacher/feedback',
        icon: 'fas fa-comments text-lg mx-3'
      },
      {
        name: 'teaching resources',
        to: '/teacher/resources',
        icon: 'fas fa-print text-lg mx-3'
      },
      {
        name: 'assignments',
        to: '/teacher/assignments',
        icon: 'fas fa-clipboard-list text-lg mx-3'
      }];

      /* Admin Menu */
      var adminRoutes = [{
        name: 'home',
        to: '/admin',
        icon: 'fas fa-home text-lg mx-3'
      },
      {
        name: '...',
        to: '/admin/...',
        icon: 'fas fa-book-reader text-lg mx-3'
      }];

      /* Set menu buttons and its routes depending on role */
      switch (role) {
        case 'student':
          this.menu = studentRoutes;
          break;
        case 'teacher':
          this.menu = teacherRoutes;
          break;
        case 'admin':
          this.menu = adminRoutes;
          break;
      }
    }
  }
};
</script>

<style>
  .router-link-exact-active {
    background: #111827;
    border-left-width: 4px;
    border-color: #93c5fd;
  }
</style>
