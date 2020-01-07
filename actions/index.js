import { bindActionCreators } from 'redux';
import { transformSymbolsFormat } from '../utils/responseTransformers';
import store from '../store';

export const showNotification = message => ({
  type: 'SHOW_NOTIFICATION',
  payload: {
    message,
  },
});

export const fetchSymbols = ids => {
  return {
    type: 'FETCH_SYMBOLS',
    payload: {
      uri: '/v2/assets',
      label: 'symbols',
      ids,
      onSuccess: data => [
        { type: 'SET_SYMBOLS', payload: { data } },
      ],
      transformResponse: transformSymbolsFormat,
    },
  }
}

export const subscribeSymbolsPrice = ids => ({
  type: 'SUBSCRIBE',
  payload: {
    uri: `/prices?assets=${ids}`,
    channel: 'symbols_price',
    onMessage: data => [
      { type: 'UPDATE_SYMBOLS_PRICE', payload: { data } },
    ],
    onConnected: () => showNotification('Websocket Connected'),
    onDisconnected: () => showNotification('Websocket Disconnected'),
  },
});

export default bindActionCreators({
  fetchSymbols,
  subscribeSymbolsPrice,
}, store.dispatch);

