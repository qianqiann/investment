import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import AdmintonComponents from "./components";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "./assets/css/style.css";
import axios from 'axios';


Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(BootstrapVue);
Vue.use(AdmintonComponents);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
