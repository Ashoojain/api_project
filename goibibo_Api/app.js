const express = require('express');
const app = express();
const request = require('request');
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public'));


app.get("/",function (req , res) {
    res.send("index");
})

app.get('/results', function (req , res) {
    var q = req.query.source;
    var r=req.query.destination;
    var s=req.query.dateofdeparture;
    var url = "https://developer.goibibo.com/api/bus/search/?app_id=c066fee8&app_key=ad44ce2cc6cb2b36bf020a668e4fb5b9&format=json&source="+ q +"&destination="+ r +"&dateofdeparture="+ s ;

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


// const PORT =process.env ||1000;

app.listen(9000,function () {

console.log("SERVER  is RUNNING")
})
