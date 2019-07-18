$(window).resize(function () {
  var x = $("html").css("width");
  var y = $("html").css("height");
  var X = x.substr(0, x.length - 2);
  var Y = y.substr(0, y.length - 2);

  if (X < 1050 | Y < 600) {
    $("body").css("width", "1050px");
    $("body").css("height", "550px");
  }
  else {
    $("body").css("width", X);
    $("body").css("height", Y);
  }
})
// ------------------------todolist------------------------

$("li.listline").on("click", function () {
  $(".first").text($(this).text())
  $(".timerpart").css("background", "#f9f9f9")
  $(".timercircle").css({ "backgroundColor": "#FFEBEB", "border": "3px solid #FF6D6D" })
  root.style.setProperty("--timerfontcolor", "#949494")
  root.style.setProperty("--timervalue", "#E54343")
  btswich = true
  buttionswich()
  i = 1500
  $(".timervalue").text("25:00")
})

$("ul").on("click","li", function (e) {
  e.stopPropagation();
})
$("input[type='text']").keypress(function (e) {
  if (e.which === 13) {
    $("ul.list").append(`<li class="listline">${this.value}</li>`);
    $(this).val("");
    $("li.listline").removeClass("end")
    $("li.listline:last").addClass("end")
  };
})

// ------------------------break------------------------

$("li.listline.break").on("click", function () {
  i = 300
  $(".timervalue").text("05:00")
  root.style.setProperty("--timerfontcolor", "#969696")
  root.style.setProperty("--timervalue", "#4EB6A8")
  $(".timerpart").css("background", "#f9f9f9")
  $(".timercircle").css({ "backgroundColor": "#E0FFFB", "border": "3px solid #50E3C2 " })
  btswich = true
  buttionswich()
  $(".first").text($(".break").text())
  $(".timernow").text($(".first").text())
})
// ------------------------timerbutton------------------------
var root = document.documentElement
var tn = document.querySelector(".timernow")
var btswich;
var i = 1500
var done = 0

if ($(".timerstart").css("color") == "rgb(229, 67, 67)") {
  i = 1500
  $(".timervalue").text("25:00")
}

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

  if ($(".timerstart").css("color") == "rgb(78, 182, 168)" | $(".timerpart").css("backgroundColor") == "rgb(230, 253, 248)") {
    $(".timerpart").css("background", "#E6FDF8")
    $(".timercircle").css({ "backgroundColor": "#95E2D6", "border": "3px solid #4EB6A8" })
    root.style.setProperty("--timervalue", "#FFF")
  }
  else {
    $(".timerpart").css("background", "#FF8E8E")
    $(".timercircle").css({ "backgroundColor": "#F65454", "border": "3px solid #BA2323" })
    root.style.setProperty("--timerfontcolor", "#FFF")
    root.style.setProperty("--timervalue", "#FFF")
  }
  btswich = false
  buttionswich()
  $(".timernow").text($(".first").text())
  timer()
})
$(".timerstop").on("click", function () {
  btswich = true
  buttionswich()
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
  // timer = setTimeout(arguments.callee, 1000)
  if ((min + "").length < 2) {
    min = "0" + min
  }
  if ((sec + "").length < 2) {
    sec = "0" + sec
  }

  if (i == 0 | btswich == true) {
    clearTimeout(timer)
    done++
    $("li.listline:first").remove()
    $("li.listline:first").addClass("first")
  }
  else {
    i--
    setTimeout(timer, 1000)
    $(".timervalue").text(`${min}:${sec}`)
  }
}

// ------------------------listnumber------------------------
$(".listnumber").text(`${done}/${$("li.listline").length}`)
