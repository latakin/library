const myLibrary = [];
const page = document.querySelector('.books');
const addBook = document.querySelector('#addBook');
const submitForm = document.querySelector('#submitForm');
const cancelForm = document.querySelector('#cancelForm');
const dialog = document.querySelector('dialog');
const bookForm = document.querySelector('#bookForm');

addBook.addEventListener('click', ()=> dialog.showModal() )
cancelForm.addEventListener('click', ()=> {
     dialog.close()
    } )

submitForm.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(bookForm);
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let haveread = formData.get('haveRead');
    haveread.toLowerCase();

    const newBook = new Books(title, author, pages, haveread);
    console.log(newBook)
    addBooks(newBook);
    updatePage();
    console.log(myLibrary)
    dialog.close();    


})

function Books(title, author, pages, haveRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Books.prototype.delet = function () {
    myLibrary.splice(this.id, 1);
    console.log(myLibrary);
    updatePage();
}

Books.prototype.read = function () {
    if (this.haveRead === "yes") {
        this.haveRead = "no";
        
    } else {
         this.haveRead = 'yes';
    }
    updatePage();
}


function addBooks(bookName) {
    myLibrary.push(bookName);
    
}

function updatePage() {
    page.innerHTML = "";
     myLibrary.forEach(function (book) {
            const bookCard = document.createElement('div');
            

            const removeBook = document.createElement('button');
            removeBook.textContent = 'Delete Book'
            removeBook.setAttribute('class', 'butt');
            removeBook.addEventListener('click', () => book.delet() )

            const toggleRead = document.createElement('button');
            toggleRead.textContent = 'Change Read Status';
            toggleRead.setAttribute('class', 'butt');
            toggleRead.addEventListener('click', () => book.read())

             bookCard.innerHTML = `
                                <p>Title: ${book.title}</p>
                                <p>Author: ${book.author}</p>
                                <p>No of Pages: ${book.pages}</p> 
                                <p> Have you Read it: ${book.haveRead}                       
            `

            bookCard.setAttribute('class', 'bookcard');
            bookCard.appendChild(removeBook);
            bookCard.appendChild(toggleRead);
           
           
            page.appendChild(bookCard);
        }
         
        )
       
}
const atomic = new Books('Atomic Habits', 'James Clear', 500, "no");
const rich = new Books('Rich Dad', 'Robert Kiyosaki', 400, "no");
addBooks(atomic);
addBooks(rich);
updatePage();
console.log(myLibrary)
    
