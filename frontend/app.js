// Autores: Felipe González, Miguel Cárdenas
// Universidad Distrital Francisco José de Caldas

document.addEventListener("DOMContentLoaded", () => {
    // Cargar los equipos al iniciar la página
    buscarEquipos();
});

function buscarEquipos() {
    const categoria = document.getElementById("categoria").value;
    const ciudad = document.getElementById("ciudad").value;
    const fundacion = document.getElementById("fundacion").value;
    const titulos = document.getElementById("titulos").value;

    // Construir la URL de búsqueda
    let url = `http://localhost:3000/equipos`;
    const params = new URLSearchParams();
    if (categoria) params.append("categoria", categoria);
    if (ciudad) params.append("ciudad", ciudad);
    if (fundacion) params.append("fundacion", fundacion);
    if (titulos) params.append("titulos", titulos);
    if (params.toString()) url += `?${params.toString()}`;

    // Hacer la solicitud al servidor
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar los equipos");
            }
            return response.json();
        })
        .then(data => mostrarEquipos(data))
        .catch(error => {
            console.error("Error:", error);
            alert(error.message);
        });
}

function mostrarEquipos(equipos) {
    const contenedorEquipos = document.getElementById("equipos");
    contenedorEquipos.innerHTML = "";

    if (equipos.length === 0) {
        contenedorEquipos.innerHTML = "<p>No se encontraron equipos.</p>";
        return;
    }

    // Generar la lista de equipos
    equipos.forEach(equipo => {
        const card = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${equipo.logo}" class="card-img-top" alt="${equipo.nombre}" style="max-height: 150px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title">${equipo.nombre}</h5>
                        <a href="equipo.html?id=${equipo.id}" class="btn btn-primary">Ver detalles</a>
                    </div>
                </div>
            </div>
        `;
        contenedorEquipos.innerHTML += card;
    });
}