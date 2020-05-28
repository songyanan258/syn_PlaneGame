
cc.Class({
    extends: cc.Component,

    properties: {
        plane: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.registerMoveEvent()
        this.getBullet()
    },
    //这是设置啥,控制节点?
    setControlNode(node) {
        this.nodeControl = node
    },
    //注册飞机触摸事件函数
    registerMoveEvent() {
        let self = this
        //移动位置
        this.moveToPos = cc.p(0, 0)
        this.isMoving = false
        //开始触摸监听
        this.node.on(cc.Node.EventType.TOUCH_START, event => {
            let touches = event.getTouches()
            let touchLoc = touches[0].getLocation()
            self.isMoving = true
            //转换到父节点空间坐标系
            self.moveToPos = self.node.parent.convertToNodeSpaceAR(touchLoc)
        }, self.node)
        //拖动监听
        this.node.on(cc.Node.EventType.TOUCH_MOVE, event => {
            let touches = event.getTouches()
            //获取当前节点坐标
            let touchLoc = touches[0].getLocation()
            //转换为父节点的坐标
            self.moveToPos = self.node.parent.convertToNodeSpaceAR(touchLoc)
        }, self.node)
        //触摸结束监听
        self.node.on(cc.Node.EventType.TOUCH_END, event => {
            self.isMoving = false
        })
    },

    //更新飞机位置信息
    updateHeroPos(dt) {
        if (!this.isMoving) return
        let oldPos = this.node.position
        if (Math.abs(this.moveToPos.x - oldPos.x) < 3 && Math.abs(this.moveToPos.y - oldPos.y) < 3) return
        if (Math.abs(this.moveToPos.x) >= 160) {
            const padding = this.node.width / 2
            this.moveToPos = { y: this.moveToPos.y, x: this.moveToPos.x > 0 ? 160 - padding : padding - 160 }
        }
        //获取移动方向
        let direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos))
        this.node.setPosition(cc.pAdd(oldPos, cc.pMult(direction, 300 * dt)))
    },

    initBullet() {
        this.bulletPool = new cc.NodePool()
        let initCount = 10
        for (let i = 0; i < initCount; i++) {
            let bullet = cc.instantiate(this.bulletPrefab[Math.random() > 0.5 ? 0 : 1])
            this.bulletPool.put(bullet.node)
        }

        //子弹飞行回调
        let bulletCall = cc.callFunc(target => {
            let bullet
            //从对象池中获取子弹对象
            if (this.bulletPool.size() < 0) {
                bullet = this.bulletPool.get()
            } else {
                bullet = cc.instantiate(this.bulletPrefab[Math.random() > 0.5 ? 0 : 1])
            }
            this.runBulletAction(this.node.width / 6 * Math.random() > 0.5 ? -1 : 1, this.node.height / 5, bullet)
            this.node.runAction(cc.sequence(cc.delayTime(0.3), bulletCall))
        })
        this.node.runAction(cc.sequence(cc.delayTime(0.5), bulletCall))
        this.node.runAction(cc.sequence(cc.delayTime(0.8), bulletCall))
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
        bullet.runAction(cc.sequence(cc.moveTo(1, x, 600), finished))
    },
    start() {

    },
    getBullet() {
        cc.loader.loadResDir('hero_bullet', cc.Prefab, (err, arr) => {
            this.bulletPrefab = arr
            this.initBullet()
        })
    },

    update(dt) {
        this.updateHeroPos(dt)
    },
});
