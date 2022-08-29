// 自己的工具库

/**
 * 求最大公约数的函数
 * @param {Number} a 第一个数字
 * @param {Number} b 第二个数字
 * @return {Number} 两个数字的最大公约数
 */
 function getGys(a, b) {
    if (a < b) {
        var tmp = a
        a = b
        b = tmp
    }
    while (a % b !== 0) {
        tmp = a % b
        a = b
        b = tmp
    }
    return b
}

/**
 * 求最小公倍数的函数
 * @param {Number} a 第一个数字
 * @param {Number} b 第二个数字
 * @return {Number} 两个数字的最小公倍数
 */
function getGbs(a, b) {
    return a * b / getGys(a, b) // 封装过的函数gys()就可以直接拿来用
}

/**
 * 判断一个数字是否是质数
 * @param {Number} n 第一个数字
 * @return {String} 判断结果
 */
function zs(n) {
    var flag = '是质数'
    for (var i = 2; i < parseInt(n / 2); i++) {
        if (n % i === 0) {
            flag = '不是质数'
            break
        }
    }
    return n + flag
}

/**
 * 递归求阶乘
 * @param {Number} n 第一个数字
 * @return {Number} 结果
 */
 function jc(n) {
     // 先写终点
     if (n === 1) {
         return 1
     }
     // 递进去
     return n * jc(n - 1)
 }

/**
 * 斐波那契数列
 * 1 1 2 3 5 8 13 21 34 55 ...
 * @param {Number} n 要求的是第n个数字
 * @return {Number} 第n个数的值
 */
function fbnq(n) {
    if (n === 2 || n === 1) {
        return 1
    }
    return fbnq(n - 1) + fbnq(n - 2)
}

/**
 * 获取时间差
 * @param { TIME } time1 时间结点1
 * @param { TIME } time2 时间结点2
 * @return { Object } 以对象形式返回时间差
 */
