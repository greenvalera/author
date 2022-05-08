import {ComponentType} from "react";
import Home from "../components/pages/Home";
import {SignIn, SignUp} from "../components/auth";

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
        component: SignIn,
    },
    {
        path: '/signUp',
        exact: true,
        component: SignUp,
    },
];