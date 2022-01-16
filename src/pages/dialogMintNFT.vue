<template>
  <q-dialog v-bind="$attrs" :persistent="isMinting">
    <q-card>
      <q-card-section>
        <div class="text-h5">
          Mint Recursive
        </div>
      </q-card-section>

      <q-separator />

      <NFTCard v-if="nft" :nft="nft" />

      <q-card-actions align="right">
        <!-- Close -->
        <q-btn
          label="Cancel"
          color="primary"
          :disable="isMinting"
          v-close-popup
          flat
        />

        <!-- Mint -->
        <q-btn
          @click="confirmMint"
          label="Mint"
          color="primary"
          text-color="dark"
          :loading="isMinting"
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
  name: "DialogMintNFT",

  components: { NFTCard },

  props: ["offeringId"],

  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();

    const nft = computed(() =>
      props.offeringId ? store.getters.offerNFT(props.offeringId) : null
    );

    const confirmMint = async () => {
      if (!props.token_address) {
        return;
      }
      try {
        isMinting.value = true;
        const receipt = await store.dispatch("mintNFT", {
          cid: "",
          offering_id: ""
        });
        console.log(receipt);
        $q.notify({
          message: "Success",
          type: "positive",
          icon: "check",
          position: "top-right"
        });
        isMinting.value = false;
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
        isMinting.value = false;
      }
    };

    const isMinting = ref(false);

    return {
      nft,
      confirmMint,
      isMinting
    };
  }
});
</script>
