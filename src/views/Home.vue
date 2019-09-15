<template>
  <div class="home text-left">
    <div>
      <b-navbar>
        <b-navbar-nav class="text-truncate">
          <b-nav-item href="#">にちまね!</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button v-on:click="toggle" variant="link text-decoration-none">
            <span v-if="!isEditMode"><i class="far fa-edit"></i> 編集</span>
            <span v-if="isEditMode"><i class="far fa-check-circle"></i> 完了</span>
          </b-button>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <ItemAdder
      v-on:add="itemAdd" />
    <div v-if="!isEditMode">
      <Items
        :items="items"
        v-on:increment="increment"
        v-on:decrement="decrement" />
    </div>
    <div v-if="isEditMode">
      <SortableItems
        :items="items"
        v-on:up="up"
        v-on:down="down"
        v-on:remove="itemRemove"
        v-on:change="rename" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Items from "./list/Items.vue";
import ItemAdder from "./list/ItemAdder.vue";
import SortableItems from "./list/SortableItems.vue";
import firebase, { firestore } from "firebase";
import lodash from "lodash";

@Component({
  components: {
    ItemAdder,
    Items,
    SortableItems
  },
  data: () => {
    return {
      items: [], // { name: "アイテム1", amount: 2 }, { name: "洗剤", amount: 3 }]
      isEditMode: false,
      db: firebase.firestore(),
      auth: firebase.auth()
    };
  },
  created: function() {
    const auth: firebase.auth.Auth = this.$data.auth;
    const db: firestore.Firestore = this.$data.db;
    let vm = this;
    db.collection("users").doc(auth.currentUser!.uid).get().then((doc) => {
      // FIXME: TODO: ローディング表示とか
      if (doc.exists) {
        vm.$data.items = doc.data()!.items;
      } else {
        console.log("No data");
      }
    }).catch((err) => {
      // FIXME: こ↑こ↓
      console.error(err);
    });
  },
  methods: {
    increment: function(name) {
      for (let item of this.$data.items) {
        if (item.name == name) {
          item.amount++;
        }
      }
    },
    decrement: function(name) {
      for (let item of this.$data.items) {
        if (item.name == name) {
          item.amount--;
        }
      }
    },
    itemAdd: function(name) {
      if (name == "") {
        return;
      }
      for (let item of this.$data.items) {
        if (item.name == name) {
          return;
        }
      }
      this.$data.items.unshift({ name: name, amount: 0 });
    },
    itemRemove: function(name) {
      for (let i = 0; i < this.$data.items.length; i++) {
        if (this.$data.items[i].name == name) {
          this.$data.items.splice(i, 1);
          return;
        }
      }
    },
    up: function(name) {
      for (let i = 1; i < this.items.length; i++) {
        if (this.items[i].name == name) {
          let tmp = this.items[i-1];
          this.items.splice(i-1, 1);
          this.items.splice(i, 0, tmp);
          return;
        }
      }
    },
    down: function(name) {
      for (let i = 0; i < this.items.length - 1; i++) {
        if (this.items[i].name == name) {
          let tmp = this.items[i];
          this.items.splice(i, 1);
          this.items.splice(i+1, 0, tmp);
          return;
        }
      }
    },
    rename: function(oldName, newName) {
      for (let item of this.$data.items) {
        if (item.name == oldName) {
          item.name = newName;
          return;
        }
      }
    },
    toggle: function() {
      this.$data.isEditMode = !this.$data.isEditMode;
    }
  },
  watch: {
    items: {
      // TODO: FIXME: 更新表示をつける
      handler: lodash.debounce(function() {
        const auth: firebase.auth.Auth = this.auth;
        const db: firestore.Firestore = this.db;
        db.collection("users").doc(auth.currentUser!.uid).set({ items: this.items }).then(() => {
          console.log('保存しました');
        }).catch((err) => {
          console.error(err);
        });
      }, 2000),
      deep: true
    }
  }
})
export default class Home extends Vue {}
</script>
