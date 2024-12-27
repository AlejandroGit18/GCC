import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [promesas, setPromesas] = useState([]);
  const [formData, setFormData] = useState({
    tipoGestion: '',
    tipologia: '',
    subtipologia: '',
    razonMora: '',
    tipoContacto: '',
    observaciones: '',
    investigacion: '',
    cuenta: '',
    cantidadCuotas: '',
    fechaPago: '',
    descuento: '',
    tipoDescuento: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAgregarPromesa = () => {
    const { cuenta, cantidadCuotas, fechaPago, descuento, tipoDescuento } = formData;

    if (!cuenta || !cantidadCuotas || !fechaPago || !descuento || !tipoDescuento) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    const nuevaPromesa = { cuenta, cantidadCuotas, fechaPago, descuento, tipoDescuento };
    setPromesas([...promesas, nuevaPromesa]);
    setFormData({ ...formData, cuenta: '', cantidadCuotas: '', fechaPago: '', descuento: '', tipoDescuento: '' });
  };

  const handleEliminarPromesa = (index) => {
    setPromesas(promesas.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { tipoGestion, tipologia, subtipologia } = formData;

    if (!tipoGestion || !tipologia || !subtipologia) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Formulario enviado',
      text: 'Los datos han sido enviados correctamente',
    });
  };

  const navigate = useNavigate();

  const redirectForm = () => {
    navigate(-1); // Regresa a la página anterior en el historial
  };
  const agregarPromesa = () => {
    // Implementar lógica para agregar promesa
  };

  return (
    <div className="container mt-5">
    <div className="card shadow">
      <div className="card-header text-center">
        <h4>Registrar Gestión</h4>
        <button type="button" className="btn btn-secondary" onClick={redirectForm}>
          Regresar
        </button>
      </div>
      <div className="card-body">
        <form id="gestionForm">
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="tipoGestion" className="form-label">
                Tipo de Gestión
              </label>
              <select className="form-select" id="tipoGestion" required>
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="gestion1">Gestión 1</option>
                <option value="gestion2">Gestión 2</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="tipologia" className="form-label">
                Tipología
              </label>
              <select className="form-select" id="tipologia" required>
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="tipo1">Tipología 1</option>
                <option value="tipo2">Tipología 2</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="subtipologia" className="form-label">
                Subtipología
              </label>
              <select className="form-select" id="subtipologia" required>
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="subtipo1">Subtipología 1</option>
                <option value="subtipo2">Subtipología 2</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="razon_mora" className="form-label">
                Razón de mora
              </label>
              <select className="form-select" id="razon_mora" required>
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="mora1">Razón 1</option>
                <option value="mora2">Razón 2</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="tipo_contacto" className="form-label">
                Tipo de contacto
              </label>
              <select className="form-select" id="tipo_contacto" required>
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="observaciones" className="form-label">
                Observaciones
              </label>
              <textarea
                className="form-control"
                id="observaciones"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="investigacion" className="form-label">
                Investigación
              </label>
              <textarea
                className="form-control"
                id="investigacion"
                rows="3"
                required
              ></textarea>
            </div>
          </div>

          <div className="card-header text-center">
            <h4>Promesas de pago</h4>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="cuenta" className="form-label">
                Cuenta
              </label>
              <select className="form-select" id="cuenta">
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="cuenta1">Cuenta 1</option>
                <option value="cuenta2">Cuenta 2</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="cantidad-cuotas" className="form-label">
                Cant. Cuotas
              </label>
              <input
                type="number"
                className="form-control"
                id="cantidad-cuotas"
                placeholder="Ingrese el numero de cuotas"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="fecha-pago" className="form-label">
                Fecha de pago
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha-pago"
                placeholder="Ingrese la fecha de pago"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="descuento" className="form-label">
                Descuento
              </label>
              <input
                type="number"
                className="form-control"
                id="descuento"
                placeholder="Ingrese el descuento"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="tipoDescuento" className="form-label">
                Tipo de Descuento
              </label>
              <select className="form-select" id="tipoDescuento" required>
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="fijo">Ordinario</option>
                <option value="porcentaje">Promoción</option>
              </select>
            </div>
          </div>

          <div className="text-center mb-4">
            <button
              type="button"
              className="btn btn-success"
              onClick={agregarPromesa}
            >
              Agregar Promesa
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered" id="tablaPromesas">
              <thead>
                <tr>
                  <th>Cuenta</th>
                  <th>Cant. Cuotas</th>
                  <th>Fecha de Pago</th>
                  <th>Descuento</th>
                  <th>Tipo de Descuento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div className="card-header text-center">
            <h4>Previsualización de cálculos</h4>
          </div>

          <div className="row mb-3">
            {['Saldo de la cuenta', 'Descuento aplicado', 'Monto a pagar', 'Valor por cuota'].map((label, index) => (
              <div className="col-md-3" key={index}>
                <label className="form-label">{label}:</label>
                <input type="number" className="form-control" readOnly />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default App;
