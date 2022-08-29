/**
 * 使用nodeJS部署一个服务器
 * 能返回指定的页面和指定的文件
 */

const http = require('http')
const fs = require('fs')

const server = http.createServer(function(req, res) {
    // 根据不同请求给出不同响应
    const { url } = req
    // console.log(url)

    // 3.
    const reg = /^\/\w+\.(html|css|js)$/
    const result = reg.exec(url)
    if (result) {
        fs.readFile('./', +result[1] + result[0], (err, data) => {
            if (err) return console.log(err)
            res.end(data)
        })
    } else {
        res.end(' ')
    }

    // 2. 
    // if (url.endsWith('.html')) {
    //     fs.readFile('../html' + url, (err, data) => {
    //         if (err) return console.log(err)
    //         res.end(data)
    //     })
    // }

    // 1.
    // if (url === '/999-test.html') {
        // fs.readFile('../html/999-test.html', (err, data) => {
        //     if (err) return console.log(err)
        //     res.end(data)
        // })
    // }
})

// 监听端口 尽量不使用1024以下
server.listen(8080, () => console.log('Server running at port 8080~ ^_^'))