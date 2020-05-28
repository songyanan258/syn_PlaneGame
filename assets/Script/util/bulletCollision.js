//子弹碰撞逻辑
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        const name = this.node.name
        if (name == 'hreo_bullet01' || name == 'hreo_bullet02') {
            this.node.group = 'HeroBullet'
        } else {
            this.node.group = 'EnemyBullet'
        }
    },
    //子弹碰撞逻辑处理
    onCollisionEnter(other, self) {
        // console.log(other, self)
    }
    // update (dt) {},
});
