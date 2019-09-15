<template>
  <div class="login">
    <b-container>
      <b-navbar class="text-left">
        <b-navbar-nav>
          <b-navbar-brand href="#"><span class="small text-secondary">シンプルな日用品ストック管理ツール</span><br>Stokk</b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
      <b-row>
        <b-col cols="12" lg="6" xl="6">
          <div class="description">
            <b-img :src="require('../assets/screenshot.png')" fluid />
          </div>
        </b-col>
        <b-col cols="12" lg="6" xl="6" class="align-self-center text-left">
          <ul class="m-2">
            <li>無償サービス</li>
            <li>シンプルな操作性</li>
            <li>PC・スマートフォン両対応</li>
          </ul>

          <b-card class="m-2">
            <div id="firebaseui-container"></div>
          </b-card>
        </b-col>
      </b-row>
      <div class="author text-left">
        <small>
          Developed by たいぷらいたー (<a href="https://www.nyamikan.net">にゃみかん</a>)<br>
          本サービスは無償・無保証です。データを本サービス提供以外の目的で使用することはありません。
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

<style scoped>
.small {
  font-size: 70%;
}

ul.mark-none {
  list-style: none;
}
</style>
