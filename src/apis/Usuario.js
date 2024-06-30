import {generalApi} from "./Index.js";

const elementoApi = generalApi.create({
    baseURL: `${generalApi.defaults.baseURL}usuarios/`,
});

// elementoApi.interceptors.request.use(
//     generalApi.interceptors.request.handlers[0].fulfilled,
//     generalApi.interceptors.request.handlers[0].rejected
// );

export const obtenerUsuariosApi = async () => {
    try {
        const respuesta = await elementoApi.get('/');
        const usuarios = respuesta.data;
        return usuarios
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

export const crearUsuarioApi = async (usuario) => {
    let response = {}
    try {
        await elementoApi.post('/', usuario);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Usuario ${usuario.nombres} creado`;
        return response
    } catch (error) {
        
    }
};

export const actualizarUsuarioApi = async (usuario) => {
    let response = {}
    try {
        await elementoApi.put(`${usuario.id}/`, usuario);
        response['tipo'] = 'info'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Usuario ${usuario.nombres} modificada`;
        return response
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
    
  };

export const eliminarUsuarioApi = async (usuario) => {
    let response = {}
    try {
        await elementoApi.delete(`${usuario.id}/`);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Usuario ${usuario.nombres} eliminado`;
        return response
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
}

export const obtenerPermisosApi = async () => {
    try {
        const respuesta = await elementoApi.get('/permisos/');
        const elementos = respuesta.data;
        return elementos
    } catch (error) {
        console.error("Error al obtener permisos:", error);
    }
}

export const obtenerGruposApi = async () => {
    try {
        const respuesta = await elementoApi.get('/grupos/');
        const elementos = respuesta.data;
        return elementos
    } catch (error) {
        console.error("Error al obtener permisos:", error);
    }
}

export const obtenerPermisosUsuarioLogeadoApi = async (username, token) => {
    try {
        const respuesta = await elementoApi.post('/logeado/permisos/', 
            {username},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const elementos = respuesta.data;
        return elementos
    } catch (error) {
        console.error("Error al obtener permisos:", error);
    }
}