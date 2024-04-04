
  export const CoinList = () =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`; 

  export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`

  export const HistoricalChart = (id, days=1, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

