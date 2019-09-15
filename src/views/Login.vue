<template>
  <div class="login">
    <b-container>
      <b-navbar>
        <b-navbar-nav class="text-truncate">
          <b-nav-brand href="#">にちまね! -シンプルな日用品の在庫マネージャ-</b-nav-brand>
        </b-navbar-nav>
      </b-navbar>
      <b-row>
        <b-col class="align-self-center">
          <div id="firebaseui-container"></div>
        </b-col>
        <b-col>
          <div class="description">
            <img src="../assets/screenshot.png" fluid />
          </div>
        </b-col>
      </b-row>
      <div class="author text-left">
        <small>
          Developed by たいぷらいたー (<a href="https://www.nyamikan.net">にゃみかん</a>)<br>
          本サービスは無償・無保証です。認証情報はユーザ認証以外の目的では使用いたしません。
        </small>
      </div>
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
      tosUrl: './privacy_policy',
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
