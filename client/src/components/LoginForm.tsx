import React, {FC, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "../context";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(StoreContext)

    const onLoginClick = () => store.login(email, password)
    const onRegisterClick = () => store.registration(email, password)

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={onLoginClick}>Login</button>
            <button onClick={onRegisterClick}>Registration</button>
        </div>
    );
};

export default observer(LoginForm);