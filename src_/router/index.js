import Vue from "vue";
import Router from "vue-router";
// import store from "@/store";
// import i18n from "@/plugins/i18n";

Vue.use(Router);

const routes = [
  { path: "/sample", component: () => import("@/components/Sample.vue") },
  { path: "/Welcome", component: () => import("@/components/Welcome.vue") },
  { path: "/Hangup", component: () => import("@/components/Hangup.vue") },
  { path: "/Redial", component: () => import("@/components/Redial.vue") },
  { path: "/Call", component: () => import("@/components/Call.vue") },
  { path: "/Error", component: () => import("@/components/Error.vue") },
  { path: "/Notify", component: () => import("@/components/Notify.vue") },
  { path: "/Waiting", component: () => import("@/components/Waiting.vue") },
];

const router = new Router({
  mode: "history",
  // base: "http://localhost:8080/", // process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const title = i18n.te(to.meta.title) ? i18n.t(to.meta.title) : null;
//   document.title = title ? `${title} - SOHO` : "SOHO";
//   next();
// });

// router.beforeEach((to, from, next) => {
//   let accountStatus = store.getters['system/accountStatus']
//   const step = store.state.user.step
//   const activePlan = store.getters['user/activePlan']

//   if (!activePlan || (activePlan && step.Value !== 'finished'))
//     accountStatus = null

//   const allowed = !to.matched.some((route) => {
//     if ('allowed' in route.meta) {
//       return !route.meta.allowed.includes(accountStatus)
//     }

//     return false
//   })
// })

export default router;
