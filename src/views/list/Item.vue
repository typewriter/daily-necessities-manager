<template>
  <div class="item">
    <b-list-group-item>
      <span class="text-wrap">
        {{ name }}
      </span>
      <div class="float-right">
        <button v-on:click="decrement">-</button>
        {{ amount }}
        <button v-on:click="increment">+</button>
      </div>
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
