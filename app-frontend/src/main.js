/* eslint-disable max-len */
import Vue from 'vue'
import App from './App.vue'
import './css/tailwind.css';

import VueTailwind from 'vue-tailwind';
import router from './router';
import VueAxios from './plugins/axios';

/* Vue libraries to use */
Vue.use(VueTailwind);
Vue.use(VueAxios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  data() {
    return {
      children: []
    }
  },
  template: '<App/>',
  /* Watch for current route and its children */
  watch: {
    $route: function(currentRoute) {
      console.log('GO TO ', currentRoute);
      const route = this.$router.options.routes.find(route => route.path === currentRoute.path)
      if (route && Array.isArray(route.children)) {
        this.children = route.children
      } else if (route) {
        this.children = []
      }
    }
  }
});

