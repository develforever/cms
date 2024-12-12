import { LayoutSlotProps } from '@app/Layout';
import React, { useEffect } from 'react';
import Card from '@app/Component/UI/Card';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { ApiEndpointNames, ApiResponsePage } from '@app/Enum/Api';
import useDataService from '@app/Services/DataService';

const Center: React.FC<LayoutSlotProps> = ({}) => {
  const location = useLocation();
  const row = location.state.row;

  return (
    <Card title={location.state.row.data.title}>
      <Link
        to={generatePath(`/panel/pages/:id/edit`, {
          id: `${location.state.row.data.id}`,
        })}
        state={location.state}
        key={0}
      >
        Edit
      </Link>
    </Card>
  );
};

export default Center;
