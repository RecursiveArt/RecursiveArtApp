import { deepFreeze } from "../../util/misc";

export async function setUser(state, user) {
  if (user) {
    state.address = user.get("ethAddress");
    state.user = deepFreeze(user);
  } else {
    state.address = "";
    state.user = null;
  }
}

export function setAddress(state, address) {
  state.address = (address || "").toLowerCase();
}

export function setUserNFTs(state, nfts) {
  state.userNFTs = deepFreeze(nfts);
}

export function setUserBalances(state, balances) {
  state.userBalances = deepFreeze(balances);
}

export function setOffers(state, nfts) {
  state.offers = deepFreeze(nfts);
}
