<template>
  <div class="logout">
    ログアウトしています...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/auth";
import router from "../router";

@Component({
  created: function() {
    firebase.auth().signOut().then(() => {
      router.push("/");
    })
  }
})

export default class Logout extends Vue {}
</script>
