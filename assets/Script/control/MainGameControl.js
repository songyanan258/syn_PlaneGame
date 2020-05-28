import createEnemy from '../util/createNormalEnemy'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let self = this
        cc.loader.loadRes(
            'plane.prefab',
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

    },

    // update (dt) {},
});
