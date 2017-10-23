## 一、jsonp跨域实现
> 原理：借助script可以跨域的思想，将跨域请求放在script中，当页面解析到该script标签时，就会向该src指向的地址发出一个请求，达到跨域请求的目的。

两点：（1）主要是利用了 <script/>标签的跨域性                   
   （2）script标签对javascript文档的动态解析来实现

服务器端配合处理： 在前端传入事件处理函数如**url?callback=fun**，后台获取这个callback参数，通过字符串拼接，组合成函数调用的形式，将数据也拼接进去，构造js代码，返回给前端的script标签，在前端script标签会自动执行返回的代码。（因为后台没法直接执行函数调用），所以是在后台返回一个拼接的调用形式，返回给前端，script标签会自动执行，从而实现跨域。

demo：
```
<script>
    function handlerData(data){ alert('获取到数据');
        console.log(data);  
    }
</script>
<script src='http://webgis.ecnu.edu.cn/beta/cross.php?callback=handlerData'></script>
```
服务器端：


```
<?php
$callback = $_GET['callback'];
$data ='["hello","world"]';
echo $callback."(".$data.")";   //拼接字符串   或者 "try" $callback."($data)". "catch(e){}"
?>
```
### 优缺点：

使用JSON的优点在于：

- 比XML轻了很多，没有那么多冗余的东西。
- JSON也是具有很好的可读性的，但是通常返回的都是压缩过后的。不像XML这样的浏览器可以直接显示，浏览器对于JSON的格式化的显示就需要借助一些插件了。
- 在JavaScript中处理JSON很简单。
- 其他语言例如PHP对于JSON的支持也不错。
 
JSON也有一些劣势：      
- 第一，也是最重要的一点，没有关于 JSONP 调用的错误处理。如果动态脚本插入有效，就执行调用；如果无效，就静默失败。失败是没有任何提示的。例如，不能从服务器捕捉到 404 错误，也不能取消或重新开始请求。不过，等待一段时间还没有响应的话，就不用理它了。（未来的 jQuery 版本可能有终止 JSONP 请求的特性）。
- JSONP 的另一个主要缺陷是被不信任的服务使用时会很危险。因为 JSONP 服务返回打包在函数调用中的 JSON 响应，而函数调用是由浏览器执行的，这使宿主 Web 应用程序更容易受到各类攻击。如果打算使用 JSONP 服务，了解它能造成的威胁非常重要。
## 二、服务器端代理实现
具体的思路：由于浏览器有同源策略限制，想要跨域访问其他域下的资源，需要绕开浏览器的这个限制，可以在服务器端设置一个代理，由服务器端向跨域下的网站发出请求，再将请求结果返回给前端，成功避免同源策略的限制。
具体操作如下：

###### 1、在localhost:81/a.html中，向同源下的某个代理程序发出请求

```
$.ajax({
    url:'/proxy.php?name=hello&info=information',   //服务器端的代理程序
    type:'GET',
    success:function (){}

})
```
###### 2、在代理程序proxy.php中，向非同源下的服务器发出请求，获得请求结果，将结果返回给前端。

```
<?php 

$name=$_GET['name'];
$info = $_GET['info'];
$crossUrl = 'http://b.com/sub?name='.$name;   //向其他域下发出请求
$res = file_get_contents($crossUrl);
echo $res; 
?>
```
## 三、CORS跨域资源共享
###### CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。来看一段完整的小代码：

```
// 创建XHR对象
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if("withCredentials" in xhr) {
		// 针对Chrome/Safari/Firefox.
		//open方法 创建一个新的http请求，并指定此请求的方法、URL以及验证信息(用户名/密码)
		xhr.open(method, url, true);
	} else if(typeof XDomainRequest != "undefined") {
		// 针对IE
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		// 不支持CORS
		xhr = null;
	}
	return xhr;
}

// 辅助函数，用于解析返回的内容
function getTitle(text) {
	return text.match('')[1];
}

// 发送CORS请求
function makeCorsRequest() {
	// bibliographica.org是支持CORS的
	var url = 'http://bibliographica.org/';

	var xhr = createCORSRequest('GET', url);
	if(!xhr) {
		alert('CORS not supported');
		return;
	}

	// 回应处理
	xhr.onload = function() {
		var text = xhr.responseText;
		var title = getTitle(text);
		alert('Response from CORS request to ' + url + ': ' + title);
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}
```
[查看更全跨域解决方案](https://juejin.im/entry/59b8fb276fb9a00a42474a6f)

