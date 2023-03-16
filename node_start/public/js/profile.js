const blogs_div = document.querySelector(".blogs")
let profile_nickname = location.pathname.split("/")
profile_nickname = profile_nickname[profile_nickname.length - 1]
function deleteBlog(id){
    axios.delete(`/api/blogs/${id}`).then(res =>{
        getBlogs()
    })
}

function getBlogs(){
    axios.get(`/api/blogs/profile/`+profile_nickname).then(res=>{
        showBlogs(res.data)
        console.log(res.data)
    })
}

function showBlogs(blogs){
    let blogsHTML = ""
 
    for(let i = 0; i < blogs.length; i++){
        let dropdown = ""
        // if(currentUserId == blogs[i].author_id){
            dropdown = `<span class="link">
            <img src="/images/dots.svg" alt="">
                Еще
            <ul class="dropdown">
                <li> <a href="/editblog?id=${blogs[i]._id}">Редактировать</a> </li>
                <li><a  onclick="deleteBlog('${blogs[i]._id}')" class="danger">Удалить</a></li>
            </ul>
        </span>`
        // }
        blogsHTML += `
        <div class="blog-item">
            <img class="blog-item--img" src="${blogs[i].img}" alt="">
            <div class="blog-header">
                <h3>${blogs[i].title}</h3>
                ${dropdown}

        </div>
        <p class="blog-desc">
        ${blogs[i].description}
        </p>

        <div class="blog-info">
            <span class="link">
                <img src="/images/date.svg" alt="">
                ${blogs[i].date}
            
            </span>
            <span class="link">
                <img src="/images/visibility.svg" alt="">
                21
            </span>
            <a class="link">
                <img src="/images/message.svg" alt="">
                4
            </a>
            <span class="link">
                <img src="/images/forums.svg" alt="">
                ${blogs[i].name}
            </span>
            <a class="link">
                <img src="/images/person.svg" alt="">
                ${profile_nickname}
            </a>
        </div>
    </div>
        `
    }
    blogs_div.innerHTML = blogsHTML

    if(blogs.length == 0){
        blogs_div.innerHTML = `<h2> 0 blogs </h2>`
    }
}