function getTimeDifference(time1, time2) {
    var timeDiffer = Math.round(Math.abs(time1.getTime() - time2.getTime()) / 1000)
    var days = parseInt(timeDiffer / (24 * 60 * 60))
    var hours = parseInt(timeDiffer % (24 * 60 * 60) / (60 * 60))
    var minutes = parseInt(timeDiffer % (60 * 60) / 60)
    var seconds = timeDiffer % 60
    // 关于 return 值, 看看以下几种
    // return `距离出去浪氦有 ${ days } 天 ${ hours } 小时 ${ minutes } 分钟 ${seconds} 秒。`
    // return [days, hours, minutes, seconds]
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

/**
 * 随机整数
 * @param { Number } n 随机范围起始值(无视大小也可, 有判断)
 * @param { Number } m 随机范围终点值
 * @return { Number } 所要的随机整数
 */
function rangeRandom(n, m) {
    var max = Math.max(m, n)
    var min = Math.min(m, n)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 生成随机颜色的字符串值
 * @param { Boolean } type 是否十六进制 不写默认RGB
 * @return { String } 字符串形式的颜色值
 */
function randomColor(type) {
    if (!type) { 
        var res = 'rgb(' + rangeRandom(0, 255) + ', ' + rangeRandom(0, 255) + ', ' + rangeRandom(0, 255) + ')'
        return res
    } 
    var str = '#'
    for (var i = 0; i < 3; i++) {
        var n = rangeRandom(0, 255).toString(16)
        if (n.length === 1) n = '0' + n
        str += n
    }
    // var res = rangeRandom(0, 16777215).toString(16) // 直接0-FFFFFF 然不够位数更麻烦 弃之
    return str
}

/**
 * 格式化时间为中文
 * @param { TIME } time 要格式化的时间
 * @return { String } 中文显示
 */
function forgetTime (time) {
    var arr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var seconds = time.getSeconds()
    var week = time.getDay()
    function forgetYear(year) {
        var a = parseInt(year / 1000) 
        var b = parseInt(year % 1000 / 100)
        var c = parseInt(year % 100 / 10)
        var d = year % 10
        return arr[a] + arr[b] + arr[c] + arr[d] + '年'
    }
    function forgetNum(num) {
        var a = parseInt(num / 10)
        var b = num % 10
        if (num <10) {
            return arr[num]
        } else if (num < 20) {
            return '十' + arr[b]
        } else if (num % 10 === 0) {
            return arr[a] + '十'
        } else {
            return arr[a] + '十' + arr[b]
        }
    }
    return str = forgetYear(year) + ' ' + forgetNum(month) + '月' + forgetNum(date) + '日 ' + forgetNum(hours) + '时' + forgetNum(minutes) + '分'+ forgetNum(seconds) + '秒'+ ' 周' + forgetNum(week)
}

/**
 * 解析浏览器地址之查询字符串
 * @param { String } str 要解析的查询字符串
 * @return { Object } 解析后的结果
 */
 function parseQueryString(str) {
    var obj = {}
    if (str) {
        var tmp = str.slice(1).split('&')
        tmp.forEach(function (item) {
            var t = item.split('=')
            obj[t[0]] = t[1]
        })
    }
    return obj
}

/** 
 * 获取元素样式 - 兼容版
 * @param { Element } ele 要获取样式的元素
 * @param { String } style 要获取的样式字符串
 * @return { String } 获取到的元素的样式 
 */
function getStyle(ele, style) {
    if ('getComputedStyle' in window) {
        // 标准浏览器
        return window.getComputedStyle(ele)[style]
    } else {
        // IE 低版本
        return ele.currentStyle[style]
    }
}

/**
 * 事件绑定的兼容处理
 * @param { Element } ele 事件源
 * @param { String } type 事件类型
 * @param { Function } handler 事件处理函数
 */
function on (ele, type, handler) {
    if (!ele) throw new Error('请按照规则传递参数')
    if (ele.nodeType !== 1) throw new Error('事件源有问题')
    if (ele.addEventListener) {
        ele.addEventListener(type, handler)
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, handler)
    } else {
        ele['on' + type] = handler
    }
}

/**
 * 事件解绑的兼容处理
 * @param { Element } ele 事件源
 * @param { String } type 事件类型
 * @param { Function } handler 要解绑的事件处理函数
 */
function off (ele, type, handler) {
    if (!ele) throw new Error('请按照规则传递参数')
    if (ele.nodeType !== 1) throw new Error('事件源有问题')
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handler)
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + type, handler)
    } else {
        ele['on' + type] = null
    }
}

/**
 * 多属性运动函数 - 简单版
 * @param { Element } ele 要运动的元素
 * @param { Object } target 要运动的属性(对象)
 * @param { Function } fn 运动结束的回调函数
 */
function move (ele, target, fn = () => {}) {
    let count = 0
    for (let key in target) {
        if (key === 'opacity') target[key] *= 100
        count++
        let timer = setInterval(() => {
            let current = key === 'opacity' ? getStyle(ele, 'opacity') * 100 : parseInt(getStyle(ele, key))
            let distance = (target[key] - current) / 10
            distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
            if (current === target[key]) {
                clearInterval(timer)
                count--
                if (!count) fn()
            } else {
                ele.style[key] = key === 'opacity' ? (current + distance) / 100 : current + distance + 'px'
            }
        }, 30)
    }
}

/**
 * setCookie 设置cookie的方法
 * @param { String } key cookie的key
 * @param { String } value cookie的value
 * @param { Number } expires 多少秒后过期
 * @param { String } path cookie存储路径
 */
function setCookie (key, value, expires, path) {
    var str = key + '=' + value
    if (expires) {
        var time = new Date()
        time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + expires * 1000)
        str += ';expires=' + time
    }
    if (path) {
        str += ';path=' + path
    }
    document.cookie = str
}

/**
 * getCookie 获取cookie的方法
 * @param { String } key 选填 你要获取的某一个cookie的key
 * @returns { String | Object } 填写就是指定参数key的值 不填写就是对象
 */
function getCookie (key) {
    var tmp = document.cookie.split('; ')
    var o = key ? '' : {}
    tmp.forEach(function (item) {
        var t = item.split('=')
        if (key) {
            if (t[0] === key) {
                o = t[1]
            }
        } else {
            o[t[0]] = t[1]
        }
    })
    return o
}

