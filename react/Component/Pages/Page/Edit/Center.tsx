import { LayoutSlotProps } from '@app/Layout';
import React, { useEffect } from 'react';
import Card from '@app/Component/UI/Card';
import { useLocation } from 'react-router-dom';
import useDataService from '@app/Services/DataService';
import { ApiResponsePage } from '@app/Enum/Api';
import Form from '@app/Component/UI/Form/Form';
import { RouteNames } from '@app/Enum/Route';
import ApiEndpointNames from '@app/Enum/ApiEndpointNames';

const Center: React.FC<LayoutSlotProps> = ({}) => {
  const location = useLocation();
  const row = location.state?.row;

  const [state, dispatch] = useDataService<ApiResponsePage>(
    row ? row.links[ApiEndpointNames.PAGE_SHOW] : null
  );

  useEffect(() => {
    dispatch({});
  }, []);

  let page = state.result?.data.data;
  let links = state.result?.data.links;
  let url = links ? links[ApiEndpointNames.PAGE_UPDATE] : null;

  return (
    <div className="ms-1 me-1">
      {page && (
        <Card title={`#${page.id}, ${page.title}`}>
          {url && (
            <Form url={url} method="PATCH" redirectUrl={RouteNames.PANEL_PAGES}>
              <div>
                <label className="form-label">Title</label>
                <input
                  name="title"
                  className="form-control"
                  defaultValue={page.title}
                  type="text"
                />
              </div>
              <div>
                <label className="form-label">Content</label>
                <textarea
                  name="content"
                  className="form-control"
                  defaultValue={page.content}
                ></textarea>
              </div>
            </Form>
          )}
        </Card>
      )}
    </div>
  );
};

export default Center;
