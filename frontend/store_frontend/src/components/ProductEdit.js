// ProductEdit.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

// Implementa la posibilidad de editar el modulo Products
const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  // Actualiza los datos en el servidor (Django)
  useEffect(() => {
    api.get(`products/${id}/`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

// Envia los cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`products/${id}/`, product)
      .then(() => navigate('/'))
      .catch((error) => console.error(error));
  };

  // Renderiza los productos del inventario
  return (
    <div>
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" class="btn btn-success">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ProductEdit;
