'use strict';

// import
const libraryApi = require('./library-api');

// lets me redraw the table
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

// resets the fields (i don't think this is quite working yet)
const fieldReset = function(){
  $('#book-id').text('');
  $('#create-title').text('');
  $('#create-author').text('');
  $('#book-delete-id').text('');
  $('#update-id').text('');
  $('#update-title').text('');
  $('#update-author').text('');
  return true;
};

// the way to remove books from the server
const onDropBook = function (event) {
  event.preventDefault();

  // this_id is the BookId, not the index in the db
  let book_id = $(this).attr('id');
  console.log("book_id: ", book_id);
  libraryApi.destroy(book_id);

};

// writes out the table with a loop
const writeTable = function(data){

  // erases the old table, except for header row
  tableReset();

  // hides the table for now
  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

  // gets size of the table
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

  // console.log("book_array: ", books_array);

  // the loop to build the table
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

  // show table at the end
  $('#output-title').show();
  $('#result-table').show();
  $('#output-text').show();

};

// show results on success
const onSuccess = function (data) {

  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

  writeTable(data);

  if (data.book) {
    console.log(data.book);
  } else {
    console.table(data.books);
  }

  fieldReset();

  $('#output-title').show();
  $('#result-table').show();
  $('#output-text').show();

};

const onError = function (response) {
  console.error(response);
  fieldReset();
};

const onDelete = function () {
  //writeTable(data);
  console.log('Book was successfully deleted.');
  fieldReset();
};

const onPatch = function () {
  //writeTable(data);
  console.log('Book was successfully updated.');
  fieldReset();
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
