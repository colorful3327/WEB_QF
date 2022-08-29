/**
 * 代码实现 - 放大镜
 * 1. 找到我们要操作的各种数据
 * show
 * mask
 * enlarge
 * list
 * 2. 移入移出
 * 3. 调整某个盒子的大小 使成比例
 *   遮罩层         enlarge
 *  --------   =   ---------
 *    show           背景图
 * enlarge盒子 = 遮罩层尺寸 * 背景图尺寸 / show盒子
 * 4. 移动
 * 直接mousemove 绑定给show
 * 获取坐标 offset那套 遮罩层设置那个啥就是不管它
 * 边界值判断
 * 右边跟着动
 *    遮罩层尺寸          enlarge盒子尺寸
 * ---------------   =  --------------------
 *  遮罩层移动距离       enlarge盒子移动距离(负的 背景图移动距离)
 * enlarge盒子移动距离 = enlarge盒子尺寸 * 遮罩层移动距离 / 遮罩层尺寸
 * 5. 切换图片
 * list每个绑定事件 事件委托委托给list就可
 * 边框切换 所有都没有 然后这个有
 * 换图片
 */
function Enlarge (ele) {
    this.ele = document.querySelector(ele)

    // 找到 show 盒子
    this.show = this.ele.querySelector('.show')

    // 找到 遮罩层 盒子
    this.mask = this.ele.querySelector('.mask')

    // 找到 放大镜 盒子
    this.enlarge = this.ele.querySelector('.enlarge')

    // 找到 列表 盒子
    this.list = this.ele.querySelector('.list')

    this.init()
}

// 准备一个启动器函数
Enlarge.prototype.init = function () {
    this.getProp()
    this.setScale()
    this.overOut()
    this.move()
    this.bindEvent()
}

Enlarge.prototype.getProp = function () {
    this.mask_width = parseInt(window.getComputedStyle(this.mask).width)
    this.mask_height = parseInt(window.getComputedStyle(this.mask).height)
    // console.log(mask_height, mask_width)
    // 上面这个 遮罩层会消失 所以不适合offset获取 这样消失获取不到
    this.show_width = this.show.offsetWidth
    this.show_height = this.show.offsetHeight
    // console.log(show_height, show_width)
    const bg = window.getComputedStyle(this.enlarge).backgroundSize.split(' ')
    this.bg_width = parseInt(bg[0])
    this.bg_height = parseInt(bg[1])
    // console.log(bg_height, bg_width)
    // console.log(bg)
}

Enlarge.prototype.overOut = function () {
    this.show.addEventListener('mouseover', () => {
        this.mask.classList.add('active')
        this.enlarge.classList.add('active')
    })
    this.show.addEventListener('mouseout', () => {
        this.mask.classList.remove('active')
        this.enlarge.classList.remove('active')
    })
}

// 调整比例
Enlarge.prototype.setScale = function () {
    this.enlarge_width = this.mask_width * this.bg_width / this.show_width
    this.enlarge_height = this.mask_height * this.bg_height / this.show_height
    // console.log(enlarge_width, enlarge_height)
    this.enlarge.style.width = this.enlarge_width + 'px'
    this.enlarge.style.height = this.enlarge_height + 'px'
}

// 动起来
Enlarge.prototype.move = function () {
    this.show.addEventListener('mousemove', e => {
        e = e || window.event
        // console.log(e.offsetX)
        // pointer-events: none; 记得设置这个给遮罩层
        let x = e.offsetX - 100
        let y = e.offsetY - 100

        // 边界值判断
        if (x <= 0) x = 0
        if (y <= 0) y = 0
        if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
        if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height

        this.mask.style.left = x + 'px'
        this.mask.style.top = y + 'px'

        const moveX = this.enlarge_width * x / this.mask_width
        const moveY = this.enlarge_height * y / this.mask_height
        this.enlarge.style.backgroundPosition = `-${ moveX }px -${ moveY }px`
    })
}

Enlarge.prototype.bindEvent = function () {
    this.list.addEventListener('click', e => {
        e = e || window.event
        const target = e.target || e.srcElement
        if (target.nodeName === 'IMG') {
            for (let i = 0; i < this.list.children.length; i++) {
                this.list.children[i].classList.remove('active')
            }
            target.parentElement.classList.add('active')
            const showImg = target.dataset.show
            const enlargeImg = target.dataset.big
            this.show.firstElementChild.src = showImg
            this.enlarge.style.backgroundImage = `url(${ enlargeImg })`
        }
    })
}