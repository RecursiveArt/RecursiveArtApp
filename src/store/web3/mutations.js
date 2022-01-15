import { deepFreeze } from "../../util/misc";

export function setUser(state, user) {
  state.user = user ? deepFreeze(user) : null;
}

export function setUserNFTs(state, nfts) {
  state.userNFTs = deepFreeze(nfts);
}

export function setUserBalances(state, balances) {
  state.userBalances = deepFreeze(balances);
}
