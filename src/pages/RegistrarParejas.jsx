import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

import { useConfirmDialog } from "../context/ConfirmDialogContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";

import { crearRegistroParejaApi } from "../apis/RegistroPareja.js";

export const RegistrarParejas = () => {
  const elementoEmpty = {
    idoneo: {
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      fecha_nacimiento: "",
      celular: "",
      estado: "A"
    },
    idonea: {
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      fecha_nacimiento: "",
      celular: "",
      estado: "A"
    },
    expectativas: "",
  };

  const { showConfirmDialog } = useConfirmDialog();
  const { activarNotificacion } = useNotification();
  const [loading, setLoading] = useState(false);
  const fecha_maxima_nacimiento = new Date(2005, 0, 1);

  const [elemento, setElemento] = useState(elementoEmpty);

  const onInputChange = (e, sujeto, name) => {
    const val = (e.target && e.target.value) || "";
    setElemento((prevState) => ({
      ...prevState,
      [sujeto]: {
        ...prevState[sujeto],
        [name]: val
      }
    }));
  };

  const crearRegistro = async (elemento) => {
    try {
      setLoading(true);
      const dataPost = {
        idoneo: {
          nombres: elemento.idoneo.nombres,
          apellido_paterno: elemento.idoneo.apellido_paterno,
          apellido_materno: elemento.idoneo.apellido_materno,
          fecha_nacimiento: elemento.idoneo.fecha_nacimiento,
          celular: elemento.idoneo.celular,
          estado: "A"
        },
        idonea: {
          nombres: elemento.idonea.nombres,
          apellido_paterno: elemento.idonea.apellido_paterno,
          apellido_materno: elemento.idonea.apellido_materno,
          fecha_nacimiento: elemento.idonea.fecha_nacimiento,
          celular: elemento.idonea.celular,
          estado: "A"
        },
        expectativas: elemento.expectativas,
      };
      console.log(dataPost);
      const respuesta = await crearRegistroParejaApi(dataPost);
      setLoading(false);
      activarNotificacion(respuesta);
      // if (respuesta.tipo == "success") {
      //   setElemento(elementoEmpty);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      let _elemento = { ...elemento };
      await crearRegistro(_elemento);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    // console.log(elemento);
    const camposVacios = [];
    if (!elemento.idoneo.nombres) camposVacios.push("Nombres del idóneo");
    if (!elemento.idoneo.apellido_paterno)
      camposVacios.push("Apellido Paterno del idóneo");
    if (!elemento.idoneo.apellido_materno)
      camposVacios.push("Apellido Materno del idóneo");
    if (!elemento.idoneo.fecha_nacimiento)
      camposVacios.push("Fecha de Nacimiento del idóneo");
    if (!elemento.idoneo.celular) camposVacios.push("Celular del idóneo");
    if (!elemento.idonea.nombres) camposVacios.push("Nombres de la idónea");
    if (!elemento.idonea.apellido_paterno)
      camposVacios.push("Apellido Paterno de la idónea");
    if (!elemento.idonea.apellido_materno)
      camposVacios.push("Apellido Materno de la idónea");
    if (!elemento.idonea.fecha_nacimiento)
      camposVacios.push("Fecha de Nacimiento de la idónea");
    if (!elemento.idonea.celular) camposVacios.push("Celular de la idónea");

    if (camposVacios.length > 0) {
      activarNotificacion({
        tipo: "error",
        titulo: "Error",
        mensaje: `Por favor completa todos los campos obligatorios: ${camposVacios.join(
          ", "
        )}.`,
        duracion: 10000,
      });
      return;
    }

    showConfirmDialog({
      message: `Estas seguro de registrarte al mistura romatico`,
      header: "Confirmacion",
      icon: "pi pi-exclamation-triangle",
      accept: onSubmit,
      toastOnAccept: true,
      toastOnReject: true,
      elemento: elemento,
    });
  };

  return (
    <div className="contenedor-principal">
      <img src="/images/fondo_1.jpg" alt="" className="img-fluid fondo-img" />
      <div className="formulario container-sm">
        <h1 className="pb-3">Mistura Romántico</h1>
        <form
          className="d-flex flex-column justify-content-center text-start p-1"
          onSubmit={handleConfirmSubmit}
        >
          <div className="card text-white bg-blue-600  mb-4">
            <div className="card-header text-center">DATOS DEL IDÓNEO</div>
            <div className="card-body">
              <div className="d-flex flex-column gap-2 w-100 mb-3">
                <label htmlFor="idoneo_nombres">Nombres *</label>
                <InputText
                  id="idoneo_nombres"
                  onChange={(e) => onInputChange(e, "idoneo", "nombres")}
                />
              </div>
              <div className="row">
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idoneo_apellido_paterno">Apellido Paterno *</label>
                  <InputText
                    id="idoneo_apellido_paterno"
                    onChange={(e) => onInputChange(e, "idoneo", "apellido_paterno")}
                  />
                </div>
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idoneo_apellido_materno">Apellido Materno *</label>
                  <InputText
                    id="idoneo_apellido_materno"
                    onChange={(e) => onInputChange(e, "idoneo", "apellido_materno")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idoneo_celular">Celular *</label>
                  <InputText
                    id="idoneo_celular"
                    onChange={(e) => onInputChange(e, "idoneo", "celular")}
                    maxLength={9}
                  />
                </div>
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idoneo_fecha_nacimiento">Fecha Nacimiento *</label>
                  <Calendar
                    id="idoneo_fecha_nacimiento"
                    value={elemento.idoneo.fecha_nacimiento}
                    onChange={(e) => onInputChange(e, "idoneo", "fecha_nacimiento")}
                    showIcon
                    dateFormat="dd/mm/yy"
                    maxDate={fecha_maxima_nacimiento}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card text-white bg-pink-400 mb-4">
            <div className="card-header text-center">DATOS DE LA IDÓNEA</div>
            <div className="card-body">
              <div className="d-flex flex-column gap-2 w-100 mb-3">
                <label htmlFor="idonea_nombres">Nombres *</label>
                <InputText
                  id="idonea_nombres"
                  onChange={(e) => onInputChange(e, "idonea", "nombres")}
                />
              </div>
              <div className="row">
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idonea_apellido_paterno">Apellido Paterno *</label>
                  <InputText
                    id="idonea_apellido_paterno"
                    onChange={(e) => onInputChange(e, "idonea", "apellido_paterno")}
                  />
                </div>
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idonea_apellido_materno">Apellido Materno *</label>
                  <InputText
                    id="idonea_apellido_materno"
                    onChange={(e) => onInputChange(e, "idonea", "apellido_materno")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idonea_celular">Celular *</label>
                  <InputText
                    id="idonea_celular"
                    onChange={(e) => onInputChange(e, "idonea", "celular")}
                    maxLength={9}
                  />
                </div>
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="idonea_fecha_nacimiento">Fecha Nacimiento *</label>
                  <Calendar
                    id="idonea_fecha_nacimiento"
                    value={elemento.idonea.fecha_nacimiento}
                    onChange={(e) => onInputChange(e, "idonea", "fecha_nacimiento")}
                    showIcon
                    dateFormat="dd/mm/yy"
                    maxDate={fecha_maxima_nacimiento}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-2 w-100 mb-3">
            <label htmlFor="expectativas">Expectativas del curso</label>
            <InputTextarea
              autoResize
              style={{ minHeight: "50px" }}
              value={elemento.expectativas}
              onChange={(e) => onInputChange(e, "expectativas")}
              rows={4}
              cols={30}
            />
          </div>
          <Button
            label="Inscribirme"
            icon="pi pi-check"
            className="mt-2 rounded"
            loading={loading}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
