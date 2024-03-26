// Save to Local Storage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get from Local Storage
const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const pokemonsContainer = document.getElementById('pokemons');
let pokemonsList = [];
const team = [];
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  team.splice(0, team.length);
  displayTeam();
});

const randomizeButton = document.getElementById('randomize');
randomizeButton.addEventListener('click', () => {
  const usedNumbers = [];
  if (team.length < 6) {
    while (team.length < 6) {
      const randomPokemon =
        pokemonsList[Math.floor(Math.random() * pokemonsList.length)];
      if (!usedNumbers.includes(randomPokemon.id)) {
        addToTeam(randomPokemon);
        usedNumbers.push(randomPokemon.id);
      }
    }
  } else {
    alert('You already have a team!');
  }
});

const typeFilter = document.getElementById('type');
typeFilter.addEventListener('change', (e) => {
  const selectedType = e.target.value;
  if (selectedType === 'all') {
    displayPokemons(pokemonsList);
  } else {
    const filteredPokemons = pokemonsList.filter((pokemon) =>
      pokemon.types.some(
        (type) => type.type.name === selectedType.toLowerCase()
      )
    );
    displayPokemons(filteredPokemons);
  }
});

const addTypeColor = (element, type) => {
  const typesColorMap = {
    Normal: 'A8A77A',
    Fire: 'EE8130',
    Water: '6390F0',
    Electric: 'F7D02C',
    Grass: '7AC74C',
    Ice: '96D9D6',
    Fighting: 'C22E28',
    Poison: 'A33EA1',
    Ground: 'E2BF65',
    Flying: 'A98FF3',
    Psychic: 'F95587',
    Bug: 'A6B91A',
    Rock: 'B6A136',
    Ghost: '735797',
    Dragon: '6F35FC',
    Dark: '705746',
    Steel: 'B7B7CE',
    Fairy: 'D685AD',
  };

  element.classList.add(`bg-[#${typesColorMap[type]}]`);
};

const formatPokemonName = (name) => {
  let formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  if (formattedName.includes('n-')) {
    formattedName = formattedName.replace('-', ' ');
    formattedName = formattedName.includes('f')
      ? formattedName.replace('f', '♀')
      : formattedName.replace('m', '♂');
  }
  return formattedName;
};

const displayPokemons = (pokemons) => {
  console.log(pokemons.length);
  pokemonsContainer.innerHTML = '';
  pokemons.forEach((pokemon) => {
    const pokemonItem = document.createElement('div');
    pokemonItem.classList =
      'flex flex-col items-center justify-center w-40 border border-gray-300 rounded-lg p-2 transform hover:scale-105 transition duration-200 cursor-pointer';

    const name = formatPokemonName(pokemon.name);
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = `Picture of ${name}`;
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = name;
    pokemonName.classList =
      'text-lg font-semibold text-left text-blue-400 mb-2';
    const pokemonTypes = document.createElement('div');
    pokemonTypes.classList = 'flex flex-wrap justify-center gap-1';
    pokemon.types.forEach((type) => {
      const typeElement = document.createElement('div');
      typeElement.classList = 'text-xs text-white px-2 py-1 rounded';
      addTypeColor(typeElement, capitalize(type.type.name));
      typeElement.textContent = capitalize(type.type.name);
      pokemonTypes.appendChild(typeElement);
    });

    pokemonItem.addEventListener('mouseover', () => {
      pokemonName.classList.remove('text-blue-400');
      pokemonName.classList.add('text-blue-600');
    });

    pokemonItem.addEventListener('mouseout', () => {
      pokemonName.classList.remove('text-blue-600');
      pokemonName.classList.add('text-blue-400');
    });

    pokemonItem.appendChild(pokemonImage);
    pokemonItem.appendChild(pokemonName);
    pokemonItem.appendChild(pokemonTypes);
    pokemonItem.addEventListener('click', () => {
      addToTeam(pokemon);
    });
    pokemonsContainer.appendChild(pokemonItem);
  });
};

const displayTeam = () => {
  const teamContainer = document.getElementById('team');
  teamContainer.innerHTML = '';
  team.forEach((pokemon) => {
    const pokemonItem = document.createElement('div');
    pokemonItem.classList =
      'flex flex-col items-center justify-center w-40 border border-gray-300 rounded-lg p-2 transform hover:scale-105 transition duration-200 cursor-pointer';

    const name = formatPokemonName(pokemon.name);
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = `Picture of ${name}`;
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = name;
    pokemonName.classList =
      'text-lg font-semibold text-left text-blue-400 mb-2';
    const pokemonTypes = document.createElement('div');
    pokemonTypes.classList = 'flex flex-wrap justify-center gap-1';
    pokemon.types.forEach((type) => {
      const typeElement = document.createElement('div');
      typeElement.classList = 'text-xs text-white px-2 py-1 rounded';
      addTypeColor(typeElement, capitalize(type.type.name));
      typeElement.textContent = capitalize(type.type.name);
      pokemonTypes.appendChild(typeElement);
    });

    pokemonItem.addEventListener('mouseover', () => {
      pokemonName.classList.remove('text-blue-400');
      pokemonName.classList.add('text-blue-600');
    });

    pokemonItem.addEventListener('mouseout', () => {
      pokemonName.classList.remove('text-blue-600');
      pokemonName.classList.add('text-blue-400');
    });

    pokemonItem.appendChild(pokemonImage);
    pokemonItem.appendChild(pokemonName);
    pokemonItem.appendChild(pokemonTypes);
    pokemonItem.addEventListener('click', () => {
      removeFromTeam(pokemon);
    });
    teamContainer.appendChild(pokemonItem);
  });
  if (team.length < 6) {
    const target = 6 - team.length;
    let i = 0;
    while (i < target) {
      // Create an empty slot
      const emptySlot = document.createElement('div');
      emptySlot.classList =
        'flex flex-col items-center justify-center w-40 h-44 border border-dashed border-gray-300 rounded-lg p-2 transform hover:scale-105 transition duration-200 cursor-pointer';
      emptySlot.textContent = 'Empty Slot';
      emptySlot.addEventListener('click', () => {
        displayPokemons(pokemonsList);
      });
      teamContainer.appendChild(emptySlot);
      i++;
    }
  }
};

const getPokemonsData = async (type) => {
  // Limit to 151 Pokemons (first gen)
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  const pokemonPromises = data.results.map(async (pokemon) => {
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
    const pokemonData = await pokemonResponse.json();
    return pokemonData;
  });

  pokemonsList = await Promise.all(pokemonPromises);

  displayPokemons(pokemonsList);
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

getPokemonsData();
displayTeam();

const addToTeam = (pokemon) => {
  if (team.length < 6) {
    team.push(pokemon);
    displayTeam();
  }
};

const removeFromTeam = (pokemon) => {
  team.splice(team.indexOf(pokemon), 1);
  displayTeam();
};
