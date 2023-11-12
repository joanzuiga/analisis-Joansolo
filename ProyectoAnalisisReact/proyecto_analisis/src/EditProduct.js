import React, { useEffect, useState } from 'react';
import { getProductByCode, registerProduct, updateProduct } from './Logic/LogicProducts';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {

  const { code } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    codigo : code,
    marca: '',
    modelo: '',
    precio: '',
    tipo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUpdate = () => {
    const result = updateProduct(productData)
    if (result) {
      alert("El producto se ha actualizado con exito")
      navigate("/ShowProducts")
    } else {
      alert("No se pudo actualizar el producto")
    }
  }


  useEffect(() => {


    const fetchdata = async () => {
      try {
        const result = await getProductByCode(code);
        console.log(result)
        setProductData(result)

      } catch (error) {
        console.log(error)
      }
    };

    fetchdata();

  }, [code])

  return (
    <div>
      <h1>Página de Edicion de prodcto</h1>
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
        type="number "
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
     

      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
}

export default EditProduct;