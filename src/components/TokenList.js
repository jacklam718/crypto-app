import React from 'react';
import { List, ListSectionHeader } from 'react-native-base-components/src/list';
import { Label3 } from 'react-native-base-components/src/typography';
import TokenListItem from './TokenListItem';

const TokenList = ({ tokens, onScroll }) => {
  return (
    <List
      items={[{ data: tokens }]}
      overrides={{
        List: {
          props: {
            onScroll,
            style: { height: '100%' },
            renderSectionHeader: () => (
              <ListSectionHeader
                overrides={{
                  Root: {
                    style: { justifyContent: 'space-between' },
                  },
                }}
              >
                <Label3 color="contentTertiary">Watchlist</Label3>
                <Label3 color="contentTertiary">24HR</Label3>
              </ListSectionHeader>
            ),
          },
        },
        ListItem: {
          component: TokenListItem,
        },
      }}
    />
  );
};

export default TokenList;
