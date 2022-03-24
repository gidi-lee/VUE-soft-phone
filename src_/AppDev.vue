<template>
  <div id="app">
    <router-link to="/sample"> Sample </router-link>
    <router-link to="/Welcome"> Welcome </router-link>
    <router-link to="/Hangup"> Hangup </router-link>
    <router-link to="/Redial"> Redial </router-link>
    <router-link to="/Call"> Call </router-link>
    <router-link to="/Error"> Error </router-link>
    <router-link to="/Notify"> Notify </router-link>
    <router-link to="/Waiting"> Waiting </router-link>
    <div class="MainBoard">
      <img
        class="logo"
        src="./assets/img/logo_SOHO03.png"
        srcset="
          ./assets/img/logo_SOHO03.png    1x,
          ./assets/img/logo_SOHO03@2x.png 2x
        "
      />

      <div class="SecendaryBoard">
        <router-view></router-view>
      </div>
    </div>

    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  // components: {
  //   HelloWorld,
  // },
};
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
