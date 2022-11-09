import { useInfiniteQuery } from '@tanstack/react-query';
import { threadTransform } from '../utils';
import useWatchList from './useWatchList';
import api from '../api';

const useTrendingPosts = ({ id } = {}) => {
  const { data: watchList } = useWatchList();
  const { coinMarketcapId } = watchList.find((x) => x.slug === id);
  return useInfiniteQuery(
    ['trendingPosts', coinMarketcapId],
    async ({ pageParam: trendingScore = '' }) => {
      const trendingPosts = await api
        .get(
          `https://api-gravity.coinmarketcap.com/gravity/v3/gravity/trending-posts/${coinMarketcapId}?over-view=false${trendingScore}`
        )
        .then((x) => x.data.data.tweetDTOList);
      return trendingPosts;
    },
    {
      getNextPageParam: (data) => {
        const trendingScore = `&last-score=${
          data[data.length - 1].trendingScore
        }`;
        return trendingScore;
      },
      select: (data) => {
        return data.pages
          .flat()
          .sort((x1, x2) => x2.postTime > x1.postTime)
          .map(threadTransform);
      },
    }
  );
};

export default useTrendingPosts;
