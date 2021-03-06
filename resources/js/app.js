/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;
import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';
import VueProgressBar from 'vue-progressbar';
import VueRouter from 'vue-router';
import Swal from 'sweetalert2';



import Gate from './Gate';
Vue.prototype.$gate = new Gate(window.user); // so that we can use $gate anywhere in our application. window.user is the authenticated user passed from @json in master

// Register the global components so that they can be accessed application wide
window.Fire = new Vue;
window.Form = Form;
window.Swal = Swal;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(VueRouter)

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.toast = toast;


// Vue filters
Vue.filter('toUpper', function(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function(date){
  return moment(date).format('MMMM Do YYYY, h:mm:ss a'); 
});

// Define Routes
let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default},
    { path: '/profile', component: require('./components/Profile.vue').default},
    { path: '/users', component: require('./components/Users.vue').default},
    { path: '*', component: require('./components/NotFound.vue').default},
  ]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

Vue.component('not-found', require('./components/NotFound.vue').default);


 /**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
      search: ''
    },
    methods:{
      searchit:_.debounce(() => {
        Fire.$emit('searching');
      }, 1000),
      printme() {
        window.print();
      }
    }
});
