const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const PORT = 3000;
const dataPath = "./equipos.json";

// Endpoint para obtener equipos con filtros
app.get("/equipos", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error al leer la base de datos.");
            return;
        }

        let equipos = JSON.parse(data);
        let { categoria, ciudad } = req.query;

        if (categoria) equipos = equipos.filter(e => e.categoria === categoria);
        if (ciudad) equipos = equipos.filter(e => e.ciudad.toLowerCase().includes(ciudad.toLowerCase()));

        res.json(equipos);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
