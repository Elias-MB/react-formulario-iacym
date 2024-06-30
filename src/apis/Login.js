import axios from "axios";
import { generalApi } from "./Index.js";

const elementoApi = generalApi.create({
  baseURL: `${generalApi.defaults.baseURL}login/`,
});

export const obtenerToken = async (body) => {
  try {
    const respuesta = await elementoApi.post("token/", body);
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw error;
    } else {
      return;
    }
  }
};

export const actualizarToken = async (body) => {
  try {
    const respuesta = await elementoApi.post("token/refresh/", body);
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error("Error al actualizar el token:", error);
    throw error;
  }
};
