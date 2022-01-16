<template>
  <q-card class="nft-card">
    <q-card-section class="row q-gutter-x-sm">
      <div class="col-grow">
        <q-item-label class="text-h6">{{ nft.name }}</q-item-label>
        <q-item-label class="text-accent">{{
          "0x" + getEllipsisTxt(nft.token_address.slice(2))
        }}</q-item-label>
      </div>
      <div v-if="$slots.header">
        <slot name="header" />
      </div>
    </q-card-section>
    <div
      class="nft-img square"
      :style="{ backgroundImage: `url(${nft.token_uri})` }"
    />
    <q-card-actions v-if="$slots.footer">
      <slot name="footer" />
    </q-card-actions>
  </q-card>
</template>

<style lang="scss">
.nft-card {
  flex-grow: 1;

  .nft-img {
    background-color: $grey-9;
    background-size: contain;

    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }
}
</style>

<script>
import { defineComponent, computed } from "vue";
import { getEllipsisTxt } from "../util/formatting";

export default defineComponent({
  name: "NFTCard",

  props: ["nft"],

  setup() {
    return {
      getEllipsisTxt
    };
  }
});
</script>