/**
 * creXhr 创建Ajax对象
 * @returns { Object } 当前浏览器使用的Ajax对象
 */
function creXhr() {
    var xhr = null
    var flag = false
    var arr = [
        function () { return new XMLHttpRequest() },
        function () { return new ActiveXObject('Microsoft.XMLHTTP') },
        function () { return new ActiveXObject('Msxml.XMLHTTP') },
        function () { return new ActiveXObject('Msxml2.XMLHTTP') },
    ]
    for (let i = 0; i < arr.length; i++) {
        try {
            xhr = arr[i]()
            creXhr = arr[i]
            flag = true
            break
        } catch (e) {}
    }
    if (!flag) {
        xhr = '您的浏览器不支持Ajax, 请更换浏览器重试~'
        throw new Error(xhr)
    }
    return xhr
}

/**
 * Ajax 发送ajax请求的方法
 * @param { Object } options 请求的所有配置项
 */
function ajax(options = {}) {
    if (!options.url) {
        throw new Error('url为必填选项')
    }
    if (!(options.type == undefined || options.type.toUpperCase() === 'GET' || options.type.toUpperCase() === 'POST')) {
        throw new Error('目前仅支持GET/POST, 请期待更新~')
    }
    if (!(options.async == undefined || typeof options.async === 'boolean')) {
        throw new Error('async需要一个Boolean数据类型')
    }
    if (!(options.dataType == undefined || options.dataType === 'string' || options.dataType === 'json')) {
        throw new Error('目前仅支持string和JSON格式解析, 请期待更新~')
    }
    if (!(options.data == undefined || typeof options.data === 'string' || Object.prototype.toString.call(options.data) === '[object Object]')) {
        // typeof options.data === 'object'
        throw new Error('data仅支持string和object数据类型')
    }
    if (!(options.success == undefined || typeof options.success === 'function')) {
        throw new Error('success传递一个函数类型')
    }
    if (!(options.error == undefined || typeof options.error === 'function')) {
        throw new Error('error传递一个函数类型')
    }
    var _default = {
        url: options.url,
        type: options.type || 'GET',
        async: typeof options.async === 'boolean' ? options.async : true,
        dataType: options.dataType || 'string',
        data: options.data || '',
        success: options.success || function () {},
        error: options.error || function () {}
    }
    if (typeof _default.data === 'object') {
        var str = ''
        for (var key in _default.data) {
            str += key + '=' + _default.data[key] + '&'
        }
        _default.data = str.slice(0, -1)
    }
    var xhr = creXhr()
    if (_default.type.toUpperCase() === 'GET' && _default.data) {
        _default.url += '?' + _default.data
    }
    xhr.open(_default.type, _default.url, _default.async)
    xhr.onreadystatechange = function () {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.readyState === 4) {
            if (_default.dataType === 'json') {
                _default.success(JSON.parse(xhr.responseText))
            } else if (_default.dataType === 'string') {
                _default.success(xhr.responseText)
            }
        }
        if (xhr.status >= 400 && xhr.readyState === 4) {
            _default.error('请求失败了', xhr.status)
        }
    }
    if (_default.type.toUpperCase() === 'POST') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    }
    xhr.send(_default.data)
}

/**
 * Ajax 发送 ajax 请求的方法
 * @param { Object } options 请求的所有配置项
 * @returns { Promise } promise对象
 */
function pAjax(options = {}) {
    return new Promise(function (resolve, reject) {
        ajax({
            url: options.url,
            data: options.data,
            async: options.async,
            dataType: options.dataType,
            type: options.type,
            success (res) {
                resolve(res)
            },
            error (err) {
                reject(err)
            }
        })
    })
}

/** */
$.extend($.fn, {
    selectAll() {
        var flag = true
        for (var i = 0; i < this.length; i++) {
            // this 就是jQuery元素集合里的每一个 
            if (!this[i].checked) {
                flag = false
                break
            }
        }
        return flag
    },
    setChecked(type) {
        for (var i = 0; i < this.length; i++) {
            this[i].checked = type === false ? false : true
        }
        return this
        // 为了能够继续链式编程
    },
    getChecked() {
        if (this.length) return this[0].checked
        return false
    }
})