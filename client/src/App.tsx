import React, {useEffect, useState} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import AuthZone from "./components/layout/AuthZone";
import GuestZone from "./components/layout/GuestZone";
import {IRoute, privateRoutes, publicRoutes} from "./router/routes";
import {checkAuth} from "./store/authSlice";
import {RootState} from "./store";
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

function App() {
    const [loading,  setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);


    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuth());
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [dispatch])

    if(loading) {
        return (<div>Loading</div>)
    }

    const routesList: IRoute[] = isAuth ? privateRoutes : publicRoutes;
    const redirectRoute: string = isAuth ? '/' : '/login';
    const Zone = isAuth ? AuthZone : GuestZone;

  return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
                  <Zone>
                      <Switch>
                          {routesList.map(route =>
                              <Route
                                  key={route.path}
                                  path={route.path}
                                  component={route.component}
                                  exact={route.exact}
                              />
                          )}
                          <Redirect to={{pathname: redirectRoute}}/>
                      </Switch>
                  </Zone>
          </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
