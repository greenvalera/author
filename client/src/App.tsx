import React, {useEffect} from 'react';
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
import {checkAuth, setLoading} from "./store/authSlice";
import {RootState} from "./store";
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const loading = useSelector((state: RootState) => state.auth.loading);


    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuth());
        } else {
            dispatch(setLoading(false));
        }
    }, [])

    if(loading) {
        return (<div>Loading</div>);
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
