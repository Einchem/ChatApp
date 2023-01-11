const mongoose = require('mongoose')

require('dotenv').config()
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster1.a4ogxp2.mongodb.net/?retryWrites=true&w=majority`,
() => {
    console.log("Connected to DataBase")

})