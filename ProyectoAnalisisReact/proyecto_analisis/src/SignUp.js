import React, { useState } from 'react';
import { signup } from './Logic/LogicUser';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id : -1,
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

  const handleSignUp = () => {
      const result = signup(userData)
      if(result){
        alert("El usuario se ha registrado con exito")
        navigate("/login")
      }else{
        alert("No se pudo registrar el usuario")
      }
  }

  return (
    <div>
      <h1>Página de Registro</h1>
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

      <button onClick={handleSignUp}>Registrarse</button>
    </div>
  );
}

export default SignUp;