// import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { AppNavigator } from "./navigation/AppNavigator";
import { store } from "./redux/store";
import { ErrorAlert } from "./components/ErrorAlert";

function App() {
  return (
    // <div className="App">
    //   <RouterProvider router={appRouter} />
    // </div>

    <Provider store={store}>
      <AppNavigator />
      <ErrorAlert />
    </Provider>
  );
}

export default App;
