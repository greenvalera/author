import React, {FC, ReactNode} from 'react';
import {Layout, Row} from "antd";

const GuestZone: FC<ReactNode> = ({children}) => (
    <Layout>
        <Row justify={"center"} align={"middle"} className={"h100"}>
            {children}
        </Row>
    </Layout>
);

export default GuestZone;