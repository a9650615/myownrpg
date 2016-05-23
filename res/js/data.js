var Data = {
    charactor : [
        {
            img : 'res/assassin1a.png',
            direction : 0,//down left right up,
            num : 0,
            x   : 0,
            y   : 0,
            speed: 15,
            distance:0,
            going:false
        }
    ],
    map : {
        forget_forest : {
            
            width : 1000, //px
            height: 1000,
            bg    : 'res/bg.jpg',
            name  : '遺忘之森',
            npc   : {
                
            },
            obj   : [
                {
                    x : 10,//自動遵從32px
                    y : 10,//第十塊
                    b_x:5,//圖片的第幾塊
                    b_y:1,
                    res:0,//第0塊
                }
            ],
            res  : [
                'res/rpg_maker_xp_the_best_tileset_by_davide_86.png'
            ]
            
        }
    }
};