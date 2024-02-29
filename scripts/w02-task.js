/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = 'Samuel Pletain';
const currentYear = new Date().getFullYear();
const profilePicture = 'images/samuel-pletain.jpeg';

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
const imageElement = document.querySelector('#home picture img');

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
currentYear.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile picture of ${fullName}`);

/* Step 5 - Array */
const favoriteFoods = ['Sushi', 'Pasta', 'Burgers'];
foodElement.innerHTML = favoriteFoods;
const singleFavoriteFood = 'Crepes';
favoriteFoods.push(singleFavoriteFood);
foodElement.innerHTML = foodElement.innerHTML + `<br>${favoriteFoods}`;
favoriteFoods.shift();
foodElement.innerHTML = foodElement.innerHTML + `<br>${favoriteFoods}`;
favoriteFoods.pop();
foodElement.innerHTML = foodElement.innerHTML + `<br>${favoriteFoods}`;
