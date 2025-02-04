document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID del equipo desde la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        // Cargar los detalles del equipo
        fetch(`http://localhost:3000/equipo/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Equipo no encontrado");
                }
                return response.json();
            })
            .then(equipo => mostrarDetalles(equipo))
            .catch(error => {
                console.error("Error:", error);
                alert(error.message);
            });

        // Manejar el botón de editar
        document.getElementById("btnEditar").addEventListener("click", () => {
            window.location.href = `editar.html?id=${id}`;
        });

        // Manejar el botón de eliminar
        document.getElementById("btnEliminar").addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres eliminar este equipo?")) {
                fetch(`http://localhost:3000/equipo/${id}`, {
                    method: "DELETE",
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el equipo");
                        }
                        return response.json();
                    })
                    .then(() => {
                        alert("Equipo eliminado correctamente");
                        window.location.href = "index.html"; // Redirigir a la página principal
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert(error.message);
                    });
            }
        });
    } else {
        alert("ID del equipo no proporcionado");
    }
});

function mostrarDetalles(equipo) {
    // Mostrar los datos del equipo en la página
    document.getElementById("nombre").textContent = equipo.nombre;
    document.getElementById("ciudad").textContent = equipo.ciudad;
    document.getElementById("categoria").textContent = equipo.categoria;
    document.getElementById("estadio").textContent = equipo.estadio;
    document.getElementById("fundacion").textContent = equipo.fundacion;
    document.getElementById("titulos").textContent = equipo.titulos;

    // Mostrar el logo si está disponible
    if (equipo.logo) {
        document.getElementById("logo").src = equipo.logo;
    } else {
        document.getElementById("logo").style.display = "none"; // Ocultar la imagen si no hay logo
    }
}