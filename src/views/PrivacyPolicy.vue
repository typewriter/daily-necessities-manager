<template>
  <div class="privacy-policy text-left">
    <b-container>
      <b-navbar class="text-left">
        <b-navbar-nav>
          <b-navbar-brand href="#"><span class="small text-secondary">シンプルな日用品ストック管理ツール</span><br>Stokk</b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
      <h5>利用規約</h5>
      <ul>
        <li>本サービスは無償です。ただし、本サービスの使用によるいかなる損害についても、一切責任を負いません。</li>
      </ul>

      <h5>プライバシーポリシー</h5>
      <ul>
        <li>認証時に用いたアカウント情報は、本サービスのユーザ認証にのみ使用します。</li>
        <li>サービス上で登録・編集した情報は、本サービスの提供にのみ使用します。</li>
      </ul>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PrivacyPolicy extends Vue {}
</script>
