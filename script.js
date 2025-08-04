//funcion busqueda de pokemon
let pokemonActual = null;
 
async function fetchData() {
    try {
        const nombrePokemon = document.getElementById("pokemonInput").value.toLowerCase().trim();
       
        if (!nombrePokemon) {
            alert("Escribe el nombre de un Pokémon.");
            return;
        }
 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }
 
        const data = await response.json();
 
        //guarda el nombre y la imagen
        pokemonActual = {
            nombre: data.name,
            imagen: data.sprites.front_default
        };
 
        document.getElementById("pokeNombre").textContent = pokemonActual.nombre;
        document.getElementById("pokeImg").src = pokemonActual.imagen;
        document.getElementById("pokeImg").alt = `Imagen de ${pokemonActual.nombre}`;
        document.getElementById("pokemonResultado").style.display = "block";
 
    } catch (error) {
        alert(error.message);
        document.getElementById("pokemonResultado").style.display = "none";
    }
}
 
//funcion para guardar favorito
function saveFavorite() {
    if (!pokemonActual) {
        alert("Primero busca un Pokémon para guardarlo.");
        return;
    }
 
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
 
    const existe = favoritos.some(p => p.nombre === pokemonActual.nombre);
    if (existe) {
        alert("Este Pokémon ya está en favoritos.");
        return;
    }
 
    favoritos.push(pokemonActual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
 
    updateFavoritesList();
}
 
//muestra la lista de favoritos
function updateFavoritesList() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const lista = document.getElementById("listaFavoritos");
    lista.innerHTML = "";
 
    favoritos.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${p.nombre}</strong><br><img src="${p.imagen}" alt="${p.nombre}" width="100">`;
        lista.appendChild(li);
    });
}
 
//conecta con el DOM
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pokemonForm").addEventListener("submit", function (event) {
        event.preventDefault();
        fetchData();
    });
 
    document.getElementById("saveButton").addEventListener("click", saveFavorite);
 
    updateFavoritesList(); //carga los favoritos guardados
});