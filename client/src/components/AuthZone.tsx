import React, {useContext} from 'react';
import {StoreContext} from "../context";
import UserList from "./UserList";
import {Layout, Row} from "antd";



function AuthZone() {
    const {store} = useContext(StoreContext)
    return (
        <Layout>
            <Row justify={"center"} align={"middle"} className={"h100"}>
                <h1>{store.isAuth ? `User is authorized with email ${store.user.email}` : `User not authorized`}</h1>
                {!store.user.isActivated ? <h1>Confirm your email!</h1> : null}
                <button onClick={() => store.logout()}>Logout</button>
            <UserList />
            </Row>
        </Layout>
    );
}

export default AuthZone;