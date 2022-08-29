# node
* 官方: 基于Chrome V8引擎的 JavaScript运行时环境
  * 私人: 一个“软件” 能运行JS代码 
* node和其他“软件”的区别
  * 没有图标
  * 运行的时候要告诉它打开哪一个软件
  * 只能在命令行里运行
* 解析引擎
  * JS的解析引擎只能解析JS的语法
  * 前端JS三大核心
    * DOM 因为你的JS是被引入到html文件里
    * BOM 因为你的JS是被运行在浏览器里
      * 需要用到浏览器内核中的解析引擎来解析执行
    * ECMAScript JS的语法标准
  * nodeJS核心
    * ECMAScript 语法标准
    * I/O 输入输出流 读写磁盘
    * system 操作操作系统
  * 书写代码
    * 还是.js后缀
    * 还是JS语法
* node的使用
  * 下载
  * 安装
  * 检测
    * $ node --version
  * 卸载
* 环境变量
  * **对于你的电脑操作系统环境**
  * 开发的一些变量(一个个的文件夹)
  * 运行软件就是找到你安装包里面的 名字.exe 文件
  * 环境变量就是你可以设定开发哪些变量(目录)给你的命令行
    * 只要你把指定目录放在环境变量里面配置好
    * 当你书写一个 名字 的时候 它就会去你的目录里找有没有名字对应的.exe文件
  * 利用环境变量里面的内容运行文件 
    * node不光可以运行绝对路径还可以运行相对路径
* 总结
  * 利用node 在命令行运行JS代码
    * 执行中没有了DOM和BOM 但是可以操作电脑了
  * 实际意义
    * 操作数据库
    * 创建服务 被当做服务器使用
    * 可以靠JS语言进行服务端开发
    * JS写后端
### 命令行常用操作
* 目录结构
* 切换目录
  * cd .. 
  * cd 当前目录下文件夹
  * dir
  * tree:
    * 树状查看当前目录所有后代目录
* 其他
  * cls
  * systeminfo
  * ping
  * ipconfig()
