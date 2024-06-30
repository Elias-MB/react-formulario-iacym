import { generalApi } from "./Index.js";

const elementoApi = generalApi.create({
    baseURL: `${generalApi.defaults.baseURL}tipos-persona/`,
});

// elementoApi.interceptors.request.use(
//     generalApi.interceptors.request.handlers[0].fulfilled,
//     generalApi.interceptors.request.handlers[0].rejected
// );

export const obtenerTiposPersonaApi = async () => {
    try {
        const respuesta = await elementoApi.get('/');
        const elementos = respuesta.data;
        return elementos
    } catch (error) {
        console.error("Error al obtener tipos de persona:", error);
    }
}

export const crearTipoPersonasApi = async (tipo_persona) => {
    let response = {}
    try {
        await elementoApi.post('/', tipo_persona);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Tipo de persona ${tipo_persona.nombres} creado`;
        return response
    } catch (error) {
        
    }
};

export const actualizarTipoPersonaApi = async (tipo_persona) => {
    let response = {}
    try {
        await elementoApi.put(`${tipo_persona.id}/`, tipo_persona);
        response['tipo'] = 'info'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `TiposPersona ${tipo_persona.nombres} modificada`;
        return response
    } catch (error) {
        console.error("Error al actualizar tipo de persona:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
    
  };

export const eliminarTipoPersonaApi = async (tipo_persona) => {
    let response = {}
    try {
        await elementoApi.delete(`${tipo_persona.id}/`);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `TiposPersona ${tipo_persona.nombres} eliminado`;
        return response
    } catch (error) {
        console.error("Error al eliminar tipo de persona:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
}
