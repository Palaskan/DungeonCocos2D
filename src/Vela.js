var Vela = cc.Class.extend({
    gameLayer:null,
    actionAnimacionEncendida:null,
    actionAnimacionApagada:null,
    sprite:null,
    body:null,
    shape:null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;

    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "vela_apagada_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionApagada =
        new cc.RepeatForever(new cc.Animate(animacion));

    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "vela_encendida_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionEncendida =
            new cc.RepeatForever(new cc.Animate(animacion));


    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#vela_apagada_1.png");

   /* this.body = new cp.Body(5, cp.momentForBox(1,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height));

    this.body.setPos(posicion);*/

    // Cuerpo estático , no le afectan las fuerzas
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.sprite.setBody(body);
    // forma
    this.shape = new cp.BoxShape(body,31,31);

    // agregar forma dinamica
    gameLayer.space.addStaticShape(this.shape);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(this.actionAnimacionApagada);
    this.animacion = this.actionAnimacionApagada;

    gameLayer.addChild(this.sprite,10);
}, update:function (dt, correcto) {

      // aumentar el tiempo que ha pasado desde el ultimo salto
      if(correcto){
            this.sprite.runAction(this.actionAnimacionEncendida);
      }
      if(!correcto){
            this.sprite.runAction(this.actionAnimacionApagada);
      }
  }
});

/*//Sprites

*/