* vscode自带一个命令行
  * ctrl + `
    * 切换到cmd模式
## node运行JS文件
* 直接命令行书写
  * node 回车
  * 等价于浏览器控制台
  * 但是
    * 没有代码提示 
    * 存不下来哈哈哈
  * 退出编辑状态 
    * ctrl + c 两次
* 命令行运行JS文件
  * node JS文件名
## 在当前目录打开cmd
* regedit
  * directory
    * background
      * shell
        * 新建 项
        * 数据
        * 新建字符串 cmd.exe 名称icon
          * 新建 项
            * cmd.exe
## node开发模式
* 必须模块化开发
  * node的模块化标准叫commonJS
  * 其实就是导入导出文件的语法
* 为啥必须模块化?
  * 前端
    * 当JS代码引入html页面使用的时候
    * 一个页面引入多个JS文件
    * 这些JS文件会有共同的window
    * 我想在别的文件里面使用的内容 就挂载到window上
  * node
    * JS代码在命令行里运行
    * 每一次只能执行一个JS文件 
    * 多个JS文件之间没有关联 也没有共同的顶级对象
      * 只能使用模块化的方式 导入导出 
* 什么是模块
  * 一个独立的JS文件就是一个模块 
    * 里面存储一类方法
  * 每个JS文件都不能访问其他文件里面的变量  
    * node环境下 每个JS文件叫做一个模块作用域 独立的
## node的模块分类
  * 自定义模块
  * 内置模块
  * 第三方模块
* 每个JS文件自带一个变量module
```JavaScript
  Module {
  id: '<repl>',
  path: '.',
  exports: {},  // 我向外暴露的内容 我允许别人使用的我这个文件里的某些内容
  parent: null, // 哪些文件引用着我
  filename: null,
  loaded: false, // 我没有被导入过
  children: [], // 我引用了谁
  paths: [ // 你下载的第三方模块的存储路径
    'D:\\WebQF\\repl\\node_modules',
    'D:\\WebQF\\node_modules',
    'D:\\node_modules',
    'C:\\Users\\colorful3327\\.node_modules',
    'C:\\Users\\colorful3327\\.node_libraries',
    'C:\\Program Files\\nodejs\\lib\\node'
  ]
}
undefined
```
### 自定义模块
* 导出语法
  * 在一个文件中向外导出一些内容使用
    * module.exports 向这个对象里添加成员就可以
      * `module.exports.timeA = timeA`
    * 也可以直接把module.exports替换掉
* 导入
  * `require('指定文件路径')`
  * 路径后缀是.js可以不写
  * 返回值是指定文件内部的module.exports
  * `const modA = require('./a.js')`
  * 使用 `modA.timeA()`
  * 可以按需导入
    * `const { B_A } = require('./b')`
    * 相当于`const B_A = require('./b').B_A`
    * 使用 `B_A()`
### fs内置模块
* fs - file system
  * node内置的模块 里面存放的都是**操作文件相关**的方法
  * 使用的时候不需要自己定义 但是需要导入
* 导入
  * `const fs = require('fs')`
* 说一些方法
  * readFile()
    * 异步读取文件
    * 语法: `readFile(路径[, 格式], 回调函数)` []表示选填
      * 格式 读取文件默认是buffer格式的文件
        * 可以选填 'utf8' 'utf-8'
      * 回调函数 读取成功以后执行的回调函数
        * function(err, data) {}
  * readFileSync()
    * 同步读取文件
    * 语法: `readFileSync(路径[, 格式])`
    * 返回值: 读取到的内容
    * 出错直接控制台报错
  * writeFile()
    * 异步写入文件
    * 语法: `writeFile(路径, 内容, 回调函数)`
      * 路径: 存在就写入 **不存在就创建再写入**
      * 内容: 
      * 回调函数: 必须写
      * 注意 完全覆盖式的写入
  * writeFileSync()
    * 同步写入文件
    * 语法: `writeFileSync(路径, 内容)`
### path内置模块
* 操作和**路径**相关的内容
  * 导入 `const path = require('path')`
* extname()
  * 专门获取一个路径中的后缀名
  * `path.extname('文件名')`
* isAbsolute()
  * 判断是不是绝对路径
  * `path.isAbsolute('路径地址')`
  * 返回值 布尔值 
  * 路径表示方法
    * 文件名 test.js    同级目录下的
    * ./     ./test.js  同级
    * ../    ../test.js 上一级
    * /      /test.js   根目录下
* join()
  * 多个参数直接帮你拼接成相对路径
  * `path.join('地址1', '地址2', '地址3', ···)`
  * 返回值: 拼接好的相对路径
    * 除了../ 任何一个地址都是拼接在前一个地址后面
* resolve()
  * 多个参数直接帮你拼接成绝对路径
  * `path.resolve('地址1', '地址2', '地址3', ···)`
    * 每一个参数位置都是相对于当前文件所在的目录而设置的
    * /xxx 会直接回到根目录
  * 返回值: 拼接好的绝对路径
* parse()
  * 解析一个路径 成为一个对象
  * `path.parse()`
  * 返回值: 一个对象 里面包含一个地址的所有信息
### url内置模块
* 专门**操作url地址**的模块
  * 导入: `const url = require('url')`
* parse()
  * 解析url地址
  * `url.parse(url地址[, 是否解析query])`
    * 第二个参数默认false
  * 返回值 一个对象包含url所有信息
D:\WebQF\nodeJS>node a.js
```JavaScript
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.colorful.com:3327',
  port: '3327',
  hostname: 'www.colorful.com',
  hash: '#wc',
  search: '?a=129&b=49',
  query: 'a=129&b=49',
  pathname: '/h/j/y',
  path: '/h/j/y?a=129&b=49',
  href: 'https://www.colorful.com:3327/h/j/y?a=129&b=49#wc'
}
```
### HTTP内置模块
* 专门进行HTTP服务的
  * 导入 `const http = require('http')`
* createServer()
  * 专门创建HTTP服务
  * `http.createServer(函数)`
  * 返回值 一个http服务
  * 函数
    * 接收两个参数
    * request 本次请求的所有请求信息
      * 服务器解析完请求报文以后 组装的内容
      * 你需要获取请求报文的什么内容 直接在request里面找
    * response 将来会组装成响应报文的东西
      * 你需要向响应报文里面添加什么
      * 你就往这个response里面指定位置添加
* listen()
  * 监听某一个端口使用的方法
  * `服务.listen(端口号, 回调函数)`
  * 当你监听端口号完毕的时候
    * 在cmd里面运行起来这段代码
    * 你的cmd窗口就会因为这段代码而变成了一个服务器
    * 此时当客户端请求时 localhost:端口号 的时候
    * 每个请求都会触发一次createServer的函数
### 第三方模块 
* 大部分都是为了完成某一个单一类功能的插件
  * 第三方包读取路径 一路往上都行
* moment
  * 专门用来处理时间
  * `$ npm i moment`
  * 导入 `require('moment')`
  * 去人家官网看看怎么整就怎么整
* mysql
  * node和mysql数据库连接 进行增删改查
    * `$ npm i mysql`
  * 使用
    * 连接数据库
      * 前提 保证数据库服务器开启
      * 语法
        * `mysql.createConnection({ 配置信息 })`
          * 偏向于单次使用: 连接、操作、关闭
        * `mysql.createPool({ 配置信息 })`
          * 偏向于连接池的语义: 连接、操作、操作···
    * 执行sql语句
      * 使用连接信息去调用执行sql语句的方法
        * 一个方法 执行不同的sql语句
      * `db.query(sql语句, 回调函数)`
      * `db.query(sql语句, 数组, 回调函数)`
        * sql语句里面以问号的形式留下一些坑
        * 数组里面的每一项去填补前面留下的坑
  * ```JavaScript
      const mysql = require('mysql')
      const db = mysql.createConnection({
        host: 'localhost', // 127.0.0.1
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'colorful3327',
      })
      // db.query('SELECT * FROM `users`', (err, info) => {
      //   if(err) return console.log(err)
      //   console.log(info)
      // })
      const username = 'gaoxiaokui'
      const password = '129'
      db.query('SELECT * FROM `users` WHERE `username`=? AND `password`=?', [ username, password ], (err, info) => {
          if(err) return console.log(err)
          console.log(info)
      })
    ```
* superagent()
  * 专门用来在node里面发送请求的第三方
  * `superagent.get(地址, 回调函数)`
* cheerio()
  * 专门用来把一段HTML结构解析成一个像jQuery一样的函数的方法
  * `cheerio.load(要解析的内容)`
  * 返回值 就是一个像jquery一样的函数
  * 上面这俩可以写个简易小爬虫 
* nodemailer
  * 专门用来发送邮件的
  * 下载
  * 导入
  * 使用
    * 使用nodemailer创建一个发送器
      * `nodemailer.createTransport({ 配置信息 })`
    * 使用发送器发送邮件
      * `transport.sendMail({ 配置信息 }, 回调函数)`