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
      showResult(playlist);
    },
    error: function(err) {
      alert(err);
    }
  });
}

//展示播放结果
function showResult(songs) {
  var html = "<tr><td><h3>歌名</h3></td><td><h3>歌手</h3></td></tr>";

  for (var i = 0; i < songs.length; i++) {
    var song = songs[i];

    console.log(song);
    html += "<tr>";
    //歌曲标题
    html += "<td>" + song.name + "</td>";
    //歌手
    html += "<td>" + song.artists + "</td>";
    html += "</tr>"
  }
  document.getElementById("songlist").innerHTML = html;
}