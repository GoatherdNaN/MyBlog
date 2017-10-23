1. Javascript中的cookie是 一系列由分号隔开的名-值对，如下面的淘宝的cookie，如下：

```
document.cookie = “isg=E5AA5F2CEE8AA93BB351D1601F7B218E; thw=cn; _med=dw:1920&dh:1080&pw:1920&ph:1080&ist:0; v=0; t=1292efa78d867ff6275e6c5cb971bed7”;
```
2. 设置cookie的超时

```
expires;   // 设置cookie的过期的时间

 /*以下设置 cookie 在 365天后超时；*/

 var date = new Date();

 date.setTime(date.getTime()+365*24*3600*1000);

 document.cookie = ‘key:value;expires =’ + date.toGMTString();

```
下面是设置cookie， 删除cookie，及 获取cookie的封装代码如下：

```
// 获取所有的cookies
function getCookies() {
    var allCookies = document.cookie;
    return decodeURIComponent(allCookies);
}
// 获取指定的cookie
function getOneCookie(name) {
    var allCookies = document.cookie.split(";");
    for(var i = 0, ilen = allCookies.length; i < ilen; i++) {
        var temp = allCookies[i].split("=");
        if($.trim(decodeURIComponent(temp[0])) == name) {
            return decodeURIComponent(temp[1]);
         }
    }
    return -1;
}
// 添加cookie 有效期是一年
function addCookie(name,value,expires,path,domain,secure) {
    var curCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if(expires instanceof Date) {
        curCookie += ';expires =' + expires.toGMTString();
    }else {
        var date = new Date();                
        date.setTime(date.getTime()+365*24*3600*1000);
        curCookie += ';expires =' + date.toGMTString();
    }
    if(path) {
        curCookie += "; path=" + path;
    }
    if(domain) {
        curCookie += "; domain=" +domain;
    }
    if(secure) {
        curCookie += "; secure";
    }
    document.cookie = curCookie;
 }
 // 删除cookie 
 function removeCookie(name,path,domain,secure) {
     addCookie(name,"",new Date(0),path,domain,secure);
 }
```
下面我们来做一个小需求，比如一个登陆页面，有 有户名，密码，记住密码，及显示cookie和删除cookie按钮。当我点击记住密码的时候，那么当我第重启开页面时候，只要输入用户名，密码会自动填充，当然我们也可以点击删除cookie按钮进行删除，如下代码：

```
<!--html-->
<h2>cookie介绍</h2>
<p>
     <label>用户名:</label>
     <input type="text" class="userName" id="userName"/>
</p>
<p>
     <label>密码:</label>
     <input type="password" id="password">
</p>
<p>
     <label>记住密码:</label>
     <input type="checkbox" id="remember"/>
</p>
<input value="删除" type="button" id="delCookie">  
<input type="button" value="显示cookie" id="showpassword">
<!--js-->
<script>
        // 获取所有的cookies
        function getCookies() {
            var allCookies = document.cookie;
            return allCookies;
        }
        // 获取指定的cookie
        function getOneCookie(name) {
            var allCookies = document.cookie.split(";");
            for(var i = 0, ilen = allCookies.length; i < ilen; i++) {
                var temp = allCookies[i].split("=");
                if(temp[0] == decodeURIComponent(name)) {
                    return decodeURIComponent(temp[1]);
                }
            }
            return -1;
        }
        // 添加cookie 有效期是一年
        function addCookie(name,value,expires,path,domain,secure) {
            var curCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            if(expires instanceof Date) {
                curCookie += ';expires =' + expires.toGMTString();
            }else {
                var date = new Date();
                date.setTime(date.getTime()+365*24*3600*1000);
                curCookie += ';expires =' + date.toGMTString();
            }
            if(path) {
                curCookie += "; path=" + path;
            }
            if(domain) {
                curCookie += "; domain=" +domain;
            }
            if(secure) {
                curCookie += "; secure";
            }
            document.cookie = curCookie;
        }
        // 删除cookie 
        function removeCookie(name,path,domain,secure) {
            addCookie(name,"",new Date(0),path,domain,secure);
        }
 
        $("#userName").unbind('blur').bind('blur',function(){
              var val = $(this).val();
              if(val) {
                 var curCookie = getOneCookie(val);
                 if(curCookie != -1) {
                    $("#password").val(curCookie);
                 }
              }
        });
        // 记住密码
        $("#remember").unbind('click').bind('click',function(){
            if(document.getElementById("remember").checked) {
                if($("#userName").val() && $("#password").val()) {
                    addCookie($("#userName").val(),$("#password").val());  
                    alert("Saved!");
                }
 
            }
        });
        // 删除cookie
        $("#delCookie").unbind('click').bind('click',function() {
            if($("#userName").val()) {
                removeCookie($("#userName").val());
                alert(getCookies());
            }else {
                alert("用户名为空");
            }
        });
 
        // 显示cookie
        $("#showpassword").unbind('click').bind('click',function(){
            if($("#userName").val()) {
                var curCookie = getOneCookie($("#userName").val());
                if(curCookie != -1) {
                    alert(curCookie);
                }else {
                    alert("没有cookie");
                }
 
            }else {
                alert("没有cookie");
            } 
        });
</script>
```

