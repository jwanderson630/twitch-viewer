var searches = ["freecodecamp","mlg", "ESL_SC2", "OgamingSC2", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "storbeck", "brunofin"];

var channels = [];

function channelInfo(name, status, pic, game, url) {
  this.name = name;
  this.status = status;
  this.pic = pic;
  this.game = game;
  this.url = url;
}

var check = function(num, checkThis) {
  var request = $.ajax({
    dataType: "jsonp",
    timeout: 5000,
    url: "https://api.twitch.tv/kraken/channels/" + checkThis,
    success: function(msg) {
      if (msg.logo === null){
        msg.logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";
      };
      if (msg.error !== undefined) {
        $("#channel-panel").append("<div class='error panel panel-warning'><div class='panel-heading'><img class='img-thumbnail'src='https://web-cdn.ttvnw.net/images/xarth/dead_glitch.png'>" + checkThis + "</div><div class='panel panel-body'> " + msg.message + "</div></div>")
      }
     else if (msg.status !== null) {
        $("#channel-panel").append("<a target='_blank'href="+ msg.url+"><div class='online panel panel-success'><div class='panel-heading'><img class='img-thumbnail' src=" + msg.logo + ">" + msg.display_name + "</div><div class='panel panel-body'>" + msg.status + "</div></div></a>")
      } else if (msg._links !== null) {
        $("#channel-panel").append("<a target='_blank'href="+ msg.url+"><div class='offline panel panel-info'><div class=' panel-heading'><img class='img-thumbnail'src=" + msg.logo + ">" + checkThis + "</div><div class='panel panel-body'>Offline</div></div></a>")
      }
    }
  })
}

var getInfo = function(input) {
  for (y = 0; y < input.length; y++) {
    check(y, input[y]);
  }
}

getInfo(searches);

$("navbar-toggle").click(function(){
  $("#myNavbar").removeClass("collapse");
});

$("#btn-online").click(function(){
  $(".online").removeClass("none");
  $(".offline").addClass("none");
  $(".error").addClass("none");
  $("#btn-online").removeClass("inactive");
  $("#btn-all").addClass("inactive");
  $("#btn-offline").addClass("inactive");
});

$("#btn-offline").click(function(){
  $(".online").addClass("none");
  $(".offline").removeClass("none");
  $(".error").addClass("none");
  $("#btn-offline").removeClass("inactive");
  $("#btn-all").addClass("inactive");
  $("#btn-online").addClass("inactive");
});

$("#btn-all").click(function(){
  $(".online").removeClass("none");
  $(".offline").removeClass("none");
  $(".error").removeClass("none");
  $("#btn-all").removeClass("inactive");
  $("#btn-offline").addClass("inactive");
  $("#btn-online").addClass("inactive");
});