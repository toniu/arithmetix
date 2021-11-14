import Vue from 'vue'
import App from './App.vue'
import './css/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable max-len */

import Vue from 'vue';
import VueTailwind from 'vue-tailwind';
import App from './App';
import router from './router';
import VueToastify from 'vue-toastify';
import VueCookies from 'vue-cookies';
import VueAxios from './plugins/axios';

import './assets/tailwind.css';

import {
  TTable,
  TPagination,
  TAlert,
  TDropdown,
  TDialog,
  TInput,
  TButton,
} from 'vue-tailwind/dist/components';

const settings = {
  't-table': {
    component: TTable,
    props: {
      classes: {
        table:
          'rounded min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
        thead: '',
        theadTr: '',
        theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
        tbody: 'bg-white divide-y divide-gray-100',
        tr: '',
        td: 'px-3 py-2 whitespace-no-wrap',
        tfoot: '',
        tfootTr: '',
        tfootTd: '',
      },
      variants: {
        thin: {
          td: 'p-1 whitespace-no-wrap text-sm',
          theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm',
        },
      },
    },
  },
  't-input': {
    component: TInput,
    props: {
      fixedClasses:
        'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes:
        'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-orange-500  ',
      variants: {
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        success:
          'border-green-300 bg-green-50 placeholder-gray-400 text-green-900',
      },
    },
  },
  't-TDialog': {
    component: TDialog,
  },
  't-alert': {
    component: TAlert,
    props: {
      fixedClasses: {
        wrapper: 'relative flex items-center p-4 border-l-4  rounded shadow-sm',
        body: 'flex-grow',
        close:
          'absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded  focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
        closeIcon: 'fill-current h-4 w-4',
      },
      classes: {
        wrapper: 'bg-blue-50 border-blue-500',
        body: 'text-blue-700',
        close: 'text-blue-500 hover:bg-blue-200',
      },
      variants: {
        danger: {
          wrapper: 'bg-red-50 border-red-500',
          body: 'text-red-700',
          close: 'text-red-500 hover:bg-red-200',
        },
        success: {
          wrapper: 'bg-green-50 border-green-500',
          body: 'text-green-700',
          close: 'text-green-500 hover:bg-green-200',
        },
        info: {
          wrapper: 'bg-blue-50 border-blue-500',
          body: 'text-blue-700 text-sm',
          close: 'text-blue-500 hover:bg-blue-200',
        },
      },
    },
  },
  't-pagination': {
    component: TPagination,
    props: {
      classes: {
        wrapper: 'table border-collapse text-center bg-white mx-auto shadow-sm',
        element:
          'w-8 h-8 border border-gray-200 table-cell hover:border-blue-100',
        activeElement:
          'w-8 h-8 border border-gray-200 border-blue-500 table-cell hover:border-blue-600',
        disabledElement: 'w-8 h-8 border border-gray-200 table-cell',
        ellipsisElement: 'w-8 h-8 border border-gray-200 hidden md:table-cell',
        activeButton:
          'bg-blue-500 w-full h-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
        disabledButton:
          'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
        button:
          'hover:bg-blue-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
        ellipsis: '',
      },
      variants: {
        rounded: {
          wrapper: 'bg-white mx-auto text-center flex space-x-2',
          element: 'w-8 h-8 rounded-full',
          activeElement: 'w-8 h-8 rounded-full',
          disabledElement: 'w-8 h-8 rounded-full',
          ellipsisElement: 'w-8 h-8 rounded-full hidden md:inline',
          activeButton:
            'border border-blue-500 bg-blue-500 w-full h-full rounded-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
          disabledButton:
            'border border-gray-200  opacity-25 w-full h-full rounded-full cursor-not-allowed transition duration-100 ease-in-out',
          button:
            'border border-gray-200 hover:bg-blue-100 hover:border-blue-100 rounded-full w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
          ellipsis: '',
        },
      },
    },
  },

  't-button': {
    component: TButton,
    props: {
      fixedClasses:
        'block px-4 py-2 transition duration-100 ease-in-out focus:border-orange-500  focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes:
        'text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600',
      variants: {
        secondary:
          'text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600',
        error:
          'text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600',
        success:
          'text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600',
        link: 'text-blue-500 underline hover:text-blue-600',
      },
    },
  },
  't-dropdown': {
    component: TDropdown,
    props: {
      fixedClasses: {
        button:
          'flex items-center text-white block px-2.5 py-1 transition duration-100 ease-in-out border border-transparent rounded shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        wrapper: 'inline-flex flex-col',
        dropdownWrapper: 'relative z-10',
        dropdown:
          'md:origin-top-left origin-top-right absolute md:left-0 right-0 w-32 rounded shadow mt-1',
        enterClass: 'opacity-0 scale-95',
        enterActiveClass: 'transition transform ease-out duration-100',
        enterToClass: 'opacity-100 scale-100',
        leaveClass: 'opacity-100 scale-100',
        leaveActiveClass: 'transition transform ease-in duration-75',
        leaveToClass: 'opacity-0 scale-95',
      },
      classes: {
        button: 'bg-orange-500 hover:bg-orange-600',
        dropdown: 'bg-white',
      },
      variants: {
        danger: {
          button: 'bg-red-500 hover:bg-red-600',
          dropdown: 'bg-red-50',
        },
        info: {
          button: 'bg-blue-500 hover:bg-blue-600',
          dropdown: 'bg-blue-50',
        },
      },
    },
  },
};

Vue.use(VueTailwind, settings);
Vue.use(VueToastify);
Vue.use(VueCookies);
Vue.use(VueAxios);

Vue.config.productionTip = false;

Vue.component('modal', {
  template: '#modal-template',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});

