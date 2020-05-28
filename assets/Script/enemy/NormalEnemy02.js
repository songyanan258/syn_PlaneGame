import EnemyComponent from './NormalEnemy01'
cc.Class({
    extends: EnemyComponent,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.getBulletPrefab()
    },

    start() {
        //当前敌机碰撞组件分组
        this.node.group = 'EnemyPlane'
    },
    //当前敌机碰撞逻辑
    onCollisionEnter(other, self) {
        self.node.__des__()
    },
    getBulletPrefab() {
        this.getBullet('bullet/enemy_bullet02.prefab')
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

});
