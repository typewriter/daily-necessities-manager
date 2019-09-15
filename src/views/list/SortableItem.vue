<template>
  <div class="item">
    <b-list-group-item>
      <b-form v-on:submit.prevent>
        <b-input-group>
          <b-button v-on:click="up" variant="link text-decoration-none">▲</b-button>
          <b-button v-on:click="down" variant="link text-decoration-none">▼</b-button>
          <b-form-input v-model="newName" @keydown.enter="change" @blur="change" />
          <b-button v-on:click="remove" variant="link text-decoration-none"><i class="fas fa-trash"></i> 削除</b-button>
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
      this.$emit("up", (<any>this).name);
    },
    down: function() {
      this.$emit("down", (<any>this).name);
    },
    remove: function() {
      this.$emit("remove", (<any>this).name);
    },
    change: function() {
      this.$emit("change", (<any>this).name, (<any>this).newName);
    }
  }
})
export default class SortableItem extends Vue {}
</script>

<style scoped>
button.btn {
  padding: 0.35rem 0.5rem;
}

div.list-group-item {
  padding: 0.5rem 0.75rem;
}
</style>
