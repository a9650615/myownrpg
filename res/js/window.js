
var Gui = {
    
    debug : true,
    
    blur  : false,
    
    consoles: [],
    
    debug_show: 'View',
    
    __source    : require('nw.gui'),
    
    __main_type :{},//Mainwindow data
    
    Main_window : function(){ // 取得主視窗
        return this.__source.Window.get();
    },
    
    getWindowHeight : function(){
        return window.innerHeight; // 取得視窗高度
    },
    getWindowWidth : function(){
        return window.innerWidth; // 取得視窗寬度
    },
    
    debug   :   function( text, title, type){
        if(this.debug){
        var color;
        if(type=='err'){
            color = 'red'
        }else{
            color = 'green'
        };
            if(typeof text != 'object')
                console.log('%c'+(title||'Debug')+' : '+text+' ;', 'color: '+color+';');
            else{
                console.log('%c'+(title||'Debug')+' : ', 'color: '+color+';');
                console.log(text);  
            };
            //------測試中----//
            if(this.debug_show=='all'||this.debug_show.split('|').indexOf(title)!=-1){
                this.consoles[2] = this.consoles[1]||'';
                this.consoles[1] = this.consoles[0]||'';
                this.consoles[0] = {text:'['+(title||'Debug')+'] '+text,color:color};  
            };
        }
    }
    
};



Gui.Main_window().on('focus', function() {
  Gui.blur = false;
  if(Game.__start&&Game.blur_stop)
    Game.updateFrame();
});

Gui.Main_window().on('resize', function(){
    $('#main_can').attr('width',Gui.getWindowWidth()).attr('height',Gui.getWindowHeight())
});

Gui.Main_window().on('blur', function() {
    Gui.blur = true;
});


/*
win.on('minimize', function() {
  console.log('Window is minimized');
});
*/