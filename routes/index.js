var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const app = require('../app');

const connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'Pass@5413',
  database:'patheyadata'
})

connection.connect((error)=>{
  if(error){
    console.error(error)
  }
  else{
    console.log('connected to the database succesfully!')
  }
})

// to get all the data
connection.query('select * from patheyadata.student',(error,result)=>{
  if(error){
    console.error(error)
  }
  else{
    console.log(result)
  }

  // for specific name
  connection.query('select * from patheyadata.student where name = "sunil" ',(error,result)=>{
    if(error){
      console.error(error)

    }
    else{
      console.log(result)
    }
  })

  // update 
  connection.query('update patheyadata.student set name="bhagyshree" where id = "2"',(error,result)=>{
     if(error){
      console.error(error)

    }
    else{
      console.log(result)
    }
  })


  // insert into databse 
  connection.query('insert into patheyadata.student(id,name,role) values(3,"pranav","dev")',(error,result)=>{
     if(error){
      console.error(error)

    }
    else{
      console.log(result)
    }
  })

//delet databse 
connection.query('delete from patheyadata.student where id = 3 ',(error,result)=>{
     if(error){
      console.error(error)

    }
    else{
      console.log(result)
    }
  })


  // for creating table

// const sql = `
//   CREATE TABLE users (
//     id INTEGER PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;
// connection.query(sql, (error, results) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(results);
//   }
// });

// now we will use api methods     for get we use [select * from ]
router.get('/users',(req,res)=>{
  connection.query('select * from patheyadata.student ',(error,result)=>{
    if(error){
     res.status(404).send('enter the valid data')
    }
    else{
      res.json(result)
    }
   
  })
})

// post method    for post we use [insert into ... values ()]

// POST request to create a new user
router.post('/post', function(req, res) {
  // Insert the new user into the database
  connection.query('INSERT INTO patheyadata.student(id,name,role) VALUES(6,"sunil_mane","dev")',  function(error, results, fields){
    if (error) {
      // If there was an error, send a 500 Internal Server Error response
      res.status(500).send(error);
    } else {
      // If the query was successful, send a 201 Created response with the new user ID
      res.status(201).send(result);
    }
  });
});
})

// put method to update the data into database
// PUT request to update a user with a specific ID
router.put('/users/:id', function(req, res) {
  // Update the user with the specified ID in the database
  connection.query('UPDATE patheyadata.student SET name = "karan" WHERE id = 5', [req.body.name, req.params.id], function(error, results, fields) {
    if (error) {
      // If there was an error, send a 500 Internal Server Error response
      res.status(500).send(error);
    } else {
      // If the query was successful, send a 200 OK response
      res.send('User has been updated.');
    }
  });
});

// DELETE request to delete a user with a specific ID
router.delete('/users/:id', function(req, res) {
  // Delete the user with the specified ID from the database
  connection.query('DELETE FROM patheyadata.student WHERE id = 6', [req.params.id], function(error, results, fields) {
    if (error) {
      // If there was an error, send a 500 Internal Server Error response
      res.status(500).send(error);
    } else {
      // If the query was successful, send a 200 OK response
      res.send('User has been deleted.');
    }
  });
});


module.exports = router;
