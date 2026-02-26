import ax from 'axios';

// Configure base URL for API requests
const API_URL = process.env.VUE_APP_API_URL || 
  `http://${process.env.VUE_APP_DOMAIN?.replace(/"/g, '') || 'localhost'}:${process.env.VUE_APP_API_PORT || 3000}`;

const axios = ax.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Make axios instance available globally
export { axios };

export default {
  install(Vue, options) {
    Vue.prototype.$axios = axios;
    Vue.prototype.$http = axios; // Alternative naming
  },
};