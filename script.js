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
    let formData = new FormData(bookForm);
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let haveread = formData.get('haveRead');
    haveread.toLowerCase();
    
    
    if(bookForm.checkValidity()) {
    
         const newBook = new Book(title, author, pages, haveread);
        console.log(newBook)
        addBooks(newBook);
        updatePage();
        bookForm.reset();
        console.log(myLibrary)
        dialog.close();   
     
    
    } else {
        bookForm.reportValidity();
    }
    


})

class Book {
    constructor(title, author, pages, haveRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }

    delet() {
        const index = myLibrary.findIndex(book => book.id === this.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            console.log(myLibrary);
            updatePage();
        }
    
    }

    read() {
        if (this.haveRead === "yes") {
            this.haveRead = "no";
        
        } else {
            this.haveRead = 'yes';
        }
        updatePage();
}
    
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
const atomic = new Book('Atomic Habits', 'James Clear', 500, "no");
const rich = new Book('Rich Dad', 'Robert Kiyosaki', 400, "no");
addBooks(atomic);
addBooks(rich);
updatePage();
console.log(myLibrary)
    
