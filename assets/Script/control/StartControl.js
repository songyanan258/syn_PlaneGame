
cc.Class({
    extends: cc.Component,

    properties: {
        playBtn: {
            default: null,
            type: cc.Button
        },
        logo: {
            default: null,
            type: cc.Sprite
        }
    },


    onLoad() {
        this.node.parent.children[2].on('click', this.onPlay, this)
    },
    //按钮点击事件
    btnClick(event) {
        cc.log('小明哇')
    },

    start() {
    },

    onPlay() {
        //载入游戏准备场景
        cc.director.loadScene("PlaneReady")
        // cc.director.loadScene('db://assets/Scene/planeReady.fire', this.onLoadSceneFinish.bind(this))
    }

    // update(dt) { },
});
