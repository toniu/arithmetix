import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Student from '@/components/Student';
import Office from '@/components/Office';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: '/student',
      name: 'student',
      component: Student,
      meta: {
        requiresAuth: true,
        is_student: true,
      },
    },
    {
      path: '/office',
      name: 'office',
      component: Office,
      meta: {
        requiresAuth: true,
        is_office: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Requested URL requires authentication.
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Checks if there is a JSON Web Token stored.
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath},
      });
    } else {
      // Requested URL requires the user to be a student.
      if (to.matched.some((record) => record.meta.is_student)) {
        // Checks if the user is a student.
        if (localStorage.getItem('student') === 'true') {
          next();
        }
      }
      // Requested URL requires the user to be office staff.
      if (to.matched.some((record) => record.meta.is_office)) {
        // Checks if the user is office staff.
        if (localStorage.getItem('office') === 'true') {
          next();
        }
      }
    }
  } else {
    next();
  }
});

export default router;
