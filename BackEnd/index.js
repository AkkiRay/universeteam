const express = require("express");
const steam = require("steam-login");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2");
const Long = require('long');

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(
  session({
    secret: "utTeamSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  steam.middleware({
    realm: "http://localhost:2000/",
    verify: "http://localhost:2000/verify",
    apiKey: "47C2B290346037FC8532B9DD94324901",
  })
);

// Создайте подключение к базе данных MySQL
const db = mysql.createConnection({
  host: "212.22.93.138",
  user: "clwin",
  password: "woofpass432",
  database: "stalker",
  port: 3306,
});

// Проверьте подключение к базе данных
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
  } else {
    console.log("Успешное подключение к базе данных");
  }
});

function steamId64to32(steamID){
  const id64 = Long.fromString(steamID, true, 10);
  const xMask = Long.fromString("FF00000000000000", true, 16);
  const yMask = Long.fromString("0000000000000001", true, 16);
  const zMask = Long.fromString("00000000FFFFFFFE", true, 16);

  // Convert the steamID.
  const x = id64.and(xMask).shiftRightUnsigned(57);
  const y = id64.and(yMask);
  const z = id64.and(zMask).shiftRightUnsigned(1);
  // Return as string
  return `STEAM_${x}:${y}:${z}`
}

app.get("/get_character", (req, res) => {
  const steamID64 = req.query.steamid;
  const steamID = steamId64to32(req.query.steamid);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  db.query(
    "SELECT * FROM ix_characters WHERE steamid = ?",
    [steamID64],
    (err, characterResults) => {
      if (err) {
        console.error("Ошибка при выполнении запроса к базе данных:", err);
        return res
          .status(500)
          .json({ success: false, message: "Ошибка сервера: персонаж не найден" });
      }

      if (characterResults.length > 0) {
        var character = characterResults[0];
        
        db.query(
          "SELECT * FROM ix_stats WHERE steamid = ?",
          [steamID64],
          (err, statsResults) => {
            if (err) {
              console.error("Ошибка при выполнении запроса к базе данных:", err);
              return res
                .status(500)
                .json({ success: false, message: "Ошибка сервера: статистика не найдена" });
            }
            
            db.query(
              "SELECT * FROM ix_players WHERE steamid = ?",
              [steamID64],
              (err, playersResults) => {
                if (err) {
                  console.error("Ошибка при выполнении запроса к базе данных:", err);
                  return res
                    .status(500)
                    .json({ success: false, message: "Ошибка сервера: игрок не найден" });
                }
                
                db.query(
                  "SELECT * FROM sam_bans WHERE steamid = ?",
                  [steamID],
                  (err, bansResults) => {
                    if (err) {
                      console.error("Ошибка при выполнении запроса к базе данных:", err);
                      return res
                        .status(500)
                        .json({ success: false, message: "Ошибка сервера: баны не найдены" });
                    }
                    
                    db.query(
                      "SELECT * FROM sam_players WHERE steamid = ?",
                      [steamID],
                      (err, ulxResults) => {
                        if (err) {
                          console.error("Ошибка при выполнении запроса к базе данных:", err);
                          return res
                            .status(500)
                            .json({ success: false, message: "Ошибка сервера: привелегии не найдены" });
                        }
                        
                        const data = {
                          ix_characters: character,
                          ix_stats: statsResults[0],
                          ix_players: playersResults[0],
                          sam_bans: bansResults[0],
                          sam_players: ulxResults[0],
                        };
                        
                        return res.status(200).json({
                          success: true,
                          data: data,
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      } else {
        console.log("Персонаж с STEAMID не найден");
        return res.status(200).json({
          success: false,
          data: {},
        });
      }
    }
  );
});

app.get("/", (req, res) => {
  if (req.user) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    return res.status(200).json({success: true, user: req.user, });
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    return res.status(200).json({ success: false });
  }
});

app.get("/authenticate", steam.authenticate());

app.get("/verify", steam.verify(), (req, res) => {
  req.session.steamUser = req.user;
  return res.redirect("http://localhost:3000/");
});

app.get("/logout", steam.enforceLogin("/"), function (req, res) {
  req.logout();
  return res.redirect("http://localhost:3000/");
});

app.listen(2000, () => {
  console.log("Сервер запущен на порту 2000");
});
