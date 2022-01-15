import Moralis from "moralis";
import { NFTStorage, File } from "nft.storage";

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
  return user;
}

export async function logOut({ commit }) {
  await Moralis.User.logOut();
  commit("setUser", null);
}

export async function uploadImage(context, { name, description, image }) {
  const client = new NFTStorage({ token: process.env.storageApiKey });

  return client.store({
    name,
    description,
    image
  });
}
