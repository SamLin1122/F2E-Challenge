$(window).resize(function(){
  var x=$("html").css("width");
  var y=$("html").css("height");
  var X= x.substr(0, x.length-2);
  var Y= y.substr(0, y.length-2);
  
  if(X<1050 | Y<600){
    $("body").css("width","1050px");
    $("body").css("height","550px");
  }
  else{
    $("body").css("width",X);
    $("body").css("height",Y);
  }
  
})