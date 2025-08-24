// import React from "react";
import {
  // createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import { ROUTE_NAMES } from "./Routes";
import LogIn from "../screens/login/LogIn";
import Error from "../screens/error/Error";
import AppOutlet from "../components/AppOutlet";
import Feed from "../screens/feed/Feed";
import Profile from "../screens/profile/Profile";

// const appRouter = createBrowserRouter([
//   {
//     path: ROUTE_NAMES.HOME,
//     element: <LogIn />,
//     errorElement: <Error />,
//   },
//   {
//     path: "",
//     element: <AppOutlet />,
//     children: [
//       {
//         path: ROUTE_NAMES.FEED,
//         element: <Feed />,
//       },
//       {
//         path: ROUTE_NAMES.PROFILE,
//         element: <Profile />,
//       },
//     ],
//     errorElement: <Error />,
//   },
// ]);

// export default appRouter;

export const AppNavigator = () => {
  return (
    <BrowserRouter basename={ROUTE_NAMES.HOME}>
      <Routes>
        <Route
          path={ROUTE_NAMES.HOME}
          element={<AppOutlet />} // Parent route -> It will render the children routes inside the outlet
          errorElement={<Error />}
        >
          {/* Children routes */}
          <Route path={ROUTE_NAMES.LOGIN} element={<LogIn />} />
          <Route path={ROUTE_NAMES.HOME} element={<Feed />} />
          <Route path={ROUTE_NAMES.PROFILE} element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
