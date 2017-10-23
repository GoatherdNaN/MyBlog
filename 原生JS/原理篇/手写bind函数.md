
```
if(!Function.prototype.bind){
　　Function.prototype.bind = function(oThis){
　　　　if(typeof this !=="function"){ //如果不函数抛出异常
　　　　　　throw new TyperError("")
　　　　}
　　　　var aArgs = Array.prototype.slice.call(arguments,1),   //此处的aArgs是除函数外的参数
　　　　fToBind = this,　　　　　　　　　　　　　　　　　　//要绑定的对象
　　　　fNOP = function(){},
　　　　fBound = function(){
　　　　　　return fToBind.apply(
　　　　　　　　this instanceof fNOP ? this:oThis||this,aArgs.concat(Array.prototype.slice.call(arguments)));
　　　　　　)
　　　　};
　　　　fNOP.prototype = this.prototype;
　　　　fBound.prototype = new fNOP();
　　　　return  fBound;
　　}
}
```
