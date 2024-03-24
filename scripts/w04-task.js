/* LESSON 3 - Programming Tasks */

/* Profile Object  */
const myProfile = {
  name: 'Samuel Pletain',
  photo: 'images/samuel-pletain.jpeg',
  favoriteFoods: ['Sushi', 'Pasta', 'Burgers'],
  hobbies: ['Reading', 'Board Games', 'Coding'],
  placesLived: [],
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
  {
    place: 'Nice',
    length: '23 years',
  },
  {
    place: 'Paris',
    length: '2 years',
  },
  {
    place: 'St Quentin',
    length: '1 years',
  },
  {
    place: 'Torcy',
    length: '7 years',
  },
  {
    place: 'Midvale',
    length: '4 years',
  }
);

/* DOM Manipulation - Output */

/* Name */
const nameElement = document.getElementById('name');
nameElement.innerHTML = `<strong>${myProfile.name}</strong>`;

/* Photo with attributes */
const imageElement = document.getElementById('photo');
imageElement.setAttribute('src', myProfile.photo);
imageElement.setAttribute('alt', `Profile picture of ${myProfile.name}`);

/* Favorite Foods List*/
const foodElement = document.getElementById('favorite-foods');
myProfile.favoriteFoods.forEach((food) => {
  const listItemElement = document.createElement('li');
  listItemElement.innerHTML = food;
  foodElement.appendChild(listItemElement);
});

/* Hobbies List */
const hobbiesElement = document.getElementById('hobbies');
myProfile.hobbies.forEach((hobby) => {
  const listItemElement = document.createElement('li');
  listItemElement.innerHTML = hobby;
  hobbiesElement.appendChild(listItemElement);
});

/* Places Lived DataList */
const placesElement = document.getElementById('places-lived');
myProfile.placesLived.forEach((place) => {
  const dtElement = document.createElement('dt');
  dtElement.innerHTML = place.place;
  placesElement.appendChild(dtElement);

  const ddElement = document.createElement('dd');
  ddElement.innerHTML = place.length;
  placesElement.appendChild(ddElement);
});
