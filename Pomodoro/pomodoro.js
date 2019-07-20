$(window).resize(function () {
  root.style.setProperty("--circle", $(".timercircle").css("height"))
})
$(document).ready(function () {
  root.style.setProperty("--circle", $(".timercircle").css("height"))
  $(".listnumber").text(`${done}/${totallist}`)

  // $(".col-04 ,.col-07").addClass("d-none")
})
// ------------------------backgroundsetup------------------------
function bggreennormal() {
  i = 300
  root.style.setProperty("--timerfontcolor", "#969696")
  root.style.setProperty("--timervalue", "#4EB6A8")
  $(".timerpart").css("background", "#f9f9f9")
  $(".timercircle").css({ "backgroundColor": "#E0FFFB", "border": "3px solid #50E3C2 " })
  $('<style>.listline.first::after{background-color:#E0FFFB;color: #4EB6A8 ; border: 2px solid #06BCA4 }</style > ').appendTo('head')
}
function bggreenstart() {
  $(".timerpart").css("background", "#E6FDF8")
  $(".timercircle").css({ "backgroundColor": "#95E2D6", "border": "3px solid #4EB6A8" })
  root.style.setProperty("--timervalue", "#FFF")
}
function bgrednormal() {
  i = 1500
  $(".timervalue").text("25:00")
  $(".timerpart").css("background", "#f9f9f9")
  $(".timercircle").css({ "backgroundColor": "#FFEBEB", "border": "3px solid #FF6D6D" })
  root.style.setProperty("--timerfontcolor", "#949494")
  root.style.setProperty("--timervalue", "#E54343")
  $('<style>.listline.first::after{background-color:#FFEDED;color: #FF6D6D ; border: 2px solid #FF6D6D }</style > ').appendTo('head')

}
function bgredstart() {
  $(".timerpart").css("background", "#FF8E8E")
  $(".timercircle").css({ "backgroundColor": "#F65454", "border": "3px solid #BA2323" })
  root.style.setProperty("--timerfontcolor", "#FFF")
  root.style.setProperty("--timervalue", "#FFF")
}
// ------------------------todolist------------------------

$("input[type='text']").keypress(function (e) {
  if (e.which === 13) {
    addlist()
  };
})
$(".addlist").on("click", addlist)

$("li.listline").on("click", function () {
  $("li.listline.click").removeClass("click")
  $(this).addClass("click")
  $(".first").text($(this).text())
  bgrednormal()
  btswich = true
  buttionswich()
  $("li.listline").removeClass("end")
  $("li.listline:last").addClass("end")
  if ($(this).text() == "Break time") {
    breaktime()
  }
})
function addlist() {
  $("ul.list").append(`<li class="listline"><span>${$("input[type='text']").val()}</span></li>`);
  $("input[type='text']").val("");
  $("li.listline").removeClass("end")
  $("li.listline:last").addClass("end")
  if ($("li.listline").length = 1) {
    $("li.listline:first").addClass("first")
  }
  totallist++
  $(".listnumber").text(`${done}/${totallist}`)
}
var totallist = $("li.listline").length - 1
// ------------------------break------------------------
function breaktime() {
  $(".timervalue").text("05:00")
  bggreennormal()
  btswich = true
  buttionswich()
  $(".first").text("Break time")
  $(".timernow").text($(".first").text())
}
$("li.listline.break").on("click", function () {
  breaktime()
})
// ------------------------timerbutton------------------------
var root = document.documentElement
var tn = document.querySelector(".timernow")
var btswich;
var i = 1500
var done = 0


function buttionswich() {
  if (btswich) {
    $(".timerstart").css("display", "inline")
    $(".timerstop,.timercancel").css("display", "none")
    $(".buttonsetup").removeClass("d-flex justify-content-between")
    $('<style>.timernow::after{display: none}</style > ').appendTo('head')
    $('<style>.timernow::before{display: inline;}</style > ').appendTo('head')
  }
  else {
    $(".timerstart").css("display", "none")
    $(".timerstop,.timercancel").css("display", "inline")
    $(".buttonsetup").addClass("d-flex justify-content-between")
    $('<style>.timernow::after{display: inline}</style > ').appendTo('head')
    $('<style>.timernow::before{display: none;}</style > ').appendTo('head')
  }
}

