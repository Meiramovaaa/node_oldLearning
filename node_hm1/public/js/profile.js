const book_div = document.querySelector(".book-list")
// console.log(currentUser);

function deleteBook(id){
    axios.delete(`/api/books/${id}`).then(res =>{
        getBlogs()
    })
    
    location.replace("/index")
}

function getBlogs(){
    axios.get(`/api/books`).then(res=>{
        showBlogs(res.data)
        console.log(res.data)
    })
}

function showBlogs(books){
    let booksHTML = ``
 
    for(let i = 0; i < books.length; i++){
        
        booksHTML += `
        <a class="books" href="/detail/${books[i]._id}">
            <img class="img-cost" src="${books[i].img}" alt="">
            <div class="book-cost">
                <p>${books[i]["title"]}</p>
            </div>
                        
        </a>
        `
    }
    book_div.innerHTML = booksHTML

    if(books.length == 0){
        book_div.innerHTML = `<h2> 0 books </h2>`
    }
}