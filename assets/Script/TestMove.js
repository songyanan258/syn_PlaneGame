
cc.Class({
    extends: cc.Component,

    properties: {
        bgList: [cc.Node],
        bg_speed: 10
    },


    onLoad() {
    },

    bgMove: function (bgList, speed) {

        //每次循环二张图片一起滚动
        for (var index = 0; index < bgList.length; index++) {
            bgList[index].y -= speed;
        }
        //y坐标减去自身的height得到这张背景刚好完全离开场景时的y值
        if (bgList[0].y <= 0 - bgList[0].height) {
            bgList[0].y = 640; //离开场景后将此背景图的y重新赋值，位于场景的上方
        }
        if (bgList[1].y <= 640 - 2 * bgList[1].height) {
            bgList[1].y = 640;
        }
    },
    update() {
        this.bgMove(this.bgList, this.bg_speed);

    },
    start() {

    },

    // update (dt) {},
});
