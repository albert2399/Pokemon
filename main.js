
function getBackgroundColor(types) {
  // Mapear los tipos de Pokémon a los colores oficiales de Pokémon
  const colorMap = {
    "normal": "#A8A77A",
    "fire": "#EE8130",
    "water": "#6390F0",
    "electric": "#F7D02C",
    "grass": "#7AC74C",
    "ice": "#96D9D6",
    "fighting": "#C22E28",
    "poison": "#A33EA1",
    "ground": "#E2BF65",
    "flying": "#A98FF3",
    "psychic": "#F95587",
    "bug": "#A6B91A",
    "rock": "#B6A136",
    "ghost": "#735797",
    "dragon": "#6F35FC",
    "dark": "#705746",
    "steel": "#B7B7CE",
    "fairy": "#D685AD"
  };

  // Obtener el color para el primer tipo del Pokémon
  const type = types[0].type.name;
  return colorMap[type] || "#ffffff"; // Por defecto, blanco si el tipo no está mapeado
}

function getBackgroundColorTp(typeName) {
  // Mapear los tipos de Pokémon a los colores oficiales de Pokémon
  const colorMap = {
    "normal": "coral",
    "fire": "red",
    "water": "blue",
    "electric": "#ffc107",
    "grass": "green",
    "ice": "#a1c4ff",
    "fighting": "#6d1616",
    "poison": "#431b42",
    "ground": "#4b4330",
    "flying": "#A98FF3",
    "psychic": "#7b4e72",
    "bug": "#82a561",
    "rock": "#918754",
    "ghost": "#443853",
    "dragon": "#1f1a3d",
    "dark": "black",
    "steel": "slategray",
    "fairy": "#f7007a"
  };

  // Obtener el color para el primer tipo del Pokémon
  return colorMap[typeName.toLowerCase()] || "#ffffff";
}


