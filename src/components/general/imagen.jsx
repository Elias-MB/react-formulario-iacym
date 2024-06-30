import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { obtenerArchivoApi } from "../../apis/Archivo.js";

export const ImageComponent = ({ datos }) => {
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    const obtenerArchivo = async () => {
      const archivo = await obtenerArchivoApi(datos);
      setImageBase64(archivo.base64);
    };
    obtenerArchivo();
  }, [datos]);

  const imageSrc = `data:image/jpeg;base64,${imageBase64}`;

  return (
    <>
      {imageBase64 ? (
          <Image src={imageSrc} alt="Imagen" width="150" preview className="p-2 d-flex justify-content-center" />
      ) : (
        <>No hay archivo vinculado.</>
      )}
    </>
  );
};
