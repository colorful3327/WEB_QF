// const fs = require('fs')
// console.log(fs)

const url = require('url')
const str = 'https://www.colorful.com:3327/h/j/y?a=129&b=49#wc'
// const res = url.parse(str)
const res = url.parse(str, true)
console.log(res)
console.log(res.query)
console.log(res.query.a)