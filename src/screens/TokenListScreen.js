import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Animated, LayoutAnimation } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { withStyled } from 'react-native-base-components/';
import { Header } from 'react-native-base-components/src/header';
import { Searchbar } from 'react-native-base-components/src/searchbar';
import { TokenList, LoadingOverlay } from '../components';
import { useRealtimeTokens, useWatchList } from '../hooks';

const TokenListScreen = ({ theme }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const { data: watchList } = useWatchList();
  const [{ data: tokens = [], isLoading }, { connect, disconnect }] =
    useRealtimeTokens({
      ids: watchList.map((x) => x.slug),
    });
  const filteredTokens = useMemo(() => {
    return tokens.filter((x) =>
      x.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tokens]);

  useEffect(() => {
    LayoutAnimation.configureNext(animationConfig);
  }, [filteredTokens]);

  useFocusEffect(
    useCallback(() => {
      connect();
      return () => {
        disconnect();
      };
    }, [])
  );

  const animationConfig = useMemo(() => {
    return LayoutAnimation.create(
      200,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Header
        title="Crypto"
        overrides={{
          Root: {
            props: { as: Animated.View },
            style: {
              position: 'relative',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingBottom: 20,
              height: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [150, 100],
                extrapolate: 'clamp',
                useNativeDriver: true,
              }),
            },
          },
          Content: {
            style: { paddingHorizontal: 20 },
          },
          TitleText: {
            props: { as: Animated.Text },
            style: {
              color: '#fff',
              fontSize: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [40, 24],
                extrapolate: 'clamp',
                useNativeDriver: true,
              }),
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 80],
                    outputRange: [0, 0],
                    extrapolate: 'clamp',
                    useNativeDriver: true,
                  }),
                },
              ],
            },
          },
          LeftItem: { component: () => null },
        }}
      />
      <Searchbar
        placeholder="Search"
        cancel={{
          label: 'Cancel',
        }}
        value={searchQuery}
        onChangeText={setSearchQuery}
        overrides={{
          Input: { props: { startEnhancer: () => null } },
        }}
      />
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <TokenList
          tokens={filteredTokens}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        />
      )}
    </View>
  );
};

export default withStyled(TokenListScreen);
