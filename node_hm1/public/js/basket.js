const div_basket = document.getElementById("basket_section")
const basket_res = document.querySelector(".basket-res")

function getBlogs(){
    axios.get(`/api/basket`).then(res=>{
        showBasket(res.data)
        console.log(res.data)
    })
}
getBlogs()
function deleteBookFromBasket(id){
    axios.delete(`/api/basket/${id}`).then(res =>{
        getBlogs()
    })

    location.replace("/basket")
}

function showBasket(books){
    let divHTML = ``
    let divCost
    
    let sum = 0
    for(let i = 0; i < books.length; i++){
        
        divHTML += `
        <div class="detail">
            <div class="basket-info">
                <h1>${books[i].book.title}</h1>
                <p class="basket-cost">${books[i].book.cost} $ </p>
            </div>
            <img  src="${books[i].book.img}" alt="">
            <p> ${books[i].book.description} </p>
            <fieldset class="fieldset">
                <button class="button" onclick="deleteBookFromBasket('${books[i]._id}')">Delete from basket</button>
            </fieldset>
                  
        </div>
        
        `
        sum += +(books[i].book.cost)
    }
    
    divCost =`
        <h3>Total price: ${sum} $</h3>
        <form action="/api/buy" method="POST">
            <input type="hidden" name="cost" value="${sum}">
            <fieldset class="fieldset">
                <a href="/buy"><button class="button" type="submit">Сheckout</button></a> 
            </fieldset>
        </form>
    `
    if(books.length == 0){
        divHTML = `<h1 class="detail basket-res">0 in basket</h1>`
        divCost = ``
    }
    basket_res.innerHTML = divCost
    div_basket.innerHTML = divHTML
}