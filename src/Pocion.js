var Pocion = cc.Class.extend({
    gameLayer:null,
    sprite:null,
    body:null,
    shape:null,
    actionAnimacionPocionNormal:null,
    actionAnimacionPocionGrande:null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;
    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "pocion_normal_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionPocionNormal =
        new cc.RepeatForever(new cc.Animate(animacion));

    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "pocion_grande_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionPocionGrande =
            new cc.RepeatForever(new cc.Animate(animacion));

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#vela_apagada_1.png");
    console.log(this.sprite);
    // Cuerpo estático , no le afectan las fuerzas
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.body = body;
    this.sprite.setBody(body);
    // forma
    this.shape = new cp.BoxShape(body,32,38);
    this.shape.setCollisionType(tipoPocion);

    // agregar forma dinamica
    gameLayer.space.addStaticShape(this.shape);
    // añadir sprite a la capa



    gameLayer.addChild(this.sprite,10);
}
});