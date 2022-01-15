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
      <q-list></q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import UserMenu from "../components/UserMenu";

export default defineComponent({
  name: "MainLayout",

  components: {
    UserMenu
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>
