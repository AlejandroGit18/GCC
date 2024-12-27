import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import logo from './LOGO-FULL-min.png';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logoPath] = useState(logo);

  const encryptWithAPI = async (value) => {
    try {
      const response = await fetch('http://192.52.242.238:8000/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.encrypted_value;
      } else {
        throw new Error('Error al encriptar con la API');
      }
    } catch (error) {
      console.error('Error al encriptar con la API:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan campos',
        text: 'Por favor completa todos los campos.',
      });
      return;
    }

    try {
      const response = await fetch('http://192.52.242.238:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        const encryptedId = await encryptWithAPI(data.ID_USUARIO.toString());

        if (!encryptedId) {
          Swal.fire({
            icon: 'error',
            title: 'Error en la encriptación',
            text: 'No se pudo encriptar el ID del usuario.',
          });
          return;
        }

        if (data.ID_ROL === 1 || data.ID_ROL === 2 || data.ID_ROL === 3) {
          window.location.href = `./campanas?id=${encryptedId}`;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Rol desconocido',
            text: 'No tienes acceso a ninguna vista.',
          });
        }
      } else if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'Usuario o contraseña incorrectos.',
        });
      } else if (response.status === 422) {
        Swal.fire({
          icon: 'warning',
          title: 'Error en el formulario',
          text: 'Por favor revisa los datos enviados.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error inesperado',
          text: 'Ocurrió un error en el servidor.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de red',
        text: 'No se pudo conectar al servidor. Verifica tu conexión a Internet.',
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutters">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto text-center">
                <img src={logoPath} alt="Logo" className="logo img-fluid" />
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        placeholder="Usuario"
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="password"
                        placeholder="Contraseña"
                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/*<div className="form-check mb-3">
                      <input type="checkbox" className="form-check-input" defaultChecked />
                      <label className="form-check-label">Recordarme</label>
                    </div>*/}
                    <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm btn-login">
                      Ingresar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

