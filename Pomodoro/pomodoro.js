$(window).resize(function () {
  root.style.setProperty("--circle", $(".timercircle").css("height"))

})
$(document).ready(function () {
  root.style.setProperty("--circle", $(".timercircle").css("height"))
  $(".listnumber").text(`${done}/${totallist}`)
})
// ------------------------backgroundsetup------------------------
function bggreennormal() {
  i = 5
  root.style.setProperty("--timerfontcolor", "#969696")
  root.style.setProperty("--timervalue", "#4EB6A8")
  $(".timerpart").css("background", "#f9f9f9")
  $(".timercircle").css({ "backgroundColor": "#E0FFFB", "border": "3px solid #50E3C2 " })
  $('<style>h1.donow::after{background-color:#E0FFFB;color: #4EB6A8 ; border: 2px solid #06BCA4 }</style > ').appendTo('head')
  $('<style>h1.donow::before{background-image: -webkit-linear-gradient(top, #FF6D6D, #06BCA4, #06BCA4);background-image: linear-gradient(top, #FF6D6D, #06BCA4, #06BCA4);}</style > ').appendTo('head')

}
function bggreenstart() {
  $(".timerpart").css("background", "#E6FDF8")
  $(".timercircle").css({ "backgroundColor": "#95E2D6", "border": "3px solid #4EB6A8" })
  root.style.setProperty("--timervalue", "#FFF")
}
function bgrednormal() {
  i = 25
  $(".timervalue").text("25:00")
  $(".timerpart").css("background", "#f9f9f9")
  $(".timercircle").css({ "backgroundColor": "#FFEBEB", "border": "3px solid #FF6D6D" })
  root.style.setProperty("--timerfontcolor", "#949494")
  root.style.setProperty("--timervalue", "#E54343")
  $('<style>h1.donow::after{background-color:#FFEDED;color: #FF6D6D ; border: 2px solid #FF6D6D }</style > ').appendTo('head')
  $('<style>h1.donow::before{background-image: -webkit-linear-gradient(top, #FFf, rgba(255, 109, 109), rgba(255, 109, 109));background-image: linear-gradient(top, #FFf, rgba(255, 109, 109), rgba(255, 109, 109));}</style > ').appendTo('head')

}
function bgredstart() {
  $(".timerpart").css("background", "#FF8E8E")
  $(".timercircle").css({ "backgroundColor": "#F65454", "border": "3px solid #BA2323" })
  root.style.setProperty("--timerfontcolor", "#FFF")
  root.style.setProperty("--timervalue", "#FFF")
}
// ------------------------todolist------------------------

$(".listpart input[type='text']").keypress(function (e) {
  if (e.which === 13) {
    addlist()
  };
})
$(".addlist").on("click", addlist)

$(".listpart ul.list").on("click", "li", function () {
  $("ul.list li.click").removeClass("click")
  $(this).addClass("click")
  for (var i = 0; i < $(".listpart li").length; i++) {
    var copyli = document.querySelectorAll(".main li")
    if (copyli[i].textContent == $(this).text()) {
      copyli[i].classList.add("click")
    }
    else {
      copyli[i].classList.remove("click")
    }
  }

  $(".donow").text($(this).text())
  $(".timernow").text($(".donow").text())
  

  bgrednormal()
  buttionswich(true)
  $("li.listline").removeClass("end")
  $("li.listline:last").addClass("end")

  if ($(this).text() == "Break time") {
    breaktime()
  }
})
function addlist() {
  if ($("li.listline").length <= 1) {
    $('<style>h1.donow::before{width: 1px;}</style > ').appendTo('head')
  }
  $("ul.list").append(`<li class="listline"><span>${$(".listpart input[type='text']").val()}</span><span class="addin"><i class="fa fa-times"></i></span></li>`);
  $(".listpart input[type='text']").val("");
  $(".main li").removeClass("listline break end")
  $("li.listline").removeClass("end")
  $("li.listline:last").addClass("end")
  $(this).val("");
  totallist++
  $(".listnumber").text(`${done}/${totallist}`)

}
var totallist = $("li.listline").length
// ------------------------break------------------------
function breaktime() {
  $(".timervalue").text("05:00")
  bggreennormal()
  buttionswich(true)
  $(".timernow").text($(".donow").text())
}
$("li.listline.break").on("click", function () {
  breaktime()
})
// ------------------------timerbutton------------------------
var root = document.documentElement
var tn = document.querySelector(".timernow")
var btswich;
var i = 25
var done = 0


