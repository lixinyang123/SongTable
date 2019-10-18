//webapp

const http = require("http");
const url = require("url");
const rotate = require("./infrastructure/rotate");
const fs = require("fs");

var server = http.createServer((req,res)=>{

    res.setHeader("Content-Type", "text/html; charset=utf-8")

    //处理静态文件
    var realPath = __dirname+ url.parse(req.url).pathname;

    //加载中间件

    //处理请求
    fs.readFile(realPath,(err,data)=>{
        if(err){
            rotate(req,res);
        }
        else{
            res.end(data);
        }
    });

});

server.listen(8080,()=>{
    console.log("server start at http://localhost:8080/");
});