import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modulos.css';

function Modulos() {
  //const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);
  const [encryptedId, setEncryptedId] = useState('');
  const [encryptedCampana, setEncryptedCampana] = useState('');
  const decryptEndpoint = 'http://192.52.242.238:8000/api/decrypt';

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const encryptedIdFromUrl = urlParams.get('id');
      const encryptedCampanaFromUrl = urlParams.get('campana');

      if (!encryptedIdFromUrl || !encryptedCampanaFromUrl) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: !encryptedIdFromUrl
            ? 'No se encontró el ID del usuario'
            : 'No se encontró el ID de la campana',
        }).then(() => {
          window.location.href = '/';
        });
        return;
      }

      setEncryptedId(encryptedIdFromUrl);
      setEncryptedCampana(encryptedCampanaFromUrl);

      try {
        const decryptResponseId = await axios.post(decryptEndpoint, { encrypted_value: encryptedIdFromUrl });
        const decryptResponseCampana = await axios.post(decryptEndpoint, { encrypted_value: encryptedCampanaFromUrl });

        const userId = decryptResponseId.data.decrypted_value;
        const CampanaId = decryptResponseCampana.data.decrypted_value;

        const campaignResponse = await axios.post(
          'http://192.52.242.238:8000/api/modulos_usuarios_select',
          { id_usuario: userId, id_campana: CampanaId }
        );

        setModules(campaignResponse.data);
        //setLoading(false);
      } catch (error) {
        console.error('Error al cargar los módulos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar los módulos',
        }).then(() => {
          window.location.href = '/';
        });
      }
    };

    fetchData();
  }, []);

  const handleModuleClick = (moduleId) => {
    const urlMap = {
      1: `carga_campanas?id=${encryptedId}&campana=${encryptedCampana}`,
      2: `carga_saldos?id=${encryptedId}&campana=${encryptedCampana}`,
      3: `carga_tipologias?id=${encryptedId}&campana=${encryptedCampana}`,
      4: `gestiones_asesores?id=${encryptedId}&campana=${encryptedCampana}`,
      5: `carga_tipologias_subtipologias?id=${encryptedId}&campana=${encryptedCampana}`,
      6: `carga_descuentos?id=${encryptedId}&campana=${encryptedCampana}`,
    };
    const redirectUrl = urlMap[moduleId] || '/';
    window.location.href = redirectUrl;
  };

  const handleLogout = () => {
    window.location.href = `./campanas?id=${encryptedId}`;
  };

  return (
    <div>
        <div className="container mt-5">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h1 className="h3">Modulos</h1>
              <button className="btn btn-warning" onClick={handleLogout}>
                Regresar a panel de campañas
              </button>
            </div>
            <div className="card-body">
              <p className="text-center">Selecciona un Modulo</p>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {modules.map((module) => (
                  <div className="col" key={module.ID_MODULO}>
                    <div className="card h-100">
                      <button
                        className="btn btn-light btn-campaign d-flex align-items-center"
                        onClick={() => handleModuleClick(module.ID_MODULO)}
                      >
                        <img src={`data:image/png;base64,${module.IMAGEN}`} alt={module.NOMBRE} />
                        <span>{module.NOMBRE}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Modulos;

