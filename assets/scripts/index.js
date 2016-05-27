'use strict';

const libraryApi = require('./library-api');
const ui = require('./ui');

$('#output-title').hide();
$('#result-table').hide();
$('#output-text').hide();

// get in the habit of naming your handlers, it eases debugging.
//
// also, follow a convention for handlers. here, I name my handler
// beginning with 'on' to denote that it is done when the GET /books
// button is clicked

const onGetBooks = function (event) {

  // prevent default if this is a true get submission
  if(event.book === undefined){
    event.preventDefault();
  }

  // get value of book id that the user wants to see
  let bookId = $('#book-id').val();

  if (bookId.length === 0) {
    libraryApi.index()
      .done(ui.onSuccess)
      .fail(ui.onError);
  } else {
    libraryApi.show(bookId)
      .done(ui.onSuccess)
      .fail(ui.onError);
  }
};

// creates book
const onCreateBook = function (event) {

  // prevent default if this is a true get submission
  if(event.book === undefined){
    event.preventDefault();
  }

  libraryApi.create(event.target)
    .done(ui.onSuccess)
    .done(onGetBooks(event))
    .fail(ui.onError);
};

// deletes book
const onDeleteBook = function (event) {

  // prevent default if this is a true get submission
  if(event.book === undefined){
    event.preventDefault();
  }

  let bookId = $('#book-delete-id').val();
  libraryApi.destroy(bookId)
    .done(ui.onDelete)
    .done(onGetBooks(event))
    .fail(ui.onError);
};

// updates book
const onUpdateBook = function (event) {

  // prevent default if this is a true get submission
  if(event.book === undefined){
    event.preventDefault();
  }

  libraryApi.update(event.target)
    .done(ui.onPatch)
    .done(onGetBooks(event))
    .fail(ui.onError);
};

// On document ready
$(() => {
  $('#book-request').on('submit', onGetBooks);
  $('#book-create').on('submit', onCreateBook);
  $('#book-delete').on('submit', onDeleteBook);
  $('#book-update').on('submit', onUpdateBook);
});
