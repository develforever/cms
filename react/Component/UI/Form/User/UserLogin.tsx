import { LayoutSlotProps } from '@app/Layout';
import React, { useContext, useEffect } from 'react';
import Card from '@app/Component/UI/Card';
import { Link } from 'react-router-dom';
import AppContext from '@app/AppContext';
import Form from '@app/Component/UI/Form/Form';
import { ApiEndpoint } from '@app/Enum/Api';
import useUserAuth from '@app/Services/UserAuth';
import useLocalStorage from '@app/Services/LocalStorage';
import useNavigate from '@app/hooks/useNavigate';

const UserLogin: React.FC = ({}) => {
  const context = useContext(AppContext);
  const [user] = useUserAuth();
  const [get, set, del] = useLocalStorage();
  const navigate = useNavigate('/');

  useEffect(() => {
    if (context.token && !context.isAuthenticated()) {
      set('token', context.token);
      user();
    }
  }, [context.token]);

  useEffect(() => {
    if (context.isAuthenticated()) {
      navigate();
    }
  }, [context.isAuthenticated()]);

  return (
    <Form
      url={ApiEndpoint.USER_LOGIN}
      onSuccess={(result: any) => {
        if (result?.data.token) {
          context.dispatch({ token: result?.data.token });
        }
      }}
    >
      <div>
        <label className="form-label">Username</label>
        <input
          name="email"
          className="form-control"
          type="text"
          autoComplete="username"
        />
      </div>
      <div>
        <label className="form-label">Content</label>
        <input
          name="password"
          className="form-control"
          type="password"
          autoComplete="current-password"
        ></input>
      </div>
    </Form>
  );
};

export default UserLogin;
