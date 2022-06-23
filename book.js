const { query } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');

app.listen(90, () => {

    console.log('listening to port 90');
});

let dbparameters = {
    host: 'localhost',
    user: 'swapnil',
    password: 'cdac',
    database: 'WPT',
    port: 3306
}

const conn = mysql.createConnection(dbparameters);

app.get("/addbook", (req, resp) => {
    console.log("inside add book");
    let bookdetails={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price};
    let output = {status:false}
 


   
    conn.query('insert into bookdetails (bookid,bookname,price) values(?,?,?)',
    [bookdetails.bookid,bookdetails.bookname,bookdetails.price],

        (error, res) => {
            if (error) {
                console.log(error);
            }
            else {
                if (res.affectedRows >0) {
                    console.log("Book added");
                    output.status=true;


                }else{
                    console.log("failed");
                }
            }
            resp.send(output);
        });
});