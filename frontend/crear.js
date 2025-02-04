document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formCrearEquipo").addEventListener("submit", function(event) {
        event.preventDefault();

        const nuevoEquipo = {
            id: Date.now(), // Generar un ID único basado en la fecha actual
            nombre: document.getElementById("nombre").value,
            ciudad: document.getElementById("ciudad").value,
            categoria: document.getElementById("categoria").value,
            titulos: parseInt(document.getElementById("titulos").value),
            estadio: document.getElementById("estadio").value,
            fundacion: document.getElementById("fundacion").value,
            logo: document.getElementById("logo").value
        };

        fetch('http://localhost:3000/equipos', { // Asegúrate de que la URL sea correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoEquipo)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al crear el equipo");
            }
            return response.json();
        })
        .then(() => {
            alert("Equipo creado correctamente");
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message);
        });
    });
});