import React, {FC} from 'react';
import {Menu} from "antd";
import {SettingFilled} from "@ant-design/icons";
import {logout} from '../../store/authSlice';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

const AuthBlock: FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const ProfileSubmenu = () => {
      return (
          <Menu.SubMenu key="SubMenu" icon={<SettingFilled />} title={user.email}>
              <Menu.Item>Account</Menu.Item>
              <Menu.Item onClick={() => dispatch(logout())}>Logout</Menu.Item>
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
            {isAuth
                ? <ProfileSubmenu />
                : <Menu.Item>Login</Menu.Item>
            }
        </Menu>
    );
}

export default AuthBlock;