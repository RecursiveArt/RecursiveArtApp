<template>
  <q-card class="nft-card">
    <q-item>
      <q-item-section>
        <q-item-label class="text-h6">{{ nft.name }}</q-item-label>
        <q-item-label class="text-accent">{{
          "0x" + getEllipsisTxt(nft.token_address.slice(2))
        }}</q-item-label>
      </q-item-section>
      <q-item-section v-if="$slots.header">
        <slot name="header" />
      </q-item-section>
    </q-item>
    <div
      class="nft-img"
      :style="{ backgroundImage: `url(${nft.token_uri})` }"
    />
    <q-card-section v-if="$slots.footer">
      <slot name="footer" />
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.nft-card {
  flex-grow: 1;
  min-width: 20%;
  @media (min-width: $breakpoint-sm-min) {
    max-width: calc(50% - 24px);
  }

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
