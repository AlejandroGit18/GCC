import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './campanas.css';

function App() {
  //const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [encryptedId, setEncryptedId] = useState('');
  const decryptEndpoint = 'http://192.52.242.238:8000/api/decrypt';
  const encryptEndpoint = 'http://192.52.242.238:8000/api/encrypt';
  //const userRoleEndpoint = 'http://192.52.242.238:8000/api/usuarios?opcion=4';

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const encryptedIdFromUrl = urlParams.get('id');

      if (!encryptedIdFromUrl) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontró el ID del usuario',
        }).then(() => {
          window.location.href = '/';
        });
        return;
      }

      setEncryptedId(encryptedIdFromUrl);

      try {
        const decryptResponse = await axios.post(decryptEndpoint, { encrypted_value: encryptedIdFromUrl });
        const userId = decryptResponse.data.decrypted_value;

        //const userResponse = await axios.post(userRoleEndpoint, { id_usuario: userId });
        //const userRole = userResponse.data[0]?.ID_ROL;

        const campaignsResponse = await axios.get(`http://192.52.242.238:8000/api/campanas/${userId}`);
        const campaignsData = campaignsResponse.data;

        const campaignsWithEncryption = await Promise.all(
          campaignsData.map(async (campaign) => {
            if (campaign.estado) {
              const encryptResponse = await axios.post(encryptEndpoint, { value: campaign.id_campana.toString() });
              return {
                ...campaign,
                encryptedCampaignId: encryptResponse.data.encrypted_value,
              };
            }
            return null;
          })
        );

        setCampaigns(campaignsWithEncryption.filter(Boolean));
        //setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar los datos',
        }).then(() => {
          window.location.href = '/';
        });
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleCampaignClick = (encryptedCampaignId) => {
    window.location.href = `modulos?id=${encryptedId}&campana=${encryptedCampaignId}`;
  };

  return (
    <div>

        <div className="container mt-5">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h1 className="h3">Campañas</h1>
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
            <div className="card-body">
              <p className="text-center">Selecciona una campaña</p>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {campaigns.map((campaign) => (
                  <div className="col" key={campaign.id_campana}>
                    <div className="card h-100">
                      <button
                        className="btn btn-light btn-campaign d-flex align-items-center"
                        onClick={() => handleCampaignClick(campaign.encryptedCampaignId)}
                      >
                        <img src={`data:image/png;base64,${campaign.imagen}`} alt={campaign.nombre} />
                        <span>{campaign.nombre}</span>
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

export default App;

