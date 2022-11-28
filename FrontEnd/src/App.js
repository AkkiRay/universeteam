import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Profile from "./pages/Profile.jsx";


function App() {
  const [user, setUser] = useState(null);

  const [stalkerUser, setStalkerUser] = useState(null);

  useEffect(() => {
    fetch("http://194.93.2.183:2000/", {
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((b) => {
        if (b.success) {
          setUser(b.user);
        }
      });
  }, []);

  if (user === null || user === undefined) {
  } else {
    var steamid_data = user.steamid
    axios.post('http://194.93.2.183/database.php', JSON.stringify({ steamid: steamid_data }), {
      headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-type': 'application/x-www-form-urlencoded'}}
      ).then(function (response) {
      var ix_characters = response.data['ix_characters'][steamid_data];
      var ix_stats = response.data['ix_stats'][steamid_data];
      var ix_players = response.data['ix_players'][steamid_data];
      var ix_bans = response.data['ix_bans'][steamid_data];
      var ix_ulx = response.data['ix_ulx'][steamid_data];
      var accountStalker = {
        ix_characters,
        ix_stats,
        ix_players,
        ix_bans,
        ix_ulx,
      }
      setStalkerUser(accountStalker)
    });
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route exact path="/home" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route exact path="/about" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route path="/account" element={<Profile userSteam={user} userStalker={stalkerUser} />} />
      <Route path="/shop" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route path="/leaderboard" element={<Home userSteam={user} userStalker={stalkerUser} />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
