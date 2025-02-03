document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID del equipo desde la URL
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id) {
        // Hacer la solicitud al servidor para obtener los detalles del equipo
        fetch(`http://localhost:3000/equipo/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Equipo no encontrado");
                }
                return response.json();
            })
            .then(data => mostrarDetalles(data))
            .catch(error => {
                console.error("Error:", error);
                alert(error.message); // Mostrar un mensaje de error al usuario
            });
    } else {
        alert("ID del equipo no proporcionado");
    }
});

function mostrarDetalles(equipo) {
    // Mostrar los datos del equipo en la página
    document.getElementById("nombre").textContent = equipo.nombre;
    document.getElementById("ciudad").textContent = equipo.ciudad;
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