<template>
  <div
    class="antialiased min-h-screen duration-150"
  >
    <!-- Header (with sidebar, profile and notifications bar) -->
    <Navigation/>
    <!-- Main content -->
    <Dashboard v-if="$route.name == 'student' "> </Dashboard>
    <router-view v-if="$route.name != 'student' "> </router-view>
    <!-- Footer -->
    <Footer/>
  <div>
  </div>
  </div>
</template>

<script>
import Navigation from '../general/Navigation';
import Dashboard from '../student/Dashboard';
import Footer from '../general/Footer';

export default {
  components: {
    Navigation,
    Dashboard,
    Footer,
  },
  data: () => ({
    /* Navigation */
    navigationLabels: ['Dashboard','Quizzes','Modules','Homework','Exam Papers'],
    selected: '',
    menu: [
      {title: "Home", icon: "", url: "/", submenus: []},
      {title: "Quizzes", icon: "", url: "/", submenus: []},
      {
        title: "Modules",
        icon: "",
        url: "/",
        submenus: [
          {title: "Revision Notes", icon: "", url: "/"},
          {title: "Practice Worksheets", icon: "", url: "/"}
        ],
      },
      {title: "Homework", icon: "", url: "/", submenus: []},
      {title: "Exam Papers", icon: "", url: "/", submenus: []},
    ],

    /* Progress bar */
    circumference: 30 * 2 * Math.PI,

    /* Student information */
    email: localStorage.getItem('user'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    isStudent: localStorage.getItem('student'),
    isTeacher: localStorage.getItem('teacher'),
    /* Notifications -- will be coded later */
  }),
  mounted() {},
  methods: {
    
  },
};
</script>

<style></style>