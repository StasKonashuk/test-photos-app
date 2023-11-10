import React, { ReactElement } from 'react';
import { useLogoutMutation } from '../../../api';

import './styles.scss';

export function Header(): ReactElement {
  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    await logout();
  };
  return (
    <div className="header-wrapper">
      <div>
        <button className="logout-button" type="button" onClick={logoutHandler} aria-label="logout">
          Log out
        </button>
      </div>
    </div>
  );
}
