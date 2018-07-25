const express = require('express');
const app = express();
const request = require('request');
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public'));


app.get("/",function (req , res) {
    res.send("index");
})

app.get('/results', function (req , res) {
    var q = req.query.search;
    var url = "http://api.giphy.com/v1/gifs/search?q="+ q +"&api_key=RXJMQrJ5IaYINVf5gVBrDlerf7cmK6bQ&limit=5";

    request(url ,  function (error , response , body) {
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            res.render("results" , {data : data});
        }
        if(error){
            res.failureRedirect("/");
        }

    })

})


// const PORT =process.env ||2000;

app.listen(2000,function () {

console.log("SERVER RUNNING")
})
