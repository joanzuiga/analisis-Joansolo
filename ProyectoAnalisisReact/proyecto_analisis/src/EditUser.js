import React, { useEffect, useState } from 'react';
import { getUserById, signup, updateUser } from './Logic/LogicUser';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: id,
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    direccion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    const result = updateUser(userData)
    if (result) {
      alert("El usuario se ha actualizado con exito")
      navigate("/ShowUsers")
    } else {
      alert("No se pudo actualizar el usuario")
    }
  }


  useEffect(() => {


    const fetchdata = async () => {
      try {
        const result = await getUserById(id);
        console.log(result)
        setUserData(result)

      } catch (error) {
        console.log(error)
      }
    };

    fetchdata();

  }, [id])

  return (
    <div>
      <h1>Página de Edicion de usuario</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={userData.nombre}
        name="nombre"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Apellido"
        name="apellido"
        value={userData.apellido}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Correo electrónico"
        name="correo"
        value={userData.correo}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Contraseña"
        name="contrasena"
        value={userData.contrasena}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Teléfono"
        name="telefono"
        value={userData.telefono}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Dirección"
        name="direccion"
        value={userData.direccion}
        onChange={handleChange}
      />

      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
}

export default EditUser;