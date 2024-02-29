/* LESSON 3 - Programming Tasks */

/* Profile Object  */
const myProfile = {
  name: "Samuel Pletain",
  photo: "images/samuel-pletain.jpeg",
  favoriteFoods: ['Sushi', 'Pasta', 'Burgers'],
  hobbies: ['Reading', 'Board Games', 'Coding'],
  placesLived: []
};

myProfile.placesLived.push({
  place: 'Nice',
  length: '23 years'
});
myProfile.placesLived.push({
  place: 'Paris',
  length: '2 years'
});
myProfile.placesLived.push({
  place: 'St Quentin',
  length: '1 years'
});
myProfile.placesLived.push({
  place: 'Torcy',
  length: '7 years'
});
myProfile.placesLived.push({
  place: 'Midvale',
  length: '4 years'
});

const nameElement = document.getElementById('name');
nameElement.innerHTML = `<strong>${myProfile.name}</strong>`;

const imageElement = document.getElementById('photo');
imageElement.setAttribute('src', myProfile.photo);
imageElement.setAttribute('alt', `Profile picture of ${myProfile.name}`);

const foodElement = document.getElementById('favorite-foods');
myProfile.favoriteFoods.forEach(food => {
  const listItemElement = document.createElement('li');
  listItemElement.innerHTML = food;
  foodElement.appendChild(listItemElement);
});

const hobbiesElement = document.getElementById('hobbies');
myProfile.hobbies.forEach(hobby => {
  const listItemElement = document.createElement('li');
  listItemElement.innerHTML = hobby;
  hobbiesElement.appendChild(listItemElement);
});

const placesElement = document.getElementById('places-lived');
myProfile.placesLived.forEach(place => {
  const dtElement = document.createElement('dt');
  dtElement.innerHTML = place.place;
  placesElement.appendChild(dtElement);

  const ddElement = document.createElement('dd');
  ddElement.innerHTML = place.length;
  placesElement.appendChild(ddElement);
});

/* Populate Profile Object with placesLive objects */




/* DOM Manipulation - Output */

/* Name */

/* Photo with attributes */


/* Favorite Foods List*/


/* Hobbies List */


/* Places Lived DataList */


