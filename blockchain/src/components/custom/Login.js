import React, { useState } from 'react';
import axios from 'axios';

import configserver from "../../configs"


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(configserver+'/api/adminLogin', {
      username: username,
      password: password,
    })
    .then(function(response){ 
      if(response.data){
        window.location.assign("/newelection")
      }else{
        alert('Incorrect Username or Password');
      }
    })
    .catch(function(err){
      console.error(err);
    });
  };

  return (
    <form className='container' onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;