<template>
  <div class="item-adder">
    <b-list-group>
      <b-list-group-item v-if="!isAddMode" v-on:click="toggle" variant="light">
        + アイテムを追加する
      </b-list-group-item>
      <b-list-group-item v-if="isAddMode">
        <b-form v-on:submit.prevent>
          <b-input-group>
            <label>+</label><b-form-input v-model="name" autofocus @keydown.enter="add" @blur="toggle" />
            <!-- <button v-on:click="toggle">完了</button> -->
          </b-input-group>
        </b-form>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: function() {
    return {
      isAddMode: false,
      name: ""
    };
  },
  methods: {
    toggle: function() {
      this.$data.isAddMode = !this.$data.isAddMode;
    },
    add: function(event) {
      if (event.keyCode !== 13) return;
      this.$emit('add', (<any>this).name);
      (<any>this).name = "";
    }
  }
})
export default class ItemAdder extends Vue {}
</script>
