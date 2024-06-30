import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { PDFViewer } from "@react-pdf/renderer";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import { ImageComponent } from "../general/imagen.jsx";

import { eliminarRegistroApi } from "../../apis/Registro.js";

export function TablaRegistros({ elementos, onRecargar, activarNotificacion }) {
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
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [elemento_dialogo, setElementoDialog] = useState(false);
  const [dialogo_eliminar_elemento, setDeleteElementoDialog] = useState(false);
  const [dialogo_eliminar_elementos, setDeleteElementosDialog] =
    useState(false);
  const [elemento, setElemento] = useState(elementoEmpty);
  const [elementos_seleccionados, setElementoSeleccionado] = useState(null);
  const [actionCrearEditar, setAccionCrearOEditar] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [file, setFile] = useState(null);
  const [archivoNombre, setArchivoNombre] = useState("");
  const [datos_archivo, setDatosArchivo] = useState(null);
  const dt = useRef(null);

  const isValidUbigeo = (value) => {
    const regex = /^\d{6}$/;
    return regex.test(value);
  };

  const isValidRuc = (value) => {
    const regex = /^\d{11}$/;
    return regex.test(value);
  };

  const openNew = () => {
    // setAccionCrearOEditar("crear");
    // setArchivoNombre("");
    // setElemento(entidad_empresa);
    // setSubmitted(false);
    // setElementoDialog(true);
    navigate("/registrar");
  };

  const ocultarDialogo = () => {
    setSubmitted(false);
    setElementoDialog(false);
    setDatosArchivo(null);
  };

  const ocultarDialogoEliminarElemento = () => {
    setDeleteElementoDialog(false);
  };

  const ocultarDialogoEliminarElementos = () => {
    setDeleteElementosDialog(false);
  };

  const handleFileChange = async (event) => {
    setFile(event.files[0]);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
  const formattedDate = formatDate(date);

  const guardarElemento = async () => {
    //     try {
    //       setSubmitted(true);
    //       if (
    //         !elemento.nombre.trim() ||
    //         !elemento.raz_social.trim() ||
    //         !isValidRuc(elemento.ruc) ||
    //         !elemento.direccion.trim() ||
    //         !elemento.ubigeo.trim() ||
    //         !isValidUbigeo(elemento.ubigeo) ||
    //         !elemento.ofi_reg.trim()
    //       ) {
    //         return;
    //       }
    //       let respuesta;
    //       if (actionCrearEditar === "crear") {
    //         if (elemento.nombre.trim()) {
    //           let _elemento = { ...elemento };
    //           if (file) {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onloadend = async () => {
    //               const base64Image = reader.result;
    //               console.log(base64Image);
    //               _elemento = { ..._elemento, avatar: base64Image };
    //               respuesta = await crearEmpresaApi(_elemento);
    //               activarNotificacion(respuesta);
    //             };
    //           } else {
    //             delete _elemento.avatar;
    //             respuesta = await crearEmpresaApi(_elemento);
    //             activarNotificacion(respuesta);
    //           }
    //           setElementoDialog(false);
    //           setElemento(entidad_empresa);
    //         }
    //       } else if (actionCrearEditar === "editar") {
    //         let _elemento = { ...elemento };
    //         console.log(_elemento);
    //         if (file) {
    //           const reader = new FileReader();
    //           reader.readAsDataURL(file);
    //           reader.onloadend = async () => {
    //             const base64Image = reader.result;
    //             _elemento = { ..._elemento, avatar: base64Image };
    //             respuesta = await actualizarEmpresaApi(_elemento);
    //             activarNotificacion(respuesta);
    //           };
    //         } else {
    //           delete _elemento.avatar;
    //           respuesta = await actualizarEmpresaApi(_elemento);
    //           activarNotificacion(respuesta);
    //         }
    //         setElementoDialog(false);
    //         setElemento(entidad_empresa);
    //       }
    //       onRecargar();
    //     } catch (error) {
    //       console.log(error);
    //     }
  };

  const editarElemento = async (elemento_seleccionado) => {
    //     setAccionCrearOEditar("editar");
    //     let dataArchivo = {
    //       nombre_modelo: "Empresa",
    //       id_elemento: elemento_seleccionado.id,
    //       tipo: "image",
    //       subtipo: "logo",
    //     };
    //     setDatosArchivo(dataArchivo);
    //     console.log(elemento_seleccionado);
    //     if (elemento_seleccionado.nombre_archivo != "") {
    //       setArchivoNombre(elemento_seleccionado.nombre_archivo);
    //     }
    //     setElemento(elemento_seleccionado);
    //     console.log(archivoNombre);
    //     setElementoDialog(true);
  };

  const confirmarEliminarElemento = (elemento) => {
    setElemento(elemento);
    setDeleteElementoDialog(true);
  };

  const eliminarElemento = async () => {
    const elemento_seleccionado = elemento;
    const respuesta = await eliminarRegistroApi(elemento_seleccionado);
    const elementos_actualizados = elementos.filter(
      (elemento) => elemento.id !== elemento_seleccionado.id
    );
    setElemento(elementos_actualizados);
    setDeleteElementoDialog(false);
    activarNotificacion(respuesta);
    onRecargar();
  };

  const confirmarEliminarElementoSeleccionado = () => {
    setDeleteElementosDialog(true);
  };

  const eliminarElementoSeleccioado = async () => {
    const promesasEliminacion = elementos_seleccionados.map(
      async (elemento) => {
        const respuesta = await eliminarRegistroApi(elemento);
        return respuesta;
      }
    );

    const respuestas = await Promise.all(promesasEliminacion);

    const elementos_actualizados = elementos.filter(
      (elemento) =>
        !elementos_seleccionados.some(
          (elemento_seleccionado) => elemento_seleccionado.id === elemento.id
        )
    );

    setElemento(elementos_actualizados);
    setDeleteElementoDialog(false);
    setDeleteElementosDialog(false);
    setElementoSeleccionado(null);
    respuestas.forEach((respuesta) => {
      activarNotificacion(respuesta);
    });
    onRecargar();
  };

  const onStateChange = (e) => {
    let _elemento = { ...elemento };
    if (e.value) _elemento["estado"] = "A";
    else _elemento["estado"] = "I";
    setElemento(_elemento);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _elemento = { ...elemento };

    _elemento[`${name}`] = val;

    setElemento(_elemento);
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        // Extract the relevant attributes from the data
        const dataToExport = elementos.map((item) => ({
          nombres: item.persona.nombres,
          apellido_paterno: item.persona.apellido_paterno,
          apellido_materno: item.persona.apellido_materno,
          celular: item.persona.celular,
          edad: item.persona.edad,
          curso: item.curso.nombre,
          ministerio: item.ministerio.nombre,
        }));

        const exportColumns = [
          { title: "Nombres", dataKey: "nombres" },
          { title: "Apellido Paterno", dataKey: "apellido_paterno" },
          { title: "Apellido Materno", dataKey: "apellido_materno" },
          { title: "Celular", dataKey: "celular" },
          { title: "Edad", dataKey: "edad" },
          { title: "Curso", dataKey: "curso" },
          { title: "Ministerio", dataKey: "curso" },
        ];

        doc.autoTable(exportColumns, dataToExport);
        doc.save("Registros.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const dataToExport = elementos.map((item) => ({
        nombres: item.persona.nombres,
        apellido_paterno: item.persona.apellido_paterno,
        apellido_materno: item.persona.apellido_materno,
        celular: item.persona.celular,
        edad: item.persona.edad,
        curso: item.curso.nombre,
        ministerio: item.ministerio.nombre,
      }));

      const worksheet = xlsx.utils.json_to_sheet(dataToExport);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "Registros");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="d-flex flex-row gap-2">
        <Button
          label="Nuevo"
          icon="pi pi-plus"
          className="rounded"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="rounded"
          severity="danger"
          onClick={confirmarEliminarElementoSeleccionado}
          disabled={!elementos_seleccionados || !elementos_seleccionados.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex align-items-center justify-content-end gap-2">
        <Button
          label="CSV"
          type="button"
          className="rounded"
          icon="pi pi-file"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          label="Excel"
          type="button"
          className="rounded"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          label="PDF"
          type="button"
          className="rounded"
          icon="pi pi-file-pdf"
          severity="warning"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <Button
            icon="pi pi-pencil"
            outlined
            className="rounded"
            onClick={() => editarElemento(rowData)}
          />
          <Button
            icon="pi pi-trash"
            outlined
            className="rounded"
            severity="danger"
            onClick={() => confirmarEliminarElemento(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Registros</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </IconField>
    </div>
  );
  const elemento_dialogo_footer = (
    <React.Fragment>
      <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
        <Button
          label="Cancelar"
          className="mr-3 border-round"
          icon="pi pi-times"
          outlined
          onClick={ocultarDialogo}
        />
        <Button
          label="Guardar"
          className="mr-3  border-round"
          icon="pi pi-check"
          onClick={guardarElemento}
        />
      </div>
    </React.Fragment>
  );
  const dialogo_eliminar_elemento_footer = (
    <React.Fragment>
      <div className="d-flex justify-content-end align-items-center gap-3">
        <Button
          label="No"
          className="border-round"
          icon="pi pi-times"
          outlined
          onClick={ocultarDialogoEliminarElemento}
        />
        <Button
          label="Sí"
          className="border-round"
          icon="pi pi-check"
          severity="danger"
          onClick={eliminarElemento}
        />
      </div>
    </React.Fragment>
  );
  const dialogo_eliminar_elementos_footer = (
    <React.Fragment>
      <div className="d-flex justify-content-end align-items-center gap-3">
        <Button
          label="No"
          className="border-round"
          icon="pi pi-times"
          outlined
          onClick={ocultarDialogoEliminarElementos}
        />
        <Button
          label="Sí"
          className="border-round"
          icon="pi pi-check"
          severity="danger"
          onClick={eliminarElementoSeleccioado}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div className="mt-5 pt-4">
      <div className="card">
        <Toolbar
          className="mb-4"
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={elementos}
          selection={elementos_seleccionados}
          onSelectionChange={(e) => setElementoSeleccionado(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Viendo {first} de {last} de un total de {totalRecords} registros"
          globalFilter={globalFilter}
          header={header}
          sortField="id"
          sortOrder={-1}
          emptyMessage="No se encontrados datos"
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="id"
            header="id"
            sortable
            style={{ minWidth: "3rem" }}
          ></Column>
          <Column
            field="persona.nombre_completo"
            header="Nombre Completo"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="persona.celular"
            header="Celular"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="curso.nombre"
            header="Curso"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="ministerio.nombre"
            header="Ministerio"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Opciones"
            body={actionBodyTemplate}
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>

      {/* <Dialog
        visible={elemento_dialogo}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle de Empresa"
        modal
        className="p-fluid"
        footer={elemento_dialogo_footer}
        onHide={ocultarDialogo}
      >
        <div className="field">
          <label htmlFor="raz_social" className="font-bold">
            Razon Social
          </label>
          <InputText
            id="raz_social"
            value={elemento.raz_social}
            onChange={(e) => onInputChange(e, "raz_social")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !elemento.raz_social,
            })}
          />
          {submitted && !elemento.raz_social && (
            <small className="p-error">Se requiere razon social.</small>
          )}
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="nombre" className="font-bold">
              Nombre
            </label>
            <InputText
              id="nombre"
              value={elemento.nombre}
              onChange={(e) => onInputChange(e, "nombre")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !elemento.nombre,
              })}
            />
            {submitted && !elemento.nombre && (
              <small className="p-error">Se requiere nombre.</small>
            )}
          </div>
          <div className="field col">
            <label htmlFor="ruc" className="font-bold">
              Ruc
            </label>
            <InputText
              id="ruc"
              value={elemento.ruc}
              onChange={(e) => onInputChange(e, "ruc")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !elemento.ruc,
              })}
            />
            {submitted && !isValidRuc(elemento.ruc) && (
              <small className="p-error">Ruc incorrecto.</small>
            )}
            {submitted && !elemento.ruc && (
              <small className="p-error">Se requiere ruc.</small>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="direccion" className="font-bold">
            Direccion
          </label>
          <InputText
            id="direccion"
            value={elemento.direccion}
            onChange={(e) => onInputChange(e, "direccion")}
            required
            className={classNames({
              "p-invalid": submitted && !elemento.direccion,
            })}
          />
          {submitted && !elemento.direccion && (
            <small className="p-error">Se requiere direccion.</small>
          )}
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="ubigeo" className="font-bold">
              Ubigeo
            </label>
            <InputText
              id="ubigeo"
              value={elemento.ubigeo}
              onChange={(e) => onInputChange(e, "ubigeo")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !elemento.ubigeo,
              })}
            />
            {submitted && !isValidUbigeo(elemento.ubigeo) && (
              <small className="p-error">Ubigeo incorrecto.</small>
            )}
            {submitted && !elemento.ubigeo && (
              <small className="p-error">Se requiere ubigeo.</small>
            )}
          </div>
          <div className="field col">
            <label htmlFor="ofi_reg" className="font-bold">
              Oficina Registral
            </label>
            <InputText
              id="ofi_reg"
              value={elemento.ofi_reg}
              onChange={(e) => onInputChange(e, "ofi_reg")}
              required
              rows={3}
              cols={20}
              className={classNames({
                "p-invalid": submitted && !elemento.ofi_reg,
              })}
            />
            {submitted && !elemento.ofi_reg && (
              <small className="p-error">Se requiere oficina registral.</small>
            )}
          </div>
        </div>
        <div className="field">
          <label className="mb-3 font-bold">Estado</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="activo"
                name="estado"
                value={true}
                onChange={onStateChange}
                checked={elemento.estado === "A"}
              />
              <label htmlFor="activo">Activo</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="inactivo"
                name="estado"
                value={false}
                onChange={onStateChange}
                checked={elemento.estado === "I"}
              />
              <label htmlFor="inactivo">Inactivo</label>
            </div>
          </div>
        </div>

        <div className="field">
          <FileUpload
            name="demo[]"
            url={"/api/upload"}
            accept="image/*"
            maxFileSize={1000000}
            emptyTemplate={
              datos_archivo ? (
                <ImageComponent datos={datos_archivo} />
              ) : (
                <div>Selecciona una imagen o sueltala aquí..</div>
              )
            }
            contentClassName="p-1"
            chooseLabel="Elegir"
            uploadOptions={{
              className: "input_option_personalizado", // Aquí asignas la clase CSS
            }}
            onSelect={handleFileChange}
            className="input_file_personalizado"
          />
        </div>
        <Calendar
          id="buttondisplay"
          value={date}
          onChange={(e) => setDate(e.value)}
          showIcon
          className="d-none"
        />
        <div className="field">
          <label htmlFor="desc" className="font-bold">
            Descripción
          </label>
          <InputTextarea
            id="desc"
            value={elemento.desc}
            onChange={(e) => onInputChange(e, "desc")}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog> */}

      <Dialog
        visible={dialogo_eliminar_elemento}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmar"
        modal
        footer={dialogo_eliminar_elemento_footer}
        onHide={ocultarDialogoEliminarElemento}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {elemento.persona &&  (
            <span>
              ¿ Estás seguro de eliminar a <b>{elemento.persona.nombres}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={dialogo_eliminar_elementos}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmar"
        modal
        footer={dialogo_eliminar_elementos_footer}
        onHide={ocultarDialogoEliminarElementos}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {elemento && (
            <span>
              ¿ Estas seguro de eliminar los elementos seleccionados ?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
