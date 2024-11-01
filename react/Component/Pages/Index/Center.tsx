import { LayoutSlotProps } from "@app/Layout"
import React, { useContext, useEffect, useState } from "react"
import Card from "@app/Component/UI/Card"
import { Link } from "react-router-dom"
import AppContext from "@app/AppContext"
import Form from "@app/Component/UI/Form/Form"
import { ApiEndpoint } from "@app/Enum/Api"
import useUserAuth from "@app/Services/UserAuth"
import useLocalStorage from "@app/Services/LocalStorage"



const Center: React.FC<LayoutSlotProps> = ({ children }) => {

    const context = useContext(AppContext);
    const [user] = useUserAuth();
    const [get, set, del] = useLocalStorage();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (context.token && !context.isAuthenticated()) {
            setIsLoading(true);
            set('token', context.token);
            user();
        }
    }, [context.token]);

    

    return <div className="d-flex">
        {context.isAuthenticated() && context.token &&
            <Card>
                <Link to={"panel"} key={0} >Go to panel</Link>
            </Card>}
        {!context.isAuthenticated() && context.token && <div>Loading ...</div>}
        {!context.isAuthenticated() && !context.token && 
        <div>
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