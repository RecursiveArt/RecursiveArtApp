import Moralis from "moralis";
import { NFTStorage } from "nft.storage";

const chain = "goerli";
const AddrRecursiveExchange = "0x4622AcFF6F752dD42a50280DBFf9B9F18B0a50c8";
const AddrRecursiveArtNFT = "0xba06DA49Cb6cE5F7487F3CA681662974ac009D1c";

export async function init({ commit, dispatch }) {
  Moralis.onAccountsChanged(accounts => {
    commit("setAddress", accounts[0]);
    // 'Link this address to your account?'
    // await Moralis.link(accounts[0]);
    // 'Address added!';
  });

  dispatch("getMarket");
  return dispatch("logIn", true);
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
      const provider = (await Moralis.isMetaMaskInstalled())
        ? "metamask"
        : "walletconnect";
      await Moralis.enableWeb3({ chain, provider });
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
  let query = new Moralis.Query("OfferingPlacedPrice");
  let results1 = await query.find();
  query = new Moralis.Query("OfferingPlacedUserData");
  let results2 = await query.find();
  query = new Moralis.Query("OfferingPlacedTokenData");
  let results3 = await query.find();

  query = new Moralis.Query("EthNFTOwners");
  let resultsNFTs = await query.find();

  const nfts = [];
  let data;
  for (let i = 0; i < results1.length; i++) {
    data = {
      ...results1[i].attributes,
      ...results2[i].attributes,
      ...results3[i].attributes
    };

    let nft = resultsNFTs.find(
      r =>
        r.attributes.token_address === data.hostContract &&
        r.attributes.token_id === data.tokenId
    );

    if (nft) {
      nft = { ...data, ...nft.attributes };
      nft.price = Moralis.Units.FromWei(nft.price);
      nfts.push(nft);
    }
  }

  commit("setOffers", nfts);

  return nfts;
}

// export async function listenMarket({ state, commit }) {
//   let query = new Moralis.Query("OfferingPlacedTokenData");
//   let subscription = await query.subscribe();
//
//   subscription.on("create", object => {
//     console.log("object created", object);
//   });
//   subscription.on("update", object => {
//     console.log("object updated", object);
//   });
//   subscription.on("enter", object => {
//     console.log("object entered", object);
//   });
//   subscription.on("leave", object => {
//     console.log("object left", object);
//   });
//   subscription.on("delete", object => {
//     console.log("object deleted", object);
//   });
//
//   commit("setOffers", await query.find());
//
//   return subscription;
// }

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

export async function buyNFT({ state }, offeringId) {
  return Moralis.executeFunction({
    chain,
    contractAddress: AddrRecursiveExchange,
    functionName: "closeOffering",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "_offeringId", type: "uint256" }
        ],
        name: "closeOffering",
        outputs: [],
        stateMutability: "payable",
        type: "function"
      }
    ],
    params: {
      _offeringId: offeringId
    }
  });
}

export async function cancelSale({ state }, offeringId) {
  return Moralis.executeFunction({
    chain,
    contractAddress: AddrRecursiveExchange,
    functionName: "revokeOffering",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "_offeringId", type: "uint256" }
        ],
        name: "revokeOffering",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    params: {
      _offeringId: offeringId
    }
  });
}

export async function mintNFT({ state }, { cid, offering_id }) {
  return Moralis.executeFunction({
    chain,
    contractAddress: AddrRecursiveArtNFT,
    functionName: "mintRecursiveNFT",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "_offeringId", type: "uint256" },
          { internalType: "string", name: "_recursiveArtCID", type: "string" }
        ],
        name: "mintRecursiveNFT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    params: {
      _recursiveArtCID: cid,
      _offeringId: offering_id
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
