import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-base-components';
import { Label3 } from 'react-native-base-components/src/typography';
import { ListItem, ListItemLabel } from 'react-native-base-components/src/list';
import LineSeries from './LineSeries';
import Ticker from './Ticker';

const MemoTokenListItem = memo(
  ({ item: token }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() => navigation.push('TokenDetails', { token })}
        activeOpacity={0.8}
      >
        <ListItem
          overrides={{
            Content: {
              style: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                height: 80,
                paddingRight: 0,
              },
            },
          }}
        >
          <ListItemLabel
            description={
              <Label3 color="contentSecondary">USD$ {token.vwap24Hr}</Label3>
            }
          >
            {token.symbol} - USD
          </ListItemLabel>
          <LineSeries
            data={token.histories}
            width={120}
            height={45}
            contentInset={{ top: 2, bottom: 2 }}
            stroke={token.changePercent24Hr < 0 ? '#ed4369' : '#47fb9b'}
          />
          <ListItemLabel
            description={
              <Label3
                color={
                  token.changePercent24Hr < 0
                    ? 'contentNegative'
                    : 'contentPositive'
                }
              >
                {token.changePercent24Hr}%
              </Label3>
            }
            overrides={{
              Root: { style: { alignItems: 'flex-end' } },
            }}
          >
            <Text style={{ opacity: 0, width: 0 }}>0</Text>
            <Ticker
              prefix="$"
              number={token.priceUsd}
              size={14}
              style={{
                color: theme.colors.contentPrimary,
                fontWeight: '600',
              }}
            />
          </ListItemLabel>
        </ListItem>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item === nextProps.item;
  }
);

export default MemoTokenListItem;
