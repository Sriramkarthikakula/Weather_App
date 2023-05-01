const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(request,response){
    response.sendFile(__dirname +"/index.html");
});

app.post("/",function(request,res){
    const query = request.body.value;
    const ids = "6e1ea8e5316dde017603b1d70e3a506a";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ids+"&units="+units;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temps = weatherdata.main.temp;
            const desc = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.setHeader("Content-Type", "text/html");
            res.write('<br><br><h4 align="center">Currently the weather condition in <b>'+ query +'</b> is '+ desc +'</h4><br>\n');
            res.write("<h1 align='center'>The temperature is <b>"+ temps +"</b> degree Celcius</h1>\n");
            res.write("<img src ="+ imageurl +" style='margin-left:47%;'>\n");
            res.send();
        });
    });
});
app.listen(3000,function(){
    console.log("running");
});