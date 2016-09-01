'use strict';

const events = require('./books/events');
// On document ready
$(() => {
  $('#book-request').on('submit', events.onGetBooks);
  $('#book-create').on('submit', events.onCreateBook);
  $('#book-delete').on('submit', events.onDeleteBook);
  $('#book-update').on('submit', events.onUpdateBook);
});
