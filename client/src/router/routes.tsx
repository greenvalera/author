import {ComponentType} from "react";
import Home from "../components/pages/Home";
import LoginForm from "../components/LoginForm";
import SignUp from "../components/pages/SignUp";

export interface IRoute {
    path: string,
    exact: boolean,
    component: ComponentType<any>
}

export const privateRoutes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Home
    }
];

export const publicRoutes: IRoute[] = [
    {
        path: '/login',
        exact: true,
        component: LoginForm,
    },
    {
        path: '/signUp',
        exact: true,
        component: SignUp,
    },
];