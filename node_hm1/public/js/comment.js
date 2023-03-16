const urlParams = location.pathname.split("/")
const id = urlParams[urlParams.length - 1]
const authorId = document.body.dataset.authorid;
const comments_div = document.getElementById("comments");
const textarea = document.getElementById("comment-text");
const addComment = document.getElementById("add-comment");
const currentUserId = localStorage.getItem("user_id");
const ratingStars = [...document.getElementsByClassName("rating__star")];

let star_cnt ;
let star_count;

function getComments(){
    axios.get("/api/comments/"+id).then(res=>{
        // console.log(res.data)
        showComments(res.data)
    })
}

function executeRating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    
    stars.map((star) => {
      star.onclick = () => {
        star_cnt = stars.indexOf(star);
        star_count = star_cnt
        if (star.className===starClassInactive) {
          for (star_cnt; star_cnt >= 0; --star_cnt) {
              stars[star_cnt].className = starClassActive;
          }
        } else {
          for (star_cnt; star_cnt < starsLength; ++star_cnt){
              stars[star_cnt].className = starClassInactive;
          } 
        }
      };
    });
}
executeRating(ratingStars);



function showComments(comments){
    let review = ``
    if(comments.length == 1) review = `отзыв`
    if(comments.length >=2 && comments.length <=4) review=`отзыва`
    if(comments.length >= 5 || comments.length==0) review = `отзывов`
    
    let commentHTML = `<h2> ${comments.length} ${review} </h2>`
    
    for(let i = 0; i < comments.length; i++){
        let delete_button = ``
        let edit_button = ``
        console.log();
        if(currentUserId == authorId || currentUserId == comments[i].author._id){
            delete_button = `<span onclick="removeComment('${comments[i]._id}')"> Delete </span>`
        }
        if(currentUserId == comments[i].author._id){
            edit_button = `<span class="edit-btn" onclick="editComment('${comments[i]._id}' , ${i} , '${comments[i].text}' , this)"> Edit </span>`
        }
        let star_div = ``
        
        for(let k = 0; k< comments[i].stars; k++){
            star_div += `<img class='star_img' src = "/images/star.svg">`
        }

        
        commentHTML +=`
        
        <div class="comment">
            
            <div class="comment-header">
                <div class="comment-info">
                    <img src="/images/avatar.svg" alt="">
                    ${comments[i].author.full_name}
                    
                    
                </div>
                <div>
                    ${star_div}
                    ${delete_button}
                    ${edit_button}
                </div>
            </div>
           
            <p class='commentText'>${comments[i].text}</p>
        </div>
        `
    }
    comments_div.innerHTML = commentHTML
} 

getComments()
addComment.onclick = function(){
    axios.post("/api/comments", {
        text:textarea.value,
        stars:star_count+1,
        book_id:id,
        author: authorId
    }).then(res=>{
        getComments()

        textarea.value = ""
    })
}

star_cnt = 0;

function removeComment(commentId){
    axios.delete("/api/comments/" + commentId).then(res=>{
        getComments()
    })
}
let commentText =  document.getElementsByClassName('commentText')
let editBtn = document.querySelector(".edit-btn")


function editComment(commentId, index, text, btn){
    commentText[index].outerHTML = `<input type="text" id="editText" value=${text}>`
    btn.outerHTML = `<span class="edit-btn" onclick="saveEdittingComment('${commentId}')"> Save </span>`
}

function saveEdittingComment(commentId){
    let editText = document.getElementById('editText').value;
    axios.put('/api/comments' , {
        text: editText,
        commentId: commentId
    }).then(res => {
        getComments();
    })
}



