<template>
  <q-dialog v-bind="$attrs" :persistent="isBuying">
    <q-card>
      <q-card-section>
        <div class="text-h5">
          Buy NFT
        </div>
      </q-card-section>

      <q-separator />

      <NFTCard v-if="nft" :nft="nft">
        <template v-slot:footer>
          <!-- Price -->
          {{ tokenValueTxt(nft.price, 0.0001, "ETH") }}
        </template>
      </NFTCard>



      <q-card-actions align="right">
        <!-- Close -->
        <q-btn
          label="Cancel"
          color="primary"
          :disable="isBuying"
          v-close-popup
          flat
        />

        <!-- Buy -->
        <q-btn
          @click="confirmBuy"
          label="Buy"
          color="primary"
          text-color="dark"
          :loading="isBuying"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

import { formatError, tokenValueTxt } from "../util/formatting";

import NFTCard from "../components/NFTCard";

export default defineComponent({
  name: "DialogBuyNFT",

  components: { NFTCard },

  props: ["offeringId"],

  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();

    const nft = computed(() =>
      props.offeringId ? store.getters.offerNFT(props.offeringId) : null
    );

    const price = ref(0.01);

    const confirmBuy = async () => {
      if (!props.offeringId) {
        return;
      }
      try {
        isBuying.value = true;
        const receipt = await store.dispatch("buyNFT", props.offeringId);
        console.log(receipt);
        $q.notify({
          message: "Success",
          type: "positive",
          icon: "check",
          position: "top-right"
        });
        isBuying.value = false;
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
        isBuying.value = false;
      }
    };

    const isBuying = ref(false);

    return {
      tokenValueTxt,
      nft,
      confirmBuy,
      isBuying
    };
  }
});
</script>
