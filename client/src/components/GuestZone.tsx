import React from 'react';
import LoginForm from "./LoginForm";
import {Layout, Row} from "antd";

function GuestZone() {
    return (
        <div>
            <Layout>
                <Row justify={"center"} align={"middle"} className={"h100"}>
                    <LoginForm />
                </Row>
            </Layout>

        </div>
    );
}

export default GuestZone;