<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">
      Dashboard
    </div>

    <div class="row q-gutter-lg">
      <NFTCard v-for="nft in nfts" :key="nft.token_uri" :nft="nft">
        <template v-slot:header>
          <q-btn label="Mint Recursive" color="primary" flat />
        </template>
        <template v-slot:footer>
          <!-- Sell -->
          <q-btn v-if="nft.price" label="Sell" color="primary" flat />

          <!-- Set price -->
          <div v-else>
            <div class="text-subtitle">
              <q-btn label="Set Sale Price" color="primary" flat />
              <div v-if="nft.price">
                {{ tokenValueTxt(nft.price, 0.0001, "ETH") }}
              </div>
            </div>
          </div>
        </template>
      </NFTCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { tokenValueTxt } from "../util/formatting";

import NFTCard from "../components/NFTCard";

export default defineComponent({
  name: "PageDashboard",

  components: { NFTCard },

  setup() {
    const store = useStore();

    const nfts = computed(() => store.state.web3.userNFTs);

    return {
      tokenValueTxt,
      nfts
    };
  }
});
</script>
