document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        // Cargar los datos del equipo
        fetch(`http://localhost:3000/equipo/${id}`)
            .then(response => response.json())
            .then(equipo => {
                document.getElementById("id").value = equipo.id;
                document.getElementById("nombre").value = equipo.nombre;
                document.getElementById("ciudad").value = equipo.ciudad;
                document.getElementById("categoria").value = equipo.categoria;
                document.getElementById("titulos").value = equipo.titulos;
                document.getElementById("estadio").value = equipo.estadio;
                document.getElementById("fundacion").value = equipo.fundacion;
                document.getElementById("logo").value = equipo.logo;
            })
            .catch(error => console.error("Error:", error));
    }

    // Manejar el envío del formulario
    document.getElementById("formEditarEquipo").addEventListener("submit", (e) => {
        e.preventDefault();

        const equipo = {
            id: parseInt(document.getElementById("id").value),
            nombre: document.getElementById("nombre").value,
            ciudad: document.getElementById("ciudad").value,
            categoria: document.getElementById("categoria").value,
            titulos: parseInt(document.getElementById("titulos").value),
            estadio: document.getElementById("estadio").value,
            fundacion: document.getElementById("fundacion").value,
            logo: document.getElementById("logo").value,
        };

        fetch(`http://localhost:3000/equipo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(equipo),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al guardar los cambios");
                }
                return response.json();
            })
            .then(() => {
                alert("Cambios guardados correctamente");
                window.location.href = "index.html"; // Redirigir a la página principal
            })
            .catch(error => {
                console.error("Error:", error);
                alert(error.message);
            });
    });
});