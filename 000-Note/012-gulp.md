# gulp
* 前端自动化打包构建工具
  * 打包
    * 把文件压缩、整合、移动、混淆
    * 了解一下前端的打包构建工具
      * gulp 基于流(格式)的打包构建工具
        * 流
          * 流文件
            * 一直文件传输的格式
            * 一段一段的文件传输
          * 流格式
            * 从头到尾的一个过程
            * 需要从源开始一步步加工
            * 每个步骤需要依赖上一步的结果
            * 最终给个成品
      * webpack 基于JS文件的打包构建工具
* 依赖于node环境进行开发
  * 底层封装的内容就是node里面的读写文件
* 作用
  * 对于css文件
    * 压缩
    * 转码(自动添加前缀)
  * 对于JS文件
    * 压缩
    * 转码(ES6 -> ES5)
  * 对于html文件
    * 压缩
    * 转码(对格式的转换)
  * 对于静态资源文件的处理
  * 对于第三方文件的处理
  * ···
* 安装
  * JavaScript相关 直接npm
  * `$ npm install --location=global gulp`
  * 版本 gulp@3 gulp@4 
* 检测
  * version
* 卸载 
  * `$ npm uninstall --location=global gulp`
* 安装完毕
  * 能给电脑提供一个启动gulp的环境
## 准备使用gulp
* 1. 确定好目录结构
  * 分开源码和打包以后的内容
  * 必须保证打包前后的目录结构一致
    * 创建一个叫做src的目录(表示源码)
    * 创建一个叫做dist的目录(存放打包后的文件)
* 2. 准备好一个gulpfile.js的文件
  * 必须有
  * 是gulp进行打包的依据
  * gulp运行的时候 会自动读取这个文件的配置 以此为依据打包
  * **直接写在根目录和src同级**
* 3. 在项目里面再次安装gulp
  * **项目里面的gulp是以第三方模块的形式出现的**
  * 专门给你提供配置打包流程的API的
  * 每个项目都要安装一次
  * 找到项目目录 `$ npm install gulp -D`
* 关于gulp
  * 全局依赖环境gulp
    * 一台电脑安装一次 在命令行可以gulp xxx
  * 项目依赖第三方gulp
    * 每个项目都要安装一次
    * 作为第三方包出现 在你导入以后 可以使用gulp.xxx()
* 关于package.json
  * dependencies
    * 项目依赖
    * 开发 上线 都要用到
  * devDependencies
    * 开发依赖
    * 开发用 上线后不用
    * `$ npm install --dev 包名`
* 4. 在gulpfile.js里书写配置文件
## gulp常用API
* 按照node的模块化语法 commonJS
  * `const gulp = require('gulp')`
* gulp.task()
  * `gulp.task(任务名称, 任务处理函数)`
  * 创建一个基于流的任务
* gulp.src()
  * `gulp.src(路径信息)`
  * 找到源文件
  * 路径信息
    * './a/b.html' 指定文件
    * './a/*.html' 指定后缀文件
    * './a/**' 目录下所有文件
    * './a/**/*' 目录下所有子目录里面的所有文件
    * './a/**/*.html'
* gulp.dest()
  * `gulp.dest(路径信息)`
  * 把一个内容放入指定路径内
* gulp.watch()
  * `gulp.watch(路径信息, 任务名称)`
  * 监控指定目录下的文件 一旦发生变化 重新执行后面的任务
* gulp.series()
  * `gulp.series(任务1, 任务2, ···)`
  * 逐个执行任务
* gulp.parallel()
  * `gulp.parallel(任务1, 任务2, ···)`
  * 并行开始多个任务
* pipe()
  * 管道函数
  * 接收当前流 进入下个流过程
  * 例: `gulp.src().pipe(压缩任务).pipe(转码).pipe(gulp.dest(abc))`
## **gulp常用插件**
* gulp-cssmin 压缩
  * 下载 `$ npm i gulp-cssmin -D`
  * **导入** `const cssmin = require('gulp-cssmin')`
  * 导入以后得到一个处理流文件的函数 直接在管道函数里面执行就可
    * `.pipe(cssmin())`
* gulp-autoprefixer 自动添加前缀
  * 下载 `$ npm i gulp-autoprefixer -D`
  * **导入** `const autoprefixer = require('gulp-autoprefixer')`
  * 导入以后得到一个处理流文件的函数 直接在管道函数里面使用 需要传递参数
    * `{ browsers: [要兼容的浏览器] }`
  * 报错信息 跟着提示
* gulp-sass
  * 常规下载易报错
    * gulp-sass依赖一个第三方node-sass 
    * 解决 给node-sass单独配置下载地址
  * 那么下载过程是
    * `$ set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/`
    * `$ npm i node-sass -D`
    * `$ npm i gulp-sass -D` 
  * **导入** `const sass = require('gulp-sass')`
  * 导入以后得到一个处理流文件的函数 直接在管道函数里面执行就可
    * `.pipe(sass())`
  * 注意不能写ES6的语法 会报错
