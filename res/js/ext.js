var Ext = {
    
    ArrConcat : function(){
        var arg = arguments;
        var conb = [];
        for(var i in arg){
            conb = conb.concat(arg[i]);
        }
        return conb;
    }
    
};