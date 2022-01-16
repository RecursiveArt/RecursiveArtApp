<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">
      Marketplace
    </div>

    <div class="row q-gutter-lg">
      <NFTCard
        class="page-card"
        v-for="nft in nfts"
        :key="nft.token_id"
        :nft="nft"
      >
        <template v-slot:footer>
          <!-- Price -->
          <q-item-section side>
            <q-item-label class="text-bold">
              {{ tokenValueTxt(nft.price, 0.0001, "ETH") }}
            </q-item-label>
          </q-item-section>

          <!-- Buy -->
          <q-item-section>
            <q-btn label="Buy" color="secondary" text-color="dark" />
          </q-item-section>
        </template>
      </NFTCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { tokenValueTxt } from "../util/formatting";

import NFTCard from "../components/NFTCard";

export default defineComponent({
  name: "PageIndex",

  components: { NFTCard },

  setup() {
    const store = useStore();

    const nfts = computed(() => store.state.web3.offers);

    store.dispatch("getMarket");

    // let listener = null;
    // onBeforeMount(async () => {
    //   listener = await store.dispatch("listenMarket");
    //   console.log(listener);
    // });
    // onBeforeUnmount(() => {
    //   if (listener) {
    //     listener.unsubscribe();
    //     listener = null;
    //     console.log(listener);
    //   }
    // });

    return {
      tokenValueTxt,
      nfts
    };
  }
});
</script>
