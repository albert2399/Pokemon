async function obtenerCadenaEvolucion(nombrePokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}`);
      const data = await response.json();
      const evolutionChainUrl = data.evolution_chain.url;
      const evolutionChainResponse = await fetch(evolutionChainUrl);
      const evolutionChainData = await evolutionChainResponse.json();
      return evolutionChainData;
    } catch (error) {
      console.error('Error al obtener la cadena de evolución:', error);
      throw error;
    }
  }

  async function obtenerDatosPokemonPorNombre(nombrePokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del Pokémon');
      }
      const data = await response.json();
      return data.sprites.other['official-artwork'].front_default;
    } catch (error) {
      console.error('Error al obtener los datos del Pokémon:', error);
      throw error;
    }
  }

  window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombrePokemon = urlParams.get('id');
    const evolutionChainData = await obtenerCadenaEvolucion(nombrePokemon);
    const evolutionChainDiv = document.getElementById('evolutionChain');
    const chainDetails = evolutionChainData.chain;

    async function mostrarPokemonEnCadenaEvolutiva(cadena) {
      const nombresPokemon = [];
      obtenerNombresCadena(cadena, nombresPokemon);
      for (const nombre of nombresPokemon) {
        const imgUrl = await obtenerDatosPokemonPorNombre(nombre);
        const pokemonElement = document.createElement('div');
        pokemonElement.innerHTML = `<img src="${imgUrl}" alt="${nombre}" height=150 width=150><br>${nombre}`;
        evolutionChainDiv.appendChild(pokemonElement);
      }
    }

    function obtenerNombresCadena(cadena, nombres) {
      nombres.push(cadena.species.name);
      if (cadena.evolves_to.length > 0) {
        obtenerNombresCadena(cadena.evolves_to[0], nombres);
      }
    }

    await mostrarPokemonEnCadenaEvolutiva(chainDetails);
  };
  