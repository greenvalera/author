import React, {FC, Fragment} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const UserInfo: FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const user = useSelector((state: RootState) => state.auth.user)
    return (
        <Fragment>
            <h1>{isAuth ? `User is authorized with email ${user.email}` : `User not authorized`}</h1>
        </Fragment>
    )
}

export default UserInfo;