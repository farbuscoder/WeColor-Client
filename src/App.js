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
  const [palette, setPalette] = useState({ title: "", desc: "", colors: [] });
  const [colors, setColors] = useState([]);
  const [userId, setUserId] = useState("");

  //Setea en el estado user cada vez que realizamos un cambio en los inputs
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Realiza el post con el usuario logeado al endpoint especificado
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
      setUserId(userLogged.data.user._id);
      localStorage.setItem("access_token", userLogged.data.token);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //Llama a la funcion userLogin y pasa los datos por parametro
  const handleSubmit = async (e) => {
    e.preventDefault();

    await userLogin(user.email, user.password);
  };

  //Agrega una nueva palette a la base de datos
  const addNewPalette = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/palettes/add`,
        {
          userId: userId,
          title: "Test palette",
          desc: "new palette",
          colors: colors,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data ? error.response.data.message : "");
    }
  };

  //Consigue los colores
  const fetchColors = async () => {
    setColors(["#9bcaf1", "#edd4fc", "#e9cde9", "#e480cf", "#37656f"]);
    console.log(colors);
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
      <button onClick={fetchColors}>Generar</button>
      <Div>
        {colors.map((color, index) => {
          return (
            <ColorBox key={index} style={{ backgroundColor: color }}></ColorBox>
          );
        })}
      </Div>
      <button onClick={addNewPalette}>GUARDAR PALETTE</button>
    </>
  );
};

export default App;
