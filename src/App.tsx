import React from "react";
import { Router } from "@reach/router";
import { Home } from "./Screens/Home";
import { TechTree } from "./Screens/TechTree";
import { Provider } from "react-redux";
import { store } from "./Redux";
import { EnCurso } from "./Screens/EnCurso";
import { useUserQuery } from "./Hooks";

const AppRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const { loading } = useUserQuery();
  if (loading) {
    return <div>Loading!!!</div>;
  }
  return (
    <Router>
      <Home path="/" />
      <TechTree path="/techtree" />
      <EnCurso path="/encurso" />
    </Router>
  );
};

export default AppRedux;
