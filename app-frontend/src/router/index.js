import Vue from 'vue';
import Router from 'vue-router';

/* Router components */
import Home from '@/components/general/Home';
import Login from '@/components/general/Login';
import Student from '@/components/student/Student';
/* Student links */
import Syllabus from '@/components/student/Syllabus';
import Modules from '@/components/student/Modules';
import Homework from '@/components/student/Homework';
import ExamPapers from '@/components/student/ExamPapers';
import Teacher from '@/components/teacher/Teacher';

/* Vue uses router */
Vue.use(Router);

/* Router has history mode */
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
        isStudent: true,
      },
      children: [
        {path: '/student/syllabus', name: 'syllabus', component: Syllabus,
          meta: {
            requiresAuth: true,
            isStudent: true,
          },
        },
        {
          path: '/student/modules', name: 'modules', component: Modules,
          meta: {
            requiresAuth: true,
            isStudent: true,
          },
        },
        {
          path: '/student/homework', name: 'homework', component: Homework,
          meta: {
            requiresAuth: true,
            isStudent: true,
          },
        },
        {
          path: '/student/exam-papers', name: 'exam papers', component: ExamPapers,
          meta: {
            requiresAuth: true,
            isStudent: true,
          },
        },
      ],
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: Teacher,
      meta: {
        requiresAuth: true,
        isTeacher: true,
      },
    },
  ],
});

/* User's route depends on role and whether they have been authenticated */
router.beforeEach((to, from, next) => {
  console.log("To: ", to);
  console.log("Next: ", next);
  /* Requested URL requires authentication. */
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    /* Checks if there is a JSON Web Token stored. */
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath},
      });
    } else {
      /* Requested URL requires the user to be a student. */
      if (to.matched.some((record) => record.meta.isStudent)) {
        /* Check if the user is a student */
        if (localStorage.getItem('student') === 'true') {
          next();
        }
      }
      /* Requested URL requires the user to be office staff. */
      if (to.matched.some((record) => record.meta.isTeacher)) {
        /* Check if the user is a teacher */
        if (localStorage.getItem('teacher') === 'true') {
          next();
        }
      }
    }
  } else {
    next();
  }
});

export default router;
