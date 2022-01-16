export const userNFT = state => (token_address, token_id) => {
  return state.userNFTs.find(
    n => n.token_address === token_address && n.token_id === token_id
  );
};
