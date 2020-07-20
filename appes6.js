// Book Class
class Book{
 constructor(title,author,isbn){
  this.title =title;
  this.isbn =isbn;
  this.author = author;
 }
}

// UI Class
class UI{
  // Add Book To List
  addBookToList(book){
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
  clearFields(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
  }

  // showAlert
  showAlert(message,cl){
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
  deleteBook(target){
    if(target.classList.contains('delete')){
      target.parentElement.parentElement.remove();
      // book Deletion Message
      this.showAlert('Book Deleted','success');
    }
  }
}

// Store Class
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
      books =[];
    }
    else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBooks(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static removeBooks(isbn){
    const books = Store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn===isbn){
        books.splice(index,1);
      }
    })
    localStorage.setItem('books',JSON.stringify(books));
  }
}


// Event Listener For DOM 
document.addEventListener('DOMContentLoaded',function(){
  Store.displayBooks();
})

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

    //Add Book To Local Storage
    Store.addBooks(book);

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
  
  // Delete Book From Local Storage
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

   e.preventDefault();
})