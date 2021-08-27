import React, {useContext} from 'react';
import {StoreContext} from "../context";
import UserList from "./UserList";



function AuthZone() {
    const {store} = useContext(StoreContext)
    return (
        <div>
            <h1>{store.isAuth ? `User is authorized with email ${store.user.email}` : `User not authorized`}</h1>
            {!store.user.isActivated ? <h1>Confirm your email!</h1> : null}
            <button onClick={() => store.logout()}>Logout</button>
            <UserList />
        </div>
    );
}

export default AuthZone;