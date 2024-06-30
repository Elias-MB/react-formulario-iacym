import { generalApi } from "./Index.js";

const elementoApi = generalApi.create({
    baseURL: `${generalApi.defaults.baseURL}ministerios/`,
});

// elementoApi.interceptors.request.use(
//     generalApi.interceptors.request.handlers[0].fulfilled,
//     generalApi.interceptors.request.handlers[0].rejected
// );

export const obtenerMinisteriosApi = async () => {
    try {
        // const elementos = [
        //     { nombre: "Pasion Juvenil", codigo: "PJ" },
        //     { nombre: "Conetados", codigo: "CO" },
        //     { nombre: "Jovenes Adultos y profesionales", codigo: "JAP" },
        //     { nombre: "Entre Amigas", codigo: "EA" },
        //     { nombre: "Hombres de pacto", codigo: "HP" },
        //   ]
        const respuesta = await elementoApi.get('/');
        const elementos = respuesta.data;
        return elementos
    } catch (error) {
        console.error("Error al obtener ministerios:", error);
    }
}

export const crearMinisteriosApi = async (ministerio) => {
    let response = {}
    try {
        await elementoApi.post('/', ministerio);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Ministerio ${ministerio.nombres} creado`;
        return response
    } catch (error) {
        
    }
};

export const actualizarMinisterioApi = async (ministerio) => {
    let response = {}
    try {
        await elementoApi.put(`${ministerio.id}/`, ministerio);
        response['tipo'] = 'info'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Ministerio ${ministerio.nombres} modificada`;
        return response
    } catch (error) {
        console.error("Error al actualizar ministerio:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
    
  };

export const eliminarMinisterioApi = async (ministerio) => {
    let response = {}
    try {
        await elementoApi.delete(`${ministerio.id}/`);
        response['tipo'] = 'success'
        response['titulo'] = 'Exitoso';
        response['mensaje'] = `Ministerio ${ministerio.nombres} eliminado`;
        return response
    } catch (error) {
        console.error("Error al eliminar ministerio:", error);
        response['tipo'] = 'warning'
        response['titulo'] = 'Error';
        response['mensaje'] = error;
        return response
    }
}
