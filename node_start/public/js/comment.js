const urlParams = location.pathname.split("/")
const id = urlParams[urlParams.length - 1]
const authorId = document.body.dataset.authorid


const comments_div = document.getElementById("comments")
const currentUserId = localStorage.getItem("user_id")

const textarea = document.getElementById("comment-text")
const addComment = document.getElementById("add-comment")



function getComments(){
    axios.get("/api/comments/"+ id).then(res =>{
        showComments(res.data)
    })
}

function showComments(comments){
    let commentsHTML = `<h2> ${comments.length} комментов </h2>`
    for(let i = 0; i < comments.length; i++){
        let = deleteButton = ``
        let = editButton = ``
        if(currentUserId == authorId || currentUserId == comments[i].user._id){
            deleteButton = `<span onclick="removeComment('${comments[i]._id}')"> Удалить </span>`
            
        }

        if(currentUserId == comments[i].user._id){
            editButton = `<span class="editBtn" onclick="editComment('${comments[i]._id}' , ${i} , '${comments[i].text}' , this)"> Редактировать </span>`
        }
        commentsHTML += `
        <div class="comment" id="comment-${comments[i]._id}">
            <div class="comment-header">
                <div> 
                    <img src="/images/avatar.png" alt="">
                    ${comments[i].user.full_name}
                </div>
                <div class = "detail-buttons">
                    ${deleteButton}
                    ${editButton}
                </div>
            </div>
            <p class="commentText">${comments[i].text}</p>
        </div>
        
        `
    }

    comments_div.innerHTML = commentsHTML
}

getComments()
addComment.onclick = function(){
    axios.post("/api/comments", {
        text:textarea.value,
        blog_id:id
    }).then(res=>{
        getComments()
        textarea.value = ""
    })
}


function removeComment(commentId){
    axios.delete("/api/comments/" +commentId).then(res=>{
        getComments()
    })
}

let commentText =  document.getElementsByClassName('commentText')
let editBtn = document.getElementsByClassName('editBtn')
function editComment(commentId , index , text , btn){
    commentText[index].outerHTML = `<input type="text" id="editText" value=${text}>`
    btn.outerHTML = `<span class="editBtn" onclick="saveEdittingComment('${commentId}')"> Сохранить </span>`
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
