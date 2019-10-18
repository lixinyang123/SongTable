//路由模块

const player = require("./player");
const url = require("url");
const fs = require("fs");

module.exports = function (req,res){
    var path = url.parse(req.url).pathname;

    switch(path){
        case "/":
            fs.readFile(__dirname+"/../wwwroot/view/index.html",(err,data)=>{
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
                if(req.method === 'POST'){
                    var data = "";
                    req.on("data",(chunk)=>{
                        data += chunk;
                    });
                    req.on("end",()=>{
                        var music = JSON.parse(data);
                        player.play(music);
                        res.end("点歌成功"+music.name);
                    });
                }
                else{
                    res.end("请求不合法");
                }
            }
            catch(err){
                res.end("点歌失败"+err);
            }
           
            break;

        case "/next":
            var length  = player.musicList.length;
            if(length>1){
                player.stopAndPlayNext();
                res.end("切歌成功");
            }
            else{
                res.end("切歌失败");
            }
            break;

        case "/musiclist":
            var jsonStr = JSON.stringify(player.musicList);
            res.end(jsonStr);
            break;

        default:
            res.statusCode = 404;
            res.end();
    }
}