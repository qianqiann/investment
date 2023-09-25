// Import vue components
// import MyHeader from "./MyHeader.vue";
import TheFooter from './segments/TheFooter.vue';

// font-awesome
import FontAwesomeIcon from './fontawesome';

export default {
  install(Vue /*, options */) {
    // Vue.component("my-header", MyHeader);
    Vue.component('the-footer', TheFooter);

    // font-awesome
    Vue.component('fa-icon', FontAwesomeIcon);
  },
};
