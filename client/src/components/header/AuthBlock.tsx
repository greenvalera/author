import React, {FC, useContext} from 'react';
import {Menu} from "antd";
import {StoreContext} from "../../context";
import {SettingFilled} from "@ant-design/icons";

const AuthBlock: FC = () => {
    const {store} = useContext(StoreContext);
    const ProfileSubmenu = () => {
      return (
          <Menu.SubMenu key="SubMenu" icon={<SettingFilled />} title="Username">
              <Menu.Item>Account</Menu.Item>
              <Menu.Item onClick={() => store.logout()}>Logout</Menu.Item>
          </Menu.SubMenu>

      )
    }
    return (
        <Menu
            className={"menu"}
            theme="dark"
            mode="horizontal"
            selectable={false}
        >
            {!store.isAuth
                ? <Menu.Item>Login</Menu.Item>
                : <ProfileSubmenu />
            }
        </Menu>
    );
}

export default AuthBlock;