var Contenedor = cc.Class.extend({
    gameLayer:null,
    actionAnimacionAtaque:null,
    actionAnimacionBucle:null,
    animacion:null,
    sprite:null,
    shape:null,
    dropPotion:null,
    body:null,
ctor:function (gameLayer, posicion, drop) {
    this.dropPotion = drop;
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
        this.body = body;
        this.sprite.setBody(body);
        // forma
        this.shape = new cp.BoxShape(body,31,31);
        this.shape.setCollisionType(tipoContenedor);
        // agregar forma dinamica
        gameLayer.space.addShape(this.shape);
        // añadir sprite a la capa

        this.sprite.runAction(this.actionAnimacionNormal);
        this.animacion = this.actionAnimacionNormal;
         gameLayer.addChild(this.sprite,10);
}, update:function (dt, jugadorX,jugadorY) {
        this.sprite.runAction(this.actionAnimacionNormal);
  }, eliminar: function (){
        // quita la forma
        this.gameLayer.space.removeShape(this.shape);

        // quita el cuerpo *opcional, funciona igual
        // NO: es un cuerpo estático, no lo añadimos, no se puede quitar.
        // this.gameLayer.space.removeBody(shape.getBody());

        // quita el sprite
        this.gameLayer.removeChild(this.sprite);
        if(this.dropPotion){
            var pocion = new Pocion(this.gameLayer,cc.p(this.body.p.x,this.body.p.y));
            this.gameLayer.pociones.push(pocion)
        }
    }




});
