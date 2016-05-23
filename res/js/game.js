var Game = {
    fps :    null,
    one_step    :   20,//走一步距離
    last_update_time    :   0,
    time_cut    : 0,
    blur_stop   : true,
    __start     : false,
    start : function(){
        var con = [
                        setting.control.down,
                        setting.control.left,
                        setting.control.right,
                        setting.control.up
                    ];
        var Eves = {
            keyup   :{
                 keys    :   
                Ext.ArrConcat(
                    setting.control.up,
                    setting.control.down,
                    setting.control.left,
                    setting.control.right
                ),
                function:   function(t){
                    for(var i in con){
                        for(var ii in con[i]){
                            if(t.allClicks.indexOf(con[i][ii])!=-1){
                                t.nowClick = t.allClicks[t.allClicks.length-1];
                                for(var i in con){
                                    if(con[i].indexOf(t.nowClick)!=-1){
                                        Data.charactor[0].direction = i;  
                                    };
                                };
                                return 0; 
                            };
                        };
                    };
                    Data.charactor[0].going = false;
                    Data.charactor[0].distance = 0;//距離歸0(感覺不歸零可以做紀錄?
                }
            },
            keydown : {
                keys    :   
                Ext.ArrConcat(
                    setting.control.up,
                    setting.control.down,
                    setting.control.left,
                    setting.control.right
                ),
                function:   function(t){
                    for(var i in con){
                        if(con[i].indexOf(t.nowClick)!=-1){
                            Data.charactor[0].direction = i;  
                        };
                    };
                    Data.charactor[0].going = true;
                }
            }
        };
        Controll.bindEve('Game_controll',Eves);
        this.__start = true;
        this.updateFrame();
    },
    showFps : function (){
        var date = new Date();
        this.time_cut   = date.getTime() - this.last_update_time;
        this.last_update_time = date.getTime();
        var num = new Number((1/this.time_cut)*1000);
        this.fps = num.toFixed(2);
        if(Gui.debug)
         View.text({
            text:   'FPS:' + this.fps,
            x   :   Gui.getWindowWidth()-80,
            y   :   40,
            textAlign:'center'
        });
    },
    dealCharacter:function(num){
        if(Data.charactor[num].going){
            var go = Data.charactor[num].speed * this.time_cut/100;
            var dir = Data.charactor[num].direction;
            
            if(dir==0)
                Data.charactor[num].y += go;
            else if(dir==1)
                Data.charactor[num].x -= go;
            else if(dir==2)
                Data.charactor[num].x += go;
            else if(dir==3)
                Data.charactor[num].y -= go;
            
            Data.charactor[num].distance += go;
            var state = (Data.charactor[num].distance / this.one_step);
            state = parseInt(state % 2);
        };
        
        View.charactor(num,Data.charactor[num].x,Data.charactor[num].y,Data.charactor[0].direction,state||0);
    },
    updateFrame :   function(){
        View.clear();
        this.dealCharacter(0);
        this.showFps();
        var t = this;
        var h = Gui.getWindowHeight();
        
        
        for(var i in Gui.consoles){
            View.text({x:10,y:h-i*20-10,font:'20px Noto Sans TC',text:Gui.consoles[i].text,color:Gui.consoles[i].color});
        }
        
        setTimeout(function(){
            if(t.blur_stop==false)
               t.updateFrame();
            else if((t.blur_stop&&!Gui.blur))
               t.updateFrame();
        },1000/setting.max_FPS);
    }
};