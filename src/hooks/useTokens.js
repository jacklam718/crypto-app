import { useQuery } from '@tanstack/react-query';
import { tokenTransformer } from '../utils';
import api from '../api';

const useTokens = ({
  ids,
  interval = 'h1',
  start = Date.now() - 1000 * 60 * 60 * 24, // 24hrs
  end = Date.now(),
} = {}) => {
  return useQuery(
    ['tokens'],
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
      const tokens = assets.map((asset, idx) =>
        tokenTransformer({ ...asset, histories: histories[idx] })
      );
      return tokens;
    },
    {
      staleTime: Infinity,
    }
  );
};

export default useTokens;
