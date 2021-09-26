import React, {FC} from 'react'
import { Layout, Menu } from 'antd';

const { Header } = Layout;


const Navbar: FC = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    selectable={false}
                >
                    <Menu.Item key="3">nav 2</Menu.Item>
                    <Menu.Item key="4">nav 4</Menu.Item>
                </Menu>
            </Header>
        </Layout>
    )
}

export default Navbar
