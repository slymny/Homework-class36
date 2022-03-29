'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}

async function fetchAndPopulatePokemons(data) {
  const getButton = document.createElement('button');
  getButton.textContent = 'Get Pokemon!';
  getButton.type = 'submit';

  const select = document.createElement('select');
  const imageBox = document.createElement('div');
  imageBox.id = 'image-box';
  imageBox.style.height = '180px';
  document.body.append(getButton, select, imageBox);

  getButton.addEventListener('click', () => {
    getButton.className = 'button-clicked';
    data.forEach((pokemon) => {
      const option = document.createElement('option');
      option.textContent = pokemon.name;
      select.appendChild(option);
    });
  });
  select.addEventListener('change', fetchImage);
}

async function fetchImage(e) {
  const select = e.target;
  const image = document.querySelector('img');
  const imgUrl = await getPokemonImgUrl(select);
  const imageBox = document.querySelector('#image-box');
  if (!image) {
    const img = document.createElement('img');
    imageBox.appendChild(img);
    img.src = imgUrl;
    img.alt = select.value;
  } else {
    image.src = imgUrl;
    image.alt = select.value;
  }
}

async function getPokemonImgUrl(elem) {
  const response = await fetchData('https://pokeapi.co/api/v2/pokemon');
  const data = response.results;

  const urlOfPokemon = data.find((poke) => poke.name === elem.value).url;
  const thePokemon = await fetchData(urlOfPokemon);
  const source = await fetchData(thePokemon.forms[0].url);
  const imgUrl = source.sprites['front_default'];
  return imgUrl;
}

async function main() {
  try {
    const response = await fetchData('https://pokeapi.co/api/v2/pokemon');
    const result = response.results;
    await fetchAndPopulatePokemons(result);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

window.addEventListener('load', main);
