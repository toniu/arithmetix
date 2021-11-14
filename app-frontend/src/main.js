/* eslint-disable max-len */
import Vue from 'vue'
import App from './App.vue'
import './css/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'

// Vue.component('font-awesome-icon', FontAwesomeIcon)

import VueTailwind from 'vue-tailwind';
import router from './router';
import VueToastify from 'vue-toastify';
import VueCookies from 'vue-cookies';
import VueAxios from './plugins/axios';

Vue.use(VueTailwind);
Vue.use(VueToastify);
Vue.use(VueCookies);
Vue.use(VueAxios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});

