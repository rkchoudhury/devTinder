// import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { AppNavigator } from "./navigation/AppNavigator";
import { store } from "./redux/store";
import { ErrorAlert } from "./components/ErrorAlert";
import { Loader } from "./components/Loader";

function App() {
  return (
    // <div className="App">
    //   <RouterProvider router={appRouter} />
    // </div>

    <Provider store={store}>
      <AppNavigator />
      <ErrorAlert />
      <Loader />
    </Provider>
  );
}

export default App;
