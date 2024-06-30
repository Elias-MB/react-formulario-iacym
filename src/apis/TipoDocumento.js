import { generalApi } from "./Index.js";

const elementoApi = generalApi.create({
    baseURL: `${generalApi.defaults.baseURL}tipos-documento/`,
});

// elementoApi.interceptors.request.use(
//     generalApi.interceptors.request.handlers[0].fulfilled,
//     generalApi.interceptors.request.handlers[0].rejected
// );

export const obtenerTiposDocumentoApi = async () => {
    try {
        const respuesta = await elementoApi.get('/');
        const elementos = respuesta.data;
        return elementos
    } catch (error) {
        console.error("Error al obtener tipos de documento:", error);
    }
}

export const crearTipoDocumentosApi = async (tipo_documento) => {
    let response = {}
    try {
        await elementoApi.post('/', tipo_documento);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Tipo de documento ${tipo_documento.nombres} creado`;
        return response
    } catch (error) {
        
    }
};

export const actualizarTipoDocumentoApi = async (tipo_documento) => {
    let response = {}
    try {
        await elementoApi.put(`${tipo_documento.id}/`, tipo_documento);
        response['tipo'] = 'info'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `TiposDocumento ${tipo_documento.nombres} modificada`;
        return response
    } catch (error) {
        console.error("Error al actualizar tipo de documento:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
    
  };

export const eliminarTipoDocumentoApi = async (tipo_documento) => {
    let response = {}
    try {
        await elementoApi.delete(`${tipo_documento.id}/`);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `TiposDocumento ${tipo_documento.nombres} eliminado`;
        return response
    } catch (error) {
        console.error("Error al eliminar tipo de documento:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
}
