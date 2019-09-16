<template>
  <div class="home text-left">
    <header class="sticky-top">
      <b-container>
        <b-navbar type="dark" variant="primary">
          <b-navbar-nav>
            <b-nav-item-dropdown text="Stokk" id="navtitle">
              <b-dropdown-item to="/logout">ログアウト</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button v-on:click="toggle" variant="text-decoration-none" class="text-white">
                <span v-if="!isEditMode"><i class="far fa-edit"></i> 編集</span>
                <span v-if="isEditMode"><i class="far fa-check-circle"></i> 完了</span>
              </b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-navbar>
        <ItemAdder
          v-on:add="itemAdd" v-if="!isLoading && !message" />
      </b-container>
    </header>
    <b-container>
      <div v-if="isLoading">
        <b-spinner small /> 読み込んでいます...
      </div>
      <b-alert v-if="message" show variant="danger">
        {{ message }}
      </b-alert>
      <div v-if="!isLoading && !message">
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
        <div v-if="items.length == 0" class="mt-5 mx-3 text-center text-secondary">
          <div class="xlarge"><i class="far fa-list-alt"></i></div>
          アイテムは登録されていません
        </div>
      </div>
    </b-container>
    <footer class="fixed-bottom text-right">
      <span v-if="isSaving" id="saving"><b-spinner small /> 保存しています...</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Items from "./list/Items.vue";
import ItemAdder from "./list/ItemAdder.vue";
import SortableItems from "./list/SortableItems.vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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
      isLoading: true,
      isSaving: false,
      message: "",
      db: firebase.firestore(),
      auth: firebase.auth()
    };
  },
  created: function() {
    const auth: firebase.auth.Auth = this.$data.auth;
    const db: firebase.firestore.Firestore = this.$data.db;
    const vm = this;

    (<Home>this).debounceSave = lodash.debounce(function() {
        const auth: firebase.auth.Auth = vm.$data.auth;
        const db: firebase.firestore.Firestore = vm.$data.db;
        db.collection("users").doc(auth.currentUser!.uid).set({ items: vm.$data.items }).then(() => {
          vm.$data.isSaving = false;
        }).catch((err) => {
          console.error(err);
        });
      }, 1000);

    db.collection("users").doc(auth.currentUser!.uid).get().then((doc) => {
      vm.$data.isLoading = false;
      if (doc.exists) {
        vm.$data.items = doc.data()!.items;
      }
    }).catch((err) => {
      vm.$data.isLoading = false;
      vm.$data.message = "読み込めませんでした。"
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
      const vm: any = this;
      for (let i = 1; i < vm.items.length; i++) {
        if (vm.items[i].name == name) {
          let tmp = vm.items[i-1];
          vm.items.splice(i-1, 1);
          vm.items.splice(i, 0, tmp);
          return;
        }
      }
    },
    down: function(name) {
      const vm: any = this;
      for (let i = 0; i < vm.items.length - 1; i++) {
        if (vm.items[i].name == name) {
          let tmp = vm.items[i];
          vm.items.splice(i, 1);
          vm.items.splice(i+1, 0, tmp);
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
      handler: function() {
        const vm: Home = <Home>this;
        vm.$data.isSaving = true;
        vm.debounceSave();
      },
      deep: true
    }
  }
})
export default class Home extends Vue { 
  public debounceSave: any;
}
</script>

<style scoped>
div.xlarge {
  font-size: 400%;
}
</style>

<style>
li#navtitle > a {
  font-size: 115%;
  color: white;
  padding: 0;
}

#saving {
  font-size: 90%;
  color: rgba(0,0,0,0.3);
}
</style>