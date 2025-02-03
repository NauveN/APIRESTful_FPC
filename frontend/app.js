document.addEventListener("DOMContentLoaded", () => {
    buscarEquipos();
});

function buscarEquipos() {
    let categoria = document.getElementById("categoria").value;
    let ciudad = document.getElementById("ciudad").value;
    let url = "http://localhost:3000/equipos?";

    if (categoria) url += `categoria=${encodeURIComponent(categoria)}&`;
    if (ciudad) url += `ciudad=${encodeURIComponent(ciudad)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarEquipos(data))
        .catch(error => console.error("Error:", error));
}

function mostrarEquipos(equipos) {
    let container = document.getElementById("equipos");
    container.innerHTML = "";

    if (equipos.length === 0) {
        container.innerHTML = "<p class='text-danger'>No se encontraron equipos.</p>";
        return;
    }

    equipos.forEach(e => {
        let card = `
            <div class="col-md-4 mb-4">
                <div class="card shadow">
                    <div class="card-body text-center">
                        <img src="https://via.placeholder.com/80" class="team-logo mb-3" alt="Logo">
                        <h5 class="card-title">${e.nombre}</h5>
                        <p class="card-text"><strong>Ciudad:</strong> ${e.ciudad}</p>
                        <p class="card-text"><strong>Categoría:</strong> ${e.categoria}</p>
                        <p class="card-text"><strong>Títulos:</strong> ${e.titulos}</p>
                        <p class="card-text"><strong>Estadio:</strong> ${e.estadio}</p>
                        <p class="card-text"><strong>Fundación:</strong> ${e.fundacion}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}
