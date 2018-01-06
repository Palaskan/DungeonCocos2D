var DisparoJefe = cc.Class.extend({
    gameLayer:null,
    actionAnimacion:null,
    animacion:null,
    sprite:null,
    shape:null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;
    // Crear animaciÃ³n
    var framesAnimacion = [];
    for (var i = 1; i <= 6; i++) {
        var str = "disparo_jefe_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacion =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#disparo_jefe_1.png");
    // Cuerpo estÃ¡tica , no le afectan las fuerzas
    // Cuerpo dinÃ¡mico, SI le afectan las fuerzas
    this.body = new cp.Body(5, cp.momentForBox(1,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height));

    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    // Se aÃ±ade el cuerpo al espacio
    gameLayer.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width - 30,
        this.sprite.getContentSize().height - 30);
        this.shape.setFriction(0);
        this.shape.setElasticity(1000);
    this.shape.setCollisionType(tipoDisparo);
    // agregar forma dinamica
    gameLayer.space.addShape(this.shape);
    // aÃ±adir sprite a la capa

    // ejecutar la animaciÃ³n
    this.sprite.runAction(this.actionAnimacion);
    this.animacion = this.actionAnimacion;

    gameLayer.addChild(this.sprite,10);
}, update:function (dt) {
      this.sprite.runAction(this.animacion);
  }, eliminar: function (){
        // quita la forma
        this.gameLayer.space.removeShape(this.shape);

        // quita el cuerpo *opcional, funciona igual
        // NO: es un cuerpo estÃ¡tico, no lo aÃ±adimos, no se puede quitar.
        // this.gameLayer.space.removeBody(shape.getBody());

        // quita el sprite
        this.gameLayer.removeChild(this.sprite);
    }




});
