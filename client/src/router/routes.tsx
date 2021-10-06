import {FC} from "react";
import Home from "../components/pages/Home";
import LoginForm from "../components/LoginForm";

export interface IRoute {
    path: string,
    exact: boolean,
    component: FC
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
    }
];