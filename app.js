// Book Constructor
function Book(title,author,isbn){
  this.title =title;
  this.isbn =isbn;
  this.author = author;
}

// function UI
function UI(){

}

// Add Book to List
UI.prototype.addBookToList=function(book){
  const list = document.querySelector('#book-list');
  // Create a tr element
  const row = document.createElement('tr');
  row.innerHTML =`
      <th>${book.title}</th>
      <th>${book.author}</th>
      <th>${book.isbn}</th>
      <th><a href ='#'  class='delete'>X</a></th>
  `;
  list.appendChild(row);
}

// Clear UI fields
UI.prototype.clearFields = function(){
  document.querySelector('#title').value='';
  document.querySelector('#author').value='';
  document.querySelector('#isbn').value='';
}

// showAlert
UI.prototype.showAlert = function(message,cl){
  // get the UI vars
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // create alert
  const alert = document.createElement('div');
  alert.className = `alert ${cl}`;
  alert.appendChild(document.createTextNode(message));
  // Add it to UI before form
  container.insertBefore(alert,form);
  // Remove Alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);
}

// delete Book
UI.prototype.deleteBook = function(target){
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove();
    // book Deletion Message
    this.showAlert('Book Deleted','success');
  }
}
// Event Listeners
document.querySelector('#book-form').addEventListener('submit',function(e){
  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  
  // instantiate a book
  const book =new Book(title,author,isbn);
  
  // instantiate ui
  const ui = new UI();

  //Validate the book
  if(title===''||author===''||isbn===''){
    ui.showAlert('Please Check in the inputs','error');
  }
  else{
    // add book to the list
    ui.addBookToList(book);

    // Show Success Alert
    ui.showAlert('Book Added','success');

    //Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
})

// Event Listener for deleting books
document.querySelector('#book-list').addEventListener('click',function(e){
  const ui =new UI();
  // Delete Book
  ui.deleteBook(e.target);
   e.preventDefault();
})