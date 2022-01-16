import Moralis from "moralis";
import { NFTStorage } from "nft.storage";

const chain = "goerli";
const AddrRecursiveExchange = "0x4622AcFF6F752dD42a50280DBFf9B9F18B0a50c8";

export async function init({ commit, dispatch }) {
  Moralis.onAccountsChanged(accounts => {
    commit("setAddress", accounts[0]);
    // 'Link this address to your account?'
    // await Moralis.link(accounts[0]);
    // 'Address added!';
  });

  await dispatch("logIn", true);
}

export async function logIn({ state, commit }, silently = false) {
  let user = Moralis.User.current();
  if (!user && !silently) {
    const signingMessage = "Log in to RecursiveArt Marketplace";
    try {
      user = await Moralis.authenticate({
        signingMessage,
        provider: "metamask"
      });
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
    // Initialize Web3
    try {
      await Moralis.enableWeb3({ chain });
    } catch (error) {
      console.error(error);
    }

    // Get user data
    commit("setUserNFTs", await Moralis.Web3.getNFTs({ chain }));
    commit("setUserBalances", await Moralis.Web3.getAllERC20({ chain }));
  } else {
    // Clear user data
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

export async function getMarket({ commit }) {
  let query1 = new Moralis.Query("OfferingPlacedPrice");
  let results1 = await query1.find();
  let query2 = new Moralis.Query("OfferingPlacedUserData");
  let results2 = await query2.find();
  let query3 = new Moralis.Query("OfferingPlacedTokenData");
  let results3 = await query3.find();

  const results = [];
  for (let i = 0; i < results1.length; i++) {
    results[i] = {
      ...results1[i].attributes,
      ...results2[i].attributes,
      ...results3[i].attributes
    };
  }

  // commit("setOffers", results);
  console.log(results);

  return results;
}

export async function listenMarket({ state, commit }) {
  let query = new Moralis.Query("OfferingPlacedTokenData");
  let subscription = await query.subscribe();

  subscription.on("create", object => {
    console.log("object created", object);
  });
  subscription.on("update", object => {
    console.log("object updated", object);
  });
  subscription.on("enter", object => {
    console.log("object entered", object);
  });
  subscription.on("leave", object => {
    console.log("object left", object);
  });
  subscription.on("delete", object => {
    console.log("object deleted", object);
  });

  commit("setOffers", await query.find());

  return subscription;
}

export async function sellNFT({ state }, { token_address, token_id, price }) {
  return Moralis.executeFunction({
    chain,
    contractAddress: AddrRecursiveExchange,
    functionName: "placeOffering",
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
      _price: Moralis.Units.ETH(price)
    }
  });
}

export async function uploadImage(context, { name, description, image }) {
  const client = new NFTStorage({ token: process.env.storageApiKey });

  return client.store({
    name,
    description,
    image
  });
}