$(".timerstart").on("click", function () {
  musicplay()
  if ($(".timerstart").css("color") == "rgb(78, 182, 168)" | $(".timerpart").css("backgroundColor") == "rgb(230, 253, 248)") {
    bggreenstart()
  }
  else {
    bgredstart()
  }
  btswich = false
  buttionswich()
  $(".timernow").text($(".first").text())
  timer()
})
$(".timerstop").on("click", function () {
  btswich = true
  buttionswich()
  musicstop()
})
$(".timercancel").on("click", function () {
  btswich = true
  buttionswich()
  $("li.listline:first").remove()
  $("li.listline.click").remove()
  $("li.listline:first").addClass("first")
  if ($("li.listline:first").css("color") == "rgb(6, 188, 164)") {
    bggreennormal()
  }
  else {
    bgrednormal()
  }
  $(".timernow").text($(".first").text())
  musiccancel()
})

// ------------------------date------------------------
function setdate() {
  var now = new Date();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hour = Math.abs(now.getHours() - 12);
  var date = now.getDate();
  var month = now.getMonth() + 1;
  var year = now.getFullYear();
  var dorn = ""
  if (now.getHours() - 12 <= 0) {
    dorn = "AM"
  }
  else {
    dorn = "PM"
  }
  if ((month + "").length < 2) {
    month = "0" + month
  }

  if ((date + "").length < 2) {
    date = "0" + date
  }
  if ((hour + "").length < 2) {
    hour = "0" + hour
  }
  if ((min + "").length < 2) {
    min = "0" + min
  }
  if ((sec + "").length < 2) {
    sec = "0" + sec
  }
  $(".ymd").text(`${year}/${month}/${date}`)
  $(".hms").text(`${hour}:${min} ${dorn}`)
}
setInterval(setdate, 1000);
// ------------------------Timer------------------------

function timer() {
  var tv = i
  var min = Math.floor(tv / 60)
  var sec = tv - min * 60
  if ((min + "").length < 2) {
    min = "0" + min
  }
  if ((sec + "").length < 2) {
    sec = "0" + sec
  }


  if (i == 0) {
    clearTimeout(timer)
    done++
    $(".listnumber").text(`${done}/${totallist}`)
    if ($("li.listline:first").text() == "Break time") {
      $("li.listline:first").remove()
      $("li.listline.click").remove()
      $("li.listline:first").addClass("first")
      bgrednormal()
      btswich = true
      buttionswich()
    }
    else if ($("li.listline:first").text() != "Break time") {
      breaktime()
    }
  }
  else if (btswich === true) {
    clearTimeout(timer)
  }
  else {
    setTimeout(timer, 1000)
    $(".timervalue").text(`${min}:${sec}`)
    i--
  }
}
// ------------------------bar------------------------
$(".mission").on("click", function () {
  $(".listpart,.timerpart").css("display", "inline")
  $(".l,.r").css("display", "none")
  $(".barlink").removeClass("active")
  $(this).addClass("active")
})

$(".analytics").on("click", function () {
  $(".listpart,.timerpart,.l,.r").css("display", "none")
  $(".barlink").removeClass("active")
  $(this).addClass("active")
})

$(".musicplayer").on("click", function () {
  $(".listpart,.timerpart").css("display", "none")
  $(".col-05.l,.col-05.r").css("display", "inline")
  $(".barlink").removeClass("active")
  $(this).addClass("active")

})
$(".l,.r").css("display", "none")
$(".listpart,.timerpart").css("display", "none")
// --------------------------------music-------------------------------

function musicplay() {
  if ($(".first").text() == "Break time") {
    var playmb = $("input[name='mb']:checked").val()
    var audiomb = document.querySelector(`audio[data-music='${playmb}']`)
    audiomb.play()
  }
  else {
    var playmp = $("input[name='mp']:checked").val()
    var audiomp = document.querySelector(`audio[data-music='${playmp}']`)
    audiomp.play()
  }
}

function musicstop() {
  if ($(".first").text() == "Break time") {
    var playmb = $("input[name='mb']:checked").val()
    var audiomb = document.querySelector(`audio[data-music='${playmb}']`)
    audiomb.pause()
  }
  else {
    var playmp = $("input[name='mp']:checked").val()
    var audiomp = document.querySelector(`audio[data-music='${playmp}']`)
    // audiomp.pause()
    audiomp.pause()
  }
}

function musiccancel() {
  if ($(".first").text() == "Break time") {
    var playmb = $("input[name='mb']:checked").val()
    var audiomb = document.querySelector(`audio[data-music='${playmb}']`)
    // audiomb.pause()
  audiomb.load()
  }
  else {
    var playmp = $("input[name='mp']:checked").val()
    var audiomp = document.querySelector(`audio[data-music='${playmp}']`)
    // audiomp.pause()
    audiomp.load()
  }
}
