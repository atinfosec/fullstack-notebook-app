import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NotesProvider from "./context/Notes.context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdatePage from "./pages/Update.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/update/:id",
    element: <UpdatePage />,
  },
]);

// console.log(NotesProvider);
createRoot(document.getElementById("root")).render(
  <NotesProvider>
    {/* <App /> */}
    <RouterProvider router={routes}></RouterProvider>
  </NotesProvider>
);
