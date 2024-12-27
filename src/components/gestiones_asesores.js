import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import $ from 'jquery';
import 'datatables.net-bs5';

const App = () => {
  const [gestiones, setGestiones] = useState([]);
  const [idUsuario, setIdUsuario] = useState(null);
  const [idCampana, setIdCampana] = useState(null);

  const getUrlParams = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const campana = params.get('campana');
  
    if (!id || !campana) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Faltan parámetros en la URL.'
      });
      throw new Error('Faltan parámetros en la URL.');
    }
  
    try {
      const decryptedId = await decrypt(id);
      const decryptedCampana = await decrypt(campana);
      setIdUsuario(decryptedId);
      setIdCampana(decryptedCampana);
    } catch (error) {
      console.error('Error al desencriptar parámetros:', error.message);
    }
  };
  
  const decrypt = async (value) => {
    try {
      const response = await axios.post('http://192.52.242.238:8000/api/decrypt', { encrypted_value: value });
      return response.data.decrypted_value;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Desencriptado',
        text: 'No se pudo desencriptar el valor.'
      });
      throw error;
    }
  };

  const encryptWithAPI = async (value) => {
    if (!value || value.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error de Encriptado',
        text: 'El valor a encriptar está vacío.'
      });
      throw new Error('El valor a encriptar está vacío.');
    }
    try {
      const response = await axios.post('http://192.52.242.238:8000/api/encrypt', { value });
      return response.data.encrypted_value;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Encriptado',
        text: 'No se pudo encriptar el valor.'
      });
      throw error;
    }
  };

  const loadTable = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/gestiones', {
        opcion: 7,
        id_usuario: idUsuario,
        id_campana: idCampana
      });
      console.log('Datos recibidos:', response.data); // Verifica si los datos están llegando
      setGestiones(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la tabla de gestiones.'
      });
      console.error('Error al cargar datos:', error.message);
    }
  };
  
  const handleBackClick = async () => {
    try {
      const encryptedId = await encryptWithAPI(idUsuario);
      const encryptedCampana = await encryptWithAPI(idCampana);
      window.location.href = `modulos?id=${encryptedId}&campana=${encryptedCampana}`;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGestionSubmit = async () => {
    try {
      const gestionValue = document.getElementById('gestionSelect').value;
      await axios.post('http://192.52.242.238:8000/api/some-endpoint', {
        id_usuario: idUsuario,
        gestion: gestionValue
      });
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Gestión enviada correctamente.'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la gestión.'
      });
      console.error(error.message);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await getUrlParams(); // Obtiene los parámetros y establece el estado
      } catch (error) {
        console.error('Error al obtener parámetros:', error.message);
      }
    };
  
    initialize();
  }, []); // Solo se ejecuta al montar el componente
  
  useEffect(() => {
    if (idUsuario && idCampana) {
      loadTable(); // Solo carga los datos cuando los parámetros están listos
    }
  }, [idUsuario, idCampana]); // Se ejecuta cuando cambian los valores de idUsuario o idCampana
  
  useEffect(() => {
    if (gestiones.length > 0) {
      $('#gestionesTable').DataTable();
    }
  }, [gestiones]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h4>Gestiones</h4>
        </div>
        <div className="card-body">
          <table className="table table-striped" id="gestionesTable">
            <thead>
              <tr>
                <th scope="col">ID Gestión</th>
                <th scope="col">Nombre</th>
                <th scope="col">DPI</th>
              </tr>
            </thead>
            <tbody>
              {gestiones.map((gestion) => (
                <tr key={gestion.ID_GESTIONES} onClick={async () => {
                  const encryptedIdGestion = await encryptWithAPI(gestion.ID_GESTIONES);
                  window.location.href = `detalle_gestion?id_gestion=${encryptedIdGestion}`;
                }}>
                  <td>{gestion.ID_GESTIONES}</td>
                  <td>{gestion.NOMBRE}</td>
                  <td>{gestion.DPI}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button id="backButton" className="btn btn-secondary mt-3" onClick={handleBackClick}>
            Regresar
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="gestionModal"
        tabIndex="-1"
        aria-labelledby="gestionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="gestionModalLabel">Seleccionar Gestión</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="gestionSelect" className="form-label">
                  Seleccione una gestión:
                </label>
                <select id="gestionSelect" className="form-select">
                  <option value="GESTIONANDO">GESTIONANDO</option>
                  <option value="REFACCIÓN">REFACCIÓN</option>
                  <option value="BAÑO">BAÑO</option>
                  <option value="REUNIÓN">REUNIÓN</option>
                  <option value="ALMUERZO">ALMUERZO</option>
                  <option value="ATENCIÓN AL CLIENTE">ATENCIÓN AL CLIENTE</option>
                  <option value="FIN DE JORNADA">FIN DE JORNADA</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button id="submitGestion" type="button" className="btn btn-primary" onClick={handleGestionSubmit}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
