import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Plantilla from './plantilla_carga_gestiones.xlsx';

const App = () => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [file, setFile] = useState(null);

  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const campana = params.get("campana");

    if (!id || !campana) {
      throw new Error("Faltan parámetros en la URL.");
    }

    return { id, campana };
  };

  const decrypt = async (value) => {
    if (!value || value.trim() === "") {
      throw new Error("El valor encriptado está vacío o es inválido.");
    }

    const response = await fetch("http://192.52.242.238:8000/api/decrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encrypted_value: value }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al desencriptar: ${errorText}`);
    }

    const data = await response.json();
    if (!data.decrypted_value) {
      throw new Error("La API no devolvió un valor desencriptado.");
    }

    return data.decrypted_value;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = Plantilla;
    link.download = "plantilla_carga_gestiones.xlsx";
    link.click();
  };

  const handleUploadFile = async () => {
    if (!file) {
      return Swal.fire("Error", "Debe seleccionar un archivo.", "error");
    }

    if (!file.name.endsWith(".xlsx")) {
      return Swal.fire("Error", "El archivo debe ser un archivo Excel (.xlsx).", "error");
    }

    setLoaderVisible(true);

    try {
      const urlParams = getUrlParams();
      const idCampana = await decrypt(urlParams.campana);
      const usuarioOperacion = await decrypt(urlParams.id);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = window.XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        if (!rows || rows.length <= 1) {
          setLoaderVisible(false);
          return Swal.fire("Error", "El archivo Excel no contiene filas de datos.", "error");
        }

        const dataRows = rows.slice(1).filter((row) => row.some((cell) => cell !== null && cell !== undefined && cell.toString().trim() !== ""));

        if (dataRows.length === 0) {
          setLoaderVisible(false);
          return Swal.fire("Error", "El archivo Excel no contiene datos válidos.", "error");
        }

        for (let row of dataRows) {
          const body = {
            id_campana: parseInt(idCampana) || null,
            usuario_operacion: parseInt(usuarioOperacion) || null,
            // Otros datos a procesar aquí
          };

          const response = await fetch("http://192.52.242.238:8000/api/gestiones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          if (!response.ok) {
            throw new Error(`Error en la carga: ${response.statusText}`);
          }
        }

        setLoaderVisible(false);
        Swal.fire("Éxito", "Archivo procesado correctamente.", "success");
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      setLoaderVisible(false);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleBackToPanel = () => {
    const urlParams = getUrlParams();
    window.location.href = `./modulos?id=${urlParams.id}&campana=${urlParams.campana}`;
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h4>Carga de Clientes</h4>
          <button className="btn btn-warning" onClick={handleBackToPanel}>
            Regresar al panel de modulos
          </button>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleDownloadTemplate}>
              Descargar Plantilla
            </button>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="fileInput" className="form-label">
                Subir archivo Excel
              </label>
              <input type="file" className="form-control" id="fileInput" accept=".xlsx" onChange={handleFileChange} />
            </div>
            <button type="button" className="btn btn-success" onClick={handleUploadFile}>
              Cargar
            </button>
          </form>
          {loaderVisible && <div className="loader mt-3"></div>}
        </div>
      </div>
    </div>
  );
};

export default App;
