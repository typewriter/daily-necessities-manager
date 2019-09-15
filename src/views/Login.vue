<template>
  <div class="login text-left">
    <b-container>
      <div id="firebaseui-container"></div>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseui from "firebaseui-ja";
import "firebaseui/dist/firebaseui.css";

@Component({
  mounted: function() {
    var uiConfig = {
      signInSuccessUrl: './',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: './',
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign('./privacy_policy');
      }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-container', uiConfig);
  }
})
export default class Login extends Vue {}
</script>
