##### 1. 原因
字体文件在CDN服务器上、项目部署在自己的服务器上，字体文件就出现了跨域加载的问题。
##### 2. 解决方案
###### - 方案一：
设置Access-Control-Allow-Origin，允许目标域名访问就可以了，Access-Control-Allow-Origin是HTML5新增的一个特性，在资源类的域名下做如下配置（nginx的配置，apache相似处理）​

```
location ~ .*\.(eot|ttf|ttc|otf|eot|woff|woff2|svg)(.*) {

    add_header Access-Control-Allow-Origin http://www.yuehetong.com;

}
<!--注意：CDN会缓存当时的Response Header的，每次修改必须刷新CDN缓存，不然浏览器刷死也不会生效。​-->
```

###### - 方案二：
将字体文件以base64编码的方式引入内嵌到样式文件中。书写格式如下：

```
//原来为：
@font-face {  
  font-family: 'icon-tb';  
  src: url('../fonts/icon-tb.eot?59lb71');  
  src: url('../fonts/icon-tb.eot?#iefix59lb71') format('embedded-opentype'), url('../fonts/icon-tb.woff?59lb71') format('woff'), url('../fonts/icon-tb.ttf?59lb71') format('truetype'), url('../fonts/icon-tb.svg?59lb71#icon-tb') format('svg');  
  font-weight: normal;  
  font-style: normal;  
} 

//改为:（实际使用过程将那一长串”X“换成自己的base64编码即可）
@font-face {  
  font-family: 'icon-tb';  
  S<span style="color: rgb(51, 51, 51); font-family: Arial; font-size: 14px; line-height: 26px;">rc : url("data:application/x-font-ttf;charset=utf-8;base64,XXXXXXXXXXXX") format("ttf");</span>  
}  
```
###### - 方案三：
将字体文件放到项目的目录下，也即让它们同源即可，好吧，都是一个爹生的，也不认生啦，问题也就解决了。