//搜索音乐
function searchMusic(){
    var url = "/search?music="+ document.getElementById("music").value;
    $.ajax({
        url : url,
        dataType : "json",
        success : function(data){
            try{
                showResult(data);
            }
            catch(err){
                alert("获取歌曲列表失败，请稍后重试");
            }
        },
        error : function(err){
            alert(err);
        }
    });
}

//展示数据
function showResult(data){
    var songlist = data.result.songs;
    var html = "";

    for(var i=0;i<songlist.length;i++){
        var song = songlist[i];

        console.log(song);
        html += "<li>";
        //歌曲标题
        html +=  "<h2>"+song.name+"</h2>";
        //歌手
        var artists = "";
        for(var j=0;j<song.artists.length;j++){
            artists += song.artists[j].name + " ";
        }
        html += "<h3>" + artists + "</h3>";
        //播放音乐
        html += "<button onclick='play("+song.id+")' >Play</button>";
        html += "</li>"
    }
    document.getElementById("songlist").innerHTML = html;
}

//播放音乐
function play(num){
    var url = "/play?musicid="+ num;
    $.ajax({
        url : url,
        dataType : "text",
        success : function(data){
            alert(data);
        },
        error : function(err){
            alert(err);
        }
    });
}

function next(){
    var url = "/next";
    $.ajax({
        url : url,
        dataType : "text",
        success : function(data){
            alert(data);
        },
        error : function(err){
            alert(err);
        }
    });
}