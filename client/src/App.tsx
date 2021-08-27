import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import './App.css';
import {StoreContext} from "./context";
import AuthZone from "./components/AuthZone";
import GuestZone from "./components/GuestZone";

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

  return (
    <div className="App">
        {store.isAuth ? <AuthZone /> : <GuestZone />}
    </div>
  );
}

export default observer(App);
