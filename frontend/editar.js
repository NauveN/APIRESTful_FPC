// Autores: Felipe González, Miguel Cárdenas
// Universidad Distrital Francisco José de Caldas

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Verificar si el ID está presente
    if (!id) {
        alert("No se ha proporcionado un ID de equipo válido.");
        window.location.href = "index.html";
        return;
    }

    // Cargar datos del equipo para editar
    fetch(`http://localhost:3000/equipo/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar los datos del equipo.");
            }
            return response.json();
        })
        .then(equipo => {
            // Llenar los campos del formulario con los datos del equipo
            document.getElementById("id").value = equipo.id;
            document.getElementById("nombre").value = equipo.nombre;
            document.getElementById("ciudad").value = equipo.ciudad;
            document.getElementById("categoria").value = equipo.categoria;
            document.getElementById("titulos").value = equipo.titulos;
            document.getElementById("estadio").value = equipo.estadio;
            document.getElementById("fundacion").value = equipo.fundacion;
            document.getElementById("logo").value = equipo.logo;
        })
        .catch(error => {
            console.error("Error al cargar el equipo:", error);
            alert("Error al cargar el equipo. Redirigiendo al inicio...");
            window.location.href = "index.html";
        });

    // Manejar el envío del formulario
    document.getElementById("formEditarEquipo").addEventListener("submit", function (event) {
        event.preventDefault();

        const equipoActualizado = {
            id: parseInt(document.getElementById("id").value),
            nombre: document.getElementById("nombre").value,
            ciudad: document.getElementById("ciudad").value,
            categoria: document.getElementById("categoria").value,
            titulos: parseInt(document.getElementById("titulos").value),
            estadio: document.getElementById("estadio").value,
            fundacion: document.getElementById("fundacion").value,
            logo: document.getElementById("logo").value,
        };

        // Enviar los datos actualizados al servidor
        fetch(`http://localhost:3000/equipo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(equipoActualizado),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al guardar los cambios.");
            }
            return response.json();
        })
        .then(() => {
            window.location.href = "index.html"; // Redirige sin mensaje de confirmación
        })
        .then(() => {
            alert("Los cambios se guardaron correctamente.");
            window.location.href = "index.html"; // Redirige después de cerrar el alert
        })
        .catch(error => {
            console.error("Error al guardar los cambios:", error);
            alert("Hubo un error al guardar los cambios. Inténtalo de nuevo.");
        });
    });
});
