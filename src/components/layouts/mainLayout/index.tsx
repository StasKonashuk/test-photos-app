import React, { ReactNode } from 'react';
import { useAppSelector } from '../../../hooks';
import { Header } from '../../common';

import './styles.scss';

interface LayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: LayoutProps) {
  const { isAuthenticated } = useAppSelector((store) => store.userReducer);

  return (
    <div className="main-layout">
      {isAuthenticated && <Header />}
      {children}
    </div>
  );
}
