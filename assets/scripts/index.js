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

  event.preventDefault();

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

  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

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

const onCreateBook = function (event) {
  event.preventDefault();

  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

  libraryApi.create(event.target)
    .done(ui.onSuccess)
    .fail(ui.onError);
};

const onDeleteBook = function (event) {
  event.preventDefault();

  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

  let bookId = $('#book-delete-id').val();
  libraryApi.destroy(bookId)
    .done(ui.onDelete)
    .fail(ui.onError);
};

const onUpdateBook = function (event) {
  event.preventDefault();

  $('#output-title').hide();
  $('#result-table').hide();
  $('#output-text').hide();

  libraryApi.update(event.target)
    .done(ui.onPatch)
    .fail(ui.onError);
};

// On document ready
$(() => {
  $('#book-request').on('submit', onGetBooks);
  $('#book-create').on('submit', onCreateBook);
  $('#book-delete').on('submit', onDeleteBook);
  $('#book-update').on('submit', onUpdateBook);
});
