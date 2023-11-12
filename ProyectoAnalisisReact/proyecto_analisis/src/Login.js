import React, { useState } from 'react';
import { getUserById, login } from './Logic/LogicUser';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Iniciar sesión con email:', email, 'y contraseña:', password);
        var result = await login({ "correo": email, "contrasena": password });

        if (result) {
            navigate("/ShowUsers")
        }else{
            alert("Usuario o contraseña incorrecta")
        }

    }

    return (
        <div>
            <h1>Página de Inicio de Sesión</h1>
            <input
                type="text"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
}

export default Login;
