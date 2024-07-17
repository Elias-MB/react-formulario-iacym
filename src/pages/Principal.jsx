import { useEffect, useState, useContext } from "react";
import { Button } from 'primereact/button';

import { useHeaderTitle } from "../context/HeaderTitleContext";
import { useNotification } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthProviderContext";

import { verificarPermisoTabla } from "../utils/authUtils";
import { NotFoundPage } from "./NotFoundPage";

export const Principal = () => {
  const { setTituloHeader } = useHeaderTitle();
  const { activarNotificacion } = useNotification();

  const redireccionar = (urlToSave) => {
    localStorage.setItem("redirectAfterLogin", urlToSave);
    window.location.href = urlToSave;
  }

  return (
    <div className="container-fluid p-0">
      <img src="/images/fondo_2.jpg" alt="" className="img-fluid fondo-img" />
      <div
        className="w-100 bg-light d-flex justify-content-center p-4"
        style={{ backgroundColor: "rgba(255,255,255,1)" }}
      >
        <img src="/images/logo_2.png" alt="" style={{ width: "250px" }} />
      </div>
      <div className="container-fluid p-0 text-center text-black mt-5 pt-5">
        <div className="p-2 py-5 my-2">
          <h2 className="text-secondary">Bienvenido</h2>
          <h1 className="text-primary">¿ Qué deseas hacer ?</h1>
        </div>
        <div className="row justify-content-center m-0">
          <div className="row col-lg-8 col-xl-6">
            <div className="rounded container-fluid p-3 col-md-6">
              <Button 
                style={{height: "100px", fontSize: "23px"}} 
                label="REGISTRARME EN UN CURSO BÍBLICO" 
                className="p-button text-white font-bold w-100 p-3 rounded" 
                onClick={() => redireccionar('/registrar')} 
              />
            </div>
            <div className="rounded container-fluid p-3 col-md-6">
              <Button 
                style={{height: "100px", fontSize: "23px"}} 
                label="VER TODOS LOS REGISTROS" 
                severity="info" 
                className="p-button text-white font-bold w-100 p-3 rounded" 
                onClick={() => redireccionar('/admin/registros')} 
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center m-0">
          <div className="row col-lg-8 col-xl-6">
            <div className="rounded container-fluid p-3 col-md-6">
              <Button 
                style={{height: "100px", fontSize: "23px"}} 
                label="REGISTRARME AL EVENTO DE PAREJAS" 
                className="p-button text-white font-bold w-100 p-3 rounded" 
                onClick={() => redireccionar('/registrar/parejas')} 
              />
            </div>
            <div className="rounded container-fluid p-3 col-md-6">
              <Button 
                style={{height: "100px", fontSize: "23px"}} 
                label="VER REGISTROS DEL EVENTO DE PAREJAS" 
                severity="info" 
                className="p-button text-white font-bold w-100 p-3 rounded" 
                onClick={() => redireccionar('/admin/registros/parejas')} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
