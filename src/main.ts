import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD7IaR0Uu8h_o3gUSHEURAW7JCD4BX0X8M",
  authDomain: "nyamikan.firebaseapp.com",
  databaseURL: "https://nyamikan.firebaseio.com",
  projectId: "nyamikan",
  storageBucket: "nyamikan.appspot.com",
  messagingSenderId: "1071285377200",
  appId: "1:1071285377200:web:d0c037c0dfce750fc54375"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
