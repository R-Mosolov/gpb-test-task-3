import { Main, Events, Event, NotFound404 } from "./pages";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  NOT_FOUND_PATH,
  MAIN_PATH,
  EVENT_PATH,
  DAY_EVENT_PATH
} from './constants/navigation';

const router = createBrowserRouter([
  {
    path: NOT_FOUND_PATH,
    element: <NotFound404 />,
  },
  {
    path: MAIN_PATH,
    element: <Main />,
  },
  {
    path: DAY_EVENT_PATH,
    element: <Events />,
  },
  {
    path: EVENT_PATH,
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
