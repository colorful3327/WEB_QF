// 只要导入 Game
import Game from '../JS/game.js'


// 写我的业务逻辑
const g = new Game('.map', '.score')


// 按照我们的dom结构书写游戏
const startBtn = document.querySelector('.start')
startBtn.addEventListener('click', () => {
    g.start()
})

const stopBtn = document.querySelector('.stop')
stopBtn.addEventListener('click', () => g.stop())

const restartBtn = document.querySelector('.restart')
restartBtn.addEventListener('click', () => g.restart())