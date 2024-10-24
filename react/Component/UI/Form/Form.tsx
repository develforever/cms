import useNavigate from "@app/hooks/useNavigate";
import useDataService, { ResponseDataInterface, Status } from "@app/Services/DataService";
import React, { useEffect } from "react";
import { Form as BaseForm, useActionData } from "react-router-dom"


interface FormProps<D, R> {
    url: string,
    redirectUrl?: string
    children?: React.ReactNode | React.ReactNode[],
    onSuccess?: (state: any) => void,
};

const Form = <D, R extends ResponseDataInterface,>({
    url,
    redirectUrl = undefined,
    children = undefined,
    onSuccess = undefined,
}: FormProps<D, R>): React.ReactElement => {

    const actiondata = useActionData();
    const [state, dispatch] = useDataService<R>(url);
    const redirect = useNavigate(redirectUrl || "");

    useEffect(() => {
        if (actiondata) {
            dispatch({ data: actiondata });
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

    return (<BaseForm method="post" className="form">
        {children}
        <button className="btn btn-primary" type="submit">Create</button>
    </BaseForm>);
}


export default Form;