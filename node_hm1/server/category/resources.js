const Category = require("./Category")
const getCategories = () => new Promise((resolve, reject)=>{
    Category.find().exec(function(err, categories){
        if(err) return reject(err)
        resolve(categories)
    })
})

module.exports = {
    getCategories,
}