import "./App.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./comp/Root";
import Page, { loader as pageLoader, action as pageAction } from "./comp/Page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
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
