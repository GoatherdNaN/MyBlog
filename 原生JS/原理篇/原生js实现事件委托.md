##### 1. 什么是事件委托（代理）？
javascript中的事件委托就是利用冒泡原理，将事件绑定到节点的父级节点上，从而触发这些节点执行代码中编写的效果；
##### 2. 事件委托的好处：
1. 提高js性能；
2. 后续添加的元素同样能触发事件；
##### 3. 理解委托需要掌握的知识点：事件源（event对象中的事件源：无论在哪个事件中，当前操作的元素就是事件源）
IE浏览器中的事件源：window.event.srcElement

标准浏览器中的事件源：event.target

##### 4. 通过示例代码理解事件委托：

```
<!--HTML-->
<body>
    <input id="input1" type="button" value="Add">
    <ul id="ul1">
        <li>1111</li>
        <li>2222</li>
        <li>3333</li>
        <li>4444</li>
    </ul>
</body>
<!--javascript-->
<script>
    window.onload = function(){
        var oUl = document.getElementById('ul1');
        var oInput = document.getElementById('input1');
        iNow = 4;
 
        oInput.onclick = function(){
            iNow ++;
            var oLi = document.createElement('li');
            oLi.innerHTML = 1111 * iNow;
            oUl.appendChild(oLi);
        };
 
        oUl.onmouseover = function(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            if(target.nodeName.toLowerCase() === 'li'){
                target.style.background = 'red';
            }
        };
 
        oUl.onmouseout = function(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            if(target.nodeName.toLowerCase() === 'li'){
                target.style.background = '';
            }
        };
    };
</script>
```
##### 5. 个人总结
事件代理的实现，主要就是先获取事件对象，然后获取事件目标，见上面第3点