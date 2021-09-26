import React, {FC} from 'react'
import {Col, Layout, Menu, Row} from 'antd';
import AuthBlock from "./AuthBlock";

const { Header } = Layout;


const Navbar: FC = () => {
    return (
        <Layout className="layout">
            <Header>
                <Row>
                    <Col span={8}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                    >
                            <Menu.Item key="1">Main</Menu.Item>
                            <Menu.Item key="2">About</Menu.Item>
                    </Menu>
                    </Col>
                    <Col span={3} offset={12}>
                        <AuthBlock />
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}

export default Navbar
