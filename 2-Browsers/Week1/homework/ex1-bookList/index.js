//cspell: disable
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-1-the-book-list

I'd like to display my three favorite books inside a nice webpage!

1. Iterate through the array of books.
2. For each book, create a `<p>`
element with the book title and author.
3. Use a `<ul>`  and `<li>` to display the books.
4. Add an `<img>` to each book that links to a URL of the book cover.
5. Change the style of the book depending on whether you have read it(green) or not(red).

The end result should look something like this:
https: //hyf-js2-week1-makeme-ex1-demo.herokuapp.com/

-----------------------------------------------------------------------------*/
//cspell: enable

function createBookList(books) {
  const ul = document.createElement('ul');
  ul.style.display = 'flex';
  ul.style.gap = '15px';
  const img1 = './assets/the_design_of_everyday_things.jpg';
  const img2 = './assets/the_most_human_human.jpg';
  const img3 = './assets/the_pragmatic_programmer.jpg';
  const arr = [img1, img2, img3];

  books.forEach((book, i) => {
    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.style.width = '400px';
    li.style.padding = '10px';
    book.alreadyRead
      ? (li.style.backgroundColor = 'green')
      : (li.style.backgroundColor = 'red');

    const p = document.createElement('p');
    const text = document.createTextNode(book.title + ' - ' + book.author);
    ul.appendChild(li);
    li.appendChild(p);
    p.appendChild(text);
    const img = document.createElement('img');
    img.style.width = '100%';
    img.src = arr[i];
    img.alt = 'book cover';
    li.appendChild(img);
  });

  return ul;
}

function main() {
  const myBooks = [
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      isbn: '978-0465050659',
      alreadyRead: false,
    },
    {
      title: 'The Most Human Human',
      author: 'Brian Christian',
      isbn: '978-1617933431',
      alreadyRead: true,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '978-0201616224',
      alreadyRead: true,
    },
  ];

  const ulElement = createBookList(myBooks);
  document.querySelector('#bookList').appendChild(ulElement);
}

window.addEventListener('load', main);
