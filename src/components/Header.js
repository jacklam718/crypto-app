import { View } from 'react-native';
import { styled } from 'react-native-base-components';

const Root = styled(View, () => {
  return {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 44,
    height: 100,
  };
});

const LeftItem = styled(View, () => {
  return {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 22,
  };
});

const RightItem = styled(View, () => {
  return {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 22,
  };
});

const Content = styled(View, () => {
  return {
    flex: 1,
    paddingHorizontal: 20,
  };
});

const Header = ({ children, leftItem, rightItem }) => {
  return (
    <Root>
      <LeftItem>{leftItem}</LeftItem>
      <Content>{children}</Content>
      <RightItem>{rightItem}</RightItem>
    </Root>
  );
};

export default Header;
