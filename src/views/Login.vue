<template>
  <div class="login">
    <button v-on:click="authentication">認証</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component({
  methods: {
    authentication: function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }
})
export default class Login extends Vue {}
</script>