function buttionswich(e) {
  if (e === true) {
    $(".timerstart").css("display", "inline")
    $(".timerstop,.timercancel").css("display", "none")
    $(".buttonsetup").removeClass("d-flex justify-content-between")
    $('<style>.timernow::after{display: none}</style > ').appendTo('head')
    $('<style>.timernow::before{display: inline;}</style > ').appendTo('head')
    btswich = true
  }
  else if (e === false) {
    $(".timerstart").css("display", "none")
    $(".timerstop,.timercancel").css("display", "inline")
    $(".buttonsetup").addClass("d-flex justify-content-between")
    $('<style>.timernow::after{display: inline}</style > ').appendTo('head')
    $('<style>.timernow::before{display: none;}</style > ').appendTo('head')
    btswich = false
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
  buttionswich(false)
  $(".timernow").text($(".donow").text())
  timer()
})
$(".timerstop").on("click", function () {
  buttionswich(true)
  musicstop()
})
function deletethis(){
  var listpartli = document.querySelectorAll(".listpart li")
  listpartli.forEach(function (e) {
    if (e.textContent == $("h1.donow").text()) {
      e.remove()
    }
    
    if ($("li.listline").length < 1) {
      $('<style>h1.donow::before{width:0 }</style > ').appendTo('head')
    }
  if ($("h1.donow").text() == "Break time") {
    bggreennormal()
  }
  else {
    bgrednormal()
  }
  $(".timernow").text($(".donow").text())
  musiccancel()
  buttionswich(true)
  $("li.click").remove()
})
$("h1.donow").text($("li.listline:first").text())
}
$(".timercancel").on("click", function () {
  $("ul.finish").append(`<li>${$("h1.donow").text()}<span class="del">作廢</span></li>`)
  deletethis()
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
    if ($("h1.donow").text() !== "Break time") {
      breaktime()
      done++
      $(".listnumber").text(`${done}/${totallist}`)
      $("ul.finish").append(`<li>${$("h1.donow").text()}<span class="done">已完成</span></li>`)
    }
    if ($("h1.donow").text() == "Break time") {
      $("h1.donow").text($(".listline:first").text())
      bgrednormal()
      buttionswich(true)
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
  $(".l,.r,.main,.sec").css("display", "none")
  $(".barlink").removeClass("active")
  $(this).addClass("active")
  root.style.setProperty("--circle", $(".timercircle").css("height"))
})
// var l = 0
$(".analytics").on("click", function () {
  $(".main,.sec").css("display", "inline")
  $(".listpart,.timerpart,.l,.r").css("display", "none")
  $(".barlink").removeClass("active")
  $(this).addClass("active")

  // if (l < 1) {
  //   $(".main .list li:first").remove()
  //   $(".listpart .list li:first").text($(".listpart .list li:nth-of-type(2)").text())
  // }
  // else if(l==1){

  //   $(".finish li").remove()
  //   $(".list li").remove()
  //   $(".seccontainer li").remove()
  //   $(".thcontainer li").remove()
  // }
  // l++
})

$(".musicplayer").on("click", function () {
  $(".col-05.l,.col-05.r").css("display", "inline")
  $(".listpart,.timerpart,.main,.sec").css("display", "none")
  $(".barlink").removeClass("active")
  $(this).addClass("active")

})
$(".l,.r,.main,.sec").css("display", "none")
$(".listpart,.timerpart").css("display", "inline")
// $(".main,.sec").css("display","inline")
// --------------------------------music-------------------------------

function musicplay() {
  if ($("h1.donow").text() == "Break time") {
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
  if ($("h1.donow").text() == "Break time") {
    var playmb = $("input[name='mb']:checked").val()
    var audiomb = document.querySelector(`audio[data-music='${playmb}']`)
    audiomb.pause()
  }
  else {
    var playmp = $("input[name='mp']:checked").val()
    var audiomp = document.querySelector(`audio[data-music='${playmp}']`)
    audiomp.pause()
  }
}

function musiccancel() {
  if ($("h1.donow").text() == "Break time") {
    var playmb = $("input[name='mb']:checked").val()
    var audiomb = document.querySelector(`audio[data-music='${playmb}']`)
    audiomb.load()
  }
  else {
    var playmp = $("input[name='mp']:checked").val()
    var audiomp = document.querySelector(`audio[data-music='${playmp}']`)
    audiomp.load()
  }
}

// --------------------------------adding-------------------------------
$(".main ul,.sec ul").on("mouseenter", "li", function () {
  $("span", this).toggleClass("d-inline")
}).on("mouseleave", "li", function () {
  $("span", this).toggleClass("d-inline")
})

$(".main ul,.sec ul").on("click", "i", function () {
  // deletethis()
  var listpartli = document.querySelectorAll(".listpart li")
listpartli.forEach(function (e) {
  if (e.textContent == $(this).parent().parent().text()) {
    $("ul.finish").append(`<li>${$(this).parent().parent().text()}<span class="del">作廢</span></li>`)
    e.remove()
  }})
  $(this).parent().parent().remove()
})




$(".maincontainer .fa-plus").on("click", function () {
  $(".maincontainer input[type='text']").fadeToggle(1000);
  $(this).toggleClass("roo")
})
$(".seccontainer .fa-plus").on("click", function () {
  $(".seccontainer input[type='text']").fadeToggle(1000);
  $(this).toggleClass("roo")
})
$(".thcontainer .fa-plus").on("click", function () {
  $(".thcontainer input[type='text']").fadeToggle(1000);
  $(this).toggleClass("roo")
})
$(".seccontainer input[type='text']").keypress(function (e) {
  if (e.which === 13) {
    $(".seccontainer ul").append(`<li>${this.value}<span class="addin"><i class="fas fa-file-import"></i>　匯入任務　<i class="fa fa-times"></i></span></li>`);
    $(this).val("");
  };
})
$(".thcontainer input[type='text']").keypress(function (e) {
  if (e.which === 13) {
    $(".thcontainer ul").append(`<li>${this.value}<span class="addin"><i class="fas fa-file-import"></i>　匯入任務　<i class="fa fa-times"></i></span></li>`);
    $(this).val("");
  };
})
$(".maincontainer input[type='text']").keypress(function (e) {
  if (e.which === 13) {
    addlist()
  };
})
