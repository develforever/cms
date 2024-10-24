import { LayoutSlotProps } from "@app/Layout"
import React, { useContext, useEffect } from "react"
import Card from "@app/Component/UI/Card"
import { Link } from "react-router-dom"
import AppContext from "@app/AppContext"
import Form from "@app/Component/UI/Form/Form"
import { ApiEndpointNames } from "@app/Enum/Api"
import useUserAuth from "@app/Services/UserAuth"

const Center: React.FC<LayoutSlotProps> = ({ children }) => {

    const context = useContext(AppContext);
    const [token, user] = useUserAuth();

    useEffect(() => {
        if (context.token) {
            user();
        }
    }, [context.token]);

    return <div className="d-flex">
        {context.isAuthenticated() ?
            <Card>
                <Link to={"panel"} key={0} >Go to panel</Link>
            </Card>
            : <div>
                <Form
                    url={ApiEndpointNames.USER_LOGIN}
                    onSuccess={(result: any) => {
                        context.dispatch({ token: result?.data.token });
                    }}
                >
                    <div>
                        <label className="form-label">Username</label>
                        <input name="email" className="form-control" type="text" autoComplete="username" />
                    </div>
                    <div>
                        <label className="form-label">Content</label>
                        <input name="password" className="form-control" type="password" autoComplete="current-password" ></input>
                    </div>
                </Form>
            </div>
        }

    </div>

}

export default Center