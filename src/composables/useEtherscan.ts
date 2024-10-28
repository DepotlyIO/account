export const useEtherscan = () => {
  const baseUrl = import.meta.env.VITE_ETHERSCAN_URL;

  const createAddressUrl = (address: string) => `${baseUrl}/address/${address}`;

  return {
    createAddressUrl,
  };
};
