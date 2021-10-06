import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import { Form, Input, Button } from 'antd';
import {registration, login} from '../store/authSlice';
import {useHistory} from "react-router-dom";

interface ILoginFormInput {
    email: string,
    password: string,
    passwordRepeat?: string
}

interface Props {
    isRegister?: boolean
}

const LoginForm: FC<Props> = ({isRegister = false}) => {
    console.log(isRegister);
    const dispatch = useDispatch();
    const history = useHistory();

    const onFinish = ({email, password}: ILoginFormInput) => {
        if (isRegister) {
            dispatch(registration({email, password}));
        } else {
            dispatch(login({email, password}));
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
                <Button type="link" htmlType="button" onClick={() => {history.push('/signUp')}}>
                    {isRegister ? 'Do yuo have account already? SingIn!' : 'Create account'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;