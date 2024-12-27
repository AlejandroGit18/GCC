import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './Loader';

// Importación diferida de componentes para mejorar la carga
const Login = React.lazy(() => import('./components/login'));
const Campanas = React.lazy(() => import('./components/campanas'));
const Modulos = React.lazy(() => import('./components/modulos'));

const CargaCampanas = React.lazy(() => import('./components/carga_campanas'));
const CargaSaldos = React.lazy(() => import('./components/carga_saldos'));
const CargaGestiones = React.lazy(() => import('./components/carga_tipologias'));
const CargaTipologias = React.lazy(() => import('./components/carga_tipologias_subtipologias'));
const CargaDescuentos = React.lazy(() => import('./components/carga_tipo_descuento'));

const GestionesAsesores = React.lazy(() => import('./components/gestiones_asesores'));
const DetalleGestion = React.lazy(() => import('./components/detalle_gestion'));
const RegistrarGestion = React.lazy(() => import('./components/registrar_gestion'));
const RegistrarPago = React.lazy(() => import('./components/registrar_pago'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simula una carga inicial (por ejemplo, verificaciones de autenticación)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajusta el tiempo según tus necesidades

    return () => clearTimeout(timer); // Limpieza del timer
  }, []);

  // Manejo del estado de carga
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Agrega más rutas aquí según tus necesidades */}

          <Route path="/" element={<Login />} />
          <Route path="/campanas" element={<Campanas />} />
          <Route path="/modulos" element={<Modulos />} />
          
          <Route path="/carga_campanas" element={<CargaCampanas />} />
          <Route path="/carga_saldos" element={<CargaSaldos />} />
          <Route path="/carga_tipologias" element={<CargaGestiones />} />
          <Route path="/carga_tipologias_subtipologias" element={<CargaTipologias />} />
          <Route path="/carga_descuentos" element={<CargaDescuentos />} />

          <Route path="/gestiones_asesores" element={<GestionesAsesores />} />
          <Route path="/detalle_gestion" element={<DetalleGestion />} />
          <Route path="/registrar_gestion" element={<RegistrarGestion />} />
          <Route path="/registrar_pago" element={<RegistrarPago />} />   

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
