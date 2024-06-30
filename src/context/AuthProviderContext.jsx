import React, { createContext, useState, useEffect } from 'react';

import { obtenerPermisosUsuarioLogeadoApi } from "../apis/Usuario.js";

export const AuthContext = createContext();

export const AuthProviderContext = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [permisos, setPermisos] = useState([]);

    const login = (username, token) => {
        setUsername(username);
        setToken(token);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUsername(null);
        setToken(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        fetchPermisos(username);
    };

    const fetchPermisos = async (username) => {
        // const permisos = await obtenerPermisosUsuarioLogeadoApi(username, token);
        const permisos_de_usuario = permisos.permisos_usuario;
        setPermisos(permisos_de_usuario);
    };

    useEffect(() => {
        if (username) {
            fetchPermisos(username);
        }
    }, [username]);


    return (
        <AuthContext.Provider value={{ username, token, permisos, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};