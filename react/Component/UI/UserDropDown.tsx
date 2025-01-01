import React, { ReactElement, useCallback, useContext } from 'react';
import AppContext from '@app/AppContext';
import DropDown from './DropDown';
import { Link } from 'react-router-dom';
import useRedirect from '@app/hooks/useRedirect';
import { RouteNames } from '@app/Enum/Route';
import useLocalStorage from '@app/Services/LocalStorage';

function Comp(props: { children?: ReactElement }) {
  const { user } = useContext(AppContext);
  const redirect = useRedirect(RouteNames.LOGOUT);
  const [get, set, del] = useLocalStorage();
  let logout = useCallback(() => {
    del('token');
    redirect();
  }, []);

  let title = `${user?.email} (${user?.role})`;

  if (user) {
    return (
      <DropDown title={title}>
        <li>
          <h6 className="dropdown-header">Account</h6>
        </li>
        <li>
          <Link className="dropdown-item" to={RouteNames.PANEL_USER_PROFILE}>
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to={RouteNames.PANEL_USER_SETTINGS}>
            Settings
          </Link>
        </li>
        <li>
          <a href="#" className="dropdown-item" onClick={logout}>
            Logout
          </a>
        </li>
      </DropDown>
    );
  } else if (props.children) {
    return props.children;
  } else {
    return <></>;
  }
}

const UserDropDown: React.FC<{ children?: ReactElement }> = ({ children }) => {
  return <Comp>{children}</Comp>;
};

export default UserDropDown;