// Resto del código sin cambios...


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
        const backgroundColor = getBackgroundColor(data.types);
  
        // Construir la tarjeta HTML para el Pokémon actual
        const cardHtml = `
          <div class="card" style="width: 18rem; background-color: ${backgroundColor};">
            <img class="card-img-top" src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            <div class="card-body">
              <h5 class="card-title">#${pokemonId.toString().padStart(3, '0')}</h5>
              <h4>${data.name}</h4>
              <div class="type-pokemon">
                ${data.types.map(type => `
                  <span class="badge badge-primary" style="background-color: ${getBackgroundColorTp(type.type.name)};">${type.type.name}</span>
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
    window.location.href = `pokedex.html?id=${pokemonId}`;
  }
  
  // Llamar a la función para cargar los Pokémon al cargar la página
  fetchPokemonData();

  //!!!

  document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del Pokémon de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    // Función para obtener datos de un Pokémon por su ID
    async function obtenerDatosPokemonPorId(idPokemon) {
        try {
            // Hacer la solicitud a la PokeAPI para obtener los datos del Pokémon
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error al obtener los datos del Pokémon');
            }
            
            // Convertir la respuesta a JSON
            const data = await response.json();

            // Extraer los datos relevantes del Pokémon
            const pokemonData = {
                nombre: data.name,
                numero: data.id,
                imagen: data.sprites.front_default,
                descripcion: data.species.url,
                stats: data.stats.map(stat => ({ nombre: stat.stat.name, valor: stat.base_stat })),
                tipos: data.types.map(type => type.type.name),
                // Otras propiedades del Pokémon que desees incluir
            };

            return pokemonData;
        } catch (error) {
            console.error('Error al obtener los datos del Pokémon:', error);
            throw error; // Re-lanzar el error para que pueda ser manejado por el código que llama a esta función
        }
    }

    // Función para obtener la descripción de un Pokémon
    async function obtenerDescripcionPokemon(pokemonName) {
      try {
          // Construir la URL de la API con el nombre del Pokémon
          const apiUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
          
          // Realizar la solicitud GET a la PokeAPI
          const response = await fetch(apiUrl);
      
          // Verificar si la solicitud fue exitosa
          if (!response.ok) {
              throw new Error('Error al obtener la descripción del Pokémon');
          }
      
          // Convertir la respuesta a JSON
          const data = await response.json();
      
          // Buscar la descripción en inglés
          let description = '';
          for (const entry of data.flavor_text_entries) {
              if (entry.language.name === 'en') {
                  description = entry.flavor_text;
                  break; // Salir del bucle una vez que se encuentra la descripción en inglés
              }
          }
      
          // Devolver la descripción
          return description;
      } catch (error) {
          console.error('Error:', error);
          return 'Error 404'; // Opcional: Devolver un valor predeterminado en caso de error
      }
  }
  
  
  
  

    // Uso de la función para obtener los datos del Pokémon por su ID
    obtenerDatosPokemonPorId(pokemonId)
        .then(data => {
            console.log('Datos del Pokémon:', data);
            // Insertar los datos del Pokémon en los elementos HTML correspondientes
            document.getElementById('nombrePokemon').textContent = data.nombre;
            document.getElementById('numeroPokemon').textContent = `#${pokemonId.toString().padStart(3, '0')}`;
            document.getElementById('imagenPokemon').src = data.imagen;
            (async ()=> {const description = await obtenerDescripcionPokemon(data.nombre);
            document.getElementById('descripcionPokemon').textContent = description;})();

            // Insertar las estadísticas del Pokémon
            const statsPokemon = document.getElementById('statsPokemon');
            statsPokemon.innerHTML = ''; // Limpiar el contenido existente
            data.stats.forEach(stat => {
                const statElement = document.createElement('div');
                statElement.classList.add('list');
                statElement.innerHTML = `<span class="name">${stat.nombre}</span><span class="value">${stat.valor}</span>`;
                statsPokemon.appendChild(statElement);
            });

            // Insertar los tipos y debilidades del Pokémon
            const tipoPokemon = document.getElementById('tipoPokemon');
            tipoPokemon.innerHTML = ''; // Limpiar el contenido existente
            tipoPokemon.innerHTML = `<span class="xqc">Type</span>`;
            data.tipos.forEach(tipo => {
                const tipoElement = document.createElement('ul');
                tipoElement.classList.add('hypa');
                tipoElement.innerHTML = `<li style="background-color: ${getBackgroundColorTp(tipo)}; width: 120px; border-radius: 5px;">${tipo}</li>`;
                tipoPokemon.appendChild(tipoElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar el error
        });
});

//Search

document.addEventListener('DOMContentLoaded', () => {
  const formBuscar = document.getElementById('formBuscar');
  formBuscar.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto

      // Obtener el nombre del Pokémon ingresado en el campo de búsqueda
      const nombrePokemon = document.getElementById('inputNombrePokemon').value.trim();

      // Verificar que se haya ingresado un nombre de Pokémon
      if (!nombrePokemon) {
          alert('Por favor ingrese un nombre de Pokémon');
          return;
      }

      // Función para obtener datos de un Pokémon por su nombre
      async function obtenerDatosPokemonPorNombre(nombrePokemon) {
          try {
              // Hacer la solicitud a la PokeAPI para obtener los datos del Pokémon
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
              
              // Verificar si la respuesta es exitosa
              if (!response.ok) {
                  throw new Error('Error al obtener los datos del Pokémon');
              }
              
              // Convertir la respuesta a JSON
              const data = await response.json();

              // Extraer los datos relevantes del Pokémon
              const pokemonData = {
                  nombre: data.name,
                  id: data.id,
                  imagen: data.sprites.front_default,
                  descripcion: data.species.url,
                  stats: data.stats.map(stat => ({ nombre: stat.stat.name, valor: stat.base_stat })),
                  tipos: data.types.map(type => type.type.name),
                  // Otras propiedades del Pokémon que desees incluir
              };

              return showStats(data.id);
          } catch (error) {
              console.error('Error al obtener los datos del Pokémon:', error);
              throw error; // Re-lanzar el error para que pueda ser manejado por el código que llama a esta función
          }
      }

      // Función para obtener la descripción de un Pokémon
      // async function obtenerDescripcionPokemon(url) {
      //     try {
      //         // Hacer la solicitud a la URL de la especie del Pokémon para obtener más detalles
      //         const response = await fetch(url);
              
      //         // Verificar si la respuesta es exitosa
      //         if (!response.ok) {
      //             throw new Error('Error al obtener la descripción del Pokémon');
      //         }
              
      //         // Convertir la respuesta a JSON
      //         const data = await response.json();

      //         if (!data.flavor_text_entries) {
      //           throw new Error('La propiedad flavor_text_entries no está presente en los datos');
      //       }

      //         // Encontrar la descripción del Pokémon en los datos
      //         const descripcion = data.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;

      //         return descripcion;
      //     } catch (error) {
      //         console.error('Error al obtener la descripción del Pokémon:', error);
      //         return ''; // Devolver una cadena vacía en caso de error
      //     }
      // }

      // Uso de la función para obtener los datos del Pokémon por su nombre
      obtenerDatosPokemonPorNombre(nombrePokemon)
          .then(data => {
              console.log('Datos del Pokémon:', data);
              // Insertar los datos del Pokémon en los elementos HTML correspondientes
              document.getElementById('nombrePokemon').textContent = data.nombre;
              document.getElementById('numeroPokemon').textContent = `#${data.numero}`;
              document.getElementById('imagenPokemon').src = data.imagen;
              document.getElementById('descripcionPokemon').textContent = obtenerDescripcionPokemon(data.nombre);

              // Insertar las estadísticas del Pokémon
              const statsPokemon = document.getElementById('statsPokemon');
              statsPokemon.innerHTML = ''; // Limpiar el contenido existente
              data.stats.forEach(stat => {
                  const statElement = document.createElement('div');
                  statElement.classList.add('list');
                  statElement.innerHTML = `<span class="name">${stat.nombre}</span><span class="value">${stat.valor}</span>`;
                  statsPokemon.appendChild(statElement);
              });

              // Insertar los tipos y debilidades del Pokémon
              const tipoPokemon = document.getElementById('tipoPokemon');
              tipoPokemon.innerHTML = ''; // Limpiar el contenido existente
              data.tipos.forEach(tipo => {
                  const tipoElement = document.createElement('ul');
                  tipoElement.classList.add('hypa');
                  tipoElement.innerHTML = `<li>${tipo}</li>`;
                  tipoPokemon.appendChild(tipoElement);
              });
          })
          .catch(error => {
              console.error('Error:', error);
              // Manejar el error
          });
  });
});
