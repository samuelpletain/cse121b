/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2){
  return number1 + number2;
}

function addNumbers(){
  const number1 = Number(document.getElementById('add1').value);
  const number2 = Number(document.getElementById('add2').value);
  document.getElementById('sum').value = add(number1, number2);
}

const addNumbersButton = document.getElementById('addNumbers');
addNumbersButton.addEventListener('click', addNumbers);

/* Function Expression - Subtract Numbers */
const subtract = function(number1, number2){
  return number1 - number2;
}

const subtractNumbers = function(){
  const number1 = Number(document.getElementById('subtract1').value);
  const number2 = Number(document.getElementById('subtract2').value);
  document.getElementById('difference').value = subtract(number1, number2);
}

const subtractNumbersButton = document.getElementById('subtractNumbers');
subtractNumbersButton.addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;

const multiplyNumbers = () => {
  const number1 = Number(document.getElementById('factor1').value);
  const number2 = Number(document.getElementById('factor2').value);
  document.getElementById('product').value = multiply(number1, number2);
}

const multiplyNumbersButton = document.getElementById('multiplyNumbers');
multiplyNumbersButton.addEventListener('click', multiplyNumbers);

/* Open Function Use - Divide Numbers */
const divide = (number1, number2) => number1 / number2;

const divideNumbers = () => {
  const number1 = Number(document.getElementById('dividend').value);
  const number2 = Number(document.getElementById('divisor').value);
  document.getElementById('quotient').value = divide(number1, number2);
}

const divideNumbersButton = document.getElementById('divideNumbers');
divideNumbersButton.addEventListener('click', divideNumbers);

/* Decision Structure */
function getTotalDue(){
  const subtotal = Number(document.getElementById('subtotal').value);
  const member = document.getElementById('member').checked;
  
  const discount = member ? subtotal * .8 : subtotal;
  
  const span = document.getElementById('total');
  span.textContent = `$ ${discount.toFixed(2)}`;
}

const getTotalDueButton = document.getElementById('getTotal');
getTotalDueButton.addEventListener('click', getTotalDue);

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const arraySpan = document.getElementById('array');
arraySpan.textContent = numbersArray;

/* Output Odds Only Array */
const oddsArray = numbersArray.filter(number => number % 2 !== 0);
const oddsSpan = document.getElementById('odds');
oddsSpan.textContent = oddsArray;

/* Output Evens Only Array */
const evensArray = numbersArray.filter(number => number % 2 === 0);
const evensSpan = document.getElementById('evens');
evensSpan.textContent = evensArray;

/* Output Sum of Org. Array */
const sum = numbersArray.reduce((total, number) => total + number, 0);
const sumSpan = document.getElementById('sumOfArray');
sumSpan.textContent = sum;

/* Output Multiplied by 2 Array */
const multipliedArray = numbersArray.map(number => number * 2);
const multipliedSpan = document.getElementById('multiplied');
multipliedSpan.textContent = multipliedArray;

/* Output Sum of Multiplied by 2 Array */
const multipliedSum = multipliedArray.reduce((total, number) => total + number, 0);
const multipliedSumSpan = document.getElementById('sumOfMultiplied');
multipliedSumSpan.textContent = multipliedSum;
