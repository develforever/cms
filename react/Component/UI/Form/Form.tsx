import useNavigate from '@app/hooks/useNavigate';
import useDataService, {
  ResponseDataInterface,
  Status,
} from '@app/Services/DataService';
import React, { Suspense, useEffect } from 'react';
import { Form as BaseForm, useActionData } from 'react-router-dom';

interface FormProps {
  url: string;
  method?: string;
  redirectUrl?: string;
  okLabel?: string;
  children?: React.ReactNode | React.ReactNode[];
  onSuccess?: (state: any) => void;
}

const Form = <R extends ResponseDataInterface>({
  url,
  method = undefined,
  redirectUrl = undefined,
  children = undefined,
  okLabel = 'Ok',
  onSuccess = undefined,
}: FormProps): React.ReactElement => {
  const actiondata = useActionData();
  const [state, dispatch] = useDataService<R>(url);
  const redirect = useNavigate(redirectUrl || '');

  useEffect(() => {
    if (actiondata) {
      dispatch({ method, data: actiondata });
    }
  }, [actiondata]);

  useEffect(() => {
    if (state.status === Status.success) {
      if (redirectUrl) {
        redirect();
      } else if (onSuccess) {
        onSuccess(state.result);
      }
    }
  }, [state.status]);

  return (
    <BaseForm method="post" className="form">
      <Suspense fallback={<p>Ładowanie...</p>}>
        {children}
        <button className="btn btn-primary" type="submit">
          {okLabel}
        </button>
      </Suspense>
    </BaseForm>
  );
};

export default Form;
