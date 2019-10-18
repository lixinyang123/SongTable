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
      alert(data);
      var playlist = JSON.parse(data);
    },
    error: function(err) {
      alert(err);
    }
  });
}

//展示播放结果
function showResult(data) {
  var songlist = data.result.songs;
  var html = "<tr><td><h3>歌名</h3></td><td><h3>歌手</h3></td></tr>";

  for (var i = 0; i < songlist.length; i++) {
    var song = songlist[i];

    console.log(song);
    html += "<tr>";
    //歌曲标题
    html += "<td>" + song.name + "</td>";
    //歌手
    var artists = "";
    for (var j = 0; j < song.artists.length; j++) {
      artists += song.artists[j].name + " ";
    }
    html += "<td>" + artists + "</td>";
    html += "</tr>"
  }
  document.getElementById("songlist").innerHTML = html;
}
