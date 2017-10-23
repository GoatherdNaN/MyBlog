### 引入

```
<!--项目的index.html中，这两个文件可上官网下载，也可百度云中下载-->
<script src="./ueditor.config.js"></script>
<script src="./ueditor.all.min.js"></script>
```

### 一、初始化Editor
```
//HTML：容器，类似echarts用法
<div
    id="contract-container"
    style={{
      height: "400px",
      marginTop: "24px",
      paddingBottom: "16px"
    }}
  />
</div>

//初始化，可根据需要更改配置
var ue = UE.getEditor("contract-container", {
      toolbars: [
        [
          "anchor", //锚点
          "undo", //撤销
          "redo", //重做
          "bold", //加粗
          "indent", //首行缩进
          "italic", //斜体
          "underline", //下划线
          "strikethrough", //删除线
          "subscript", //下标
          "fontborder", //字符边框
          "superscript", //上标
          "formatmatch", //格式刷
          "source", //源代码
          "blockquote", //引用
          "pasteplain", //纯文本粘贴模式
          "selectall", //全选
          "horizontal", //分隔线
          "removeformat", //清除格式
          "unlink", //取消链接
          "deletecaption", //删除表格标题
          "inserttitle", //插入标题
          "deletetable", //删除表格
          "cleardoc", //清空文档
          "insertparagraphbeforetable", //"表格前插入行"
          "fontfamily", //字体
          "fontsize", //字号
          "paragraph", //段落格式
          "link", //超链接
          "spechars", //特殊字符
          "searchreplace", //查询替换
          "justifyleft", //居左对齐
          "justifyright", //居右对齐
          "justifycenter", //居中对齐
          "justifyjustify", //两端对齐
          "forecolor", //字体颜色
          "backcolor", //背景色
          "insertorderedlist", //有序列表
          "insertunorderedlist", //无序列表
          "fullscreen", //全屏
          "directionalityltr", //从左向右输入
          "directionalityrtl", //从右向左输入
          "imagenone", //默认
          "imageleft", //左浮动
          "imageright", //右浮动
          "imagecenter", //居中
          "lineheight" //行间距
        ]
      ],
      wordCount: false,
      elementPathEnabled: false
    });
```
### 二、设置值

```
//初始化值
ue.ready(function() {
    ue.setContent(data.content);
});
//中途
ue.setContent(data.content);
```
### 三、获取值

```
ue.getContent();
```
### 四、销毁

```
//一般在componentWillUnmount中将其销毁
ue.destroy();
```
