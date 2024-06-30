import {generalApi} from "./Index.js";

const elementoApi = generalApi.create({
    baseURL: `${generalApi.defaults.baseURL}archivo/`,
});

// elementoApi.interceptors.request.use(
//     generalApi.interceptors.request.handlers[0].fulfilled,
//     generalApi.interceptors.request.handlers[0].rejected
// );

export const obtenerArchivoApi = async (datos) => {
    try {
        const respuesta = await elementoApi.post('ver/', datos);
        const archivo = respuesta.data;
        return archivo
    } catch (error) {
        console.error("Error al obtener archivo:", error);
        return null
    }
}
