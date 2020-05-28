import def from '../util/index'
let thisArg, nodes
const enemyPools = []
//当前敌机数量
let enemyCount = 3
//创建单个敌机
const createSingleEnemy = function () {
  thisArg.node.runAction(cc.sequence(cc.delayTime(1), EnemyCallback))
}
//创建敌机
const createEnemy = function (_nodes, _thisArg) {
  // thisArg = _thisArg
  _thisArg ? thisArg = _thisArg : null
  _nodes ? nodes = _nodes : null
  // nodes = _nodes
  const initCount = 5

  for (var i = 1; i <= initCount; ++i) {
    enemyPools[i] = new cc.NodePool()
    for (let j = 1; j <= initCount; ++j) {
      let enemy = cc.instantiate(getEnemyNode(nodes, 0))
      enemy.getComponent('NormalEnemy01').setControlNode(thisArg.canvas, i)
      enemyPools[i].put(enemy)
    }
  }
  thisArg.node.runAction(cc.sequence(cc.delayTime(1), EnemyCallback))
  thisArg.node.runAction(cc.sequence(cc.delayTime(0.5), EnemyCallback))
  thisArg.node.runAction(cc.sequence(cc.delayTime(1.5), EnemyCallback))
}

//创建敌机回调函数移动
let EnemyCallback = cc.callFunc(event => {
  //敌机类型
  // let enemyType = window.getRandomInt(1, 5)
  let enemyType = 1
  //创建敌机
  let enemyPool = enemyPools[enemyType]
  let enemy
  if (enemyPool.size() > 0) {
    enemy = enemyPool.get()
  } else {
    return
    enemy = cc.instantiate(getEnemyNode(nodes, 0))
    enemy.getComponent('NormalEnemy0' + 1).setControlNode(thisArg.canvas)
  }

  //获取父级元素
  enemy.parent = thisArg.node

  //敌机横坐标
  let enemyPosX = window.getRandomInt(-210 + enemy.width / 2, 210 - enemy.width / 2)
  //设置敌机初始坐标,应该设置在屏幕外
  let pos = cc.p(enemyPosX, 320 + enemy.height / 2)
  enemy.setPosition(pos)
  // enemy.runAction(cc.sequence(cc.moveTo(3, pos.x, -200), finished))
  //敌机飞行结束后的回调
  let finished = cc.callFunc(target => {
    // thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
    if (Math.random() > 0.5) {
      thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
      thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
    }
    if (enemyCount === 0) {
      thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
    }
    enemyPool.put(enemy)
    if (enemyPool.size() === 5) {
      thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
      thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
      thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
    }
  }, thisArg)
  //将对象回收到对象池中
  enemy.__des__ = () => {
    thisArg.node.runAction(cc.sequence(cc.delayTime(Math.random()), EnemyCallback))
    enemy.stopAction(enemy.__action__)
    enemyPool.put(enemy)
  }
  enemy.__this__ = thisArg
  switch (enemyType) {
    case 1:
      enemyAction(3, pos.x, enemy, finished)
      break
    case 2:
      enemyAction(5, pos.x, enemy, finished)
      break
    case 3:
      enemyAction(4, pos.x, enemy, finished)
      break
    case 4:
      enemyAction(3, pos.x, enemy, finished)
      break;
    case 5:
      enemyAction(null, null, enemy, finished, cc.sequence(cc.moveTo(3, -pos.x, 100), cc.moveTo(3, -pos.x, -320 - enemy.height / 2)))
      break
    default:
      enemyAction(4, pos.x, enemy, finished)
      break;
  }
  if (Math.random() > 0.5) {
    thisArg.node.runAction(cc.sequence(cc.delayTime(5), EnemyCallback))
    thisArg.node.runAction(cc.sequence(cc.delayTime(4), EnemyCallback))
  }
  if (enemyCount === 0) {
    thisArg.node.runAction(cc.sequence(cc.delayTime(3), EnemyCallback))
  }
}, thisArg)
//敌机飞行动作
const enemyAction = (time, x = x * (Math.random() > 0.5 ? -1 : 1), enemy, finished, sequence) => {
  let action = cc.sequence(sequence ? sequence : cc.moveTo(time, x, -320 - enemy.height / 2), finished)
  enemy.__action__ = action
  enemy.runAction(action)
}

const getEnemyNode = (node, type) => {
  return node[type]
}

export default { createEnemy, createSingleEnemy }