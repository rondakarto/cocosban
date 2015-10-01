var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch,event){
        startTouch = touch.getLocation();
        return true;
    }
    ,
    onTouchEnded:function(touch,event){
        endTouch = touch.getLocation();
        swipeDiretion();
    }
});


var GameLayer = cc.Layer.extend({
    init:function(){
        this._super();
        cache = cc.spriteFrameCache;
        cache.addSpriteFrames( res.spritesheep_plist, res.spritesheep_png );
        var backgroundSprite = new cc.Sprite( cache.getSpriteFrame('background.png'));
        backgroundSprite.getTexture().setAliasTexParameters();
        backgroundSprite.setPosition(240,160);
        backgroundSprite.setScale(5);
        this.addChild(backgroundSprite);
        var levelSprite = new cc.Sprite( cache.getSpriteFrame( 'level.png'));
        levelSprite.setPosition(240,110);
        levelSprite.setScale(5);
        this.addChild(levelSprite);

        for( i = 0; i<7; ++i ){
            crateArray[i] = [];
            for( j = 0; j <7; j++ ){
                switch(level[i][j]){
                    case 4:
                    case 6:
                        playerSprite = new cc.Sprite( cache.getSpriteFrame('player.png'));
                        playerSprite.setPosition( 165+25*j, 185-25*i);
                        playerSprite.setScale(5);
                        this.addChild( playerSprite );
                        playerPosition = { x:j, y:i };
                        crateArray[i][j] = null;
                        break;
                    case 3:
                    case 5:
                        var crateSprite = new cc.Sprite( cache.getSpriteFrame('crate.png'));
                        crateSprite.setPosition( 165+25*j, 185-25*i );
                        crateSprite.setScale(5);
                        this.addChild(crateSprite);
                        crateArray[i][j] = crateSprite;
                        break;
                    default:
                        crateArray[i][j] = null;
                }
            }
        }

        cc.eventManager.addListener( listener, this );

    }
});



function swipeDiretion(){
    var distX = startTouch.x - endTouch.x;
    var distY = startTouch.y - endTouch.y;
    if( Math.abs(distX) + Math.abs(distY) > swipeTolerance){
        if(Math.abs(distX) > Math.abs(distY)){
            if(distX>0){
                //playerSprite.setPosition(playerSprite.getPosition().x-25,playerSprite.getPosition().y);
                move(-1,0);
            }
            else {
                //playerSprite.setPosition(playerSprite.getPosition().x+25,playerSprite.getPosition().y);
                move(1,0);
            }
        }
        else{
            if(distY>0){
                //playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y-25);
                move(0,1);
            }
            else {
                //playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y+25);
                move(0,-1);
            }
        }
    }

}

function move(deltaX,deltaY) {
    switch(level[playerPosition.y+deltaY][playerPosition.x+deltaX]) {
        case 0:
        case 2:
            level[playerPosition.y][playerPosition.x] -= 4;
            playerPosition.x += deltaX;
            playerPosition.y += deltaY;
            level[playerPosition.y][playerPosition.x] += 4;
            playerSprite.setPosition(165+25*playerPosition.x, 185-25*playerPosition.y);
            break;
        case 3:
        case 5:
            if(level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2] == 2
            || level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2] == 0){
                level[playerPosition.y][playerPosition.x] -= 4;
                playerPosition.x += deltaX;
                playerPosition.y += deltaY;
                level[playerPosition.y][playerPosition.x] += 1;
                playerSprite.setPosition(165+25*playerPosition.x, 185-25*playerPosition.y);
                level[playerPosition.y+deltaY][playerPosition.x+deltaX] += 3;
                var movingCrate = crateArray[playerPosition.y][[playerPosition.x]];
                movingCrate.setPosition( movingCrate.getPosition().x+25*deltaX, movingCrate.getPosition().y-25*deltaY);
                crateArray[playerPostion.y+deltaY][playerPostion.x_deltaX]= movingCrate;
                crateArray[playerPostion.y][playerPostion.x]= movingCrate;
            }
            break;
    }
}