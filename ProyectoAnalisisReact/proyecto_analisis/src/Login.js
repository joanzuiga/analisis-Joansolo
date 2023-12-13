import React, { useEffect, useState } from 'react';
import "./Login.css"
import { getUserById, login } from './Logic/LogicUser';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        console.log('Iniciar sesión con email:', email, 'y contraseña:', password);
        var result = await login({ "correo": email, "contrasena": password });
        console.log(result)

        if (result) {
           
            const objetoJSON=JSON.stringify(result)
            localStorage.setItem("auth",objetoJSON)

            if (result.tipo === 'administrador'){
                navigate('/ShowUsers');
            }else{
                navigate('/Home');
            }

        }else{
            alert("Usuario o contraseña incorrecta")
        }

    }

    const handleSignUp = ()=> {

        navigate('/SignUp');

    } ;

    useEffect(() => {
      
        props.setIsLogin(true)
        props.setIsSignup(false)
        props.setIsAdmin(false)
    });


    return (
        <div className='Login'>
            <h1 >Iniciar Sesió</h1>
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
            <button onClick={handleSignUp}>¿Aún no tienes cuenta?</button>

        </div>
    );
}

export default Login;
