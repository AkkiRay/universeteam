const express = require("express");
const steam = require("steam-login");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2");

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
    secret: "a secret",
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
  host: "212.22.93.142",
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

app.get("/get_character", (req, res) => {
  const steamId = req.query.steamid;
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  db.query(
    "SELECT * FROM ix_characters WHERE steamid = ?",
    [steamId],
    (err, characterResults) => {
      if (err) {
        console.error("Ошибка при выполнении запроса к базе данных:", err);
        return res
          .status(500)
          .json({ success: false, message: "Ошибка сервера" });
      }

      if (characterResults.length > 0) {
        const character = characterResults[0];
        
        db.query(
          "SELECT * FROM ix_stats WHERE steamid = ?",
          [steamId],
          (err, statsResults) => {
            if (err) {
              console.error("Ошибка при выполнении запроса к базе данных:", err);
              return res
                .status(500)
                .json({ success: false, message: "Ошибка сервера" });
            }
            
            db.query(
              "SELECT * FROM ix_players WHERE steamid = ?",
              [steamId],
              (err, playersResults) => {
                if (err) {
                  console.error("Ошибка при выполнении запроса к базе данных:", err);
                  return res
                    .status(500)
                    .json({ success: false, message: "Ошибка сервера" });
                }
                
                db.query(
                  "SELECT * FROM lsql_bans WHERE steamid = ? AND unbannedby IS NULL",
                  [steamId],
                  (err, bansResults) => {
                    if (err) {
                      console.error("Ошибка при выполнении запроса к базе данных:", err);
                      return res
                        .status(500)
                        .json({ success: false, message: "Ошибка сервера" });
                    }
                    
                    db.query(
                      "SELECT * FROM lsql_users WHERE steamid = ?",
                      [steamId],
                      (err, ulxResults) => {
                        if (err) {
                          console.error("Ошибка при выполнении запроса к базе данных:", err);
                          return res
                            .status(500)
                            .json({ success: false, message: "Ошибка сервера" });
                        }
                        
                        const data = {
                          ix_characters: characterResults[0],
                          ix_stats: statsResults[0],
                          ix_players: playersResults[0],
                          ix_bans: bansResults[0],
                          ix_ulx: ulxResults[0],
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
