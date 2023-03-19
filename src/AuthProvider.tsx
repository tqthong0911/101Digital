import { Navigate, useLocation } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN } from "common/constants";
import { LOGIN_URL } from "pages/Login/constant";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  const location = useLocation();

  if (!token) {
    return <Navigate to={LOGIN_URL} state={{ from: location }} replace />;
  }

  return children;
}
