// Login.js

// impoerta funcionalidades de React y axios
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Gestiona el inicio de sesion del usuario
const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook de navegación de React Router

  // Maneja el envio de datos del inicio de sesion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza una peticio POST a Django para el inicio de sesion
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password,
      });
      setToken(response.data.access); // Guardar el token en el estado
      localStorage.setItem('token', response.data.access); // Guardar el token en localStorage
      navigate('/');  // Redirigir a la página de productos después de iniciar sesión
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  // Renderiza el formulario para iniciar sesion
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

// Exporta Login para que pueda ser utilizado por otros ficheros
export default Login;
