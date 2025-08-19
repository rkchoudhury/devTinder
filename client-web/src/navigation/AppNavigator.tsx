import React from "react";
import { createBrowserRouter } from "react-router";

import { ROUTE_NAMES } from "./Routes";
import LogIn from "../screens/login/LogIn";
import Error from "../screens/error/Error";
import AppOutlet from "./AppOutlet";
import Feed from "../screens/feed/Feed";

const appRouter = createBrowserRouter([
  {
    path: ROUTE_NAMES.HOME,
    element: <LogIn />,
    errorElement: <Error />,
  },
  {
    path: "",
    element: <AppOutlet />,
    children: [
      {
        path: ROUTE_NAMES.LOGIN,
        element: <LogIn />,
      },
      {
        path: ROUTE_NAMES.FEED,
        element: <Feed />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default appRouter;
