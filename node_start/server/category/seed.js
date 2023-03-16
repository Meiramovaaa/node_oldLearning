const Category = require("./Category")
async function createCategories(){
    const number =  await Category.count().exec()
    const values = [
        {name:"Прогнозы в IT",
        slack: "it-predict"
        },
        {name:"Веб-разработка",
        slack: "web-dev"
        },
        {name:"Мобильная разработка",
        slack: "mobile-dev"
        },
        {name:"Фриланс",
        slack: "frilance"
        },
        {name:"Алгоритмы",
        slack: "algo"
        },
        {name:"Тестирование IT систем",
        slack: "testing"
        },
        {name:"Разработка игр",
        slack: "game-dev"
        },
        {name:"Дизайн и юзабилити",
        slack: "ui-ux"
        },
        {name:"Искуственный интелект",
        slack: "ai"
        },
        {name:"Машинное обучение",
        slack: "ml"
        }
    ]
    if(number == 0){
        values.map(async value =>{
            await new Category(value).save()
        })
    }

}

module.exports = {
    createCategories,
}