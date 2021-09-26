import React from 'react';
import {useStoreContext} from "../context";
import UserList from "./UserList";
import {Layout, Row} from "antd";



function AuthZone() {
    const {store} = useStoreContext();
    return (
        <Layout>
            <Row justify={"center"} align={"middle"} className={"h100"}>
                <h1>{store.isAuth ? `User is authorized with email ${store.user.email}` : `User not authorized`}</h1>
                {!store.user.isActivated ? <h1>Confirm your email!</h1> : null}
            <UserList />
            </Row>
        </Layout>
    );
}

export default AuthZone;