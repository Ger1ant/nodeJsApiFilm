
var express=require("express");
var app=express();
var request =require("request");

app.set("view engine","ejs");

//Css leri kullanabilmek için
app.use(express.static("public"));

//2 Sayfadan oluşacak Anasayfa

app.get("/",function(req,res){
    res.render("search");

});

//sonuç sayfamız
app.get("/results",function(req,res){
    //search input 'text name'inden geliyor
    var query=req.query.search;
    //query'i url 'in sonuna ekliyoruz
    var url="https://api.themoviedb.org/3/search/movie?api_key=1bc0eef3493e020056e913033eec322c&query="+query;
    
    //isteği gerçekleştirebilmek için
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            var data=JSON.parse(body);
            console.log(data);
            res.render("results",{data:data});
        }
    });
});

var server=app.listen(3000,function(){
    console.log("Port : ",server.address().port);
})
