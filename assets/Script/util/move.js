
const moveBg21 = function (node, thisArg) {
  node.setPosition(cc.p(0, 640))
  let finished = cc.callFunc(target => {
    moveBg12(node, thisArg)
  }, thisArg)
  node.runAction(cc.sequence(cc.moveTo(4, 0, -640), finished))
}
const moveBg12 = function (node, thisArg) {
  node.setPosition(cc.p(0, 640))
  let finished = cc.callFunc(target => {
    moveBg12(node, thisArg)
  }, thisArg)
  node.runAction(cc.sequence(cc.moveTo(4, 0, -640), finished))
}
//背景移动逻辑
const moveBg11 = function (node, thisArg) {
  node.setPosition(cc.p(0, 0))
  let finished = cc.callFunc(function (target) {
    moveBg12(node, thisArg)
  }, thisArg)
  node.runAction(cc.sequence(cc.moveTo(2, 0, -640), finished))
}


export default {
  moveBg11,
  moveBg21
}