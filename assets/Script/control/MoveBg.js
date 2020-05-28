import { moveBg11, moveBg21 } from '../util/move'
cc.Class({
    extends: cc.Component,

    properties: {
        //背景
        bg01: {
            default: null,
            type: cc.Sprite
        },
        bg02: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        moveBg11(this.bg01.node, this)
        moveBg21(this.bg02.node, this)
    },

    start() {

    },

    // update (dt) {},
});
