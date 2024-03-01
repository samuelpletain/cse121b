/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');
const templeList = []

/* displayTemples Function */
const displayTemples = (temples) => {
  temples.forEach(temple => {
    const articleElement = document.createElement('article');

    const h3Element = document.createElement('h3');
    h3Element.textContent = temple.templeName;

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', temple.imageUrl);
    imageElement.setAttribute('alt', temple.location);

    articleElement.appendChild(h3Element);
    articleElement.appendChild(imageElement);

    templesElement.appendChild(articleElement);
  });
}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
  const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');
  await response.json().then(data => {
    data.forEach(temple => {
      templeList.push(temple);
    });
  });
  displayTemples(templeList);
}

/* reset Function */
const reset = () => {
  templesElement.innerHTML = '';
}

/* filterTemples Function */
const filterTemples = (temples) => {
  reset();
  const filter = document.getElementById('filtered').value;
  let filteredTemples = [];

  switch (filter) {
    case 'utah':
      filteredTemples = temples.filter(temple => {
        const test = temple.location
        return test.includes('Utah')
      });
      displayTemples(filteredTemples);
      break;
    case 'notutah':
      filteredTemples = temples.filter(temple => !temple.location.includes('Utah'));
      displayTemples(filteredTemples);
      break;
    case 'older':
      filteredTemples = temples.filter(temple => {
        const dedicatedDate = new Date(temple.dedicated);
        const compareDate = new Date(1950, 0, 1);
        return dedicatedDate < compareDate;
      });
      displayTemples(filteredTemples);
      break;
    case 'all':
      filteredTemples = temples;
      displayTemples(temples);
      break;
    case 'a-z':
      filteredTemples = [...temples];
      filteredTemples.sort((a, b) => {
        if (a.templeName < b.templeName) {
          return -1;
        }
        if (a.templeName > b.templeName) {
          return 1;
        }
        return 0;
      });
      displayTemples(filteredTemples);
      break;
    case 'z-a':
      filteredTemples = [...temples];
      filteredTemples.sort((a, b) => {
        if (a.templeName < b.templeName) {
          return 1;
        }
        if (a.templeName > b.templeName) {
          return -1;
        }
        return 0;
      });
      displayTemples(filteredTemples);
      break;
  }
}

getTemples();

/* Event Listener */
const dropDownElement = document.getElementById('filtered');
dropDownElement.addEventListener('change', () => {
  filterTemples(templeList);
});