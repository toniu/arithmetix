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
    /* Student information */
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