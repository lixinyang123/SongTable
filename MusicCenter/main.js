const http = require("http");
const url = require("url");
const fs = require("fs");
const player = require("./player");


var server = http.createServer((req,res)=>{

    res.setHeader("Content-Type", "text/html; charset=utf-8")

    //处理静态文件
    var realPath = __dirname+ url.parse(req.url).pathname;

    fs.readFile(realPath,(err,data)=>{
        if(err){
            rotate(req,res);
        }
        else{
            res.end(data);
        }
    });

});

//处理非静态文件路径
function rotate(req,res){
    var path = url.parse(req.url).pathname;

    switch(path){
        case "/":
            fs.readFile(__dirname + "/wwwroot/index.html",(err,data)=>{
                res.end(data);
            });
            break;

        case "/search":

            try{
                var query = url.parse(req.url).query;
                query = query.substring(query.indexOf("=")+1);
    
               player.searchMusic(query,(body)=>{
                   console.log(body);
                    res.end(body);
                });
            }
            catch(err){
                res.end("搜索失败");
            }

            break;

        case "/play":
            try{
                var query = url.parse(req.url).query;
                query = query.substring(query.indexOf("=")+1);
                player.play(query);
                res.end("点歌成功");
            }
            catch(err){
                res.end("点歌失败");
            }
           
            break;

        case "/next":
            var length  = player.musicList.length;
            if(length>1){
                player.playNext();
                res.end("切歌成功");
            }
            else{
                res.end("切歌失败");
            }
            break;

        default:
            res.statusCode = 404;
            res.end();
    }
}

server.listen(8435,()=>{
    console.log("server start at http://localhost:8435/");
});