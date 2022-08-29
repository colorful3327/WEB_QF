export default class Snake {
    constructor (map) {
        this.map = map

        this.snake = []
        this.direction = 'right'

        this.creSnake()
    }

    pos () {
        // 计算位置
        const head = this.snake[0]

        if (!head) return { left: 0, top: 0 }   // 没头

        const obj = { left: head.offsetLeft, top: head.offsetTop }
        switch (this.direction) {
            case 'top': obj.top -= 20; break
            case 'left': obj.left -= 20; break
            case 'right': obj.left += 20; break
            case 'bottom': obj.top += 20; break
        }
        return obj
    }

    creHead () {
        const pos = this.pos()
        const head = this.snake[0]
        if (head) head.className = 'body'
        const div = document.createElement('div')
        div.className = 'head'
        div.style.left = pos.left + 'px'
        div.style.top = pos.top + 'px'
        this.snake.unshift(div)
        this.map.appendChild(div)
    }

    creSnake () {
        // 3节
        for (let i = 0; i < 3; i ++) {
            this.creHead()
        }
    }

    move () {
        // pop() 删除数组最后一个 返回这个东西
        const body = this.snake.pop()
        // 移出
        body.remove()
        // +头
        this.creHead()
    }
    
/**
 * 
 * @returns { 布尔 }
 */
    isDie () {
        const head = this.snake[0]
        const x = head.offsetLeft
        const y = head.offsetTop

        if (x < 0 || x >= this.map.clientWidth || y < 0 || y >= this.map.clientHeight) {
            return true 
        } else {
            const tmp = this.snake.slice(1)
            let flag = false
            tmp.forEach(item => {
                if (x === item.offsetLeft && y === item.offsetTop) {
                    flag = true
                }
            })
            return flag
        }
    }

    isEat (food) {
        const x = this.snake[0].offsetLeft
        const y = this.snake[0].offsetTop
        if (x === food.x && y === food.y) {
            return true
        } else {
            return false
        }
    }
    
}