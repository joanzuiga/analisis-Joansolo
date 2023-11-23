import React, { useState } from 'react';
import { createUser, signup } from './Logic/LogicUser';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: -1,
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    direccion: '',
    tipo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegisterUser = () => {

    const nombreValidation = /^[A-Za-z]+$/.test(userData.nombre);
    const apellidoValidation = /^[A-Za-z]+$/.test(userData.apellido);
    const correoValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.correo);
    const telefonoValidation = /^\d{8}$/.test(userData.telefono);

    if (userData.tipo === "") {
      alert("El espacio tipo está en blanco");
    } else if (userData.nombre === "") {
      alert("El espacio nombre está en blanco");
    } else if (userData.apellido === "") {
      alert("El espacio apellido está en blanco");
    } else if (userData.correo === "") {
      alert("El espacio correo está en blanco");
    } else if (userData.contrasena === "") {
      alert("El espacio contraseña está en blanco");
    } else if (userData.direccion === "") {
      alert("El espacio direccion está en blanco");
    } else if (userData.telefono === "") {
      alert("El espacio telefono está en blanco");
    } else if (!nombreValidation) {
      alert("El campo nombre solo debe contener caracteres alfabéticos");
    } else if (!apellidoValidation) {
      alert("El campo apellido solo debe contener caracteres alfabéticos");
    } else if (!correoValidation) {
      alert("El formato del correo electrónico no es válido");
    } else if (!telefonoValidation) {
      alert("El campo telefono debe contener exactamente 8 números");
    }else {
      const result = createUser(userData);
      if (result) {
        alert("El usuario se ha creado con éxito");
      } else {
        alert("No se pudo registrar el usuario");
      }
    }
  }

  const handleShowUser = () => {
    navigate("/ShowUsers")
  }

  return (
    <div className='container'>
      <h1>Crear usuario</h1>
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
        type="password"
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

      <select
        name="tipo"
        value={userData.Tipo}
        onChange={handleChange}
      >
        <option value="">Seleccionar Tipo</option>
        <option value="administrador">Administrador</option>
        <option value="cliente">Cliente</option>
        <option value="proveedor">Proveedor</option>
      </select>

      <button onClick={handleRegisterUser}>Crear</button>

      <button onClick={handleShowUser}>Regresar</button>
    </div>
  );
}

export default RegisterUser;