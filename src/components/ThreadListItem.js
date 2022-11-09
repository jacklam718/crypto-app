import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { styled } from 'react-native-base-components';
import { TextBlock, Label3 } from 'react-native-base-components/src/typography';
import { ListItem, ListItemLabel } from 'react-native-base-components/src/list';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Icon = styled(MaterialCommunityIcons, ({ theme }) => {
  return {
    color: theme.colors.contentPrimary,
  };
});

const Avatar = ({ url }) => {
  return (
    <Image
      source={{ uri: url }}
      style={{ width: 40, height: 40, borderRadius: 20 }}
    />
  );
};

const LikeCount = ({ count }) => {
  return (
    <View style={{ flexDirection: 'row', marginRight: 12 }}>
      <Icon name="cards-heart-outline" size={18} />
      <TextBlock style={{ marginLeft: 4 }}>{count}</TextBlock>
    </View>
  );
};

const CommentCount = ({ count }) => {
  return (
    <View style={{ flexDirection: 'row', marginRight: 12 }}>
      <Icon name="comment-text-outline" size={18} />
      <TextBlock style={{ marginLeft: 4 }}>{count}</TextBlock>
    </View>
  );
};

const MemoThreadListItem = memo(
  ({ item: thread }) => {
    return (
      <ListItem
        artwork={<Avatar url={thread.owner.avatar.url} />}
        overrides={{
          ArtworkContainer: {
            style: {
              alignSelf: 'flex-start',
              paddingTop: 8,
            },
          },
          Content: {
            style: {
              flex: 1,
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            },
          },
        }}
      >
        <ListItemLabel
          overrides={{
            Root: {
              component: () => (
                <View style={{ flex: 1, width: '100%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Label3 style={{ flex: 1 }}>{thread.owner.nickname}</Label3>
                    <Label3>{thread.postedAt}</Label3>
                  </View>
                  <Label3 numberOfLines={2}>{thread.textContent}</Label3>
                </View>
              ),
            },
          }}
        >
          <TextBlock style={{ flex: 1, width: '100%' }}>
            {thread.owner.nickname}
          </TextBlock>
          <Label3>{thread.postedAt}</Label3>
        </ListItemLabel>

        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <CommentCount count={thread.likeCount} />
          <LikeCount count={thread.likeCount} />
        </View>
      </ListItem>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item === nextProps.item;
  }
);

export default MemoThreadListItem;
