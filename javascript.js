$(function(){

    var paint = false;
    var paint_erase = "paint";
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    var container = $("#container");
    var mouse = {x:0, y:0};
    
    
    if(localStorage.getItem("imgCanvas") !=null){
      var img = new Image();
      img.onload = function(){
          ctx.drawImage(img, 0, 0);
      }    
      img.src = localStorage.getItem("imgCanvas");
    };
    
    
    
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    container.mousedown(function(e){
      paint = true;  
      ctx.beginPath();
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
      ctx.moveTo(mouse.x, mouse.y);
    });
    
    container.mousemove(function(e){
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    
    container.mouseup(function(){
       paint = false; 
    });
    
    container.mouseleave(function(){
       paint = false; 
    });
    
    
    $("#reset").click(function(){
       ctx.clearRect(0, 0, canvas.width, canvas.height); 
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    
    $("#save").click(function(){
        if(typeof(localStorage) != null){
        localStorage.setItem("imgCanvas", canvas.toDataURL());
    }else{
        window.alert("ne podrzava lokal storage");
    }
    })
    
    
    
    $("#erase").click(function(){
       if(paint_erase == "paint"){
           paint_erase = "erase";
       }else{
           paint_erase = "paint";
       }
        $(this).toggleClass("eraseMode");
    });
    
    
    $("#paintColor").change(function(){
       $("#circle").css("background-color", $(this).val()); 
    });
    
     
    
    $("#slider").slider({
       min: 3,
       max: 30,
       slide: function(event, ui){
           $("#circle").height(ui.value);
           $("#circle").width(ui.value);
           ctx.lineWidth = ui.value;
       }
   }); 
    
     
    
});