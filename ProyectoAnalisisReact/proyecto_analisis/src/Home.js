import React, { useState, useEffect } from 'react';

function Home(props) {

    const userStorage= localStorage.getItem("auth")
    const user= JSON.parse(userStorage) 
    

    useEffect(() => {

        props.setIsLogin(false)
        props.setIsSignup(false)
        props.setIsAdmin(false)
    });

    return (
        <div className='container'>
            {user ? (
                <div>
                    <h1>Bienvenido, {user.nombre} {user.apellido}!</h1>
                </div>
            ) : (
                <p>Pase por login</p>
            )}
        </div>
    );
}

export default Home;


