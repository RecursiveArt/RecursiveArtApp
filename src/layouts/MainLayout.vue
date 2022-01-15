<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-dark" elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          icon="menu"
          color="primary"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          RecursiveArt
        </q-toolbar-title>

        <UserMenu />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item :to="{ name: 'marketplace' }" exact clickable v-ripple>
          <q-item-section>
            <q-item-label>Marketplace</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="user" :to="{ name: 'dashboard' }" clickable v-ripple>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

import UserMenu from "../components/UserMenu";

export default defineComponent({
  name: "MainLayout",

  components: {
    UserMenu
  },

  setup() {
    const store = useStore();

    const user = computed(() => store.state.web3.user);

    const leftDrawerOpen = ref(false);

    return {
      user,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>
