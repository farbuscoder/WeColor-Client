// React hooks
import React from "react";
import { useState } from "react";

//Css styles
import "./App.css";

//Libraries
import axios from "axios";
import styled from "styled-components";

//Styled Components
const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 2px solid blue;
  grid-gap: 5px;
`;

const ColorBox = styled.div`
  height: 50px;
  width: 50px;
`;

const App = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = async (email, password) => {
    try {
      const userLogged = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        { email, password },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(userLogged.data);
      localStorage.setItem("access_token", userLogged.data.token);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await userLogin(user.email, user.password);
  };

  return (
    <>
      <div>
        {" "}
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleInputChange}
        ></input>
        <button onClick={handleSubmit}>Iniciar sesion</button>
      </div>
      <h2>Generador de colores</h2>
      <button>Generar</button>
      <Div></Div>
    </>
  );
};

export default App;
