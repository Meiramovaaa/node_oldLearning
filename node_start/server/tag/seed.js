const Tag = require("./Tag")
async function createTags(){
    const number =  await Tag.count().exec()
    const values = [
        "news", 
        "it",
        "job",
        "projects",
        "cv",
        "technologies",
        "sponsorship",
        "portfolio",
        "internship"
    ]
    if(number == 0){
        values.map(async value =>{
            await new Tag({name:value}).save()
        })
    }

}

module.exports = {
    createTags,
}