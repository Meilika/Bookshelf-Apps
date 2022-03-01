const UNCOMPLETED_BOOK_ID = "books";
const COMPLETED_BOOK_ID = "completed-books";
const BOOK_ITEMID = "itemId";

function takeBook(data, author, year, isCompleted) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;
    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;
    const textYear = document.createElement("small");
    textYear.innerText = year;
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textYear);
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }
    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        hapus = window.confirm("Apa anda ingin menghapus buku ini?");
        if (hapus){
            removeBook(event.target.parentElement);
        }else{
            return;
        }
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
        addBookToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_BOOK_ID);
    const textTitle = document.getElementById("title").value;
    const authorName = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const book = takeBook(textTitle, authorName, year, false);
    const bookObject = composeBookObject(textTitle, authorName, year, false);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    uncompletedBOOKList.append(book);
    updateDataToStorage();
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > p").innerText;
    const taskYear = taskElement.querySelector(".inner > small").innerText;
    const newBook = takeBook(taskTitle, taskAuthor, taskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function removeBook(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > p").innerText;
    const taskYear = taskElement.querySelector(".inner > small").innerText;
    const newBook = takeBook(taskTitle, taskAuthor, taskYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
    listUncompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}
