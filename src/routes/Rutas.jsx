import React from "react";
import { Routes, Route } from "react-router-dom";

import { RegistrarParejas } from "../pages/RegistrarParejas.jsx";
import { RegistrosParejas } from "../pages/RegistrosParejas.jsx";
import { Registrar } from "../pages/Registrar.jsx";
import { Registros } from "../pages/Registros.jsx";
import { Principal } from "../pages/Principal.jsx";
import { Login } from "../pages/Login.jsx";

import { ProtectedRoute } from "./RutaProtegida.jsx";
import { NotificationProvider } from "../context/NotificationContext.jsx";
import { ConfirmDialogProvider } from "../context/ConfirmDialogContext.jsx";
import { HeaderTitleProvider } from "../context/HeaderTitleContext.jsx";

export function Rutas() {
  return (
    <>
      <NotificationProvider>
        <ConfirmDialogProvider>
          <HeaderTitleProvider>
            <Routes>
              <Route path="/" element={<Principal layout={true} />} />
              <Route path="/registrar" element={<Registrar layout={true} />} />
              <Route path="/registrar/parejas" element={<RegistrarParejas layout={true} />} />
              <Route path="/login" element={<Login layout={false} />} />
              <Route path="/admin/" element={<ProtectedRoute />}>
                <Route path="registros" element={<Registros />} />
                <Route path="registros/parejas" element={<RegistrosParejas />} />
              </Route>
            </Routes>
          </HeaderTitleProvider>
        </ConfirmDialogProvider>
      </NotificationProvider>
    </>
  );
}
