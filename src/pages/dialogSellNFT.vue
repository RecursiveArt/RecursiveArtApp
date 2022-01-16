<template>
  <q-dialog v-bind="$attrs" :persistent="isSelling">
    <q-card>
      <q-card-section>
        <div class="text-h5">
          Set Price
        </div>
      </q-card-section>

      <q-separator />

      <NFTCard v-if="nft" :nft="nft" />

      <!-- Price -->
      <q-input
        v-model.number="price"
        label="Price"
        type="number"
        suffix="ETH"
        :min="0"
        :step="0.01"
        :disable="isSelling"
        autofocus
        filled
        square
      />

      <q-card-actions align="right">
        <!-- Close -->
        <q-btn
          label="Cancel"
          color="primary"
          :disable="isSelling"
          v-close-popup
          flat
        />

        <!-- Sell -->
        <q-btn
          @click="confirmSell"
          label="Sell"
          color="primary"
          text-color="dark"
          :loading="isSelling"
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

import { formatError } from "../util/formatting";

import NFTCard from "../components/NFTCard";

export default defineComponent({
  name: "DialogSellNFT",

  components: { NFTCard },

  props: ["token_address", "token_id"],

  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();

    const nfts = computed(() => store.state.web3.userNFTs);

    const nft = computed(() =>
      props.token_address
        ? store.getters.userNFT(props.token_address, props.token_id)
        : null
    );

    const price = ref(0.01);

    const confirmSell = async () => {
      if (!props.token_address) {
        return;
      }
      try {
        isSelling.value = true;
        const receipt = await store.dispatch("sellNFT", {
          token_address: props.token_address,
          token_id: props.token_id,
          price: price.value
        });
        console.log(receipt);
        $q.notify({
          message: "Success",
          type: "positive",
          icon: "check",
          position: "top-right"
        });
        isSelling.value = false;
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
        isSelling.value = false;
      }
    };

    const isSelling = ref(false);

    return {
      nft,
      price,
      confirmSell,
      isSelling
    };
  }
});
</script>
