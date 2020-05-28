import { createEnemy } from '../util/createNormalEnemy'
import { } from '../util/index'
cc.Class({
    extends: cc.Component,

    properties: {

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let self = this
        cc.loader.loadRes(
            window.Player == window.PLAYER_1 ? 'plane.prefab' : 'plane2.prefab',
            (err, prefab) => {
                //创建节点
                self.heroPlane = cc.instantiate(prefab)
                const res = self.heroPlane.getComponent('Plane')
                    .setControlNode(self.canvas)
                self.heroPlane.setPosition(cc.p(0, -200))
                self.node.addChild(self.heroPlane)
            }
        )

        cc.loader.loadRes('enemy/enemy01.prefab', (err, prefab) => {
            const enemy = cc.instantiate(prefab)
            createEnemy([enemy], this)
        })

    },

    start() {
        //开启碰撞检测
        const manager = cc.director.getCollisionManager()
        manager.enabled = true
    },

    // update (dt) {},
});
