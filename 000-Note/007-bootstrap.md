# bootstrap
* 基于类名的前端UI框架
  * 由类名决定样式的一套CSS文件
* 使用
  * 官网下载
  * 把 bootstrap.css 或者 bootstrap.min.css 引入就可以了 link
  * 官网复制粘贴代码
* bootstrap的组件
  * 字体图标
    * **标签随便**
    * 粘贴类名
  * 下拉菜单
    * 和事件相关的需要JS
      * 要俩JS 注意顺序
        * jQuery.js
          * bootcdn搜个线上的先
        * bootstrap.js
## bootstrap布局系统
* 响应式布局 回顾一下
### 栅格布局 layout
* 基于响应式的布局方式
  * 包括容器盒子、版心盒子、行、列
* container 
  * 版心布局
  * 左右自带15px的padding
* row
  * 行
  * 为了低效15px的padding(自带margin -15px)
  * 每个row类名自带display block
* col-xx-n
  * 列 为了分部内容
  * xx 
    * 表示在哪种屏幕下
    * lg 大屏 1200以上
    * md 中屏 1200 - 992 (]
    * sm 小屏 992 - 768
    * xs 超小屏 768以下
  * n
    * 12分之几
    * `col-lg-3` 分四份 就`width: 25%`相当于
* hidden-xx
  * 列隐藏
  * xx表示哪种屏幕
* col-xx-offset-n
  * 列偏移
  * xx 屏幕
  * n 12分之几
* h1 ~ h6
  * 不是标签名 是类名
  * 表示文字大小
* 单词表示颜色
  * default 默认
  * warn 警告黄
  * danger 报错红
  * info 信息蓝
  * success 成功绿
  * 使用
    * 像是 texxt-xx btn-xx 等等
* 表示大小
  * lg
  * md 标准号
  * sm
  * xs
