export default class Food {
    constructor (map) {
        this.map = map
        this.food = document.createElement('div')
        this.food.className = 'food'
        this.map.appendChild(this.food)
        this.x = 0
        this.y = 0

        this.newFood()
    }

    newFood () {
        const xNum = this.map.clientWidth / 20
        const yNum = this.map.clientHeight / 20

        const x = Math.floor(Math.random() * xNum)
        const y = Math.floor(Math.random() * yNum)

        this.x = x * 20
        this.y = y * 20

        this.food.style.left = this.x + 'px'
        this.food.style.top = this.y + 'px'
    }
}