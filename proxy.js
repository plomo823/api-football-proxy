const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.API_FOOTBALL_KEY || "4712cb300b003d94f61b5a63a6b22f2b";

app.get("/standings", async (req, res) => {
  try {
    const response = await fetch("https://v3.football.api-sports.io/standings?league=140&season=2024", {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los standings." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
