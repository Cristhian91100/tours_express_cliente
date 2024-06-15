document.addEventListener('DOMContentLoaded', () => {
    let destinoList = document.getElementById("destino-list");
    const select = document.getElementById("filter-select");
    let data;

    fetch("https://localhost:7047/api/Destino")
        .then(response => response.json())
        .then(destinos => {
            data = destinos;
            mostrarDestinos(data);
        })
        .catch(error => console.error(error));

    function mostrarDestinos(data) {
        destinoList.innerHTML = "";
        data.forEach(destino => {
            let destinoCard = document.createElement("div");
            destinoCard.classList.add("col-span-1");
            destinoCard.innerHTML = `
                <div class="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
                    <img style="width: 50px" src="assets/img/logo.png" alt="${destino.nombre}" class="w-full h-auto rounded-lg mb-4">
                    <h2 class="text-xl font-bold mb-2 truncate text-green-500">${destino.nombre}</h2>
                    <p class="mb-2"><i class="fas fa-map-marker-alt text-green-500"></i> ${destino.pais} - ${destino.ciudad}</p>
                    <p class="mb-2"><i class="fas fa-landmark text-green-500"></i> ${destino.atracciones}</p>
                    <p class="mb-2"><i class="fas fa-cloud-sun text-green-500"></i> ${destino.clima}</p>
                    <p class="mb-2"><i class="fas fa-language text-green-500"></i> ${destino.idioma}</p>
                    <p class="mb-2"><i class="fas fa-money-bill-wave text-green-500"></i> Moneda: ${destino.moneda}</p>
                    <a href="destino-single.html?iD_Destino=${destino.iD_Destino}" class="block bg-green-500 text-white py-2 px-4 rounded-lg mt-4 text-center">Más Información</a>
                </div>
            `;
            destinoList.appendChild(destinoCard);
        });
    }

    function ordenarDestinos(criterio) {
        switch (criterio) {
            case "name-asc":
                data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case "name-desc":
                data.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            case "country-asc":
                data.sort((a, b) => a.pais.localeCompare(b.pais));
                break;
            case "country-desc":
                data.sort((a, b) => b.pais.localeCompare(a.pais));
                break;
            default:
                data = data.sort((a, b) => a.iD_Destino - b.iD_Destino); // Default order
        }
        mostrarDestinos(data);
    }

    select.addEventListener("change", function () {
        const selectedValue = this.value;
        ordenarDestinos(selectedValue);
    });
});