* gulp-babel 
  * 专门进行ES6转ES5的
  * gulp-babel的版本
    * gulp-babel@7: 大部分使用在gulp@3里面
    * gulp-babel@8: 大部分使用在gulp@4里面
  * 下载 
    * gulp-babel需要依赖另外两个包 要一起下载
    * @babel/core @babel/preset-env
    * `$ npm i -D gulp-babel`
    * `$ npm i -D @babel/core`
    * `$ npm i -D @babel/preset-env` 
  * **导入** 只需要导入一个包就可以 另外俩会自动导入
    * `const babel = require('gulp-babel')`
  * 导入以后得到一个处理流文件的函数 直接在管道函数里面使用 需要传递参数
    * `presets: ['es2015']`       babel@7
    * `presets: ['@babel/env']`   babel@8
* gulp-htmlmin 
  * 压缩html文件的
  * 下载 `$ npm i -D gulp-htmlmin`
  * **导入** `const htmlmin = require('gulp-htmlmin')`
  * 导入以后得到一个处理流文件的函数 直接在管道函数里面使用 需要传递参数
* gulp-imagemin
  * 专门用来压缩图片 无损压缩
    * 下载需要很好的网络环境 
    * 最高七级压缩 1024k->1023k这样
  * 在开发中
    * 图片不需要我们压缩 
      * 线上地址 / UI处理好的
* del
  * 删除文件目录
  * 下载 `$ npm i -D del`
  * 导入 `const del = require('del')`
  * 导入以后得到一个函数 直接使用 传递参数
* gulp-webserver
  * 启动一个基于node书写的服务器
  * 下载 `$ npm i -D gulp-webserver`
  * 导入 `const webserver = require('gulp-webserver')`
  * 导入以后得到一个处理流文件的函数 直接在管道函数内调用 需要传递参数 
* gulp-file-include
  * 在一个html页面里面导入html片段
  * 下载 `$ npm i -D gulp-file-include`
  * 导入 `const fileInclude = require('gulp-file-include')`
  * 导入以后得到一个处理流文件的函数 直接在管道函数内调用 需要传递参数 
## 执行gulp配置好的任务
* 命令行 gulpfile.js 所在目录
* 执行 `$ gulp 任务名称`
## 添加一个打包css的任务
* ```JavaScript
    const gulp = require('gulp')
    const cssmin = require('gulp-cssmin')
    const autoprofixer = require('gulp-autoprofixer')
    const cssHandler = function () {
      return gulp
        .src('./src/css/*.css')                                 // 找到内容
        .pipe(autoprefixer( { browser: ['last 2 versions'] }))  // 自动添加前缀(根据报错修改package.json后 参数删除)
        .pipe(cssmin())                                         // 压缩
        .pipe(gulp.dest('./dist/css/'))                         // 放到指定目录      
    }
    module.exports.cssHandler = css.Handler
  ```
* 执行 $ gulp cssHandler
## 添加一个打包SASS文件的任务
* 后面引入导出都省略了先
* ```JavaScript
  const sassHandler = function () {
      return gulp
        .src('./src/sass/*.scss')                                 
        .pipe(sass())
        .pipe(autoprefixer())           // 参数删了 在package.json里  
        .pipe(cssmin())                                         
        .pipe(gulp.dest('./dist/sass/'))                              
  }
  ```
* sass转码的使用
  * 用到导入sass文件时 可以把混合器和变量定义在.sass文件中
    * 你的gulp配置只会转码.sass文件
    * 你设置的变量和混合器文件不会被转码
  * 但是 当它转码.sass文件时 会自动读取.sass文件里面的变量
    * 会给你自动解析使用
## 添加一个打包JS文件的任务
* ```JavaScript
  const jsHandler = function () {
      return gulp
        .src('./src/js/*.js')                                 
        .pipe(babel({
          // presets: ['es2015']  // babel@7
          presets: ['@babel/env'] // babel@8
        }))
        .pipe(uglify())                                         
        .pipe(gulp.dest('./dist/js/'))                              
  }
  ```
## 添加一个打包html文件的任务
* ```JavaScript
  const htmlHandler = function () {
      return gulp
        .src('./src/html/*.html')  
        .pipe(htmlmin({ // 通过你配置的参数进行压缩
          collapseWhitespace: true, // 移除空格
          removeEmptyAttributes: true, // 移除空属性(仅限于原生属性)
          collapseBooleanAttributes: true, // 移除checked类似的布尔值
          removeAttributeQuotes: true, // 移除属性上的双引号
          minifyCSS: true, // 压缩内嵌式css代码(只能基本压缩 不能自动添加前缀)
          minifyJS: true, // 压缩内嵌式JS代码(只能基本压缩 不能转码)
          removeStyleLinkTypeAttributes: true, // 移除style和link标签的type属性
          removeScriptTypeAttributes: true, // 移除script标签上默认的type属性
        }))
        .pipe(gulp.dest('./dist/pages/'))                              
  }
  ```
