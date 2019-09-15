<template>
  <div class="items">
    <b-list-group>
      <SortableItem v-for="item in items"
        v-bind:key="item.name"
        :name="item.name"
        :amount="item.amount"
        v-on:up="up"
        v-on:down="down"
        v-on:remove="remove"
        v-on:change="change" />
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SortableItem from "./SortableItem.vue";

@Component({
  components: {
    SortableItem
  },
  props: {
    items: Array
  },
  methods: {
    up: function(name) {
      this.$emit("up", name);
    },
    down: function(name) {
      this.$emit("down", name);
    },
    remove: function(name) {
      this.$emit("remove", name);
    },
    change: function(oldName, newName) {
      this.$emit("change", oldName, newName);
    }
  }
})
export default class SortableItems extends Vue {}
</script>
