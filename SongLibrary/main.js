var child_process = require("child_process");
var fs = require("fs");

function startApi(){
    child_process.exec("node ./NeteaseCloudMusicApi/app.js",(err,stdout,stderr)=>{
        if(err){
            fs.appendFile("./log_MusicApi.txt",stderr,(err)=>{});
            setTimeout(startApi,1000);
        }
    });
}

function startMusicCenter(){
    child_process.exec("node ./MusicCenter/app.js",(err,stdout,stderr)=>{
        if(err){
            fs.appendFile("./log_MusicCenter.txt",stderr,(err)=>{});
            setTimeout(startMusicCenter,1000);
        }
    });
}

function start(){
    startApi();
    startMusicCenter();
}

start();