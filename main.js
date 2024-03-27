// Función para obtener un número aleatorio entre 1 y 898 (total de Pokémon)
function getRandomPokemonId() {
    return Math.floor(Math.random() * 898) + 1;
  }
  
  // Función para hacer la solicitud a la PokeAPI y mostrar los datos del Pokémon en el HTML
  async function fetchPokemonData() {
    try {
      const numPokemon = 20; // Número de Pokémon a mostrar
      let pokemonHtml = '';
  
      // Obtener datos de varios Pokémon y construir el HTML
      for (let i = 0; i < numPokemon; i++) {
        const pokemonId = getRandomPokemonId();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
  
        // Construir la tarjeta HTML para el Pokémon actual
        const cardHtml = `
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            <div class="card-body">
              <h5 class="card-title">#${pokemonId.toString().padStart(3, '0')}</h5>
              <h4>${data.name}</h4>
              <div class="type-pokemon">
                ${data.types.map(type => `
                  <span class="badge badge-primary">${type.type.name}</span>
                `).join('')}
              </div>
              <a href="#" class="btn btn-primary" onclick="showStats(${pokemonId})">See stats</a>
            </div>
          </div>
        `;
  
        pokemonHtml += cardHtml;
      }
  
      // Insertar el HTML de los Pokémon en el contenedor
      document.getElementById('pokemonContainer').innerHTML = pokemonHtml;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }
  
  // Función para mostrar las estadísticas del Pokémon (simulado)
  function showStats(pokemonId) {
    alert(`Aquí podrías mostrar las estadísticas del Pokémon con ID ${pokemonId}.`);
  }
  
  // Llamar a la función para cargar los Pokémon al cargar la página
  fetchPokemonData();
  