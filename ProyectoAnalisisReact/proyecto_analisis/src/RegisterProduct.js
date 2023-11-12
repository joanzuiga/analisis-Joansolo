import React, { useState } from 'react';
import { registerProduct } from './Logic/LogicProducts';
import { useNavigate } from 'react-router-dom';

function RegisterProduct() {
  
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    codigo : -1,
    marca: '',
    modelo: '',
    precio: '',
    tipo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleRegisterProduct = () => {
      const result = registerProduct(productData)
      if(result){
        alert("El producto se ha registrado con exito")
        navigate("/showProducts")
      }else{
        alert("No se pudo registrar el producto")
      }
  }

  return (
    <div>
      <h1>Página de Registro</h1>
      <input
        type="text"
        placeholder="Marca"
        value={productData.marca}
        name="marca"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Modelo"
        name="modelo"
        value={productData.modelo}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Precio"
        name="precio"
        value={productData.precio}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Tipo"
        name="tipo"
        value={productData.tipo}
        onChange={handleChange}
      />
      <button onClick={handleRegisterProduct}>Registrarse</button>
    </div>
  );
}

export default RegisterProduct;