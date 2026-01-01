const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const { GoalBlock } = goals

const bot = mineflayer.createBot({
  host: 'YOUR_SERVER_IP',
  port: 25565,
  username: 'SMP_Bot',
  version: false
})

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  console.log('Bot joined server')

  moveIn4x4Square()

  setInterval(() => {
    bot.chat('Welcome to my SMP ❤️')
  }, 5 * 60 * 1000)
})

function moveIn4x4Square() {
  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)
  bot.pathfinder.setMovements(movements)

  const start = bot.entity.position.clone()

  const points = [
    start.offset(4, 0, 0),
    start.offset(4, 0, 4),
    start.offset(0, 0, 4),
    start
  ]

  let i = 0

  setInterval(() => {
    const p = points[i]
    bot.pathfinder.setGoal(
      new GoalBlock(
        Math.floor(p.x),
        Math.floor(p.y),
        Math.floor(p.z)
      )
    )
    i = (i + 1) % points.length
  }, 5000)
}

// Auto reconnect
bot.on('end', () => {
  console.log('Disconnected, reconnecting...')
  setTimeout(() => process.exit(1), 5000)
})

bot.on('error', console.log)
