<template>
  <div id="phone">
    <div class="MainBoard">
      <span style="background-color: red"></span>
      <img
        class="logo"
        src="../assets/img/logo_SOHO03.png"
        srcset="
          ../assets/img/logo_SOHO03.png    1x,
          ../assets/img/logo_SOHO03@2x.png 2x
        "
      />

      <div class="SecendaryBoard">
        <Welcome
          @ChangeState="changeState"
          :companyName="companyName"
          v-if="this.state == 'NotInit'"
        />
        <Waiting
          @ChangeState="changeState"
          :companyName="companyName"
          v-if="this.state == 'Initilazing' || this.state == 'Dialing'"
        />
        <Call
          @ChangeState="changeState"
          @ChangeSubState="changeSubState"
          :companyName="companyName"
          ref="callUpdate"
          v-if="this.state == 'Call'"
        />
        <Hangup
          @ChangeState="changeState"
          :companyName="companyName"
          v-if="this.state == 'Hangup'"
        />
        <Error
          @ChangeState="changeState"
          :companyName="companyName"
          v-if="this.state == 'Error'"
        />
        <Redial
          @ChangeState="changeState"
          :companyName="companyName"
          v-if="this.state == 'RedialPage'"
        />
      </div>
      <audio id="phone_remote_audio" hidden>
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script>
import Welcome from "./Welcome.vue";
import Waiting from "./Waiting.vue";
import Call from "./Call.vue";
import Error from "./Error.vue";
import Hangup from "./Hangup.vue";
import Redial from "./Redial.vue";
import Phone from "../modules/Phone";

export default {
  name: "Phone",
  props: {},
  components: {
    Welcome,
    Waiting,
    Call,
    Error,
    Hangup,
    Redial,
  },

  data: function () {
    return {
      state: "",
      did: "",
      lang: "en",
      companyName: "",
    };
  },
  methods: {
    changeState(state) {
      this.phone.changeState(state);
    },
    updateState(state) {
      this.state = state;
    },
    changeSubState(subState, status) {
      this.phone.changeSubState(subState, status);
    },
    updateSubState(subState, status) {
      this.$refs.callUpdate.updateSubState(subState, status);
    },
  },
  // beforeMount: function () {
  mounted: function () {
    var ra = document.getElementById("phone_remote_audio")
    this.phone = new Phone(
      this.updateState.bind(this),
      this.updateSubState.bind(this),
      ra
    );
    this.did = this.phone.did;
    this.lang = this.phone.lang;
    this.companyName = this.phone.companyName // this.phone.companyName;
  },
};
</script>