'use strict';

const api = require('./api');
const ui = require('./ui');

const getFormFields = require('../../../lib/get-form-fields');

// get in the habit of naming your handlers, it eases debugging.
//
// also, follow a convention for handlers. here, I name my handler
// beginning with 'on' to denote that it is done when the GET /books
// button is clicked
const onGetBooks = function (event) {
  event.preventDefault();
  console.log("Event target in get books is " + event.target.toString());
  let bookId = $(event.target).find('[name="book[id]"]').val();

  let data = getFormFields(event.target);

  if (data.book.id.length === 0) {
    api.index()
      .done(ui.onSuccess)
      .fail(ui.onError);
  } else {
    api.show(data)
      .done(ui.onSuccess)
      .fail(ui.onError);
  }
};

const onCreateBook = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target)

  api.create(data)
    .done(ui.onSuccess)
    .fail(ui.onError);
};

const onDeleteBook = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  api.destroy(data)
    .done(ui.onDelete)
    .fail(ui.onError);
};

const onUpdateBook = function(event){
  event.preventDefault();

  let data = getFormFields(event.target);

  api.update(data)
    .done()
    .fail();
};

module.exports = {
  onGetBooks,
  onCreateBook,
  onDeleteBook,
  onUpdateBook,
};
