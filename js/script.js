document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
        eraseForm();
    });
    if(isStorageExist()){
        loadDataFromStorage();
    }
});
  
document.addEventListener("ondatasaved", () => {
    console.log("Buku berhasil disimpan.");
    booksLength();
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
    booksLength();
});

const booksLength = () => {
    const jumlahBuku = document.getElementById("jumlahBuku");
    jumlahBuku.innerText = books.length;
}

function eraseForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
}