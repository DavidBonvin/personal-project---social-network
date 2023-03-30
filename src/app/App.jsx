import React, { useEffect } from "react";

import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Routes from "./routes/Routes";
import { getToken } from "./services/tokenServices";
import { signIn } from "./redux-store/authenticationSlice";
import { useDispatch } from "react-redux";

/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 * @author Peter Mollet
 */

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) dispatch(signIn(token));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-gray-50 main">
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
