import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { HTTP_CODE } from '../../constants';
import { snackActions } from '../../utils';

// eslint-disable-next-line consistent-return
export const rtkQueryErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  try {
    if (isRejectedWithValue(action)) {
      const rejectedValue = action.payload;
      if (rejectedValue.status === HTTP_CODE.NOT_FOUND) {
        snackActions.error(rejectedValue.data?.msg || 'Data you have requested was not found');
      } else if (rejectedValue.status === HTTP_CODE.UNAUTHORIZED) {
        snackActions.error(rejectedValue.data?.msg || 'You are unauthenticated');
      } else if (rejectedValue.status === HTTP_CODE.FORBIDDEN) {
        snackActions.error(rejectedValue.data?.msg || 'You have no access to this page.');
      } else {
        snackActions.error(rejectedValue.data?.msg || "Couldn't connect to a server");
      }
    }
    return next(action);
  } catch (error) {
    console.error(error);
  }
};
