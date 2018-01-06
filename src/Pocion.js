var Pocion = cc.Class.extend({
    gameLayer:null,
    sprite:null,
    body:null,
    shape:null,
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
    this.actionAnimacionNormal =
        new cc.RepeatForever(new cc.Animate(animacion));


    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#pocion_normal_1.png");

    // Cuerpo estático , no le afectan las fuerzas
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.sprite.setBody(body);
    // forma
    this.shape = new cp.BoxShape(body,31,31);
    this.shape.setCollisionType(tipoPocion);
    // agregar forma dinamica
    gameLayer.space.addShape(this.shape);
    // añadir sprite a la capa

    this.sprite.runAction(this.actionAnimacionNormal);
    this.animacion = this.actionAnimacionNormal;



    gameLayer.addChild(this.sprite,10);
}, update:function (dt) {
      this.sprite.runAction(this.actionAnimacionNormal);
}, eliminar: function (){
         // quita la forma
         this.gameLayer.space.removeShape(this.shape);

         // quita el cuerpo *opcional, funciona igual
         // NO: es un cuerpo estático, no lo añadimos, no se puede quitar.
         // this.gameLayer.space.removeBody(shape.getBody());

         // quita el sprite
         this.gameLayer.removeChild(this.sprite);
     }
});