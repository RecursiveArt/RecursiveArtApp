<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">
      Marketplace
    </div>

    <div class="row q-gutter-lg">
      <NFTCard v-for="nft in nfts" :key="nft.token_id" :nft="nft">
        <template v-slot:footer>
          <div>
            <div class="text-subtitle">
              <div class="text-bold">Price</div>
              <div>{{ tokenValueTxt(nft.price, 0.0001, "ETH") }}</div>
            </div>
          </div>
          <q-btn label="Buy" color="primary" flat />
        </template>
      </NFTCard>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { tokenValueTxt } from "../util/formatting"

import NFTCard from "../components/NFTCard";

export default defineComponent({
  name: "PageIndex",

  components: { NFTCard },

  setup() {
    const store = useStore();

    const nfts = [
      {
        token_id: "1",
        name: "Test 1",
        token_address: "0x0wn3r4ddr355",
        token_uri: "",
        price: 0.01
      },
      {
        token_id: "2",
        name: "Test 2",
        token_address: "0x0wn3r4ddr355",
        token_uri: "",
        price: 0.02
      },
      {
        token_id: "3",
        name: "Test 3",
        token_address: "0x0wn3r4ddr355",
        token_uri: "",
        price: 0.03
      },
      {
        token_id: "4",
        name: "Test 4",
        token_address: "0x0wn3r4ddr355",
        token_uri: "",
        price: 0.04
      },
      {
        token_id: "5",
        name: "Test 5",
        token_address: "0x0wn3r4ddr355",
        token_uri: "",
        price: 0.05
      }
    ];

    return {
      tokenValueTxt,
      nfts
    };
  }
});
</script>
