const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Servir archivos estáticos desde la carpeta "frontend"
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = 3000;
const dataPath = "./equipos.json";

app.get("/equipos", (req, res) => {
    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    let { categoria, ciudad } = req.query;

    if (categoria) data = data.filter(e => e.categoria === categoria);
    if (ciudad) data = data.filter(e => e.ciudad.toLowerCase().includes(ciudad.toLowerCase()));

    res.json(data);
});

app.get("/equipo/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    let equipo = data.find(e => e.id === parseInt(req.params.id));
    equipo ? res.json(equipo) : res.status(404).json({ error: "Equipo no encontrado" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});