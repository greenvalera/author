import React, {FC, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "../context";
import { Form, Input, Button, Checkbox } from 'antd';

interface ILoginFormInput {
    email: string,
    password: string
}

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(StoreContext)

    const onFinish = ({email, password}: ILoginFormInput) => {
      store.login(email, password);
    }

    const onRegisterClick = () => store.registration(email, password)

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
        // <div>
        //     <input
        //         type="text"
        //         placeholder="Email"
        //         value={email}
        //         onChange={e => setEmail(e.target.value)}
        //     />
        //     <input
        //         type="text"
        //         placeholder="Password"
        //         value={password}
        //         onChange={e => setPassword(e.target.value)}
        //     />
        //     <button onClick={onLoginClick}>Login</button>
        //     <button onClick={onRegisterClick}>Registration</button>
        // </div>
    );
};

export default observer(LoginForm);