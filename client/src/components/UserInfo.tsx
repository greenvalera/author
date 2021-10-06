import React, {FC, Fragment} from "react";
import {useStoreContext} from "../context";

const UserInfo: FC = () => {
    const {store} = useStoreContext();
    return (
        <Fragment>
            <h1>{store.isAuth ? `User is authorized with email ${store.user.email}` : `User not authorized`}</h1>
            {!store.user.isActivated ? <h1>Confirm your email!</h1> : null}
        </Fragment>
    )
}

export default UserInfo;