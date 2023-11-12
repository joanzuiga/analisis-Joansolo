import React, { useEffect, useState } from 'react';
import './ShowUsers.css'; 
import { deleteProduct, getAllProducts } from './Logic/LogicProducts';
import { useNavigate } from 'react-router-dom';

function ShowProducts() {

  const navigate = useNavigate();  
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
    getAllProducts()
      .then((productList) => {
        setProducts(productList);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  const handleDeleteProduct = (productCode) => {
    const result= deleteProduct(productCode);
    if(result){
        alert("El producto se ha eliminado con exito")
        window.location.reload();
      }else{
        alert("No se pudo eliminar el producto")
      }
   
  }

  const handleEditProduct = (productCode) => {
    navigate(`/EditProduct/${productCode}`)
    
  }

  return (
    <div>
      <h1>Lista de productos</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.codigo}>
                <td>{product.codigo}</td> 
              <td>{product.marca} {product.modelo}</td>
              <td>{product.precio}</td>
              <td>{product.tipo}</td>
              <td>
                <button onClick={() => handleEditProduct(product.codigo)}>Modificar</button>
                <button onClick={() => handleDeleteProduct(product.codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowProducts;
