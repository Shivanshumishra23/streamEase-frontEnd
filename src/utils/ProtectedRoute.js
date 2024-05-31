import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "./api";
import { jwtDecode } from "jwt-decode";

export const Protected = () => {
  const location = useLocation();
  const isLoggedIn = isAuthenticated();

  return (
    <>
      {isLoggedIn && isLoggedIn?.accessToken ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          redirect="/login"
          replace
          state={{ from: location }}
        />
      )}
    </>
  );
};
