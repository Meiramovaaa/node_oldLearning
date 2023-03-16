
function onSubmit(form, e){
    // стандартные события обновления формы убирает
    e.preventDefault()


    let sendData = new FormData()

    sendData.append("_id", form.elements.id.value)
    sendData.append("title", form.elements.title.value)
    sendData.append("description", form.elements.description.value)
    sendData.append("image", form.elements.image.files[0])
    sendData.append("cost", form.elements.cost.value)
    sendData.append("category", form.elements.category.value)
    

    axios(
        {
            url: "/api/books/" + form.elements.id.value,
            method: "PUT",
            headers:{
                "Content-type": "multipart/form-data"
            },
            data: sendData
        }).then(res=>{
        location.replace("/detail/"+form.elements.id.value)
    })
    
}