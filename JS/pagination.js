/**
 * 1. 根据传递的参数设置一系列默认值
 * first显示的文字
 * 根据多少天数据和一页显示多少条计算多少页
 * 不管用户传不传递 你得有一套默认值
 * 2. 渲染结果
 * this.ele 里面要添加 div * 6
 * 我们要创建六个div
 * 每个div类名不一样 文本内容也不一样 样式也不太一样
 * 我们准备两个方法
 * 一个是专门创建元素的方法
 * 一个是专门添加样式的方法
 * 使用他俩创建标签 创建list的时候要向list里添加内容
 * 向list里添加内容 要根据default.current default.totalpage 
 * 最后再解决这个问题 先按照默认的来
 * 3. 设置大盒子的样式
 * this.ele
 * 4. 切换
 * 都是点击事件
 * DOM结构都是渲染的
 * 事件委托 this.ele
 * 判断你点的哪个按钮
 * 改掉current 渲染一遍DOM结构
 * 可以加个回车事件
 * 和go按钮的事件一模一样
 * 5. 回调函数
 * 改变当前页我得做点啥
 * 把你要做的放在一个函数里传递过来 我每次改变的时候帮你触发一下
 * 因为每次改变current都会执行一下this.renderHtml()
 * 就在renderHtml里面调用
 * 6. 重新调整结构
 * init里计算一下totalpage
 */

class Pagination {
    constructor (ele, options = {}) {
        this.ele = document.querySelector(ele)
        // 设置一套默认值
        this.default = {
            current: options.current || 1,
            total: options.total || 90,
            totalpage: 9,
            pagesize: options.pagesize || 10,
            first: options.first || 'first',
            prev: options.prev || 'prev',
            next: options.next || 'next',
            last: options.last || 'last',
            go: options.go || 'go',
            change: options.change || (() => {}),   // 每次改变的时候触发的函数
        }
        // console.log(this.default)

        // 单独提取一套按钮样式
        this.btnCss = {
            float: 'left',
            margin: '5px',
            padding: '5px',
            border: '1px solid #333',
            cursor: 'pointer'
        }

        this.init()
    }

    init () {
        // 6-1
        this.default.totalpage = Math.ceil(this.default.total / this.default.pagesize)

        this.renderHtml()
        this.setBoxStyle()
        this.bindEvent()
    }

    // 2. 渲染dom结构
    renderHtml() {
        const { first, prev, next, last, current } = this.default
        const frg = document.createDocumentFragment()

        // 创建第一个首页标签
        // const firstEle = creEle('div', 'first', first)
        // setCss(firstEle, this.btnCss)
        // frg.appendChild(firstEle)

        // const tmp = setCss(creEle('div', 'first', first), this.btnCss)
        frg.appendChild(setCss(creEle('div', 'first', first), this.btnCss))
        frg.appendChild(setCss(creEle('div', 'prev', prev), this.btnCss))

        const list = setCss(creEle('div', 'list', ''), { margin: 0, padding: 0, float: 'left' })
        list.appendChild(this.creItem())
        frg.appendChild(list)

        frg.appendChild(setCss(creEle('div', 'next', next), this.btnCss))
        frg.appendChild(setCss(creEle('div', 'last', last), this.btnCss))

        const jump = setCss(creEle('div', 'jump', ''), { margin: 0, padding: 0, float: 'left' })
        jump.appendChild(this.creJump())
        frg.appendChild(jump)

        // 最后一次性放到 this.ele
        this.ele.innerHTML = ''
        this.ele.appendChild(frg)

        console.log('我要渲染 ' + current + ' 页的数据了。')
        this.default.change(current)   
    }

    // 2-2 创建item标签页的方法
    creItem() {
        const { current, totalpage } = this.default
        const frg = document.createDocumentFragment()
        if (totalpage <= 9) {
            for (let i = 1; i <= 9; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p, { backgroundColor: 'violet' })
                frg.appendChild(p)
            }
            return frg
        }
        // console.log('后续代码')
        // ...
        const point = document.createElement('p')
        point.innerHTML = '...'
        setCss(point, {
            padding: '5px',
            margin: '5px',
            float: 'left',  
        })
        // 1 2 3 4 5 ... 99 100
        if (current < 5) {
            for (let i = 1; i <= 5; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p, { backgroundColor: 'violet' })
                frg.appendChild(p)
            }

            frg.appendChild(point.cloneNode(true))

