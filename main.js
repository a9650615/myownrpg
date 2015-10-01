var init = {
    hero : {
        url : 'res/assassin1a.png',
        sizeX : 32,
        sizeY : 32,
        row   : 3, // 列
        col   : 4, //排
    },
    control : { //控制判斷
        up : false,
        down : false,
        left : false,
        right : false,
    }
};

var setting = {
    map : {
        sizeX : 32,
        sizeY : 32,
        up    : false,
        down  : false,
        left  : false,
        right : false
    },
    FPS : 60, // 畫面更新率
    moveSpeed : 4,
    canvas : '#main_can' ,
    initPos : { // 初始位置
        x : 200,
        y : 200
    },
    sound : {
        bgSound : 0.5, // 背景音樂音量
        exSound : 0.1, // 音效音量
    },
    animateTime : 1000, // 動畫時間
};

var Main = {
    canvas : null,
    getInitialState : function () {
        //Sound.load();
        return {
            nowMap : 1, // 當前地圖
            messageName : false ,//當前對話人
        };
    },
    init : function (){
        canvas = $(setting.canvas)[0];
        canvas.width = this.getWindowWidth();
        canvas.height = this.getWindowHeight();
    },
    getWindowHeight : function(){
        return window.innerHeight; // 取得視窗高度
    },
    getWindowWidth : function(){
        return window.innerWidth; // 取得視窗寬度
    },
    menuEvent   : function (){
        var nowsel = 0;
        Sound.load_in();
       // Sound.play('menusound','bgSound');
        $(window).on('keydown',function(e){
            switch(e.keyCode){
                case 38: //上
                    if(nowsel>0){
                        nowsel--;
                        Sound.play('select','exSound');
                    };
                break;
                case 40: //下
                    if(nowsel<$('#loadbox .list').length-1){
                        nowsel++;
                        Sound.play('select','exSound');
                    };
                break;
                case 13: //Enter
                    if($('#loadbox .list').eq(nowsel).attr('data-doing')!=undefined){
                        Sound.play('ok','exSound');
                        switch($('#loadbox .list').eq(nowsel).attr('data-doing')){
                            case 'init':
                                $('body').css('background','#000');
                                $('#first_view').fadeOut(setting.animateTime);
                                Main.init();
                            ;break;
                        };
                    }else{
                        Sound.play('error','exSound');
                    };   
                ;break;
            };
            $('#loadbox .list').removeClass('selected').eq(nowsel).addClass('selected');
        });
    }
};

var Sound = {
    init : false,
    path : 'res/sound/',
    tracks : {
        exSound : [
            {
                name : 'select',
                url  : 'select.wav',
            },
            {
                name : 'ok',
                url  : 'ok.wav'
            },
            {
                name : 'error',
                url  : 'error.wav'
            },
        ],
         bgSound : [
            {
                name : 'menusound',
                url  : 'bgsound/background_menu.mp3'
            },
        ],
    },
    AudioContent : window.AudioContext || window.webkitAudioContext,
    bufferLoader : [],
    bufferList   : [],
    players : [],
    has_load : 0, //以讀取至
    has_list : [], //已列
    has_fin :　false,
    load_in : function (url){
        if(this.init){ // 初始化
            for(var i in this.tracks){
                this.has_list.push(i);
            };
            this.load_track();
             
        }else{
            try{
                this.players['bgSound'] = new AudioContext();
                this.players['exSound'] = new AudioContext();
            }catch(e){
                alert('載入Audio 發生錯誤,'+e);
                return false;
            };
            this.init = true;
            this.load_in();
        };
    },
    load_track : function (){
        if(this.has_list[this.has_load]!=null){
            console.log(this.has_list[this.has_load]);
            var tracks = [];//只完成音效
            var tt = this,t = this.has_list[this.has_load];
            for(var i in this.tracks[t]){
                //this.tracks.exSound[i].name
                tracks.push(this.path+this.tracks[t][i].url);
            };
            this.bufferLoader[t] = new BufferLoader(
                tt.players[t],
                tracks,
                function(b){
                    tt.finishLoading(b,t);
                }
            );
            this.bufferLoader[t].load();
        };
        return false;
       
    },
    finishLoading : function( bufferList, t){
        console.log(Sound.bufferList+'w');
        this.bufferList[t] = bufferList;
        this.has_load++;
        this.load_track();
    },
    play : function ( name, type){
        var index = null;
        for(var i in this.tracks[type]){
            if(this.tracks[type][i].name == name){
                index = i;
                break;
            };
        };
    
        if(isNumeric(index)){
            var source = Sound.players[type].createBufferSource();
            var gainNode = Sound.players[type].createGain();
            console.log(this.bufferList);
            source.buffer = this.bufferList[type][index] ;
            source.connect(gainNode);
            source.connect(this.players[type].destination);
            source.start(0);
        };
         //調整音量
         gainNode.gain.value = setting.sound[type];
    }
    
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function finishLoading(bufferList,t){
    // var source = Sound.players['exSound'].createBufferSource();
    // source.buffer = bufferList[0];
    //source.connect(Sound.players['exSound'].destination);
    //source.start(0);
};

$(document).ready(function(){
    //Main.init();
    Main.menuEvent();
});
