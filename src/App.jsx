import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/soho-light/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { Rutas } from "./routes/Rutas.jsx";
import { AuthProviderContext } from "./context/AuthProviderContext.jsx";

import "./index.css";
import "./assets/scss/principal.scss"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProviderContext>
          <div className="container-fluid m-0 p-0 wrapper d-flex align-items-stretch">
            <Rutas />
          </div>
        </AuthProviderContext>
      </BrowserRouter>
    </>
  );
}

export default App;
