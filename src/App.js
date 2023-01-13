// React hooks
import React from "react";
import { useState, useEffect } from "react";

//Css styles
import "./App.css";

//Libraries
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";

//Material UI
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DangerousIcon from "@mui/icons-material/Dangerous";

//Styled Components
const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 2px solid blue;
  grid-gap: 5px;
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;

  border: 4px solid green;
`;

const ColorBox = styled.div`
  height: 50px;
  width: 50px;
`;

const UserProfile = styled.div`
  border: 2px solid blue;
  height: 400px;
  width: 550px;
`;

const UserName = styled.h1`
  color: lightblue;
`;

const UpdateUserContainer = styled.div`
  border: 2px solid orange;
  height: 200px;
  width: 600px;
`;

const App = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "" });
  const [palettes, setPalettes] = useState([]);
  const [favoritesPalettes, setfavoritesPalettes] = useState([]);
  const [colors, setColors] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  // const [token, setToken] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  //const url = "http://localhost:8500/api";

  //Setea en el estado user cada vez que realizamos un cambio en los inputs
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputUpdatedUser = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchPalettes = async () => {
      setIsLoading(true);
      try {
        const resPalettes = await axios.get(
          `${process.env.REACT_APP_API_URL}/palettes/get/trend`
        );
        setPalettes(resPalettes.data);
        console.log(resPalettes.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPalettes();
  }, []);

  const showFavoritesPalettes = async () => {
    try {
      if (isChecked) {
        const favoritesPalettes = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/get/favorites/${currentUser._id}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setfavoritesPalettes(favoritesPalettes.data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoritesPalettes = async () => {
    setShowFavorites(!showFavorites);
    showFavoritesPalettes();
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

      setTokenToCookies(userLogged.data.token);
      setCurrentUser(userLogged.data.user);
      setUserId(userLogged.data.user._id);
      checkCookieToken();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const setTokenToCookies = async (cookiesToken) => {
    await Cookies.set("we_color_token", cookiesToken);
  };

  //Llama a la funcion userLogin y pasa los datos por parametro
  const handleSubmit = async (e) => {
    e.preventDefault();

    await userLogin(user.email, user.password);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${currentUser._id}`,
        {
          name: updatedUser.name,
          email: updatedUser.email,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
    } catch (error) {
      console.log(error.response.data ? error.response.data.message : "");
    }
  };

  const checkCookieToken = async () => {
    if (Cookies.get("we_color_token")) {
      setIsChecked(true);
    }

    return;
  };

  //Agrega una nueva palette a la base de datos
  const addNewPalette = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/palettes/add`,
        {
          userId: userId,
          title: "User 4 Palette",
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
  };

  //Like the palette

  const likePalette = async (e) => {
    const paletteId = e.target.value;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/like/${paletteId}`,
        {
          user: {
            id: userId,
          },
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log("La palette fue likeada");
    } catch (error) {
      console.log(error);
    }
  };

  const addPaletteToFavorites = async (e) => {
    const paletteId = e.target.value;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/favorites/${paletteId}`,
        {
          user: {
            id: userId,
          },
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log("La palette fue agregada a favorites");
    } catch (error) {
      console.log(error);
    }
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
        <Button onClick={handleSubmit} variant="outlined">
          Iniciar sesion
        </Button>
      </div>
      {isChecked ? (
        <CheckBoxIcon color="success" fontSize="large"></CheckBoxIcon>
      ) : (
        <DangerousIcon color="error" fontSize="large"></DangerousIcon>
      )}
      <h2>Update user</h2>
      <UpdateUserContainer>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={updatedUser.name}
          onChange={handleInputUpdatedUser}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={updatedUser.email}
          onChange={handleInputUpdatedUser}
        ></input>
        <Button onClick={handleUpdate} variant="contained">
          Saves changes
        </Button>
      </UpdateUserContainer>
      <h2>Profile</h2>
      <UserProfile>
        <UserName>{currentUser ? currentUser.name : "USERNAME"}</UserName>
        <h2>email: {currentUser ? currentUser.email : "EMAIL"}</h2>
      </UserProfile>
      <Button
        onClick={() => {
          console.log(document.cookie);
        }}
      >
        COOKIES
      </Button>
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

      <h2>Todas la palettes</h2>

      <Button onClick={handleFavoritesPalettes} variant="contained">
        Ver palettes favoritas
      </Button>

      <>
        {isLoading ? (
          <>
            <Skeleton variant="rounded" width={700} height={60} />
            <Skeleton variant="text" width={700} height={60} />
            <Skeleton variant="text" width={700} height={60} />
            <Skeleton variant="text" width={700} height={60} />
            <Skeleton variant="text" width={700} height={60} />
          </>
        ) : !showFavorites ? (
          <PaletteContainer>
            {palettes.map((palette, index) => {
              return (
                <div key={index}>
                  <Div key={palette._id}>
                    <h2>{palette.title}</h2>
                    {palette.colors.map((color, index) => {
                      return (
                        <ColorBox
                          key={index}
                          style={{ backgroundColor: color }}
                        ></ColorBox>
                      );
                    })}
                  </Div>
                  <h3>Likes: {palette.likesNumber}</h3>
                  <button onClick={likePalette} key={index} value={palette._id}>
                    Like
                  </button>
                  <button
                    onClick={addPaletteToFavorites}
                    key={index + 1}
                    value={palette._id}
                  >
                    Add to favorites
                  </button>
                </div>
              );
            })}
          </PaletteContainer>
        ) : isChecked ? (
          favoritesPalettes.length == 0 ? (
            <h2>No hay palettes seleccionadas como favoritas</h2>
          ) : (
            <PaletteContainer>
              {favoritesPalettes.map((palette, index) => {
                return (
                  <div key={index}>
                    <Div key={palette._id}>
                      <h2>{palette.title}</h2>
                      {palette.colors.map((color, index) => {
                        return (
                          <ColorBox
                            key={index}
                            style={{ backgroundColor: color }}
                          ></ColorBox>
                        );
                      })}
                    </Div>
                    <h3>Likes: {palette.likesNumber}</h3>
                    <button
                      onClick={likePalette}
                      key={index}
                      value={palette._id}
                    >
                      Like
                    </button>
                    <button
                      onClick={addPaletteToFavorites}
                      key={index + 1}
                      value={palette._id}
                    >
                      Add to favorites
                    </button>
                  </div>
                );
              })}
            </PaletteContainer>
          )
        ) : (
          <h2>Inicie sesion para ver</h2>
        )}
      </>
    </>
  );
};

export default App;
