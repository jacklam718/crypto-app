import { useEffect, useRef } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { tokenTransformer } from '../utils';
import api from '../api';

const now = Date.now();
let running = false;

const useRealtimeTokenById = ({
  id,
  interval = 'h1',
  start = now - 1000 * 60 * 60 * 24, // 24hrs
  end = now,
} = {}) => {
  const socketRef = useRef();
  const queryClient = useQueryClient();
  const queryResponse = useQuery(
    ['tokens', id, interval, start, end],
    async () => {
      const token = await api
        .get(`https://api.coincap.io/v2/assets/${id}`)
        .then((x) => x.data.data);
      const histories = await api
        .get(
          `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}&start=${start}&end=${end}`
        )
        .then((x) => x.data.data);
      return { ...token, histories };
    },
    {
      select: (data) => tokenTransformer(data),
    }
  );

  useEffect(() => {
    if (running) return;
    const url = `wss://ws.coincap.io/prices?assets=${id}`;
    socketRef.current = Object.assign(new WebSocket(url), {
      onmessage(event) {
        const data = JSON.parse(event.data);
        queryClient.setQueryData(
          ['tokens', id, interval, start, end],
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
    });
    return () => {
      socketRef.current.close();
    };
  }, [id, interval, start, end]);

  return queryResponse;
};

export default useRealtimeTokenById;
