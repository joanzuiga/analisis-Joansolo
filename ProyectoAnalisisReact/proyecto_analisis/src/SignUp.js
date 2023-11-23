import React, { useEffect, useState } from 'react';
import { signup } from './Logic/LogicUser';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css"

function SignUp(props) {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: -1,
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    direccion: '',
    Tipo: 'cliente',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = () => {
    const result = signup(userData)
    if (result) {
      alert("El usuario se ha registrado con exito")
      navigate("/login")
    } else {
      alert("No se pudo registrar el usuario")
    }
  }

  const handleLogin = () => {

    navigate("/login")

  }

  useEffect(() => {

    props.setIsLogin(false)
    props.setIsSignup(true)
    props.setIsAdmin(false)
  });

  return (
    <div className='Signup'>
      <h1>Registrarse</h1>
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
      <button onClick={handleLogin}>Regresar</button>
    </div>
  );
}

export default SignUp;