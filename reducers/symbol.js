import { handleActions } from 'redux-actions';

const initialState = {
  symbols: [],
  // mock
  watchlist: [
    'bitcoin',
    'ethereum',
    'ripple',
    'tether',
    'bitcoin',
    'litecoin',
    'eos',
    'binance',
    'bitcoin',
    'cosmos',
    'tezos',
    'stellar',
    'tron',
    'cardano',
    'monero',
    'huobi',
    'chainlink',
    'neo',
    'usd',
    'ethereum',
    'iota',
    'maker',
    'dash',
    'ontology',
    'vechain',
    'nem',
    'basic',
    'dogecoin',
    'paxos',
    'zcash',
    'decred',
    'trueusd',
    'qtum',
    'ravencoin',
    'algorand',
    '0x',
    'seele',
    'waves',
    'holo',
    'dai',
    'augur',
    'bitcoin',
    'nano',
    'omisego',
    'abbc',
    'lisk',
    'bytom',
    'zencash',
    'crypto',
    'enjin',
    'theta',
    'komodo',
    'bitcoin',
    'icon',
    'iostoken',
    'verge',
    'siacoin',
    'nexo',
    'v',
    'monacoin',
    'hypercash',
    'dxchain',
    'zilliqa',
    'steem',
    'bitshares',
    'aeternity',
    'digixdao',
    'decentraland',
    'rlc',
    'status',
    'kyber',
    'stratis',
    'tomochain',
    'enigma',
    'crypterium',
    'grin',
    'golem',
    'metaverse',
    'zcoin',
    'aelf',
    'elastos',
    'gxchain',
    'ripio',
    'funfair',
    'ethlend',
    'loopring',
    'tierion',
    'populous',
    'aion',
    'nebulas',
    'iotex',
    'wanchain',
    'nuls',
    'truechain',
    'ark',
    'bancor',
    'telcoin',
    'power',
    'loom',
    'waltonchain',
  ],
};

export default handleActions({
  SET_SYMBOLS: (state, action) => {
    // need to refactor. maybe use immutable js
    return {
      ...state,
      symbols: action.payload.data.map(symbol => ({
        ...symbol,
        updatedAt: Date.now(),
        histories: symbol.histories.map(item => ({
          ...item,
          updatedAt: Date.now(),
        })),
      })),
    };
  },
  UPDATE_SYMBOLS_PRICE: (state, action) => {
    // need to refactor. maybe use immutable js
    const newSymbols = [].concat(state.symbols);
    for (let id in action.payload.data) {
      const indexOfSymbol = newSymbols.findIndex(symbol => symbol.id === id);
      if (indexOfSymbol !== -1) {
        const newSymbol = {
          ...newSymbols[indexOfSymbol],
          priceUsd: Number(action.payload.data[id]).toFixed(2),
          updatedAt: Date.now(),
        };
        const newHistories = [].concat(newSymbol.histories);
        const lastRecord = { ...newHistories[newHistories.length-1] }
        const updatedMoreThan2Minutes = (Date.now() - lastRecord.updatedAt) > (2 * 60 * 1000);
        if (updatedMoreThan2Minutes) {
          newHistories.shift();
          newHistories.push({ 
            ...lastRecord,
            x: lastRecord.x + 1,
            y: Number(action.payload.data[id]),
            updatedAt: Date.now(),
          });
        }
        newSymbol.histories = newHistories;
        newSymbols[indexOfSymbol] = newSymbol;  
      }
    }
    return {
      ...state,
      symbols: newSymbols,
    };
  },
}, initialState);