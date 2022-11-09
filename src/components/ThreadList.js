import { List } from 'react-native-base-components/src/list';
import ThreadListItem from './ThreadListItem';

const ThreadList = ({
  threads,
  onLoadMore = () => {},
  listFooterComponent: ListFooterComponent = () => null,
}) => {
  return (
    <List
      items={[{ data: threads }]}
      overrides={{
        List: {
          props: {
            keyExtractor: (item) => item.gravityId,
            onEndReached: () => {
              onLoadMore();
            },
            ListFooterComponent,
          },
        },
        ListItem: {
          component: ThreadListItem,
        },
      }}
    />
  );
};

export default ThreadList;
