import React, { lazy } from "react";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

const Layout = lazy(() => import("./components/Layout.jsx"));
const RouterOutlet = lazy(() => import("./routers"));
// const AuthContext = lazy(() => import("./components/AuthContext.js"));

function App() {
  const token = localStorage.getItem("tokenId");
  console.log({ token });
  return (
    // <AuthContext.Provider value={token ? true : false}>
    <div className="App">
      <Router>
        {/* <Layout> */}
        <RouterOutlet />
        {/* </Layout> */}
      </Router>
    </div>
    // </AuthContext.Provider>
  );
}

export default App;
