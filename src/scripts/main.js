function main() {
  const baseUrl = 'https://books-api.dicoding.dev';

  const getBook = () => {
    //membuatt instance
    const xhr = new XMLHttpRequest();

    //membuat callback jika success dan error
    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);

      if (responseJSON.error) {
        showResponseMessage(responseJSON.message);
      } else {
        renderAllBooks(responseJSON.books);
      }
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    //membuat GET request
    xhr.open('GET', `${baseUrl}/list`);

    //mengirimkan request
    xhr.send();
  };



  const insertBook = (book) => {
    // membuat instance
    const xhr = new XMLHttpRequest();

    // callback jika success dan error
    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessage(responseJSON.message);
      getBook();
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    xhr.open('POST', `${baseUrl}/add`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    // mengirimkan dan menyisipkan JSON
    xhr.send(JSON.stringify(book));
  };

  const updateBook = (book) => {
    // membuat instance
    const xhr = new XMLHttpRequest();

    // callback untuk success dan error
    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessage(responseJSON.message);
      getBook();
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    // membuat PUT request
    xhr.open('PUT', `${baseUrl}/edit/${book.id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    xhr.send(JSON.stringify(book));
  };

  const removeBook = (bookId) => {
    // membuat instance
    const xhr = new XMLHttpRequest();

    // membuat callback jika success dan jika error
    xhr.onload = function () {
      const responseJSON = JSON.parse(this.responseText);
      showResponseMessage(responseJSON.message);
      getBook();
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    // membuat DELETE request
    xhr.open('DELETE', `${baseUrl}/delete/${bookId}`);

    xhr.setRequestHeader('X-Auth-Token', '12345');

    xhr.send();
  };






  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;

        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;