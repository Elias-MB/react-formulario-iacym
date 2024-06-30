import { generalApi } from "./Index.js";

const elementoApi = generalApi.create({
    baseURL: `${generalApi.defaults.baseURL}cursos/`,
});

// elementoApi.interceptors.request.use(
//     generalApi.interceptors.request.handlers[0].fulfilled,
//     generalApi.interceptors.request.handlers[0].rejected
// );

export const obtenerCursosApi = async () => {
    try {
        const respuesta = await elementoApi.get('/');
        const elementos = respuesta.data;
        return elementos
    } catch (error) {
        console.error("Error al obtener cursos:", error);
    }
}

export const crearCursosApi = async (curso) => {
    let response = {}
    try {
        await elementoApi.post('/', curso);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Curso ${curso.nombres} creado`;
        return response
    } catch (error) {
        
    }
};

export const actualizarCursoApi = async (curso) => {
    let response = {}
    try {
        await elementoApi.put(`${curso.id}/`, curso);
        response['tipo'] = 'info'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Curso ${curso.nombres} modificada`;
        return response
    } catch (error) {
        console.error("Error al actualizar curso:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
    
  };

export const eliminarCursoApi = async (curso) => {
    let response = {}
    try {
        await elementoApi.delete(`${curso.id}/`);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Curso ${curso.nombres} eliminado`;
        return response
    } catch (error) {
        console.error("Error al eliminar curso:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
}
