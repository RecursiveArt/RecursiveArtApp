<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">
      Dashboard
    </div>

    <div class="row q-gutter-lg">
      <NFTCard
        class="page-card"
        v-for="nft in nfts"
        :key="nft.token_uri"
        :nft="nft"
      >
        <template v-slot:header>
          <!-- Mint Recursive -->
          <q-btn label="Mint Recursive" color="accent" flat />
        </template>

        <template v-slot:footer>
          <!-- Price -->
          <template v-if="nft.price">
            <q-item-section>
              <q-item-label>
                {{ tokenValueTxt(nft.price, 0.0001, "ETH") }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn label="Cancel Sale" color="negative" flat />
            </q-item-section>
          </template>

          <!-- Sell -->
          <q-item-section v-else>
            <q-btn @click="sell(nft)" label="Sell" color="secondary" flat />
          </q-item-section>
        </template>
      </NFTCard>
    </div>

    <router-view :model-value="true" no-route-dismiss @hide="$router.back()" />
  </q-page>
</template>

<script>
import { defineComponent, computed, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import { tokenValueTxt } from "../util/formatting";

import NFTCard from "../components/NFTCard";

export default defineComponent({
  name: "PageDashboard",

  components: { NFTCard },

  props: ["dialog"],

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const nfts = computed(() => store.state.web3.userNFTs);

    const sell = ({ token_address, token_id }) => {
      router.push({ name: "sell", params: { token_address, token_id } });
    };

    return {
      tokenValueTxt,
      nfts,
      sell
    };
  }
});
</script>
