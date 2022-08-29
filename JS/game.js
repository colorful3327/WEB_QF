// 导入食物和蛇
import Food from '../JS/food.js'
import Snake from '../JS/snake.js'

export default class Game {
    constructor (ele, score) {
        this.map = document.querySelector(ele)
        this.score = document.querySelector(score)  // 
        this.food = new Food(this.map)
        this.snake = new Snake(this.map)
        this.level = 5  // 等级
        this.timer = 0  // 定时器返回值
        this.count = 0  // 吃
        this.change()
    }

    start () {
        this.timer = setInterval(() => {
            this.snake.move()

            if (this.snake.isEat(this.food)) {
                this.updateScore()
                this.snake.creHead()
                this.food.newFood()
            }
            if (this.snake.isDie()) {
                clearInterval(this.timer)   // 记得关闭
                window.alert('GAME OVER!')
            }
        }, 500 - this.level * 50)
    }

    // 暂停
    stop () {
        clearInterval(this.timer)
    }

    // 重来
    restart () {
        window.location.reload()
    } 

    change () {
        document.addEventListener('keydown', e => {
            e = e || window.event
            const code = e.keyCode || e.which
        
            switch (code) {
                case 37: this.snake.direction = 'left'; break
                case 38: this.snake.direction = 'top'; break
                case 39: this.snake.direction = 'right'; break
                case 40: this.snake.direction = 'bottom'; break
            }
        })
    }

    updateScore () {
        this.count++
        this.score.value = this.count * 129 + this.level * 49

        if (this.count % 3 === 0) {
            this.level++
            this.stop()
            this.start()
        }
    }

}