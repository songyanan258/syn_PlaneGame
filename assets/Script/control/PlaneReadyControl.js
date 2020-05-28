import name from '../util/index'
import { moveBg11, moveBg21 } from '../util/move'
cc.Class({
    extends: cc.Component,

    properties: {
        //player01
        plane1: {
            default: null,
            type: cc.Button
        },
        //player02
        plane2: {
            default: null,
            type: cc.Button
        },
        //确定按钮
        confirmBtn: {
            default: null,
            type: cc.Button
        },
        //选择框
        selectWrapper: {
            default: null,
            type: cc.Sprite
        }
    },


    onLoad() {
        //plane1监听
        this.plane1.node.on('click', (event) => {
            const index = window.PLAYER_1
            this.selectPlane(index)
            this.setSelectWrapper(index)
        })
        //plane2监听
        this.plane2.node.on('click', (event) => {
            const index = window.PLAYER_2
            this.selectPlane(index)
            this.setSelectWrapper(index)
        })
        //确定按钮点击事件监听
        this.confirmBtn.node.on('click', this.onStart.bind(this))
    },

    start() {

    },
    //确认按钮点击事件
    onStart() {
        cc.director.loadScene('MainGame')
    },
    //设置选择框的位置
    setSelectWrapper(index) {
        switch (index) {
            case window.PLAYER_1:
                this.selectWrapper.node.x = -60
                break;
            case window.PLAYER_2:
                this.selectWrapper.node.x = 60
                break;

            default:
                this.selectWrapper.node.x = -60
                break;
        }
    },
    selectPlane(index) {
        switch (index) {
            case window.PLAYER_1:
                window.Player = window.PLAYER_1
                break;
            case window.PLAYER_2:
                window.Player = window.PLAYER_2
                break;
            default:
                window.Player = window.PLAYER_1
                break;
        }
    },




    // update (dt) {},
});
