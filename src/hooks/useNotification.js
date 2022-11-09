import LottieView from 'lottie-react-native';
import { useSnackbar } from 'react-native-base-components/src/snackbar';

const useNotification = () => {
  const snackbar = useSnackbar();

  const success = (message, { duration = 5000 } = {}) => {
    const id = snackbar.show(message, {
      duration,
      onClose: () => snackbar.dismiss(id),
      onSwipeOut: () => snackbar.dismiss(id),
      startEnhancer: () => (
        <LottieView
          style={{ width: 24, height: 24 }}
          source={require('../assets/success.json')}
          autoPlay
          loop={false}
        />
      ),
    });
  };

  const error = (message, { duration = 5000 }) => {
    const id = snackbar.show(message, {
      duration,
      onClose: () => snackbar.dismiss(id),
      onSwipeOut: () => snackbar.dismiss(id),
      startEnhancer: () => (
        <LottieView
          style={{ width: 24, height: 24 }}
          source={require('../assets/error.json')}
          autoPlay
          loop={false}
        />
      ),
    });
  };

  return { success, error };
};

export default useNotification;
