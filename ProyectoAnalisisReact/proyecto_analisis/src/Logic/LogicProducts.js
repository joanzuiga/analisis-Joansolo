import axios from 'axios';

const apiUrl = 'https://localhost:7264/api/Product'; // Reemplaza con la URL de tu API

//buscar por codigo
export async function getProductByCode(productCode) {
  try {
    const response = await axios.get(`${apiUrl}/GetProductsByCode/${productCode}`);
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    throw error; 
  }
}

//logica de registrarse
export async function login(productLoginData) {
    try {
      const response = await axios.post(`${apiUrl}/Login`, productLoginData);
      return response.data; 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return null; 
    }

  }

  //logica de crear un producto
  export async function registerProduct(productData) {
    try {
      const response = await axios.post(`${apiUrl}/AddProduct`, productData);
      return response.data; 
    } catch (error) {
      console.error('Error al crear producto', error);
      return null 
    }

  }

  //logica para mostrar todos los productos 
  export async function getAllProducts() {
    try {
      const response = await axios.get(`${apiUrl}/GetAllProducts`);
      return response.data; 
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      return null;
    }
  }

//logica para eliminar 
  export async function deleteProduct(productCode) {
    try {
      const response = await axios.delete(`${apiUrl}/DeleteProduct/${productCode}`);
      return response.data; 
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return null; 
    }
  }

   //logica de editar  un usuario
   export async function updateProduct(productData) {
    try {
      const response = await axios.post(`${apiUrl}/UpdateProduct`, productData);
      return response.data; 
    } catch (error) {
      console.error('Error al actualizarse:', error);
      return null 
    }

  }

