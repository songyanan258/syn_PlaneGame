window.PLAYER_1 = 'a'
window.PLAYER_2 = 'b'
window.Player = window.PLAYER_1
//获取随机整数
window.getRandomInt = function (start, end) {
  let p, randomSign = this.Math.random() > 0.5 ? -1 : 1
  if (start > 0 && end < 10) {
    p = 10
  } else if (start >= 10 && end < 100) {
    p = 100
  } else {
    p = 1000
  }
  const res = this.parseInt(this.Math.random() * p) * randomSign
  return (res >= start && res <= end) ? res : window.getRandomInt(start, end)
}
export default {}