//播放下一首
function next() {
  var url = "/next";
  $.ajax({
    url: url,
    dataType: "text",
    success: function(data) {
      list();
    },
    error: function(err) {
      alert(err);
    }
  });
}

//获取播放队列
function list() {
  var url = "/musiclist";
  $.ajax({
    url: url,
    dataType: "text",
    success: function(data) {
      var playlist = JSON.parse(data);
      showResult(playlist);
    },
    error: function(err) {
      alert(err);
    }
  });
}

//展示播放结果
function showResult(songs) {
  var html = "<tr style='color: red;'><td><h3>&emsp;&emsp;歌名&emsp;&emsp;</h3></td><td><h3>&emsp;&emsp;歌手&emsp;&emsp;</h3></td></tr>";

  for (var i = 0; i < songs.length; i++) {
    var song = songs[i];
    html += "<tr>";
    //歌曲标题
    html += "<td>&emsp;&emsp;" + song.name + "&emsp;&emsp;</td>";
    //歌手
    html += "<td>&emsp;&emsp;" + song.artists + "&emsp;&emsp;</td>";
    html += "</tr>"
  }
  document.getElementById("songlist").innerHTML = html;
}