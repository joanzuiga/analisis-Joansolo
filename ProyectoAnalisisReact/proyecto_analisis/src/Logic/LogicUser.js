import axios from 'axios';

const apiUrl = 'https://localhost:7264/api/User'; // Reemplaza con la URL de tu API

//buscar por id
export async function getUserById(userId) {
  try {
    const response = await axios.get(`${apiUrl}/GetUserById/${userId}`);
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error; 
  }
}

//logica de registrarse 
export async function login(userLoginData) {
    try {
      const response = await axios.post(`${apiUrl}/Login`, userLoginData);
      return response.data; 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return null; 
    }

  }

  //logica de crear un usuario
  export async function signup(userData) {
    try {
      const response = await axios.post(`${apiUrl}/AddUser`, userData);
      return response.data; 
    } catch (error) {
      console.error('Error al registrarse:', error);
      return null 
    }

  }

  //logica para mostrar todos los usuarios 
  export async function getAllUsers() {
    try {
      const response = await axios.get(`${apiUrl}/GetAllUsers`);
      return response.data; 
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      return null;
    }
  }

//logica para eliminar 
  export async function deleteUser(userId) {
    try {
      const response = await axios.delete(`${apiUrl}/DeleteUser/${userId}`);
      return response.data; 
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return null; 
    }
  }

   //logica de editar  un usuario
   export async function updateUser(userData) {
    try {
      const response = await axios.post(`${apiUrl}/UpdateUser`, userData);
      return response.data; 
    } catch (error) {
      console.error('Error al actualizarse:', error);
      return null 
    }

  }

