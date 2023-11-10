import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { parseJwt } from '../../../utils';
import { RootState } from '../../../redux/store';
import { APP_ROUTES } from '../../../constants';

const MILISECONDS_IN_SECONDS = 1000;

export function RequireAuth({ to }: { to: JSX.Element }) {
  try {
    const { isAuthenticated, token } = useSelector((state: RootState) => state.userReducer);

    const location = useLocation();

    const decodedToken = parseJwt(token);

    const currentDate = new Date();

    const isTokenInValid =
      decodedToken?.exp && decodedToken.exp * MILISECONDS_IN_SECONDS < currentDate.getTime();

    if (!isAuthenticated || isTokenInValid) {
      localStorage.removeItem('accessToken');
      return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: location }} replace />;
    }

    return to;
  } catch (e) {
    return null;
  }
}
