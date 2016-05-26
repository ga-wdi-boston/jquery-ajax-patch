'use strict';

const libraryApi = require('./library-api');

const tableReset = function(){
  let basicHTMLTable = [
    '<table id=result-table class="table table-bordered">',
      '<tr>',
        '<th>ID</th>',
        '<th>Title</th>',
        '<th>Author</th>',
        '<th>Management</th>',
      '</tr>',
    '</table>',
  ].join('');
  $('#result-table').html(basicHTMLTable);
  return true;
};

const fieldReset = function(){
  // $("#book-request").val('');
  // $("#book-create").val('');
  // $("#book-delete").val('');
  // $("#book-update").val('');
  return true;
};

const onDropBook = function (event) {
  event.preventDefault();

  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

  // this_id should be BookId, not index
  let book_id = $(this).attr('id');
  console.log("book_id: ", book_id);
  libraryApi.destroy(book_id);

};

const writeTable = function(data){

  let books_array;
  let max;
  let dataCheck = data.books || data.book;

  if(dataCheck === data.books){
    books_array = data.books;
    max = books_array.length;
  }else{
    console.log('hi');
    books_array = data.book;
    max = 1;
  }

  console.log(books_array);

  for(let i = 0; i < max; i++){

    let book_id;
    if(max > 1){
      book_id = books_array[i].id;
    }else{
      book_id = books_array.id;
    }

    let newHTML = [
    '<tr>',
      '<td id="book-id-number-' + String(book_id) + '"></td>',
      '<td id="book-title-' + String(book_id) + '"></td>',
      '<td id="book-author-' + String(book_id) + '"></td>',
      '<td id="book-delete-' + String(book_id) + '">',
        '<form action="#" id="' + String(book_id) + '" class="delete-button">',
          '<input type="Submit" value="Delete">',
        '</form>',
      '</td>',
    '</tr>',
    ].join('');

    $('#result-table').append(newHTML);

    // Attach event handler
    $("#" + book_id).on('click', onDropBook);

    if(max > 1){
      $('#book-id-number-' + String(book_id)).text(books_array[i].id);
      $('#book-title-' + String(book_id)).text(books_array[i].title);
      $('#book-author-' + String(book_id)).text(books_array[i].author);
    }else{
      $('#book-id-number-' + String(book_id)).text(books_array.id);
      $('#book-title-' + String(book_id)).text(books_array.title);
      $('#book-author-' + String(book_id)).text(books_array.author);
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
  //writeTable(data);
  console.log('Book was successfully deleted.');
};

const onPatch = function () {
  //writeTable(data);
  console.log('Book was successfully updated.');
};

module.exports = {
  onSuccess,
  onError,
  onDelete,
  onPatch,
  writeTable,
  tableReset,
  fieldReset,
};
