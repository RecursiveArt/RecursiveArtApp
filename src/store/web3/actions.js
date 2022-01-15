import Moralis from "moralis";
import { NFTStorage } from "nft.storage";

export async function init({ commit, dispatch }) {
  return dispatch("logIn", true);
}

export async function logIn({ state, commit }, silently = false) {
  let user = Moralis.User.current();
  if (!user && !silently) {
    const signingMessage = "Log in to RecursiveArt Marketplace";
    try {
      user = await Moralis.authenticate({ signingMessage });
    } catch (error) {
      if (!user && error.code !== 4001) {
        console.log(error);
        try {
          user = await Moralis.authenticate({
            signingMessage,
            provider: "walletconnect"
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  commit("setUser", user);
  if (user) {
    commit("setUserNFTs", await Moralis.Web3.getNFTs({ chain: "goerli" }));
    commit(
      "setUserBalances",
      await Moralis.Web3.getAllERC20({ chain: "goerli" })
    );
  } else {
    commit("setUserNFTs", []);
    commit("setUserBalances", []);
  }
  return user;
}

export async function logOut({ commit }) {
  await Moralis.User.logOut();
  commit("setUser", null);
  commit("setUserNFTs", []);
  commit("setUserBalances", []);
}

export async function uploadImage(context, { name, description, image }) {
  const client = new NFTStorage({ token: process.env.storageApiKey });

  return client.store({
    name,
    description,
    image
  });
}
