import { LayoutSlotProps } from '@app/Layout';
import React, { useContext } from 'react';
import Card from '@app/Component/UI/Card';
import { Link } from 'react-router-dom';
import AppContext from '@app/AppContext';

const Center: React.FC<LayoutSlotProps> = ({}) => {
  const contect = useContext(AppContext);
  return (
    <div className="d-flex">
      {contect.isAuthenticated() && (
        <Card>
          <Link to={'panel'} key={0}>
            Go to panel
          </Link>
        </Card>
      )}
      {!contect.isAuthenticated() && <Link to={'/login'}>Login</Link>}
    </div>
  );
};

export default Center;
