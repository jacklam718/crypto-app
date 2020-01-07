import { delay, takeEvery } from 'redux-saga/effects';
import { SnackbarPortal } from 'react-native-base-components/src/snackbar';

function *showToaster(action) {
  const { message, timeout = 3000 } = action.payload;
  const id = SnackbarPortal.show(message, {
    onClose: () => SnackbarPortal.dismiss(id),
    onSwipeOut: () => SnackbarPortal.dismiss(id),
  });
  yield delay(timeout);
  SnackbarPortal.dismiss(id);
}

export default function *notifcationSaga () {
  yield takeEvery('SHOW_NOTIFICATION', showToaster);
};