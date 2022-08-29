==HTML 超文本标记语言 Hyper Text Markup Language==
# W3C
* World Wide Web Consortium 万维网联盟
* 1994.10 麻省理工学院计算机科学实验室
* HTML结构 CSS表现 JS行为

# 你的第一个网页
## HTML基本语法
### 常规标记
* 也叫双标记，有头有尾
* `<标记></标记>`
* `<标记 属性 = "属性值" 属性 = "属性值"></标记>`
* 标记也可叫标签或元素
  `<head></head>`

### 空标记
* 也叫单标记
* `<标记 />`
* `<标记 属性 = "属性值" />`
  `<br />`

# 趁手兵器 VScode
* 插件
  * `live server`
  * `open in browser`
  * `auto rename tag`
  * `htmltagwrap`

# 文档声明与字符编码
`<html lang="en">`
* `en` 代表英语
* `zh-CN` 代表中文
* `ja-jp`代表日文
  * 要求：言行一致

`<meta charset="***">`
* ASCII 美国信息交换标准代码
* ISO-8859-1 拉丁字母表的字符编码
* GB2313 汉字编码字符集
* UTF-8 Unicode万国码字符编码

# 语义化
## 优势
* 裸奔好看
* 爬虫喜欢
* 维护方便

# 常用标签 
### 文本标题(h1-h6)
`<h1>一级标题</h1>`
`<h6>六级标题</h6>`
* 自带加粗，自带大小，独占一行，默认间距，h1建议只有一个

### 段落文本(p)
`<p>段落文本内容</p>`

### 换行(br)
`<br/>`

### 水平线(hr)
`<hr/>`

### 加粗
* `<b>加粗b的内容</b>`只是显示加粗
* `<strong>强调strong的内容</strong>`突出文本
* 推荐使用==strong==

### 倾斜
`<em>强调em文本</em>`
`<i>倾斜i文本</i>`
推荐==em==

### 删除线
`<s>内s容</s>`
`<del>内del容</del`>`
推荐==del==

### 扩展
`<u>文本</u>`下划线
`<sub></sub>`下标
`<sup></sup>`上标

# `<hr>`
* 属性 
    * `color`
    * `width`
    * `align`（靠着哪儿）left right 
    * `noshade` 无阴影

# 特殊符号表示
`&lt;` 表示 <
`&gt;` 表示 >
`&nbsp;` 表示空格&nbsp;，其宽度受字体影响，
`&emsp;` 表示空格&emsp;，==正好占据一个中文宽度==。
`&copy;` 版权符号 &copy;
`&trade;`和`&reg;` 表示商标&trade;和 &reg;
`&#128521;` 小表情 &#128521;
`Lorem`生成一堆话。

# div和span
* 快捷创建
  * `div{内容}*数量`
  * `div{123123}*3`
* div标签，没有具体含义，用来划分页面的区域，独占一行。
* span标签，没有实际意义，主要应用于对文本独立修饰的时候，内容有多宽就占用多宽的距离。

# 列表
### 无序列表
`<ul>`
    &emsp;`<li>内容</li>`
`</ul>`

  * 快速创建：`ul>li{内容}*数量`
  * 默认是黑色实心圆
  * `type= disc, circle, square, none(常用)`

### 有序列表
  * `type` = a, A, i, I, 1
  * `start` 只能取值数字，表示从第几个开始。
`<ol type='A' start='4'> `
    &emsp;`<li>内容</li>`
`</ol>`
### 自定义列表
`<dl>`
    &emsp;`<dt>可以是文字也可以是图</dt>`
    &emsp;`<dd>相关文字</dd>`
`</dl>`
  * 快速创建：`dl>dt{picture}+dd{text}`

# 图片标签的路径
* 同级目录 
  * `<img src="test.png"/>`
  * `<img src="./test.png"/>`
  * `<img src="D:\WebQF\000-Note\images\test.png"/>` 绝对路径，少用。
  * `"../"` 表示上一级

* src 路径, title 鼠标悬停时的提示信息(加载失败或是悬停在文字上也可显示), alt 加载失败的提示信息。

# 超链接标签
`<a href="路径" title="鼠标悬停时的提示信息" target="规定在何处打开文档">内容</a>`

* target = 默认：_self, 新窗口打开：_blank

# table表格
### 快速创建：
`table>tr*2>td{1}*3`
### table 属性
   * `width` 宽度     px = 无单位;  % 相对于父元素的百分比. 高度特殊，随时长高，层层积累。
   * `border` 边框
   * `bordercolor` 边框颜色
   * `bgcolor` 背景颜色
   * `align` 水平对齐: `left`, `right`, `center`
   * `cellspacing` 单元格与单元格之间的距离
   * `cellpadding` 单元格与内容之间的空隙
### 行 `tr` 属性 TableRow
   * `height`
   * `bgcolor`
   * `align` 文字水平对齐: `left`, `center`, `right`
   * `valign` 文字垂直对齐 `bottom`, `middle`, `top`
### 单元格 `td` 属性 TableData
   * `height`
     * 如果一个单元格设置了高度，影响的是对应的一整行。
   * `width`
     * 如果一个单元格设置了宽度，影响的是对应的一整列。
   * `bgcolor`
   * `align` 文字水平对齐: `left`, `center`, `right`
   * `valign` 文字垂直对齐 `bottom`, `middle`, `top`
### 表格合并列
   ==colspan== "所要合并的单元格的==列数=="，必须给td
### 表格合并行
   ==rowspan== "所要合并的单元格的==行数=="，必须给td

# 表单标签
`<from method="get或者post，默认GET" action="向何处发送表单数据">`
  `<input />`
### 属性 `type` 
定义输入框的类型
  * `text` 文本框
  * `password` 密码框
  * `submit` 提交框  等价于 `<button>提交</button>`
  * `button` 按钮框
  * `reset` 重置框
### 属性 `placeholder` 
描述输入字段预期值的简短的提示信息。兼容IE8以上。
### 属性 `name` 
必须设置，否则在提交表单时，用户在其中输入的数据不会被发送给服务器。
### 属性 `value`
`</from>`

### Form当中method的post和get的区别?
1. get是从服务器上**获取**数据，post是向服务器**传送**数据。
2. get是把参数数据队列加到提交表单的ACTION属性所指的URL中，值和表单内各个字段一一对应，**在URL中可以看到**。post是通过HTTP post机制，将表单内各个字段与其内容放置在HTML HEADER内一起传送到ACTION属性所指的URL地址。**用户看不到这个过程**。
3. 对于get方式，服务器端用**Request.QueryString**获取变量的值, 对于post方式， 服务器端用**Request.Form**获取提交的数据。
4. **get传送的数据量较小**，不能大于2KB。**post传送的数据量较大**，一般被默认为不受限制。但理论上, IIS4 (Internet Information Service互联网信息服务)中最大量为80KB, IIS5中为100KB