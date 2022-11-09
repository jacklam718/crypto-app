import { useEffect, useState, useMemo } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-base-components';
import { Dropdown } from 'react-native-base-components/src/dropdown';
import { TextBlock } from 'react-native-base-components/src/typography';
import { useRealtimeTokenById, useTrendingPosts } from '../hooks';
import {
  Header,
  Graph,
  Ticker,
  SegmentedControl,
  ThreadList,
  LoadingOverlay,
} from '../components';
import { throttle } from '../utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

const getTimestampRange = (index) => {
  // Start-End timestamp range to fetch historical data
  const now = Date.now();
  const start = [
    now - 1000 * 60 * 60 * 24,
    now - 1000 * 60 * 60 * 24 * 7,
    now - 1000 * 60 * 60 * 24 * 7 * 4,
    now - 1000 * 60 * 60 * 24 * 365,
    now - 1000 * 60 * 60 * 24 * 365 * 14,
  ][index];
  return [start, now];
};

const getIntervalOptions = (index) =>
  // Prevent loading too much data causing fetch failure
  [
    ['h1', 'h2', 'h6', 'h12'],
    ['h1', 'h2', 'h6', 'h12', 'd1'],
    ['h1', 'h2', 'h6', 'h12', 'd1'],
    ['h12', 'd1', 'm1', 'm5'],
    ['m1', 'm5', 'm15', 'm30'],
  ][index];

const TokenDetailsScreen = ({ navigation, route }) => {
  const [tooltip, setTooltip] = useState(null);
  const [interval, setInterval] = useState('h1');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const {
    params: { token: cachedToken },
  } = route;
  const id = cachedToken.id;

  // Construct queries and UI options
  const tokenQueries = useMemo(() => {
    const [start, end] = getTimestampRange(selectedIndex);
    return {
      id,
      start,
      end,
      interval,
    };
  }, [id, interval, selectedIndex]);
  const intervalOptions = useMemo(() => {
    return getIntervalOptions(selectedIndex);
  }, [selectedIndex]);

  // Remote data
  const { data: token = cachedToken, isLoading } =
    useRealtimeTokenById(tokenQueries);
  const {
    data: trendingPosts = [],
    fetchNextPage,
    isFetchingNextPage,
  } = useTrendingPosts({ id });

  // UI handlers
  // Update interval according to intervalOptions
  useEffect(() => {
    setInterval(() => {
      return intervalOptions.includes(interval) ? interval : intervalOptions[0];
    });
  }, [intervalOptions]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        leftItem={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="#fff" size={24} />
          </TouchableOpacity>
        }
        rightItem={
          <Dropdown
            value={interval}
            getItemLabel={(x) => x.toUpperCase()}
            items={intervalOptions}
            onItemSelect={(x) => setInterval(x[0])}
            overrides={{
              DropdownListItem: {
                props: {
                  overrides: {
                    Option: { style: { paddingHorizontal: 25 } },
                  },
                },
              },
            }}
          />
        }
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextBlock
            style={{
              fontSize: 22,
              textAlign: 'center',
              color: theme.colors.headerNavigationText,
              fontWeight: '600',
            }}
          >
            {token.symbol}
          </TextBlock>
          <Ticker
            prefix="$"
            style={{
              color: theme.colors.headerNavigationText,
              fontWeight: '600',
            }}
            size={16}
            number={
              tooltip
                ? Number(tooltip.y).toFixed(2)
                : Number(token.priceUsd).toFixed(2)
            }
          />
        </View>
      </Header>
      {isLoading ? (
        <LoadingOverlay style={{ position: 'relative', height: 150 }} />
      ) : (
        <Graph
          data={token.histories}
          onDataHover={throttle((tooltip) => setTooltip(tooltip), 20)}
          width={SCREEN_WIDTH}
          height={150}
          contentInset={{ top: 10, bottom: 2 }}
        />
      )}
      <SegmentedControl
        values={['1D', '1W', '1M', '1Y', 'ALL']}
        onChange={setSelectedIndex}
        selectedIndex={selectedIndex}
      />

      <ThreadList
        threads={trendingPosts}
        onLoadMore={() => {
          fetchNextPage();
        }}
        listFooterComponent={() => {
          return isFetchingNextPage ? (
            <LoadingOverlay style={{ position: 'relative', height: 50 }} />
          ) : null;
        }}
      />
    </View>
  );
};

export default TokenDetailsScreen;
