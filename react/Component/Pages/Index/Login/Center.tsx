import { LayoutSlotProps } from '@app/Layout';
import React from 'react';
import UserLogin from '@app/Component/UI/Form/User/UserLogin';

const Center: React.FC<LayoutSlotProps> = ({}) => {
  console.log('render login certer');
  return <UserLogin></UserLogin>;
};

export default Center;
