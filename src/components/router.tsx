import { Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../constants';
import { RequireAuth } from './common';
import { HomeLayout, SignInLayout, SignUpLayout } from './layouts';

export function Router() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME_PAGE} element={<RequireAuth to={<HomeLayout />} />} />
      <Route path={APP_ROUTES.SIGN_IN} element={<SignInLayout />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<SignUpLayout />} />
      {/* redirect to home if route is not found */}
      <Route path="*" element={<Navigate to={APP_ROUTES.HOME_PAGE} />} />
    </Routes>
  );
}
