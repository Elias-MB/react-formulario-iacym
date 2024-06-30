import axios from "axios";
import dataConfig from "../services/config.json";

const urlBack = dataConfig.BaseURLBack;

const loginApi = axios.create({
  baseURL: `${urlBack}/api/v1/login/`,
});

export const obtenerToken = async (body) => {
  try {
    const respuesta = await loginApi.post("token/", body);
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
    const respuesta = await loginApi.post("token/refresh/", body);
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error("Error al actualizar el token:", error);
    throw error;
  }
};
