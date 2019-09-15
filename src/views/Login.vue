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
            <li>シンプルな操作性で使いやすい</li>
            <li>PC・スマートフォン両対応</li>
            <li>同じアカウントでログインすればどこでもアクセス可能</li>
          </ul>

          <b-card class="m-2">
            <div id="firebaseui-container" v-show="!isLoggedIn || anotherLogin"></div>
            <div v-if="isLoggedIn && !anotherLogin">
              既にログイン済みです。
              <ul class="m-3 mark-none">
                <li class="m-2"><router-link to="/"><i class="fas fa-arrow-right"></i> サービスを利用する</router-link></li>
                <li class="m-2"><b-link href="#" v-on:click="wantToAnother"><i class="fas fa-user-cog"></i> 別のユーザでログインする</b-link></li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <div class="author text-left">
        <small>
          Developed by たいぷらいたー (<a href="https://www.nyamikan.net">にゃみかん</a>)<br>
          本サービスは無償・無保証です。データは本サービスの提供以外の目的では使用しません。
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
  data: function() {
    return {
      isLoggedIn: false,
      anotherLogin: false
    }
  },
  methods: {
    wantToAnother: function() {
      this.$data.anotherLogin = true;
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$data.isLoggedIn = true;
      }
    });

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
