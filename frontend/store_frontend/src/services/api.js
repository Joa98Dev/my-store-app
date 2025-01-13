import axios from 'axios';

// Gestiona la comunicacion con el Backend (Django)
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Exporta la api para que pueda ser utilizado por otros ficheros
export default api;