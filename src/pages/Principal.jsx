import { useEffect, useState, useContext } from "react";
import { obtenerRegistrosApi } from "../apis/Registro.js";

import { useHeaderTitle } from "../context/HeaderTitleContext";
import { useNotification } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthProviderContext";

import { verificarPermisoTabla } from "../utils/authUtils";
import { NotFoundPage } from "./NotFoundPage";


export const Principal = () => {
  const { setTituloHeader } = useHeaderTitle();
  const { activarNotificacion } = useNotification();


  return (
    <>
      PRINCIPAL
    </>
  );
};
