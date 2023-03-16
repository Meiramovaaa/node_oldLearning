const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/astana-hub').then(() =>{
    console.log("connect to mongoDB");
}).catch(() =>{
    console.log("failed to connect mongoDB")
})