            for (let i = totalpage - 1; i <= totalpage; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }
            return frg
        }
        // 1 2 3 4 current 6 7 ... 99 100
        if (current === 5) {
            for (let i = 1; i <= 7; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p, { backgroundColor: 'violet' })
                frg.appendChild(p)
            }

            frg.appendChild(point.cloneNode(true))

            for (let i = totalpage - 1; i <= totalpage; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }
            return frg
        }
        // 1 2 ... 5 6 current 8 9 ... 99 100
        if (current > 5 && current < totalpage - 4) {
            for (let i = 1; i <= 2; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }

            frg.appendChild(point.cloneNode(true))

            for (let i = current - 2; i <= current + 2; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p, { backgroundColor: 'violet' })
                frg.appendChild(p)
            }

            frg.appendChild(point.cloneNode(true))

            for (let i = totalpage - 1; i <= totalpage; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }
            return frg
        }
        // 1 2 ... 94 95 current 97 98 99 100
        if (current === totalpage - 4) {
            for (let i = 1; i <= 2; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }
            
            frg.appendChild(point.cloneNode(true))
            
            for (let i = totalpage - 6; i <= totalpage; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p, { backgroundColor: 'violet' })
                frg.appendChild(p)
            }
            return frg
        }
        // 1 2 ... current 97 98 99 100
        if (current > totalpage - 4) {
            for (let i = 1; i <= 2; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                frg.appendChild(p)
            }
            
            frg.appendChild(point.cloneNode(true))
            
            for (let i = totalpage - 4; i <= totalpage; i++) {
                const p = setCss(creEle('p', 'item', i), this.btnCss)
                p.dataset.index = i
                if (i === current) setCss(p, { backgroundColor: 'violet' })
                frg.appendChild(p)
            }
            return frg
        }

    }

    // 2-3 jump
    creJump() {
        const { go, current } = this.default
        const frg = document.createDocumentFragment()

        const ipt = document.createElement('input')
        ipt.value = current
        setCss(ipt, {
            height: '28px',
            width: '30px',
            float: 'left',
            outline: 'none',
            margin: '5px',
            // cursor: 'Pointer',
        })
        frg.appendChild(ipt)
        
        const btn = document.createElement('button')
        btn.className = 'go'
        btn.innerHTML = go
        setCss(btn, {
            height: '32px',
            width: '30px',
            float: 'left',
            outline: 'none',
            margin: '5px',
            cursor: 'Pointer',
        })
        frg.appendChild(btn)

        return frg
    }

    // 3. 设置大盒子样式
    setBoxStyle() {
        setCss(this.ele, {
            width: '800px',
            height: '50px',
            padding: '10px 30px 0',
            // 居中
            position: 'absolute',
        })
    }

    // 4. 
    bindEvent() {
        this.ele.addEventListener('click', e => {
            e = e || window.event
            const target = e.target || e.srcElement
            // 解构赋值 
            const { current, totalpage} = this.default

            // 判断下一页
            if (target.className === 'next' && current < totalpage) {
                this.default.current++
                this.renderHtml()
            }
            // 上一页
            if (target.className === 'prev' && current > 1) {
                this.default.current--
                this.renderHtml()
            }   
            // 最后一页
            if (target.className === 'last' && current < totalpage) {
                this.default.current = totalpage
                this.renderHtml()
            }   
            // 首页
            if (target.className === 'first' && current > 1) {
                this.default.current = 1
                this.renderHtml()
            }   
            // 某一页
            if (target.className === 'item') {
                const index = target.dataset.index - 0
                if (index === current) return
                this.default.current = index
                this.renderHtml()
            } 
            if (target.className === 'go') {
                // 俺得拿到前面input
                let index = target.previousElementSibling.value - 0
                if (index <= 1) index = 1
                if (index >= totalpage) index = totalpage
                if (index === current) return
                this.default.current = index
                this.renderHtml()       
            }

        })
    }

}

// 额外的两个方法
// 创建dom结构
// 什么标签、类名、文本内容
function creEle (nodeName, className, text) {
    const ele = document.createElement(nodeName)
    ele.className = className
    ele.innerHTML = text    // innerHTML
    return ele              // 
}

// 添加CSS
// 给谁 加啥
function setCss(ele, styles) {
    for (let key in styles) {
        ele.style[key] = styles[key]
    }
    // 上面for循环是给ele添加样式
    // ele就是要添加样式的元素
    return ele  // 添加完了吧，返回出去
}