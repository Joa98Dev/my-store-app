import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductEdit from './components/ProductEdit';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Verifica si el token está presente
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  return (
    <Router>
      <div>
        {/* Si no hay token, redirigir al login */}
        <Routes>
          {/* Ruta para Login */}
          <Route path="/login" element={<Login setToken={setToken} />} />

          {/* Si el token está presente, mostrar ProductList */}
          <Route
            path="/"
            element={token ? (
              <>
                <h1>Bienvenido, has iniciado sesión</h1>
                <ProductList />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          />
          
          {/* Ruta para editar el producto */}
          <Route path="/edit-product/:id" element={<ProductEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
