import { RouterProvider } from "react-router-dom";

import { AppNavigator } from "./navigation/AppNavigator";

function App() {
  return (
    // <div className="App">
    //   <RouterProvider router={appRouter} />
    // </div>

    <>
      <AppNavigator />
    </>
  );
}

export default App;
