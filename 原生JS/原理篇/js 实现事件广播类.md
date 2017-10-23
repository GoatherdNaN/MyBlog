
```
/** 
 * @class $$.Event 
 */  
$$.event = function(){  
    var events = {};  
      
    this.addEvents = function(){  
        for(var i = 0, j = arguments.length; i < j; i++){  
            events[arguments[i].toLowerCase()] = [];  
        }  
    }  
      
    /** 
      * 添加一个事件侦听器。 
      * @param  {String}   name 
      * @param  {Function} fn 
      * @return {this} 
      */  
    this.addListener = this.on = function(name, eventHandler) {  
        var eventQueen = events[name.toLowerCase()];  
          
        if(!eventQueen){  
            throw '没有该事件！请使用addEvent()增加事件';  
        }  
  
        eventQueen.push(eventHandler);  
          
        return this;  
    }  
      
    /** 
      * 触发事件。 
      * @param {String} name 
      * @param {Array}  args 
      * @return {Boolean} 
      */  
    this.fireEvent = function(name) {  
        var eventQueen = events[name.toLowerCase()]; // listeners  
        var args = eventQueen.length && Array.prototype.slice.call(arguments, 1);   
                      
        var result;  
        var output = [];  
          
        for (var i = 0, j = eventQueen.length; i < j; i++) {  
            result = eventQueen[i].apply(this, args);  
              
            if(result === false){  
                break;  
            }else{  
                output.push(result);  
            }  
        }  
      
        return output;  
    }  
      
    /** 
      * 移除事件侦听器。须传入原来的函数句柄。 
      * @param {String}   name 
      * @param {Function} fn 
      * @return {this} 
      */  
    this.removeListener = function(name, fn) {  
        if (events[name]) {  
            Array_Remove(events[name], fn);  
        }  
        return this;  
    }  
}  
  
/** 
 * 删掉某个元素。 
 * @param   {Array} arr 
 * @param   {Mixed} el 
 * @return  {Mixed} 
 */  
function Array_Remove(arr, el){  
    var index = -1;  
    for(var i = 0, j = arr.length; i < j; i++){  
        if(arr[i] == el){  
            index = i;  
            break;  
        }  
    }  
    arr.splice(index, 1);  
    return el;  
}
```
