const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'Pass@5413',
    database:'API_all_methods'
})

connection.connect((error)=>{
    if(error){
        console.error(error)
    }
    else{
        console.log('connected to the database name [API_all_methods]')
    }
})






module.exports = router;