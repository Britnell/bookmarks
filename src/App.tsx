import "./App.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./comp/Root";
import Page, { loader as pageLoader, action as pageAction } from "./comp/Page";
import Error from "./comp/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={
        <Error>
          <div>
            <h1>App had an Error - please reload</h1>
          </div>
        </Error>
      }
    >
      <Route index element={<Page />} loader={pageLoader} />
      <Route
        path=":page"
        element={<Page />}
        loader={pageLoader}
        action={pageAction}
      />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<div>Fallback</div>} />
  );
}

export default App;
