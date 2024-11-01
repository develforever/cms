import AppContext from '@app/AppContext';
import Table from '@app/Component/UI/Table/Table';
import {
  ApiEndpointNames,
  ApiPageResource,
  ApiResponsePageList,
} from '@app/Enum/Api';
import { RouteNames } from '@app/Enum/Route';
import useNavigate from '@app/hooks/useNavigate';
import { LayoutSlotProps } from '@app/Layout';
import React, { useContext } from 'react';

const Center: React.FC<LayoutSlotProps> = ({}) => {
  console.debug('page list render');

  const context = useContext(AppContext);
  const navigate = useNavigate(RouteNames.PANEL_PAGES_VIEW);

  const url = context.links ? context.links[ApiEndpointNames.PAGE_LIST] : null;

  return (
    <div className="overflow-y-hidden">
      {url && (
        <Table<ApiPageResource, ApiResponsePageList>
          url={url}
          onView={(row) => {
            navigate({ id: row.data.id }, { state: { row } });
          }}
          cols={{
            id: 'Id',
            title: 'Title',
          }}
        ></Table>
      )}
    </div>
  );
};

export default Center;
