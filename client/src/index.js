import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import AuthApi from "./AuthApi";
import Cookies from "js-cookie";

function Auth() {
    const [auth, setAuth] = useState(false);
    const token = Cookies.get("token");
    const readCookie = () => {
        const token = Cookies.get("token");
        if (token) {
            setAuth(true)
        }
    }
    useEffect(() => {
        readCookie();
    }, [])
    return (
        <AuthApi.Provider value={{auth, setAuth}}>
            <App />
        </AuthApi.Provider>
    )
}

ReactDOM.render(
    <Auth />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
