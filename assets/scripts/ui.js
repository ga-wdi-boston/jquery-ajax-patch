'use strict';

const libraryApi = require('./library-api');

const onDropBook = function (event) {
  event.preventDefault();

  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

  let this_id = $('event.target').attr('id');
  console.log(this_id);
  libraryApi.destroy(this_id);
  console.log(this_id + ' was destroyed!');

};

const writeTable = function(data){

  let books_array;
  let max;
  let dataCheck;
  dataCheck = data.books;

  if(dataCheck !== undefined){
    books_array = data.books;
    max = books_array.length;
  }else{
    books_array = data.book;
    max = 1;
  }

  for(let i = 0; i < max; i++){

    let book_id = JSON.stringify(books_array[i].id) || books_array.id;

    let newHTML = [
    '<tr>',
      '<td id="book-id-number-' + String(book_id) + '"></td>',
      '<td id="book-title-' + String(book_id) + '"></td>',
      '<td id="book-author-' + String(book_id) + '"></td>',
      '<td id="book-delete-' + String(book_id) + '">',
        '<form action="#" id="' + book_id + '" class="delete-button">',
          '<input type="Submit" value="Delete">',
        '</form>',
      '</td>',
    '</tr>',
    ].join('');

      $('#result-table').append(newHTML);

      // Attach event handler
      $("#" + book_id).on('click', onDropBook);

      if(data.books){
        $('#book-id-number-' + String(i)).text(JSON.stringify(books_array[i].id));
        $('#book-title-' + String(i)).text(JSON.stringify(books_array[i].title));
        $('#book-author-' + String(i)).text(JSON.stringify(books_array[i].author));
      }else{
        $('#book-id-number-' + String(i)).text(books_array.id);
        $('#book-title-' + String(i)).text(books_array.title);
        $('#book-author-' + String(i)).text(books_array.author);
      }
  }
};


// don't rely on console displays for real apps! we would normally manipulate
// the content on the page with a success function.
//
// for our application, we'd probably call it "displayBooks"
// or something similar.
const onSuccess = function (data) {
    writeTable(data);
  if (data.book) {
    console.log(data.book);
  } else {
    console.table(data.books);
  }

  $('#output-title').show();
  $('#result-table').show();
  $('#output-text').show();

};

const onError = function (response) {
  console.error(response);
};

const onDelete = function () {
  console.log('Book was successfully deleted.');
};

const onPatch = function (data) {
  writeTable(data);
  console.log('Book was successfully updated.');
};

module.exports = {
  onSuccess,
  onError,
  onDelete,
  onPatch,
  writeTable,
};
