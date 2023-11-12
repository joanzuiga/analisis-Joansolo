import React, { useEffect, useState } from 'react';
import './ShowUsers.css'; 
import { deleteUser, getAllUsers } from './Logic/LogicUser';
import { useNavigate } from 'react-router-dom';

function ShowUsers() {

  const navigate = useNavigate();  
  const [users, setUsers] = useState([]);

  useEffect(() => {
  
    getAllUsers()
      .then((userList) => {
        setUsers(userList);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    const result= deleteUser(userId);
    if(result){
        alert("El usuario se ha eliminado con exito")
        window.location.reload();
      }else{
        alert("No se pudo eliminar el usuario")
      }
   
  }

  const handleEditUser = (userId) => {
    navigate(`/EditUser/${userId}`)
    
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nombre} {user.apellido}</td>
              <td>{user.correo}</td>
              <td>{user.telefono}</td>
              <td>{user.direccion}</td>
              <td>
                <button onClick={() => handleEditUser(user.id)}>Modificar</button>
                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowUsers;
