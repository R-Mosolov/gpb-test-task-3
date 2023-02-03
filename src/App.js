import { Main, Events, Event, NotFound404 } from "./pages";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound404 />,
  },
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/:id",
    element: <Event />,
  },
]);

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
