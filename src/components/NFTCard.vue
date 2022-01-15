<template>
  <q-card class="nft-card">
    <q-item>
      <q-item-section>
        <q-item-label class="text-h6">{{ nft.title }}</q-item-label>
        <q-item-label class="text-accent">{{
          "0x" + getEllipsisTxt(nft.owner.slice(2))
        }}</q-item-label>
      </q-item-section>
      <q-item-section v-if="$slots.header">
        <slot name="header" />
      </q-item-section>
    </q-item>
    <div class="nft-img" :style="{ backgroundImage: `url(${nft.imgURL})` }" />
    <q-card-section>
      <div class="text-subtitle">
        <div class="text-bold">Price</div>
        <div>{{ tokenValueTxt(nft.price, 0.0001, "ETH") }}</div>
      </div>
    </q-card-section>
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
    max-width: 50%;
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
import { getEllipsisTxt, tokenValueTxt } from "../util/formatting";

export default defineComponent({
  name: "NFTCard",

  props: ["nft"],

  setup() {
    return {
      getEllipsisTxt,
      tokenValueTxt
    };
  }
});
</script>
