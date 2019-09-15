<template>
  <div class="item">
    <b-list-group-item>
      <b-form v-on:submit.prevent>
        <b-input-group>
          <b-form-input v-model="newName" @keydown.enter="change" @blur="change" />
          <div class="float-right">
            <button v-on:click="up">▲</button>
            <button v-on:click="down">▼</button>
            <button v-on:click="remove">削除</button>
          </div>
        </b-input-group>
      </b-form>
    </b-list-group-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    name: String,
    amount: Number
  },
  data: function() {
    return {
      newName: ""
    };
  },
  created: function() {
    this.$data.newName = this.$props.name;
  },
  methods: {
    up: function() {
      this.$emit("up", this.name);
    },
    down: function() {
      this.$emit("down", this.name);
    },
    remove: function() {
      this.$emit("remove", this.name);
    },
    change: function() {
      this.$emit("change", this.name, this.newName);
    }
  }
})
export default class SortableItem extends Vue {}
</script>
