<template>
  <div>
    <Phone />
  </div>
</template>

<script>
import Phone from "./components/Phone.vue";
const title = process.env.VUE_APP_TITLE;
document.title = title;

export default {
  name: "App",
  components: {
    Phone,
  },
};
</script>

<style lang="scss" type="text/css">
@import "@/assets/scss/app.scss";
@import "@/assets/scss/_variable.scss";
</style>
