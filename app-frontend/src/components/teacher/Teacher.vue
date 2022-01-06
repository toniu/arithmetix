<template>
  <div class="antialiased min-h-screen duration-150">
    <!-- Header (with sidebar, profile and notifications bar) -->
    <Navigation/>
    <!-- Main content -->
    <TeacherDB v-if="$route.name == 'teacher' "> </TeacherDB>
    <router-view v-if="$route.name != 'teacher' "> </router-view>
    <!-- Footer -->
    <Footer/>
  <div>
  </div>
  </div>
</template>

<script>
import Navigation from '../general/Navigation';
import TeacherDB from '../teacher/TeacherDB';
import Footer from '../general/Footer';

export default {
  components: {
    Navigation,
    TeacherDB,
    Footer,
  },
  data: () => ({
    /* User information */
    email: localStorage.getItem('user'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    role: localStorage.getItem('role'),
    /* Notifications -- will be coded later */
  }),
  mounted() {},
  methods: {
    
  },
};
</script>

<style></style>
