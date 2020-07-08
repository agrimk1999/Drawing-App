$(function(){
    
   $("#slider").slider({
       min: 3,
       max: 30,
       slide: function(event,ui){
           $("#circle").height(ui.value);
           $("#circle").width(ui.value);
           
       }

       
   }); 
    /*baiscs of canvas drawing*/
    
//    
//    var canvas=document.getElementById("paint");
//    var context=canvas.getContext('2d');
//    
//    
//    
//    //draw a line
//    //declare a new path
//    context.beginPath();
//    
//    //line width
//    context.lineWidth=40;
//    
//    //set line color
//    context.strokeStyle='#a0f64f'
//    //set cap to the line(round,butt,square)
//    context.lineCap="round";
//    
//    
//    //set line joint
//    context.lineJoin="round";
//    
//    //positioned the start point
//    context.moveTo(50,50);
//    //draw a straight line to another position
//    context.lineTo(200,200);
//    
//    
//    //draw another line
//    context.lineTo(400,100);
//    //make line visible
//    context.stroke();
//    
      
    
    /*code to draw*/
    
    //declare variables
      var paint=false;//paintingerasing or not
      var paintErase="paint";//painting or erasing
     var canvas=document.getElementById("paint");//get the canvas and context
    var ctx=canvas.getContext('2d');   
    
    
    var container=$("#container");//get the canvas container
    var mouse={x: 0, y: 0};//mouse position an object
    
    
 //onload load saved work from local storage
   if(localStorage.getItem("imgCanvas")!=null)
       {
               
         var img = new Image();
           img.onload=function(){
               ctx.drawImage(img,0,0);
           }
           img.src=localStorage.getItem("imgCanvas");
       };
    
    
    //set drawing parameters(linWidht,lineJoin,lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin= "round";
    ctx.lineCap= "round";
    
    
    //click inside container
    container.mousedown(function(){
       paint=true;
//        window.alert(paint);
        ctx.beginPath();
        mouse.x=e.pageX - this.offsetLeft;//container ma kya ha coordinate
        mouse.y=e.pageY - this.offsetTop;
        
        ctx.moveTo(mouse.x,mouse.y);
        
    });
    
    
    
    //move thw mouse while holding mouse key
    container.mousemove(function(e){
       mouse.x=e.pageX - this.offsetLeft;//container ma kya ha coordinate
        mouse.y=e.pageY - this.offsetTop;
        if(paint==true)
            {
                if(paintErase=="paint")
                    {
                        //get color input
                        ctx.strokeStyle= $("#paintColor").val();

                    }
                else{
                    //erase white color use
                    ctx.strokeStyle="white";
                }
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();

            }
        
    });
    
    //mous up->we are not paintingerasing anymore
    container.mouseup(function(){
        
       paint=false; 
        
    });
    
    //if we leave the container we are not paintingerasing anymore 
    container.mouseleave(function(){
        
       paint=false; 
        
    });
    //click on the reset button
    $("#reset").click(function(){
        
       ctx.clearRect(0,0,canvas.width,canvas.height);
        paintErase="paint";
        $("#erase").removeClass("eraseMode");
        
    });
    //click on save button
    $("#save").click(function(){
        
       if(typeof(localStorage)!=null)
        {
            localStorage.setItem("imgCanvas",canvas.toDataURL());
//            window.alert(localStorage.getItem("imgCanvas"));
           

        }
    else{
        window.alert("Your browser doesn't support local storage");
    }
//    sessionStorage-> stores data for a given user session
     
    });
    
    //click on erase button
    $("#erase").click(function(){
       if(paintErase=="paint")
           {
               paintErase="erase";

           }
        else{
            paintErase="paint";

        }
        $(this).toggleClass("eraseMode");
        
        
    });
    //click on color input
    $("#paintColor").change(function(){
       $("#circle").css("background-color", $(this).val());
        
        
        
    });
    
    
    //change lineWidth using slider
     $("#slider").slider({
       min: 3,
       max: 30,
       slide: function(event,ui){
           $("#circle").height(ui.value);
           $("#circle").width(ui.value);
           ctx.lineWidth=ui.value;
       }

       
   }); 
    
    
    
    
    
    
    
    
});