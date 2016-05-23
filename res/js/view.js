var View = {
    canvas     : null,
    canvas_2d  : null,
    image_view : new Image(),
    images     : [],
    has_load   : 0,
    scale      : 1.25,
    init : function(){
        this.canvas = $(setting.canvas)[0];
        this.canvas.width = Gui.getWindowWidth();
        this.canvas.height = Gui.getWindowHeight();
        this.canvas_2d = this.canvas.getContext('2d');
        for(var i in Data.charactor){
            this.load_image(i,Data.charactor[i].img);
        }
    },
    
    load_image : function( num, url){
       this.image_view.addEventListener("load", function(e){
            //Gui.debug(e.path);
            View.images[num] = e.path[0];
            View.has_load++;
        }, false);
        this.image_view.src = url; // Set source path
    },
    
    drawCharactor : function( x, y, type, num, img){
        //Gui.debug(img);
        this.canvas_2d.drawImage(img,32*num,32*type,32,32,x,y,32*this.scale,32*this.scale);
    },
    
    charactor : function( num, x, y, direction, state){ // name ,x ,y, , direction
        if(this.has_load == Data.charactor.length){
            //Gui.debug(Data.charactor[num].num);
            this.drawCharactor( x, y, direction, Data.charactor[num].num, this.images[num]);
            if(direction != Data.charactor[num].direction){
                Data.charactor[num].num = 1;
            }else{
                if(state==0)
                Data.charactor[num].num = 0;
                if(state==1)
                Data.charactor[num].num = 2;
            };
            Data.charactor[num].direction = direction;
            /*
            if(direction == Data.charactor[num].direction){
                if(Data.charactor[num].num==0)
                    Data.charactor[num].num=2;
                else
                    Data.charactor[num].num = 0;
            }else{
                Data.charactor[num].num = 1;
                Data.charactor[num].direction = direction;
            };*/  
        }else{
            setTimeout(function(){View.charactor(num, x, y, direction)},200);
            Gui.debug('Image 未讀取完成 : '+this.has_load+'='+Data.charactor.length, 'View');
        };
    },
    
    text    : function( text){
        this.canvas_2d.font = text.font||"30px Comic Sans MS";
        this.canvas_2d.fillStyle = text.color||"white";
        this.canvas_2d.textAlign = text.textAlign||"left";
        this.canvas_2d.fillText( text.text, text.x, text.y);
    },
    
    clear   : function( x1, y1, x2, y2){
        if(x1)
            this.canvas_2d.clearRect( x1, y1, x2, y2);
        else
            this.canvas_2d.clearRect( 0, 0, Gui.getWindowWidth(), Gui.getWindowHeight());
    }
    
};