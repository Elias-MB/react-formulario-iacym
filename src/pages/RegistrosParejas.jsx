import { useEffect, useState, useContext } from "react";
import { obtenerRegistrosParejasApi } from "../apis/RegistroPareja.js";

import { useHeaderTitle } from "../context/HeaderTitleContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";
import { AuthContext } from "../context/AuthProviderContext.jsx";

import { verificarPermisoTabla } from "../utils/authUtils.js";
import { NotFoundPage } from "./NotFoundPage.jsx";
import { TablaRegistrosParejas } from "../components/registro/TablaRegistrosParejas.jsx";


export const RegistrosParejas = () => {
  const { setTituloHeader } = useHeaderTitle();
  const { activarNotificacion } = useNotification();
  const { permisos } = useContext(AuthContext);

  const [registros, setElemento] = useState([]);
  const [recargar, setRecarga] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleRecargar = () => {
    setRecarga(true);
  };

  useEffect(() => {
    async function cargarElementos() {
      try {
        const data = await obtenerRegistrosParejasApi();
        if (data.tipo) {
          if ((data.tipo = "error")) {
            activarNotificacion(data);
          }
        } else {
          setElemento(data);
        }
        setRecarga(false);
      } catch (error) {
        console.error("Error al obtener registros:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarElementos();
  }, [recargar]);

  useEffect(() => {
    setTituloHeader("Registros Parejas");

    return () => setTituloHeader("");
  }, [setTituloHeader]);

  if (verificarPermisoTabla(permisos, "cursopersona") < 1) {
    return <NotFoundPage />;
  }

  return (
    <>
      {loading ? (
        <h5 className="mensaje-carga">Cargando registros...</h5>
      ) : (
          <>
          <TablaRegistrosParejas elementos={registros} onRecargar={handleRecargar} activarNotificacion={activarNotificacion} />
        </>
      )}
    </>
  );
};
