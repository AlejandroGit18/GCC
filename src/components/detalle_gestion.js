import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.min.css";

const GestionForm = () => {
  const [formData, setFormData] = useState({});
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    cargarMovimientos();

    const urlParams = new URLSearchParams(window.location.search);
    const encryptedGestionId = urlParams.get("id_gestion");

    if (encryptedGestionId) {
      decryptGestionId(encryptedGestionId).then((gestionId) => {
        cargarDatosFormulario(gestionId);
      });
    } else {
      Swal.fire("Error", "No se encontró el ID de gestión en la URL.", "error");
    }
  }, []);

  const cargarMovimientos = () => {
    const movimientosEjemplo = [
      {
        tipoGestion: "Cobro",
        subtipologia: "Recordatorio",
        tipologia: "Pago parcial",
        observaciones: "Cliente promete pago para mañana.",
        investigacion: "Se verificó información financiera.",
      },
      {
        tipoGestion: "Reclamo",
        subtipologia: "Error en factura",
        tipologia: "Error en monto",
        observaciones: "Cliente indica que el monto es incorrecto.",
        investigacion: "Se solicitó revisión con contabilidad.",
      },
    ];
    setMovimientos(movimientosEjemplo);
  };

  const decryptGestionId = async (encryptedValue) => {
    try {
      const response = await axios.post("http://192.52.242.238:8000/api/decrypt", {
        encrypted_value: encryptedValue,
      });
      return response.data.decrypted_value;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de Desencriptado",
        text: "No se pudo desencriptar el valor.",
      });
      throw error;
    }
  };

  const cargarDatosFormulario = async (gestionId) => {
    try {
      const response = await axios.post("http://localhost:8000/api/gestiones", {
        opcion: 4,
        id_gestiones: gestionId,
      });
      setFormData(response.data[0]);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los datos del formulario.", "error");
    }
  };

  const guardarCambios = async () => {
    try {
      // Construye el payload dinámicamente desde formData
      const payload = { ...formData };
      await axios.post("http://192.52.242.238:8000/api/gestiones", payload);
      Swal.fire("Éxito", "Los cambios se han guardado correctamente.", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudieron guardar los cambios.", "error");
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header text-center">
          <h3>Base clientes</h3>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-success me-2" onClick={() => (window.location.href = "/registrar_gestion")}>Agregar Gestión</button>
            <button className="btn btn-primary me-2" onClick={guardarCambios}>Guardar Cambios</button>
            <button className="btn btn-warning me-2" onClick={() => (window.location.href = "/registrar_pago")}>Registrar Pago</button>
            <button className="btn btn-secondary" onClick={() => window.history.back()}>Regresar</button>
          </div>
          
          <div className="accordion" id="gestionAccordion">
      {/* Segmento 1 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingInfoDeudor">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseInfoDeudor"
            aria-expanded="true"
            aria-controls="collapseInfoDeudor"
          >
            Información Deudor
          </button>
        </h2>
        <div
          id="collapseInfoDeudor"
          className="accordion-collapse collapse show"
          aria-labelledby="headingInfoDeudor"
          data-bs-parent="#gestionAccordion"
        >
          <div className="accordion-body">
            <form id="gestionForm">
              <div className="row">
                {['Nombre', 'NIT', 'DPI', 'Fecha de Nacimiento', 'Dirección Casa', 'Dirección Trabajo', 'Lugar de Trabajo', 'Email'].map((field, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="mb-3">
                      <label htmlFor={field.toLowerCase().replace(/ /g, '')} className="form-label">
                        {field}
                      </label>
                      <input
                        type={field === 'Email' ? 'email' : field === 'Fecha de Nacimiento' ? 'date' : 'text'}
                        id={field.toLowerCase().replace(/ /g, '')}
                        className="form-control"
                        readOnly={field !== 'Email'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Segmento 2 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingInfoContacto">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseInfoContacto"
            aria-expanded="false"
            aria-controls="collapseInfoContacto"
          >
            Información de Contacto
          </button>
        </h2>
        <div
          id="collapseInfoContacto"
          className="accordion-collapse collapse"
          aria-labelledby="headingInfoContacto"
          data-bs-parent="#gestionAccordion"
        >
          <div className="accordion-body">
            <div className="row">
              {['Teléfono Celular', 'Teléfono Casa', 'Teléfono Alterno', 'Teléfono Trabajo'].map((field, index) => (
                <div className="col-md-6" key={index}>
                  <div className="mb-3">
                    <label htmlFor={field.toLowerCase().replace(/ /g, '')} className="form-label">
                      {field}
                    </label>
                    <input type="text" id={field.toLowerCase().replace(/ /g, '')} className="form-control" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Segmento 3 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingInfoFinanciera">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseInfoFinanciera"
            aria-expanded="false"
            aria-controls="collapseInfoFinanciera"
          >
            Información Financiera
          </button>
        </h2>
        <div
          id="collapseInfoFinanciera"
          className="accordion-collapse collapse"
          aria-labelledby="headingInfoFinanciera"
          data-bs-parent="#gestionAccordion"
        >
          <div className="accordion-body">
            <div className="row">
              {Array.from({ length: 5 }).map((_, index) => (
                <>
                  <div className="col-md-4" key={`tipoCuenta${index}`}>
                    <div className="mb-3">
                      <label htmlFor={`tipoCuenta${index + 1}`} className="form-label">
                        Tipo de Moneda {index + 1}
                      </label>
                      <input type="text" id={`tipoCuenta${index + 1}`} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="col-md-4" key={`noCuenta${index}`}>
                    <div className="mb-3">
                      <label htmlFor={`noCuenta${index + 1}`} className="form-label">
                        No. Cuenta {index + 1}
                      </label>
                      <input type="text" id={`noCuenta${index + 1}`} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="col-md-4" key={`saldo${index}`}>
                    <div className="mb-3">
                      <label htmlFor={`saldo${index + 1}`} className="form-label">
                        Saldo {index + 1}
                      </label>
                      <input type="text" id={`saldo${index + 1}`} className="form-control" readOnly />
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Segmento 4 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingConceptos">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseConceptos"
            aria-expanded="false"
            aria-controls="collapseConceptos"
          >
            Conceptos y Descripciones
          </button>
        </h2>
        <div
          id="collapseConceptos"
          className="accordion-collapse collapse"
          aria-labelledby="headingConceptos"
          data-bs-parent="#gestionAccordion"
        >
          <div className="accordion-body">
            <div className="row">
              {Array.from({ length: 4 }).map((_, index) => (
                <>
                  <div className="col-md-6" key={`concepto${index}`}>
                    <div className="mb-3">
                      <label htmlFor={`concepto${index + 1}`} className="form-label">
                        Concepto {index + 1}
                      </label>
                      <input type="text" id={`concepto${index + 1}`} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="col-md-6" key={`descripcion${index}`}>
                    <div className="mb-3">
                      <label htmlFor={`descripcion${index + 1}`} className="form-label">
                        Descripción {index + 1}
                      </label>
                      <textarea id={`descripcion${index + 1}`} className="form-control" readOnly></textarea>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
          <div className="card-header text-center mt-3">
            <h3>Tipologias Registradas</h3>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tipo de Gestión</th>
                <th>Subtipología</th>
                <th>Tipología</th>
                <th>Observaciones</th>
                <th>Investigación</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((mov, index) => (
                <tr key={index}>
                  <td>{mov.tipoGestion}</td>
                  <td>{mov.subtipologia}</td>
                  <td>{mov.tipologia}</td>
                  <td>{mov.observaciones}</td>
                  <td>{mov.investigacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionForm;
