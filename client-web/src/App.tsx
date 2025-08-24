import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { AppNavigator } from "./navigation/AppNavigator";
import { store } from "./redux/store";

function App() {
  return (
    // <div className="App">
    //   <RouterProvider router={appRouter} />
    // </div>

    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
