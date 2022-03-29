'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-1-programmer-fun

1. Complete the function `requestData()` using `fetch()` to make a request to 
   the url passed to it as an argument. The function should return a promise. 
   Make sure that the promise is rejected in case of HTTP or network errors.
2. Notice that the function `main()` calls `requestData()`, passing it the url 
   `https://xkcd.now.sh/?comic=latest`. Try and run the code in the browser and 
   open the browser's console to inspect the data returned from the request.
3. Next, complete the function `renderImage()` to render an image as an `<img>` 
   element appended to the document's body, using the data returned from the API.
4. Complete the function `renderError()` to render any errors as an `<h1>` 
   element appended to the document's body.
5. Refactor the `main()` function to use `async/await`.
6. Test error handling, for instance, by temporarily changing the `.sh` in the 
   url with `.shx`. There is no server at the modified url, therefore this 
   should result in a network (DNS) error.
------------------------------------------------------------------------------*/
async function requestData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}

function renderImage(data) {
  const image = document.createElement('img');
  image.src = data.img;
  image.alt = data.alt;
  document.body.appendChild(image);
}

function renderError(error) {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
  const errorMessage = document.createElement('h1');
  errorMessage.textContent = error;
  document.body.appendChild(errorMessage);
}

async function main() {
  try {
    const response = await requestData('https://xkcd.now.sh/?comic=latest');
    renderImage(response);
  } catch (error) {
    renderError(`Error: ${error.message}`);
  }
}

window.addEventListener('load', main);