## 图片、视频、音频、第三方、fonts 打包
* ```JavaScript
  const imgHandler = function () {
      return gulp
        .src('./src/images/**')  
        .pipe(gulp.dest('./dist/images/'))                              
  }
  ```
* ```JavaScript
  const videoHandler = function () {
      return gulp
        .src('./src/videos/**')  
        .pipe(gulp.dest('./dist/videos/'))                              
  }
  ```
* ```JavaScript
  const audioHandler = function () {
      return gulp
        .src('./src/audios/**')  
        .pipe(gulp.dest('./dist/audios/'))                              
  }
  ```
* ```JavaScript
  const libHandler = function () {
      return gulp
        .src('./src/lib/**/*')  
        .pipe(gulp.dest('./dist/lib/'))                              
  }
  ```
* ```JavaScript
  const fontHandler = function () {
      return gulp
        .src('./src/fonts/**/*')  
        .pipe(gulp.dest('./dist/fonts/'))                              
  }
  ```
## 默认任务
* 把所有的任务给我一起执行了
  * gulp.series() / gulp.parallel()
  * 他俩的返回值是函数 可以直接当做任务函数使用
  * 使用task创建default任务
    * `gulp.task('default', () => {})`
  * 使用exports
    * `module.exports.default = () => {}`
    * 例: `module.exports.default = gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, audioHandler, videoHandler, libHandler, fontHandler)`
  * $ gulp default
    * 为啥default这个名字? 这个名字可以直接 $ gulp, 一样的效果
## 删除任务
* ```JavaScript
    const delHandler = function () {
      return del(['./dist/'])
    }
  ```
* 修改默认任务
  * `module.exports.default = gulp.series(delHandler, gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, audioHandler, videoHandler, libHandler, fontHandler))`
    * 保证del先完成
## 启动服务
* gulp可以启动一个基于node的服务器
* 启动服务器 用哪个目录当做服务器的根目录
  * dist 它是结果目录
  * 启动它里面的html文件
* ```JavaScript
    const webHandler = function () {
      return gulp
        .src('./dist')
        .pipe(webserver({
            host: 'localhost', // 域名 可以自定义
            port: '8080', // 
            livereload: true,  // 文件修改时 是否自动刷新页面
            open: './pages/login.html', // 默认打开哪一个文件(从dist目录以后的目录开始书写)
        }))
    }
  ```
* 修改默认任务
```JavaScript
  module.exports.default = gulp.series(
    delHandler, 
    gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, audioHandler, videoHandler, libHandler, fontHandler),
    webHandler
  )
```
* 关于自动刷新
  * 启动的是dist目录
  * 修改的是src目录
  * 还需要一个任务 修改后自动打包
* 自定义域名
  * webserver host 书写自己的域名(www.gxk.com)
  * 找到电脑文件
    * C:\Windows\System32\drivers\etc
    * 里的hosts 没有后缀
    * 添加内容
      * 127.0.0.1      www.gxk.com 
## gulp配置代理
* 在上面那个pipe(webserver({}))里写个数组proxies
* ```JavaScript
    proxies: [ // 配置
      // 每个代理就是一个对象数据类型
      {
        source: '代理标识符',  
        target: '代理目标地址'
      }, 
      {
        // 没有代理就别空着 别写空对象
      }
    ]
  ```
* 想用代理 必须是在 gulp-webserver 启动的服务器上运行
* 可以直接代理一半目录结构 
## 监控任务
* ```JavaScript
    const watchHandler = function () {
      gulp.watch('./src/sass/*.sass', sassHandler)
      // 后面省略
    }
  ```
* 添加到default里面 在最后就可
## gulp打包组件
* 重复的位置单独拿出来 写成一个html片段
  * 单独的可以包含css js 也可以不包含
* 插件 gulp-file-include
* ```JavaScript
  const htmlHandler = function () {
      return gulp
        .src('./src/html/*.html')  
        .pipe(fileInclude({ // 根据你的配置导入对应的html片段
          prefix: '@_@',  // 你自定义的一个标识符
          basepath: './src/components'  // 基准目录 你的组件文件在哪
        }))
        .pipe(htmlmin({ // 通过你配置的参数进行压缩
          // 配置省略
        }))
        .pipe(gulp.dest('./dist/pages/'))                              
  }
  ```
* 引入
  * 语法 自定义标识符include('要导入的文件路径')
    * 文件路径 从basepath以后开始书写
    * 第二个参数 JSON格式的对象
  * `@_@include('./header.html')`
    * `@_@include('./header.html', { title: '首页', show: '' })`
    * `@_@include('./header.html', { title: '首页', show: 'active' })`
    * css `class="@_@show"`
* 可以把页面拆成一块一块的组装起来