import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import Login from "../Auth/Login";
import { useAuthContext } from "../../hooks/useAuthContext";

const Layout = () => {

  const { authIsReady, user } = useAuthContext()
  return (
    <Fragment>
      {user ?<><Header />
      <div>
        <Routers />
      </div>
      <Footer /> </>  : <Login />}
    </Fragment>
  );
};

export default Layout;
