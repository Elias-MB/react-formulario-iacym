import { useEffect, useState, useContext } from "react";
import { obtenerRegistrosApi } from "../apis/Registro.js";

import { useHeaderTitle } from "../context/HeaderTitleContext";
import { useNotification } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthProviderContext";

import { verificarPermisoTabla } from "../utils/authUtils";
import { NotFoundPage } from "./NotFoundPage";
import { TablaRegistros } from "../components/registro/TablaRegistros.jsx";

// import { TablaRegistros } from "../components/registro/TablaRegistros.jsx";

export const Registros = () => {
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
        const data = await obtenerRegistrosApi();
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
    setTituloHeader("Registros");

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
          <TablaRegistros elementos={registros} onRecargar={handleRecargar} activarNotificacion={activarNotificacion} />
        </>
      )}
    </>
  );
};
