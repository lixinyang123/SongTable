//播放器模块

const request = require("request");
const mpg = require('mpg123');

var loginUrl = "http://localhost:3000/login/cellphone?phone=15937905153&password=lxy15937905153";
var searchUrl = "http://localhost:3000/search?keywords=";

var cookies,songUrl,currentMusic = null;
var musicList = new Array();
var player = new mpg.MpgPlayer();

//搜索音乐
function searchMusic(musicName,callback) {

    songUrl  = searchUrl+musicName;

    request.get(loginUrl,(err,res,body)=>{

        cookies =  res.headers["set-cookie"];

        for(var i=0;i<cookies.length;i++){
            console.log(cookies[i]);
        }

        getSearchResult(callback);
    });
}

function getSearchResult(callback){
    var options = {
        headers: {
            'Cookie': cookies
        }
    };

    request.get(songUrl,options,function(err,res,body){
        callback(body);
    });
}

function play(music,callback){

    var url = "http://music.163.com/song/media/outer/url?id="+music.id+".mp3";

    checkIsMusic(url,(flag)=>{
        if(flag){
            addMusic(music);
            if(currentMusic==null){
                player.play(url);
                currentMusic = music;
                checkPlayState();
            }
            callback(true);
        }
        else{
            callback(false);
        }
    });

}

function checkIsMusic(url,callback){
    require("http").get(url,(res)=>{
        var musicUrl = res.headers.location;

        if(musicUrl.endsWith(".mp3")){
            callback(true);
        }
        else{
            callback(false);
        }
    });
}

function stopAndPlayNext(){
    musicList.shift();
    playNext();
}

function playNext(){
    try{
        var music  = musicList[0];
        var url = "http://music.163.com/song/media/outer/url?id="+music.id+".mp3";
        player.play(url);
        currentMusic = music;
        setTimeout(checkPlayState,1000);
    }
    catch(err){
        throw 'error';
    }
}

function checkPlayState(){
    player.getProgress((progress)=>{
        progress = Math.round(progress*100);
        if(progress>=99){
            player.stop();
            //弹出播放完成的音乐
            currentMusic = null;
            musicList.shift();
            if(musicList.length>0){
                console.log("播放下一首");
                playNext();
            }
            else{
                console.log("列表无歌曲");
            }
        }
        else{
            setTimeout(checkPlayState,100);
        }
    });
}

function addMusic(music){
    musicList.push(music);
}

module.exports={
    play,
    searchMusic,
    playNext,
    musicList,
    stopAndPlayNext
};
