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
          <q-btn
            @click="mint(nft)"
            label="Mint Recursive"
            color="accent"
            flat
          />
        </template>

        <template v-slot:footer>
          <!-- Price -->
          <template v-if="nft.offeringId && !nft.closed">
            <q-item-section>
              <q-item-label>
                {{ tokenValueTxt(nft.price, 0.0001, "ETH") }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                @click="cancelSale(nft)"
                label="Cancel Sale"
                color="negative"
                :loading="isCanceling"
                flat
              />
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
import { useQuasar } from "quasar";

import { formatError, tokenValueTxt } from "../util/formatting";

import NFTCard from "../components/NFTCard";

export default defineComponent({
  name: "PageDashboard",

  components: { NFTCard },

  props: ["dialog"],

  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const nfts = computed(() =>
      store.state.web3.userNFTs.map(nft => store.getters.offerFromNFT(nft))
    );

    const sell = ({ token_address, token_id }) => {
      router.push({ name: "sell", params: { token_address, token_id } });
    };

    const isCanceling = ref(false);
    const cancelSale = async ({ offeringId }) => {
      if (offeringId) {
        try {
          isCanceling.value = true;
          const receipt = await store.dispatch("cancelSale", offeringId);
          console.log(receipt);
          $q.notify({
            message: "Success",
            type: "positive",
            icon: "check",
            position: "top-right"
          });
          isCanceling.value = false;
          router.back();
        } catch (error) {
          $q.notify({
            message: formatError(error),
            type: "negative",
            icon: "alert",
            position: "top-right"
          });
          console.error(error);
        } finally {
          isCanceling.value = false;
        }
      }
    };

    const mint = ({ offeringId }) => {
      router.push({ name: "mint", params: { offeringId } });
    };

    return {
      tokenValueTxt,
      nfts,
      sell,
      cancelSale,
      isCanceling,
      mint
    };
  }
});
</script>
