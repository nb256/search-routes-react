import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header/Header";
import MainBackground from "./components/MainBackground/MainBackground";
import SearchRouteForm from "./components/SearchRouteForm/SearchRouteForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchRouteForm />,
  },
]);

function App() {
  return (
    <div className="App">
      <Header />
      <MainBackground />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
