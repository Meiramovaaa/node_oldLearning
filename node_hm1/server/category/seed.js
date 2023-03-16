const Category = require("./Category")

async function createCategory(){
    const number = await Category.count().exec()
    const values = [
        {
            name: "Memory books",
            slack: "memory"
        },
        {
            name: "Novels",
            slack:"novel"
        },
        {
            name: "Story books",
            slack:"story"
        },
        {
            name: "Travel books",
            slack:"travel"
        },
        {
            name: "Children's books",
            slack:"children's"
        },
        {
            name: "Poetry books",
            slack:"poetry"
        },
        {
            name: "Biography books",
            slack:"biography"
        },
        {
            name: "religious books",
            slack:"religios"
        },
        {
            name: "Knowledge books",
            slack:"knowledge"
        }
    ]
    if(number == 0){
        values.map(async value=>{
            await new Category(value).save()
        })
    }

    // Category.deleteMany().exec()
}

module.exports ={
    createCategory
}