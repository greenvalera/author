import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Layout} from "antd";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './App.css';
import {StoreContext} from "./context";
import AuthZone from "./components/layout/AuthZone";
import GuestZone from "./components/layout/GuestZone";
import Navbar from "./components/header/Navbar";
import {IRoute, privateRoutes, publicRoutes} from "./router/routes";

function App() {
    const {store} = useContext(StoreContext)
    const [loading,  setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth().then(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [store])

    if(loading) {
        return (<div>Loading</div>)
    }

    const routesList: IRoute[] = store.isAuth ? privateRoutes : publicRoutes;
    const redirectRoute: string = store.isAuth ? '/' : '/login';
    const Zone = store.isAuth ? AuthZone : GuestZone;

  return (
      <BrowserRouter>
          <Layout>
              <Navbar />
              <Layout.Content>
                  <Zone>
                      <Switch>
                          {routesList.map(route => (
                              <Route
                                  key={route.path}
                                  component={route.component}

                              />
                          ))}
                          <Redirect to={{pathname: redirectRoute}}/>
                      </Switch>
                  </Zone>
              </Layout.Content>
          </Layout>
      </BrowserRouter>
  );
}

export default observer(App);
