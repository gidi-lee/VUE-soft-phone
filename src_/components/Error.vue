<template>
  <div>
    <div class="top"></div>
    <div class="middle">
      <br /><br /><br />
      <div id="Hello_txt">
        <span>Oops!</span>
      </div>
      <div id="_annotation_txt">
        <span> Sorry, something went wrong. Please try again later</span>
      </div>
      <br /><br />
      <div class="ellipsis" @click="changeState('RedialPage')"><span class="ok">OK</span></div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "Error",
    props: {
    companyName: { type: String },
  },

  methods: {
    changeState(state) {
      this.$emit("ChangeState", state);
    },
  },
};
</script>