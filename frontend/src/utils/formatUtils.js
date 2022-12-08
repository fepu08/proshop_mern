export const formatAddress = (fromAddress) => {
  const { address, city, postalCode, country } = fromAddress;
  return `${address}, ${city} ${postalCode},  ${country}`;
};

export const addDecimals = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};
