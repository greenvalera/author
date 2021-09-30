import React, {FC, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "../context";
import { Form, Input, Button } from 'antd';

interface ILoginFormInput {
    email: string,
    password: string,
    passwordRepeat?: string
}

interface Props {
    isRegister?: boolean
}

const LoginForm: FC<Props> = ({isRegister = false}) => {
    const {store} = useContext(StoreContext)
    const onFinish = ({email, password}: ILoginFormInput) => {
        if (isRegister) {
            store.registration(email, password);
        } else {
            store.login(email, password);
        }
    }

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
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                hasFeedback
                rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            {isRegister &&
                <Form.Item
                  label="Password repeat"
                  name="passwordRepeat"
                  hasFeedback
                  rules={[
                      {required: true, message: 'Please input your password!'},
                      ({getFieldValue}) => ({
                          validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                              }

                              return Promise.reject(new Error('The two passwords that you entered do not match!'))
                          }
                      })
                  ]}
                >
                  <Input.Password/>
                </Form.Item>
            }

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {isRegister ? 'SignUp' : 'Login'}
                </Button>
                <Button type="link" htmlType="button" onClick={() => {}}>
                    {isRegister ? 'Do yuo have account already? SingIn!' : 'Create account'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default observer(LoginForm);