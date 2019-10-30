var songlist = null;

// 回车搜索音乐
function keydownEvent() {
  var e = window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 13 ) {
    searchMusic();
  }
}
//搜索音乐
function searchMusic() {
  var url = "/search?music=" + document.getElementById("music").value;
  $.ajax({
    url: url,
    dataType: "json",
    success: function(data) {
      try {
        showResult(data);
      } catch (err) {
        alert("获取歌曲列表失败，请稍后重试");
      }
    },
    error: function(err) {
      alert(err);
    }
  });
}

//展示数据
function showResult(data) {
  songlist = data.result.songs;
  var html = "<tr><td><h3>歌名</h3></td><td><h3>歌手</h3></td><td><h3>----</h3></td></tr>";

  for (var i = 0; i < songlist.length; i++) {
    var song = songlist[i];

    console.log(song);
    html += "<tr>";
    //歌曲标题
    html += "<td>&emsp;&emsp;" + song.name + "&emsp;&emsp;</td>";
    //歌手
    var artists = "";
    for (var j = 0; j < song.artists.length; j++) {
      artists += song.artists[j].name + " ";
    }
    html += "<td>&emsp;&emsp;" + artists + "&emsp;&emsp;</td>";
    //播放音乐
    html += "<td>&emsp;&emsp;<button onclick='play(" + i + ")' >点歌</button>&emsp;&emsp;</td>";
    html += "</tr>"
  }
  try{
    document.getElementById("stateTxt").remove();
  }catch(err){}
  document.getElementById("songlist").innerHTML = html;
}

//播放音乐
function play(num) {
 alert("正在检测音乐是否可用.....清稍等");
  setBtnDisable(true);
  var music = { id: "", name: "", artists: "" };

  //组装传输对象
  music.id = songlist[num].id;
  music.name = songlist[num].name;
  var artists = "";
  for (var j = 0; j < songlist[num].artists.length; j++) {
    artists += songlist[num].artists[j].name + " ";
  }
  music.artists = artists;

  console.log(music);

  var url = "/play?musicid=" + num;
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(music),
    dataType: "text",
    success: function(result) {
      setBtnDisable(false);
      alert(result);
    },
    error: function(err) {
      setBtnDisable(false);
      alert(err);
    }
  });
}

function setBtnDisable(flag){
  var btns = document.getElementsByTagName("button");
  for(var i=0;i<btns.length;i++){
    if(flag){
      btns[i].setAttribute("disabled","disabled");
    }
    else{
      btns[i].removeAttribute("disabled");
    }
  }
}

//跳转播放队列页面
function list() {
  location.href = "/wwwroot/view/playlist.html";
}
