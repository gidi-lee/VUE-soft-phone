<template>
  <div id="app">
  <Phone/>

  </div>
</template>

<script>
import Phone from "./components/Phone.vue";

export default {
  name: "App",
  components: {
    Phone,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
