import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Obtiene la lista de productos, navega y filtra
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minStock, setMinStock] = useState('');
  const [maxStock, setMaxStock] = useState('');

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh_token');

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('products/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        
        // Si el token ha expirado, intenta refrescarlo
        await refreshAccessToken();
      } else {
        console.error(error);
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await api.post('token/refresh/', { refresh: refreshToken });
      localStorage.setItem('token', response.data.access);  // Guarda el nuevo access token
      fetchProducts();  // Vuelve a intentar la solicitud original
    } catch (error) {
      console.error('Error al refrescar el token:', error);

      // Si falla el refresh token, redirige a login o muestra un mensaje de error
      navigate('/login');
    }
  };

  // Redirige al usuario a la pagina para editar el inventario
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  // Implementa la opcion de eliminar producto del iventario
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      api.delete(`products/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(() => {
          setProducts(products.filter((product) => product.id !== id));
        })
        .catch((error) => console.error(error));
    }
  };

  // Implementa la caracteristica de Filtrar
  const handleSearch = () => {
    let filteredProducts = products;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (description) {
      filteredProducts = filteredProducts.filter(product => product.description.toLowerCase().includes(description.toLowerCase()));
    }
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
    }
    if (minStock) {
      filteredProducts = filteredProducts.filter(product => product.stock >= parseInt(minStock));
    }
    if (maxStock) {
      filteredProducts = filteredProducts.filter(product => product.stock <= parseInt(maxStock));
    }
    setProducts(filteredProducts);
  };

  // Implementa la caracteristica de anadir nuevos productos al inventario
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.stock) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    api.post('products/', newProduct, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: '', stock: '' });
    })
    .catch((error) => {
      console.error('Error al añadir producto:', error.response ? error.response.data : error);
    });
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Renderiza las opciones de Filtrar
  return (
    <div>
      <h1>Filtro</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock mínimo"
          value={minStock}
          onChange={(e) => setMinStock(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock máximo"
          value={maxStock}
          onChange={(e) => setMaxStock(e.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={handleSearch}>Buscar</button>
      </div>
      <div>
        <h2>Añadir Nuevo Producto</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción del producto"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleInputChange}
        />
        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Añadir Producto</button>
      </div>
      <h1>Productos en inventario</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price} - Stock: {product.stock}
            <button type="button" className="btn btn-primary" onClick={() => handleEdit(product.id)}>Editar</button>
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporta ProductList para que pueda ser utilizado por otros ficheros
export default ProductList;
