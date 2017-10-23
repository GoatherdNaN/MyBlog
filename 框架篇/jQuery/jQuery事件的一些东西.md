
```
<!--事件委托-->
$(被委托对象).on(事件类型，委托对象(选择器)，function(){})
$(被委托对象).delegate(委托对象(选择器),事件类型,function(){}
$(被委托对象).live(事件类型,function(){});<!--直接委托给doucment-->
<!--模拟事件-->
$(对象).trigger('事件类型')；//注意，模拟的事件本身得存在于代码中或浏览器默认的事件
$(categoryDom).trigger("change");
```
