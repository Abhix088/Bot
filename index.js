const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const { GoalBlock } = goals

function startBot() {
  const bot = mineflayer.createBot({
    host: 'FiredSMP24.aternos.me', // e.g. play.example.com
    port: '32082',
    username: 'Michael',
    version: false
  })

  bot.loadPlugin(pathfinder)

  bot.once('spawn', () => {
    console.log('Bot joined the server')

    moveIn4x4Square(bot)

    // Chat every 5 minutes
    setInterval(() => {
      bot.chat('.......')
    }, 5 * 60 * 1000)
  })

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...')
    setTimeout(startBot, 10000)
  })

  bot.on('error', err => {
    console.log('Bot error:', err)
  })
}

function moveIn4x4Square(bot) {
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

startBot()
