import {generalApi} from "./Index.js";

const elementoApi = generalApi.create({
    baseURL: `${generalApi.defaults.baseURL}registros/`,
});

// elementoApi.interceptors.request.use(
//     generalApi.interceptors.request.handlers[0].fulfilled,
//     generalApi.interceptors.request.handlers[0].rejected
// );

export const obtenerRegistrosApi = async () => {
    try {
        const respuesta = await elementoApi.get('/');
        const elementos = respuesta.data;
        console.log(elementos);
        return elementos
    } catch (error) {
        console.error("Error al obtener registros:", error);
        response['tipo'] = 'error';
        response['titulo'] = 'Error';
        response['mensaje'] = `Error al obtener registros. ${error.response.data.detail}`;
        response["duracion"] = 8000;
        return response
    }
}

export const crearRegistroApi = async (registro) => {
    let response = {}
    try {
      console.log("Registro creado", registro);
        await elementoApi.post('/', registro);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `${registro.persona.nombres}, te has registrado exitosamente ! Dios te bendiga.`;
        return response
    } catch (error) {
        response['tipo'] = 'error';
        response['titulo'] = 'Error';
        response['mensaje'] = `${registro.persona.nombres}, ha ocurrido un error durente el registro. ${error.response.data.detail}`;
        response["duracion"] = 8000;
        return response
    }
};

export const actualizarRegistroApi = async (registro) => {
    let response = {}
    try {
        await elementoApi.put(`${registro.id}/`, registro);
        response['tipo'] = 'info'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Registro ${registro.nombres} modificada`;
        return response
    } catch (error) {
        console.error("Error al actualizar registro:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
    
  };

export const eliminarRegistroApi = async (registro) => {
    let response = {}
    try {
        await elementoApi.delete(`${registro.id}/`);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Registro ${registro.nombres} eliminado`;
        return response
    } catch (error) {
        console.error("Error al eliminar registro:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
}
