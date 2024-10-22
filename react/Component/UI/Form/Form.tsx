import useNavigate from "@app/hooks/useNavigate";
import useDataService, { ResponseDataInterface, Status } from "@app/Services/DataService";
import React, { useEffect } from "react";
import { Form as BaseForm, useActionData } from "react-router-dom"


interface FormProps<D, R> {
    url: string,
    redirectUrl?: string
};

const Form = <D, R extends ResponseDataInterface,>({
    url,
    redirectUrl = undefined,
}: FormProps<D, R>): React.ReactElement => {

    const actiondata = useActionData();
    const [state, dispatch] = useDataService(url);
    const redirect = useNavigate(redirectUrl || "");

    useEffect(() => {
        if (actiondata) {
            dispatch({ data: actiondata });
        }
    }, [actiondata]);

    useEffect(() => {
        if (state.status === Status.success) {
            redirect();
        }
    }, [state.status]);

    return (<BaseForm method="post" className="form">
        <div>
            <label className="form-label">Title</label>
            <input name="title" className="form-control" type="text" />
        </div>
        <div>
            <label className="form-label">Content</label>
            <textarea name="content" className="form-control" ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">Create</button>
    </BaseForm>);
}


export default Form;