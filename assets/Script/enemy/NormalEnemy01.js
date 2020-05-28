
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
    //敌机初始化
    onLoad() {
        this.getBullet()
        //创建对象池
    },

    initBullet() {
        this.bulletPool = new cc.NodePool()
        let initCount = 6
        for (let i = 0; i < initCount; i++) {
            let enemy = cc.instantiate(this.bulletPrefab)
            enemy.test = function (other, self) {
                console.log('enemy.onCollisionEnter1')
            }
            this.bulletPool.put(enemy.node)
        }
        //创建子弹逻辑
        let bulletLogic = cc.callFunc(target => {
            let bulletLeft, bulletRight
            //从对象池中获取子弹对象
            if (this.bulletPool.size() < 0) {
                bulletLeft = this.bulletPool.get()
                bulletRight = this.bulletPool.get()
            } else {
                bulletLeft = cc.instantiate(this.bulletPrefab)
                bulletRight = cc.instantiate(this.bulletPrefab)
            }
            this.runBulletAction(this.node.width / 6, -this.node.height / 5, bulletRight)
            this.runBulletAction(-this.node.width / 6, -this.node.height / 5, bulletLeft)
            this.node.runAction(cc.sequence(cc.delayTime(1), bulletLogic))
        }, this)
        this.node.runAction(cc.sequence(cc.delayTime(1), bulletLogic))
    },
    //子弹飞行动作
    runBulletAction(x, y, bullet) {
        x = this.node.position.x + x
        y = this.node.position.y + y
        bullet.parent = this.node.parent
        let pos = this.node.getPosition()
        // bullet.setPosition({ x, y })
        bullet.setPosition({ x, y })
        let finished = cc.callFunc(target => {
            this.bulletPool.put(bullet)
        }, this)
        bullet.runAction(cc.sequence(cc.moveTo(1, x, -600), finished))
    },
    setControlNode(node, index) {
        this.nodeControl = node
        this.enemyIndex = index || 0
    },
    getBullet() {

        cc.loader.loadRes('bullet/enemy_bullet01.prefab', (err, prefab) => {
            this.bulletPrefab = prefab
            this.initBullet()
            // this.bulletPrefab.setPosition(cc.p(0, 20))
            // this.node.parent.addChild(this.bulletPrefab)
        })
    },


    start() {

    },

    // update (dt) {},
});
