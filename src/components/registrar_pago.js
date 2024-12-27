import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Modal from 'bootstrap/js/dist/modal';


const FormularioPago = () => {
  const [previewSrc, setPreviewSrc] = useState('');
  const [fileData, setFileData] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target.result);
        setFileData(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc('');
      setFileData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire('Éxito', 'Pago registrado exitosamente.', 'success');
  };

  const handleRegresar = () => {
    window.history.back();
  };

  const handleShowModal = () => {
    const modalElement = document.getElementById('imageModal');
    const modalInstance = new Modal(modalElement);
    modalInstance.show();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header text-center">
          <h4>Registrar Pago</h4>
          <button type="button" className="btn btn-secondary" onClick={handleRegresar}>
            Regresar
          </button>
        </div>
        <div className="card-body">
          <form id="paymentForm" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="producto" className="form-label">
                  Producto
                </label>
                <select className="form-select" id="producto" required>
                  <option value="" disabled selected>
                    Seleccione una opción
                  </option>
                  <option value="gestion1">producto 1</option>
                  <option value="gestion2">producto 2</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="fechaPago" className="form-label">
                  Fecha de Pago
                </label>
                <input type="date" className="form-control" id="fechaPago" required />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="montoQuetzales" className="form-label">
                  Monto en Quetzales
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="montoQuetzales"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="montoDolares" className="form-label">
                  Monto en Dólares
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="montoDolares"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="comentarios" className="form-label">
                Comentarios
              </label>
              <textarea
                className="form-control"
                id="comentarios"
                rows="3"
                placeholder="Escribe tus comentarios..."
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Subir Boleta
              </label>
              <input
                type="file"
                className="form-control"
                id="imagen"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {previewSrc && (
              <div className="mb-3 text-center">
                <img
                  id="previewImagen"
                  src={previewSrc}
                  alt="Previsualización"
                  className="img-thumbnail"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={handleShowModal}
                />
              </div>
            )}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success">
                Registrar Pago
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para mostrar imagen en grande */}
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imageModalLabel">
                Boleta de pago
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <img id="modalImagen" src={fileData} alt="Vista de imagen" className="img-fluid" />
            </div>
            <div className="modal-footer">
              <a
                id="downloadBtn"
                href={fileData}
                download="boleta.png"
                className="btn btn-primary"
              >
                Descargar Boleta
              </a>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPago;
