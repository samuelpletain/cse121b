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
  if (team.length === 6) {
    team.splice(0, team.length);
  }
  while (team.length < 6) {
    const randomPokemon =
      pokemonsList[Math.floor(Math.random() * pokemonsList.length)];
    if (!usedNumbers.includes(randomPokemon.id)) {
      addToTeam(randomPokemon);
      usedNumbers.push(randomPokemon.id);
    }
  }
});

const teamInfoButton = document.getElementById('team_info');
const teamModal = document.getElementById('teamModal');

teamInfoButton.addEventListener('click', () => {
  const typeCounts = team
    .flatMap((pokemon) => pokemon.types.map((type) => type.type.name))
    .reduce(
      (counts, type) => counts.set(type, (counts.get(type) || 0) + 1),
      new Map()
    );

  const typeCountsStr = Array.from(typeCounts)
    .map(
      ([type, count]) =>
        `<li>${count}x <span class="text-xs text-white px-2 py-1 rounded ${addTypeColor(
          capitalize(type)
        )}">${capitalize(type)}</span></li>`
    )
    .join(' ');

  const cumulativeHeight = team.reduce(
    (total, pokemon) => total + pokemon.height,
    0
  );
  const cumulativeWeight = team.reduce(
    (total, pokemon) => total + pokemon.weight,
    0
  );

  // Convert from decimeters to meters
  const heightInMeters = cumulativeHeight / 10;
  // Convert from hectograms to kilograms
  const weightInKilograms = cumulativeWeight / 10;

  teamModal.innerHTML = `
    <div class="bg-white p-6 rounded shadow-lg max-w-md mx-auto text-center">
      <h2 class="text-2xl font-bold text-gray-700">Team Information</h2>
      <p>You team is composed of the following types:</p>
      <ul class="pb-2">${typeCountsStr}</ul>
      <p class="pb-1">Team Cumulative Weight: ${weightInKilograms} kg</p>
      <p>Team Cumulative Height: ${heightInMeters} m</p>
    </div>
  `;

  teamModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

teamModal.addEventListener('click', (event) => {
  if (event.target === teamModal) {
    teamModal.classList.add('hidden');
    document.body.style.overflow = '';
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

const addTypeColor = (type, element = null) => {
  let color = '';
  switch (type) {
    case 'Normal':
      color = 'A8A77A';
      break;
    case 'Fire':
      color = 'EE8130';
      break;
    case 'Water':
      color = '6390F0';
      break;
    case 'Electric':
      color = 'F7D02C';
      break;
    case 'Grass':
      color = '7AC74C';
      break;
    case 'Ice':
      color = '96D9D6';
      break;
    case 'Fighting':
      color = 'C22E28';
      break;
    case 'Poison':
      color = 'A33EA1';
      break;
    case 'Ground':
      color = 'E2BF65';
      break;
    case 'Flying':
      color = 'A98FF3';
      break;
    case 'Psychic':
      color = 'F95587';
      break;
    case 'Bug':
      color = 'A6B91A';
      break;
    case 'Rock':
      color = 'B6A136';
      break;
    case 'Ghost':
      color = '735797';
      break;
    case 'Dragon':
      color = '6F35FC';
      break;
    case 'Dark':
      color = '705746';
      break;
    case 'Steel':
      color = 'B7B7CE';
      break;
    case 'Fairy':
      color = 'D685AD';
      break;
    default:
      color = 'A8A77A';
  }

  if (element) {
    element.classList.add(`bg-[#${color}]`);
  } else {
    return `bg-[#${color}]`;
  }
};

const formatPokemonName = (name) => {
  let formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  // Nidoran has a special case
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
      'flex flex-col items-center justify-center w-40 border border-gray-300 rounded-lg p-2 transform hover:scale-105 transition duration-200 cursor-pointer bg-white';

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
      addTypeColor(capitalize(type.type.name), typeElement);
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
      'flex flex-col items-center justify-center w-40 h-44 border border-gray-300 rounded-lg p-2 transform hover:scale-105 transition duration-200 cursor-pointer bg-white';
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
      addTypeColor(capitalize(type.type.name), typeElement);
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
  if (team.length > 0) {
    teamInfoButton.disabled = false;
    teamInfoButton.classList.remove('bg-gray-300');
    teamInfoButton.classList.add('bg-green-500');
    teamInfoButton.classList.add('hover:bg-green-700');
  } else {
    teamInfoButton.disabled = true;
    teamInfoButton.classList.remove('bg-green-500');
    teamInfoButton.classList.remove('hover:bg-green-700');
    teamInfoButton.classList.add('bg-gray-300');
  }
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
