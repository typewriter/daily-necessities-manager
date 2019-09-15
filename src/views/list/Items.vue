<template>
  <div class="items">
    <transition-group name="list" tag="b-list-group">
      <b-list-group-item v-for="item in items" v-bind:key="item.name">
        <Item
          :name="item.name"
          :amount="item.amount"
          v-on:increment="increment"
          v-on:decrement="decrement" />
      </b-list-group-item>
    </transition-group>
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

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(50px);
}
</style>