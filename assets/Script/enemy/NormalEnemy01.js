import { createEnemy, createSingleEnemy } from '../util/createNormalEnemy'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
    //敌机初始化
    onLoad() {
        this.getBulletPrefab()
        this.animation = this.node.getComponent(cc.Animation)
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

    getBulletPrefab() {
        this.getBullet('bullet/enemy_bullet01.prefab')
    },
    getBullet(str) {
        cc.loader.loadRes(str, (err, prefab) => {
            this.bulletPrefab = prefab
            this.initBullet()
            // this.bulletPrefab.setPosition(cc.p(0, 20))
            // this.node.parent.addChild(this.bulletPrefab)
        })
    },


    start() {
        //当前敌机碰撞组件分组
        this.node.group = 'EnemyPlane'
    },
    //当前敌机碰撞逻辑
    onCollisionEnter(other, self) {
        // if (this.animation._isOnLoadCalled) self.node.__des__()
        // this.animation.on('finished', () => {
        // this.animation._isOnLoadCalled = 0
        // }, this)
        // this.animation.play('enemy01')
        // self.node.addChild(exp)
        self.node.__des__()
    },

    // update (dt) {},
});
