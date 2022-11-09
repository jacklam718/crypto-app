const tokenTransformer = (token) => ({
  ...token,
  changePercent24Hr:
    token.changePercent24Hr > 0
      ? `+${Number(token.changePercent24Hr).toFixed(2)}`
      : Number(token.changePercent24Hr).toFixed(2),
  vwap24Hr: Number(token.vwap24Hr).toFixed(2),
  maxSupply: Number(token.maxSupply).toFixed(),
  supply: Number(token.supply).toFixed(),
  priceUsd: Number(token.priceUsd).toFixed(2),
  marketCapUsd: Number(token.marketCapUsd).toFixed(2),
  volumeUsd24Hr: Number(token.volumeUsd24Hr).toFixed(2),
  histories: token.histories.map((data, idx) => ({
    timestamp: data.time,
    x: idx,
    y: data.priceUsd,
  })),
});

export default tokenTransformer;
