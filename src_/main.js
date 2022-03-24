import Vue from "vue";

import App from "./App.vue";
import AppDev from "./AppDev.vue";
import router from "./router";
import i18n from "./plugins/i18n";
// import Router from "vue-router";

// createApp(App).mount("#app");
// Vue.use(Router);
// console.log("dev ", process.env)

var app = process.env.VUE_APP_DEV_ROUTER != undefined ? AppDev : App
new Vue({
  router,
  // store,
  i18n,
  // vuetify,
  render: (h) => h(app
    
    ),
}).$mount("#app");
