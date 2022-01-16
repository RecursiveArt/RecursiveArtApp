export const userNFT = state => (token_address, token_id) => {
  return state.userNFTs.find(
    n => n.token_address === token_address && n.token_id === token_id
  );
};

export const offerNFT = state => offeringId => {
  return state.offers.find(n => n.offeringId === offeringId);
};

export const offerFromNFT = state => nft => {
  return (
    state.offers.find(
      n => n.token_address === nft.token_address && n.token_id === nft.token_id
    ) || nft
  );
};
