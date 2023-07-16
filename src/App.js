import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Profile from "./pages/Profile.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [stalkerUser, setStalkerUser] = useState(null);

  useEffect(() => {
    // Получение данных пользователя Steam
    axios.get("http://localhost:2000/", { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setUser(response.data.user)
            var steamid = response.data.user._json.steamid
            axios.get(`http://localhost:2000/get_character?steamid=${steamid}`)
              .then(response => {
                if (response.data.success) {
                  setStalkerUser(response.data.data);
                } else {
                  setStalkerUser([]);
                }
              })
              .catch(error => {
                console.error("Ошибка при получении данных персонажа:", error);
              });
        } else {
          setUser(null);
          setStalkerUser(null);
        }
      })
      .catch(error => {
        console.error("Ошибка при получении данных пользователя Steam:", error);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route exact path="/home" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route exact path="/about" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route path="/account" element={<Profile userSteam={user} userStalker={stalkerUser} />} />
      <Route path="/shop" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route path="/leaderboard" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
