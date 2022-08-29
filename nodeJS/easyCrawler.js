/**
 * 简单爬取京东页面
 * 1. 使用node去访问页面
 *  superagent
 * 2. 拿到html结构
 *  data.text
 * 3. 把某些结构拿出来组装成一个对象
 *  cheerio
 * 4. 存储到数据库
 */

// const { data } = require('jquery')
const superagent = require('superagent')
const cheerio = require('cheerio')
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost', // 127.0.0.1
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'colorful3327',
})

const list = []

superagent.get('https://list.jd.com/list.html?cat=670,671,672', (err, data) => {
    if (err) return console.log('爬取页面失败')
    // console.log(data)   // data.text才是完整页面, data是包含页面的整体信息
    console.log(data.text)
    parsePage(data.text)
})
function parsePage(page) {
    const $ = cheerio.load(page)

    $('ul.gl-warp > li').each(function (index, item) { // each() 是jQuery提供的一个遍历的方法
        const obj = {
            goods_img: $(item).find('.p-img img').prop('src'),
            goods_price: $(item).find('.p-price i').text(),
            goods_title: $(item).find('.p-name em').text(),
            goods_name: $(item).find('.p-name i').text(),
        }
        // list.push(obj)
    })
    // console.log(list)
    const sql = 'INSERT INFO `jd_list` VALUES(null, ?, ?, ?, ?)'
    const info = [ obj.goods_img, obj.goods_price, obj.goods_title, obj.goods_name ]
    db.query(sql, info, (err, data) => {
        if (err) return console.log(err)
    })

}