<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">
      Dashboard
    </div>

    <div class="row q-gutter-lg">
      <NFTCard v-for="nft in nfts" :key="nft.id" :nft="nft">
        <template v-slot:header>
          <q-btn label="Mint Recursive" color="primary" flat />
        </template>
        <template v-slot:footer>
          <div>
            <div class="text-subtitle">
              <div class="text-bold">Set Sale Price</div>
              <div>{{ tokenValueTxt(nft.price, 0.0001, "ETH") }}</div>
            </div>
          </div>
          <q-btn label="Sell" color="primary" flat />
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
  name: "PageDashboard",

  components: { NFTCard },

  setup() {
    const store = useStore();

    const nfts = [
      {
        id: "1111111111111111",
        title: "Test 1",
        owner: "0x0wn3r4ddr355",
        imgURL: "",
        price: 0.01
      },
      {
        id: "2222222222222222",
        title: "Test 2",
        owner: "0x0wn3r4ddr355",
        imgURL: "",
        price: 0.02
      },
      {
        id: "3333333333333333",
        title: "Test 3",
        owner: "0x0wn3r4ddr355",
        imgURL: "",
        price: 0.03
      },
      {
        id: "4444444444444444",
        title: "Test 4",
        owner: "0x0wn3r4ddr355",
        imgURL: "",
        price: 0.04
      },
      {
        id: "5555555555555555",
        title: "Test 5",
        owner: "0x0wn3r4ddr355",
        imgURL: "",
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
