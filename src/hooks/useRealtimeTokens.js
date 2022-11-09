import { useEffect, useRef } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { tokenTransformer } from '../utils';
import useNotification from './useNotification';
import api from '../api';

const now = Date.now();
let running = false;

const useRealtimeTokens = ({
  ids,
  interval = 'h1',
  start = now - 1000 * 60 * 60 * 24, // 24hrs
  end = now,
} = {}) => {
  const queryClient = useQueryClient();
  const notification = useNotification();
  const socketRef = useRef();
  const queryResponse = useQuery(
    ['tokens', ids, interval, start, end],
    async () => {
      const assets = await api
        .get(`https://api.coincap.io/v2/assets?ids=${ids}`)
        .then((x) => x.data.data);
      const histories = await Promise.all(
        ids.map((id) =>
          api
            .get(
              `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}&start=${start}&end=${end}`
            )
            .then((x) => x.data.data)
            .catch(() => {})
        )
      );
      return assets.map((asset, idx) => ({
        ...asset,
        histories: histories[idx],
      }));
    },
    {
      staleTime: Infinity,
      select(data) {
        return data.map(tokenTransformer);
      },
    }
  );

  const connect = (options) => {
    const url = `wss://ws.coincap.io/prices?assets=${ids}`;
    if (running) return;
    if (socketRef.current) return;
    socketRef.current = Object.assign(new WebSocket(url), {
      onmessage(event) {
        const data = JSON.parse(event.data);
        queryClient.setQueryData(
          ['tokens', ids, interval, start, end],
          (oldData) => {
            const update = (entity) => {
              if (!entity) return entity;
              return data[entity.id]
                ? { ...entity, priceUsd: Number(data[entity.id]).toFixed(2) }
                : entity;
            };
            return Array.isArray(oldData)
              ? oldData.map(update)
              : update(oldData);
          }
        );
      },
      ...options,
    });
  };

  const disconnect = () => {
    socketRef.current.close();
    socketRef.current = null;
    running = false;
  };

  useEffect(() => {
    connect({
      onopen: () => notification.success('Websocket Connected'),
      onerror: () => notification.error('Websocket Disconnected'),
    });
  }, []);

  return [queryResponse, { connect, disconnect }];
};

export default useRealtimeTokens;
