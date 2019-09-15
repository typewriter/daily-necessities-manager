<template>
  <div class="privacy-policy text-left">
    <b-container>
      <b-navbar>
        <b-navbar-nav class="text-truncate">
          <b-nav-item href="#">にちまね!</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <h5>利用規約</h5>
      <ul>
        <li>本サービスは無償です。ただし、本サービスの使用によるいかなる損害についても、一切責任を負いません。</li>
      </ul>

      <h5>プライバシーポリシー</h5>
      <ul>
        <li>認証時に用いたアカウント情報は、本サービスのユーザ認証にのみ使用します。</li>
      </ul>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PrivacyPolicy extends Vue {}
</script>
