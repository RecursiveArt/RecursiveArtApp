import Moralis from "moralis";
import { NFTStorage } from "nft.storage";

const chain = "goerli";
const AddrRecursiveExchange = "0xfde03eab8bfac573d3f6784e588577258f5ae3fb";

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
    commit("setUserNFTs", await Moralis.Web3.getNFTs({ chain }));
    commit("setUserBalances", await Moralis.Web3.getAllERC20({ chain }));
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

export async function sellNFT(context, { token_address, token_id, price }) {
  return Moralis.Web3API.native.runContractFunction({
    chain,
    address: AddrRecursiveExchange,
    function_name: "placeOffering",
    abi: [
      {
        inputs: [
          { internalType: "address", name: "_hostContract", type: "address" },
          { internalType: "uint256", name: "_tokenId", type: "uint256" },
          { internalType: "uint256", name: "_price", type: "uint256" }
        ],
        name: "placeOffering",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    params: {
      _hostContract: token_address,
      _tokenId: token_id,
      _price: price
    }
  });
}
