var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new GameLayer();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});