import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";

import { useConfirmDialog } from "../context/ConfirmDialogContext.jsx";
import { useNotification } from "../context/NotificationContext";

import { obtenerMinisteriosApi } from "../apis/Ministerio.js";
import { crearRegistroApi } from "../apis/Registro.js";
import { obtenerCursosApi } from "../apis/Curso.js";
import { obtenerTiposPersonaApi } from "../apis/TipoPersona.js";
import { obtenerTiposDocumentoApi } from "../apis/TipoDocumento.js";

export const Registrar = () => {
  const elementoEmpty = {
    curso: null,
    ministerio: null,
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    email: "",
    celular: "",
    documento: "",
    tipo_persona: null,
    tipo_documento: null,
    edad: "",
    fecha_nacimiento: "",
    fecha_bautismo: "",
    expectativas: "",
  };

  const { showConfirmDialog } = useConfirmDialog();
  const { activarNotificacion } = useNotification();
  const [ministerios, setMinisterios] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [tipos_persona, setTiposPersona] = useState([]);
  const [tipos_documento, setTiposDocumento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      const ministerios_ = await obtenerMinisteriosApi();
      const cursos_ = await obtenerCursosApi();
      const tipos_persona = await obtenerTiposPersonaApi();
      const tipos_documento = await obtenerTiposDocumentoApi();

      setMinisterios(ministerios_);
      setCursos(cursos_);
      setTiposPersona(tipos_persona);
      setTiposDocumento(tipos_documento);
    };
    obtenerDatos();
  }, []);

  const [elemento, setElemento] = useState(elementoEmpty);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    setElemento((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleFileChange = async (event) => {
    setFile(event.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.clear();
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      console.log(email);
      return false;
    }
    return true;
  };

  const crearRegistro = async (elemento) => {
    try {
      setLoading(true);
      const dataPost = {
        persona: {
          nombres: elemento.nombres,
          apellido_paterno: elemento.apellido_paterno,
          apellido_materno: elemento.apellido_materno,
          ministerio: elemento.ministerio,
          documento: elemento.documento,
          fecha_nacimiento: elemento.fecha_nacimiento,
          fecha_bautismo: elemento.fecha_bautismo,
          celular: elemento.celular,
          email: elemento.email,
          tipo_documento: elemento.tipo_documento,
        },
        curso: elemento.curso,
        archivo: elemento.voucher,
        tipo_persona: tipos_persona[0],
      };
      const respuesta = await crearRegistroApi(dataPost);
      setLoading(false);
      activarNotificacion(respuesta);
      if (respuesta.tipo == "success") {
        setElemento(elementoEmpty);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      let _elemento = { ...elemento };
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64Image = reader.result;
          _elemento = { ..._elemento, voucher: base64Image };
          await crearRegistro(_elemento);
        };
      } else {
        _elemento.voucher = null;
        _elemento.fecha_bautismo = null;
        await crearRegistro(_elemento);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    const camposVacios = [];
    if (!elemento.curso) camposVacios.push("Curso");
    if (!elemento.nombres) camposVacios.push("Nombres");
    if (!elemento.apellido_paterno) camposVacios.push("Apellido Paterno");
    if (!elemento.apellido_materno) camposVacios.push("Apellido Materno");
    if (!elemento.email) camposVacios.push("Email");
    if (!elemento.celular) camposVacios.push("Celular");
    if (!elemento.documento) camposVacios.push("Documento");
    if (!elemento.fecha_nacimiento) camposVacios.push("Fecha de Nacimiento");
    if (!elemento.tipo_documento) camposVacios.push("Tipo de documento");
    if (!elemento.ministerio) camposVacios.push("Ministerio");
    if (elemento.curso) {
      if (elemento.curso.nombre.includes("PANORAMA")) {
        if (!elemento.fecha_bautismo) camposVacios.push("Fecha de Bautismo");
        if (!file) camposVacios.push("Voucher");
      } else {
        setFile(null);
      }
    }

    if (camposVacios.length > 0 || !validateEmail(elemento.email)) {
      if (camposVacios.length > 0) {
        activarNotificacion({
          tipo: "error",
          titulo: "Error",
          mensaje: `Por favor completa todos los campos obligatorios: ${camposVacios.join(
            ", "
          )}.`,
          duracion: 10000,
        });
      }
      if (elemento.email.length && !validateEmail(elemento.email)) {
        activarNotificacion({
          tipo: "warn",
          titulo: "Cuidado",
          mensaje: `Tu email no es un email valido.`,
        });
      }
      return;
    }

    showConfirmDialog({
      message: `Estas seguro de registrarte al curso de ${elemento.curso.nombre}`,
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
        <h1 className="pb-3">Academia Bíblica</h1>
        <div className="card">
          <TabView>
            {cursos.map((curso, index) => (
              <TabPanel key={index} header={curso.nombre}>
                <p className="m-0">{curso.desc}</p>
              </TabPanel>
            ))}
          </TabView>
        </div>
        <form
          className="d-flex flex-column justify-content-center text-start p-1"
          onSubmit={handleConfirmSubmit}
        >
          <div className="d-flex flex-column gap-2 w-100 mb-3">
            <label htmlFor="curso">Curso a inscribirse *</label>
            <Dropdown
              value={elemento.curso}
              onChange={(e) => onInputChange(e, "curso")}
              options={cursos}
              optionLabel="nombre"
              placeholder="Selecciona un curso"
              // className="w-full md:w-14rem"
              checkmark={true}
              highlightOnSelect={false}
            />
          </div>
          {elemento.curso ? (
            !elemento.curso.nombre.includes("PANORAMA") ? null : (
              <div className="row">
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="apellido_paterno">
                    Fecha Bautismo * (aproximado)
                  </label>
                  <Calendar
                    value={elemento.fecha_bautismo}
                    onChange={(e) => onInputChange(e, "fecha_bautismo")}
                    view="month"
                    dateFormat="mm/yy"
                    showIcon
                  />
                  
                </div>
                <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
                  <label htmlFor="apellido_materno">Voucher pago *</label>
                  {file ? (
                    <>
                      <div
                        className="card d-flex justify-content-start align-items-center"
                        style={{ maxHeight: "200px", overflow: "hidden" }}
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="Image"
                          width="250"
                          preview
                        />
                      </div>
                      <Button
                        label="Eliminar voucher"
                        className="rounded"
                        icon="pi pi-times"
                        onClick={handleRemoveFile}
                      />
                    </>
                  ) : (
                    <FileUpload
                      chooseLabel="Elegir voucher"
                      mode="basic"
                      name="demo[]"
                      url="/api/upload"
                      accept="image/*"
                      maxFileSize={1000000}
                      onSelect={handleFileChange}
                      auto={false}
                      customUpload
                      ref={fileInputRef}
                    />
                  )}
                </div>
              </div>
            )
          ) : null}
          <div className="d-flex flex-column gap-2 w-100 mb-3">
            <label htmlFor="nombres">Nombres *</label>
            <InputText
              id="nombres"
              onChange={(e) => onInputChange(e, "nombres")}
            />
          </div>
          <div className="row">
            <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
              <label htmlFor="apellido_paterno">Apellido Paterno *</label>
              <InputText
                id="apellido_paterno"
                onChange={(e) => onInputChange(e, "apellido_paterno")}
              />
            </div>
            <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
              <label htmlFor="apellido_materno">Apellido Materno *</label>
              <InputText
                id="apellido_materno"
                onChange={(e) => onInputChange(e, "apellido_materno")}
              />
            </div>
          </div>
          <div className="row">
            <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                onChange={(e) => onInputChange(e, "email")}
                onBlur={(e) => validateEmail(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column gap-2 col-sm-6 mb-3">
              <label htmlFor="celular">Celular *</label>
              <InputText
                id="celular"
                onChange={(e) => onInputChange(e, "celular")}
                maxLength={9}
              />
            </div>
          </div>
          <div className="row">
            <div className="d-flex flex-column gap-2 col-sm-4 mb-3">
              <label htmlFor="fecha_nacimiento">Fecha Nacimiento *</label>
              <Calendar
                id="fecha_nacimiento"
                value={elemento.fecha_nacimiento}
                onChange={(e) => onInputChange(e, "fecha_nacimiento")}
                showIcon
                dateFormat="dd/mm/yy"
              />
            </div>
            <div className="row col-sm-8 p-0 m-0 align-items-end">
              <div className="d-flex flex-column gap-2 col-sm-6 col-6 mb-3 pt-0">
                <label htmlFor="edad">Tipo de Documento *</label>
                <Dropdown
                  value={elemento.tipo_documento}
                  onChange={(e) => onInputChange(e, "tipo_documento")}
                  options={tipos_documento}
                  optionLabel="nombre"
                  placeholder="Selecciona un tipo de documento"
                  // className="w-full md:w-14rem"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
              <div className="d-flex flex-column gap-2 col-sm-6 col-6 mb-3 pt-0">
                <label htmlFor="documento">Documento *</label>
                <InputText
                  id="documento"
                  onChange={(e) => onInputChange(e, "documento")}
                  maxLength={8}
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-2 w-100 mb-3">
            <label htmlFor="ministerio">Ministerio al que asiste *</label>
            <Dropdown
              value={elemento.ministerio}
              onChange={(e) => onInputChange(e, "ministerio")}
              options={ministerios}
              optionLabel="nombre"
              placeholder="Selecciona un ministerio"
              // className="w-full md:w-14rem"
              checkmark={true}
              highlightOnSelect={false}
            />
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
