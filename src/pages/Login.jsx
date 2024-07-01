import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/login.scss";

import { AuthContext } from "../context/AuthProviderContext.jsx";
import { obtenerToken } from "../apis/Login.js";
import { useNotification } from "../context/NotificationContext";

export function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { activarNotificacion } = useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await obtenerToken({
        username: username,
        password: password,
      });
      
      const token = response.data.access;

      login(username, token);
      // localStorage.setItem("token", token);

      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin");

      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate("/registros");
      }
    } catch (error) {
      let mensaje;
      let data = {
        tipo: 'error',
        titulo: 'Error',
      }
      if (error.response && error.response.status === 401) {
        mensaje = "Usuario o contraseña incorrectos"
      } else if (error.response && error.response.status === 500) {
        mensaje = "Error al conectarse a la base de datos, inténtelo en unos minutos."
      } else {
        mensaje = "Fallo inesperado, vuelva a intentarlo en unos minutos."
        if (error.code && error.code == 'ERR_NETWORK') {
          mensaje = 'Error de conexión. ' + mensaje
        }
      }
      setErrorMessage(mensaje);
      activarNotificacion({...data, mensaje: `${mensaje}.`})
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-text">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <input
              name="usuario"
              required
              type="text"
              className="login-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="login-span">
              <svg
                className="login-"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="50"
                height="20"
              >
                <g>
                  <path
                    className="login-"
                    fill="#595959"
                    d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"
                  ></path>
                </g>
              </svg>
            </span>
            <label className="login-label">Usuario</label>
          </div>
          <div className="login-field">
            <input
              name="password"
              required
              type="password"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="login-span">
              <svg
                className="login-"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="50"
                height="20"
              >
                <g>
                  <path
                    className="login-"
                    fill="#595959"
                    d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"
                  ></path>
                </g>
              </svg>
            </span>
            <label className="login-label">Contraseña</label>
          </div>
          <div className="login-forgot-pass">
            <a href="#">Olvidaste tu Contraseña?</a>
          </div>
          <button type="submit" className="login-button">
            Ingresar
          </button>
          <div className="login-sign-up">
            No tienes acceso ? <a href="#">Contáctanos</a>
          </div>
        </form>
        {errorMessage && <div className="login-error">{errorMessage}</div>}
      </div>
    </div>
  );
}
