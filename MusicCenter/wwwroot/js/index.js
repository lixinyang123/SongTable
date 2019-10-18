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
  var songlist = data.result.songs;
  var html = "<tr><td><h3>歌名</h3></td><td><h3>歌手</h3></td><td><h3>----</h3></td></tr>";

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
    //播放音乐
    html += "<td><button onclick='play(" + song.id + ")' >点歌</button></td>";
    html += "</tr>"
  }
  document.getElementById("songlist").innerHTML = html;
}

//播放音乐
function play(num) {
  var url = "/play?musicid=" + num;
  $.ajax({
    url: url,
    dataType: "text",
    success: function(data) {
      alert(data);
    },
    error: function(err) {
      alert(err);
    }
  });
}

function next() {
  var url = "/next";
  $.ajax({
    url: url,
    dataType: "text",
    success: function(data) {
      alert(data);
    },
    error: function(err) {
      alert(err);
    }
  });
}