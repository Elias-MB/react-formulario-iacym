import axios from "axios";
import { generalApi } from "./Index.js";

const elementoApi = generalApi.create({
  baseURL: `${generalApi.defaults.baseURL}login/`,
});

export const obtenerToken = async (body) => {
  let response = {}
  try {
    const respuesta = await elementoApi.post("token/", body);
    return respuesta;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      throw error;
    } else if (error.response && error.response.status === 500) {
      throw error;
    } else {
      throw error;
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
