import { useQuery } from '@tanstack/react-query';

const initialState = [
  { slug: 'bitcoin', coinMarketcapId: 1 },
  { slug: 'ethereum', coinMarketcapId: 1027 },
  { slug: 'cosmos', coinMarketcapId: 3794 },
  { slug: 'tezos', coinMarketcapId: 2011 },
  { slug: 'stellar', coinMarketcapId: 512 },
  { slug: 'tron', coinMarketcapId: 1958 },
  { slug: 'cardano', coinMarketcapId: 2010 },
  { slug: 'monero', coinMarketcapId: 328 },
  { slug: 'chainlink', coinMarketcapId: 1975 },
  { slug: 'neo', coinMarketcapId: 1376 },
  { slug: 'usd', coinMarketcapId: 20317 },
  { slug: 'iota', coinMarketcapId: 1720 },
  { slug: 'maker', coinMarketcapId: 1518 },
  { slug: 'dash', coinMarketcapId: 131 },
  { slug: 'ontology', coinMarketcapId: 2566 },
  { slug: 'vechain', coinMarketcapId: 3077 },
  { slug: 'nem', coinMarketcapId: 873 },
  { slug: 'basic', coinMarketcapId: 5481 },
  { slug: 'dogecoin', coinMarketcapId: 74 },
  { slug: 'zcash', coinMarketcapId: 1437 },
  { slug: 'decred', coinMarketcapId: 1168 },
  { slug: 'trueusd', coinMarketcapId: 2563 },
  { slug: 'qtum', coinMarketcapId: 1684 },
  { slug: 'ravencoin', coinMarketcapId: 2577 },
  { slug: 'algorand', coinMarketcapId: 4030 },
  { slug: '0x', coinMarketcapId: 1896 },
  { slug: 'seele', coinMarketcapId: 2830 },
  { slug: 'waves', coinMarketcapId: 1274 },
  { slug: 'holo', coinMarketcapId: 2682 },
  { slug: 'augur', coinMarketcapId: 1104 },
  { slug: 'nano', coinMarketcapId: 1567 },
  { slug: 'lisk', coinMarketcapId: 1214 },
  { slug: 'bytom', coinMarketcapId: 1866 },
  { slug: 'komodo', coinMarketcapId: 1521 },
  { slug: 'icon', coinMarketcapId: 2099 },
  { slug: 'iostoken', coinMarketcapId: 2405 },
  { slug: 'verge', coinMarketcapId: 693 },
  { slug: 'siacoin', coinMarketcapId: 1042 },
  { slug: 'nexo', coinMarketcapId: 2694 },
  { slug: 'monacoin', coinMarketcapId: 213 },
  { slug: 'hypercash', coinMarketcapId: 1903 },
  { slug: 'zilliqa', coinMarketcapId: 2469 },
  { slug: 'steem', coinMarketcapId: 1230 },
  { slug: 'bitshares', coinMarketcapId: 463 },
  { slug: 'aeternity', coinMarketcapId: 1700 },
  { slug: 'digixdao', coinMarketcapId: 1229 },
  { slug: 'decentraland', coinMarketcapId: 1966 },
  { slug: 'rlc', coinMarketcapId: 1637 },
  { slug: 'status', coinMarketcapId: 1759 },
  { slug: 'stratis', coinMarketcapId: 1343 },
  { slug: 'tomochain', coinMarketcapId: 2570 },
  { slug: 'enigma', coinMarketcapId: 2044 },
  { slug: 'grin', coinMarketcapId: 3709 },
  { slug: 'metaverse', coinMarketcapId: 1703 },
  { slug: 'aelf', coinMarketcapId: 2299 },
  { slug: 'elastos', coinMarketcapId: 2492 },
  { slug: 'gxchain', coinMarketcapId: 1750 },
  { slug: 'loopring', coinMarketcapId: 1934 },
  { slug: 'populous', coinMarketcapId: 1789 },
  { slug: 'aion', coinMarketcapId: 2062 },
  { slug: 'iotex', coinMarketcapId: 2777 },
  { slug: 'wanchain', coinMarketcapId: 2606 },
  { slug: 'nuls', coinMarketcapId: 2092 },
  { slug: 'truechain', coinMarketcapId: 2457 },
  { slug: 'ark', coinMarketcapId: 1586 },
  { slug: 'bancor', coinMarketcapId: 1727 },
  { slug: 'telcoin', coinMarketcapId: 2394 },
  { slug: 'waltonchain', coinMarketcapId: 1925 },
];

const useWatchList = () => {
  return useQuery(['watchList'], () => initialState, {
    staleTime: Infinity,
    initialData: initialState,
  });
};

export default useWatchList;
