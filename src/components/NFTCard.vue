<template>
  <q-card class="nft-card">
    <q-item>
      <q-item-section>
        <q-item-label class="text-h6">{{ nft.title }}</q-item-label>
        <q-item-label class="text-accent">{{ nft.owner }}</q-item-label>
      </q-item-section>
      <q-item-section v-if="$slots.header">
        <slot name="header" />
      </q-item-section>
    </q-item>
    <div class="nft-img" :style="{ backgroundImage: `url(${nft.imgURL})` }" />
    <q-card-section>
      <div class="text-subtitle">
        <div class="text-bold">Price</div>
        <div>{{ nft.price }} ETH</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.nft-card {
  flex-grow: 1;
  min-width: 30%;
  max-width: 350px;

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
import { computed } from "vue";

export default {
  name: "NFTCard",

  props: ["nft"]
};
</script>
