import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, ListItemLabel, ListSectionHeader } from 'react-native-base-components/src/list';
import { Label3 } from 'react-native-base-components/src/text';

import actions from '../actions';
import withLoadingView from '../utils/withLoadingView';
import Graph from './Graph';

const ListWithLoadingView = withLoadingView(Animated.SectionList, { label: 'symbols' });
const MemoSymbolItem = React.memo(({ item: symbol }) => (
  <ListItem
    overrides={{
      Content: {
        style: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 30,
          height: 80,
          alignItems: 'center',
        },
      }
    }}
  >
    <ListItemLabel
      description={(
        <Label3 color="contentSecondary">{symbol.vwap24Hr}</Label3>
      )}
    >
      {symbol.symbol} - USD
    </ListItemLabel>
    <Graph
      data={symbol.histories}
      width={120}
      height={45}
      contentInset={{ top: 2, bottom: 2 }}
      stroke={symbol.changePercent24Hr < 0 ? '#ed4369' : '#47fb9b'}
    />
    <ListItemLabel
      description={(
        <Label3 color={symbol.changePercent24Hr < 0 ? 'contentNegative' : 'contentPositive' }>
          {symbol.changePercent24Hr}%
        </Label3>
      )}
      overrides={{
        Root: { style: { alignItems: 'flex-end' } }
      }}
    >
      ${symbol.priceUsd}
    </ListItemLabel>
  </ListItem>
), (prevProps, nextProps) => {
  // can do shallow comparison directly if use immutable js
  return prevProps.item.updatedAt === prevProps.item.updatedAt;
});

class SymbolList extends React.Component {
  componentDidMount() {
    actions.fetchSymbols(this.props.symbol.watchlist);
    actions.subscribeSymbolsPrice(this.props.symbol.watchlist);
  }

  render() {
    return (
      <List
        items={[{ data: this.props.symbol.symbols }]}
        overrides={{
          List: {
            component: ListWithLoadingView,
            props: {
              renderSectionHeader: ({ sction }) => (
                <ListSectionHeader
                  overrides={{
                    Root: { style: { justifyContent: 'space-between' } },
                  }}
                >
                  <Label3 color="contentTertiary">Watchlist</Label3>
                  <Label3 color="contentTertiary">24HR</Label3>
                </ListSectionHeader>
              )
            },
          },
          ListItem: {
            component: MemoSymbolItem,
          }
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  symbol: state.symbol,
});

export default connect(mapStateToProps)(SymbolList);