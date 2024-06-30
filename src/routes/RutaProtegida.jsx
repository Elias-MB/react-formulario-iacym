import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useHeaderTitle } from "../context/HeaderTitleContext";
import { HeaderPage } from "../components/general/header_page.jsx";

export const ProtectedRoute = () => {
  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    return Date.now() > expirationTime;
  };

  const token = localStorage.getItem("token");
  const isAuthenticated = token && !isTokenExpired(token);

  const { tituloHeader } = useHeaderTitle();

  if (!isAuthenticated) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container-fluid p-0">
        <HeaderPage titulo={tituloHeader} />
        <div id="content" className="p-3">
          <Outlet /> {/* Renderiza las rutas hijas */}
        </div>
      </div>
    </>
  );
};
