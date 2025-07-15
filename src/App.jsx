import { usePage } from "./layout/PageContext";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";

export default function App() {
  const { page } = usePage();

  if (page === "register") return <Register />;
  if (page === "login") return <Login />;
  if (page === "activities") return <ActivitiesPage />;

  return <Error404 />;
}
