<template>
  <div class="items">
    <b-list-group>
      <Item v-for="item in items"
        v-bind:key="item.name"
        :name="item.name"
        :amount="item.amount"
        v-on:increment="increment"
        v-on:decrement="decrement" />
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Item from "./Item.vue";

@Component({
  components: {
    Item
  },
  props: {
    items: Array
  },
  methods: {
    increment: function(name) {
      this.$emit("increment", name);
    },
    decrement: function(name) {
      this.$emit("decrement", name);
    }
  }
})
export default class Items extends Vue {}
</script>
