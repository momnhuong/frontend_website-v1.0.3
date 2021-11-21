import React, { Component, lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  Route,
  Redirect,
} from "react-router-dom";
import messaging from "../../firebaseConfig";
// import firebaseConfig from "../../firebaseConfig";
import { IntlProvider } from "react-intl";
import AppLocale from "../../constants/translations";
import Header from "../components/header";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { history } from "../../store/history";
import ModalPopup from "../../app/components/modalPopup/modal";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import MyProfile from "../../features/myprofile";
import Loader from "../components/loader";
import { store } from "../../store";

const publicRoutes = [
  {
    path: "/login",
    exact: true,
    component: lazy(() => import("../../features/auth/login/views")),
  },
  {
    path: "/forgetpass",
    exact: true,
    component: lazy(() =>
      import("../../features/auth/forgetpass/views/forgetPage")
    ),
  },
];

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  const isLoggedIn = useSelector((state) => state.root.isOAuth);
  if (isLoggedIn) return <Route {...rest}>{children}</Route>;

  return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
}

function App() {
  const [currentLocale] = useState("en");
  const { userProfile } = store.getState().root;

  useEffect(() => {
    messaging
      .requestPermission()
      .then(function () {
        const token = messaging.getToken();
        return token;
      })
      .then((token) => {
        console.log("token: ", token);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    // navigator.serviceWorker.addEventListener("message", (message) =>
    //   console.log(message)
    // );
  }, [
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      }),
    navigator.serviceWorker.addEventListener("message", (message) => {
      console.log(message.data.firebaseMessaging.payload);
    }),
  ]);
  return (
    <Suspense fallback={<Loader />}>
      <IntlProvider
        locale={AppLocale[currentLocale].locale}
        messages={AppLocale[currentLocale].message}
      >
        <Router history={history}>
          {userProfile !== null ? <Header /> : null}
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path="/">
              <MyProfile />
            </PrivateRoute>
          </Switch>
          <ModalPopup />
          <ErrorMessageBox />
        </Router>
      </IntlProvider>
    </Suspense>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({});

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
