<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

import ICONS from "./icons";

export default defineComponent({
  name: "App",

  setup() {
    const $q = useQuasar();
    const store = useStore();

    $q.dark.set(true);

    store.dispatch("init");

    $q.iconMapFn = name => {
      const icon = ICONS[name];
      if (icon !== undefined) {
        return { icon };
      }
    };
  }
});
</script>
