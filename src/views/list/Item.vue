<template>
  <div class="item">
    <span class="text-wrap">
      {{ name }}
    </span>
    <div class="float-right text-monospace">
      <b-button v-on:click="decrement" variant="link text-decoration-none">-</b-button>
      <span v-if="amount < 0" class="bg-danger text-light">{{ amount }}</span>
      <span v-if="amount == 0" class="bg-warning">{{ amount }}</span>
      <span v-if="amount > 0">{{ amount }}</span>
      <b-button v-on:click="increment" variant="link text-decoration-none">+</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    name: String,
    amount: Number
  },
  methods: {
    increment: function() {
      this.$emit('increment', this.$props.name);
    },
    decrement: function() {
      this.$emit('decrement', this.$props.name);
    }
  }
})
export default class Item extends Vue {}
</script>

<style scoped>
button.btn {
  padding: 0 0.75rem;
}

div.list-group-item {
  padding: 0.5rem 0.75rem;
}
</style>
