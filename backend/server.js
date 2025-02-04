const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // Para poder leer el cuerpo de las solicitudes en formato JSON

const PORT = 3000;
const dataPath = "./equipos.json";

// Servir archivos estáticos desde la carpeta "frontend"
app.use(express.static(path.join(__dirname, "../frontend")));

// Obtener todos los equipos o filtrar por categoría, ciudad, fundación y títulos
app.get("/equipos", (req, res) => {
    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    let { categoria, ciudad, fundacion, titulos } = req.query;

    if (categoria) data = data.filter(e => e.categoria === categoria);
    if (ciudad) data = data.filter(e => e.ciudad.toLowerCase().includes(ciudad.toLowerCase()));
    if (fundacion) data = data.filter(e => e.fundacion === fundacion);
    if (titulos) data = data.filter(e => e.titulos === parseInt(titulos));

    res.json(data);
});

// Obtener un equipo por su ID
app.get("/equipo/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    let equipo = data.find(e => e.id === parseInt(req.params.id));
    equipo ? res.json(equipo) : res.status(404).json({ error: "Equipo no encontrado" });
});

// Crear un nuevo equipo
app.post("/equipos", (req, res) => {
    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const nuevoEquipo = req.body;
    data.push(nuevoEquipo);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(nuevoEquipo);
});

// Editar un equipo existente
app.put("/equipo/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    let equipoIndex = data.findIndex(e => e.id === parseInt(req.params.id));

    if (equipoIndex === -1) {
        return res.status(404).json({ error: "Equipo no encontrado" });
    }

    // Actualizar el equipo con los datos enviados en el cuerpo de la solicitud
    data[equipoIndex] = { ...data[equipoIndex], ...req.body };

    // Guardar los cambios en el archivo JSON
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.json(data[equipoIndex]);
});

// Eliminar un equipo
app.delete("/equipo/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    let equipoIndex = data.findIndex(e => e.id === parseInt(req.params.id));

    if (equipoIndex === -1) {
        return res.status(404).json({ error: "Equipo no encontrado" });
    }

    // Eliminar el equipo del array
    const equipoEliminado = data.splice(equipoIndex, 1);

    // Guardar los cambios en el archivo JSON
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.json(equipoEliminado);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});