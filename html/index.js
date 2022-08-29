/**
 * 渲染整个购物车
 *  目前: 本地模拟购物车
 *  使用 localStorage 模拟刷新，依靠数组渲染
 * 
 * 
 * TODO1: 准备一个数组 - 购物车数据
 * 
 * [{}, {}, {}, {}]
 * id: 每一条数据的唯一值
 * url: 图片地址
 * desc: 商品描述
 * number: 库存
 * price: 价格
 * cart_num: 购买数量
 * isSelect: 是否选中
 * 
 * TODO2: 根据数组渲染页面
 * 写成函数，后期方便
 * bindHtml()
 * 使用模板引擎
 * template 生成 HTML 字符串，把它放在固定的标签里
 * 
 * TODO3: 在渲染模板的时候把数据准备好
 * 计算总价、件数
 * isSelect === true
 * 全选按钮
 * every()
 * 传递到模板 渲染
 * 
 * TODO4: 按钮们
 * 页面渲染的 后期可能变，innerHTML 完全覆盖，不能循环绑定事件
 * 直接给 box 委托一个点击事件
 * 操作选中
 * 每项选中点击的时候，修改数组里面的 id 对应的数据，修改 isSelect，重新渲染一遍(bindHTML)
 * 点击减少数量
 * 点击删除
 * 结算
 * 带过去总价   
 * 清空
 * 全选
 * 遍历 isSelect 整成target.checked
 * 
 * TODO5: 数据持久化
 * localStorage
 * 每次修改都改掉
 * 每次都执行bindHtml()
 * 页面打开 从 localStorage 获取
 * 每次bindHTML的结尾把新的数组存储进去
 */

// 0. 获取元素
var box = document.querySelector('.box')

// 1. 模拟数据
// var list = [
//     {
//         id: 1,
//         url: 'https://img10.360buyimg.com/seckillcms/s140x140_jfs/t1/142603/25/28046/22057/62eb6f93Ec2849b16/0b9b849ca51578e7.jpg.webp',
//         desc: '我是一个粉刷匠，粉刷本领强~',
//         number: 16,
//         price: 100,
//         cart_num: 2,
//         isSelect: false
//     },
//     {
//         id: 2,
//         url: 'https://img10.360buyimg.com/seckillcms/s140x140_jfs/t1/142603/25/28046/22057/62eb6f93Ec2849b16/0b9b849ca51578e7.jpg.webp',
//         desc: '我是一个粉刷匠，粉刷本领弱~',
//         number: 10,
//         price: 129,
//         cart_num: 1,
//         isSelect: true
//     },
//     {
//         id: 3,
//         url: 'https://img10.360buyimg.com/seckillcms/s140x140_jfs/t1/142603/25/28046/22057/62eb6f93Ec2849b16/0b9b849ca51578e7.jpg.webp',
//         desc: '我是一个粉刷匠，粉刷本领强不强~',
//         number: 22,
//         price: 49,
//         cart_num: 1,
//         isSelect: false
//     },
// ]

var list = JSON.parse(window.localStorage.getItem('list')) || []
// 2. 渲染页面的函数
var total = 0
var totalPrice = 0
bindHtml()
function bindHtml () {
    total = 0
    totalPrice = 0
    list.forEach(function (item) {
        if (item.isSelect === true) {
            total += item.cart_num
            totalPrice += item.cart_num * item.price
        }
    })
    var selectAll = list.every(function (item) { return item.isSelect })

    box.innerHTML = template('tmp', {
        list: list,
        total: total,
        totalPrice: totalPrice,
        selectAll: selectAll
    })
    window.localStorage.setItem('list', JSON.stringify(list))
}

// 4. 
box.addEventListener('click', function (e) {
    e = e || window.event
    var target = e.target || e.srcElement
    console.log(target)
    // 关于怎么提代码
    // if (
    //     target.className === 'select-item' ||
    //     target.className === 'sub' ||
    //     target.className === 'up'
    // ) {
    //     var id = target.dataset.id - 0
    //     var goods = list.find(function (t) { return t.id === id })
    // }
    if (target.className === 'select-item') {
        var id = target.dataset.id - 0
        var goods = list.find(function (t) { return t.id === id })
        goods.isSelect = !goods.isSelect
        bindHtml()
    }
    if (target.className === 'sub') {
        var id = target.dataset.id - 0
        var goods = list.find(function (t) { return t.id === id })
        if (goods.cart_num === 1) return
        goods.cart_num--
        bindHtml()    
    }
    if (target.className === 'add') {
        var id = target.dataset.id - 0
        var goods = list.find(function (t) { return t.id === id })
        if (goods.cart_num === goods.number) return
        goods.cart_num++
        bindHtml()    
    }
    if (target.className === 'del') {
        var id = target.dataset.id - 0
        // 1.
        // var index = list.findIndex(function (t) { return t.id === id })        
        // list.splice(index, 1)
        // 2. 
        list = list.filter(function (t) { return t.id !== id })

        bindHtml()    
    }
    if (target.className === 'pay') {
        window.location.href = 'https:www.baidu.com?p=' + totalPrice
    }
    if (target.className === 'clear') {
        list = []
        bindHtml()
    }
    if (target.className === 'select-all') {
        list.forEach(function (t) { t.isSelect = target.checked })
        bindHtml()
    }
})  