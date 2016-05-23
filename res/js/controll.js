var Controll = {
    
    nowClick    :   null,
    allClicks   :   [],
    __bindEves     :   {
        keydown : {},
        keyup   : {},
    },
    
    init : function(){
        var t = this;
        $(document).keydown(t.keydownEve);
        $(document).keyup(t.keyupEve); 
    },
    
    keydownEve : function(e){
        //Gui.debug(Controll.checkIsIn(e.keyCode),'是否有');
        if(Controll.checkIsIn(e.keyCode)==-1){
           Controll.allClicks.push(e.keyCode); 
           Controll.nowClick = e.keyCode;
           Controll.callEve('keydown');
           Gui.debug('鍵碼'+e.keyCode,'Controll');
        };
    },
    
    keyupEve : function(e){
        var i = Controll.checkIsIn(e.keyCode);
        if(i!=-1){
            Controll.allClicks.splice( i, 1);
            Controll.callEve('keyup');
        };
    },
    
    // 檢查是否已經按了
    checkIsIn : function(code){
        var i = this.allClicks.indexOf(code) ;
        return i;
    },
    
    getClick : function (){
        return {nowClick : this.nowClick, allClicks : this.allClicks};
    },
    
    callEve : function(type){
        var eve = this.__bindEves[type];
        for(var i in eve){
            if(eve[i]['keys']){ // 假設有key
              for(var ii  in eve[i]['keys']){
                    if(eve[i]['keys'].indexOf(this.nowClick)!=-1){
                        eve[i]['function'](this);
                    };
                };  
            }else{ //沒key
                eve[i]['function'](this);
            };
            
        };
    },
    
    bindEve : function( Name, Eve){
        if(typeof Eve == 'object'){
          for(var i in Eve){
              this.__bindEves[i][Name] = Eve[i];
              if(Eve[i] == null){
                delete  this.__bindEves[i][Name];
              };
          };
        };
    }
    
};