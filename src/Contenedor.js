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
            var frame = cc.spriteFrameCache.getSpriteFrame("res/caja_madera.png");
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        this.actionAnimacionNormal =
            new cc.RepeatForever(new cc.Animate(animacion));


        // Crear Sprite - Cuerpo y forma
        this.sprite = new cc.PhysicsSprite("res/caja_madera.png");

        // Cuerpo estático , no le afectan las fuerzas
        var body = new cp.StaticBody();
        body.setPos(posicion);
        this.body = body;
        this.sprite.setBody(body);
        // forma
        this.shape = new cp.BoxShape(body,40, 40);
        this.shape.setCollisionType(tipoContenedor);
        // agregar forma dinamica
        gameLayer.space.addShape(this.shape);
        // añadir sprite a la capa

        this.sprite.runAction(this.actionAnimacionNormal);
        this.animacion = this.actionAnimacionNormal;
         gameLayer.addChild(this.sprite,10);
}, update:function (dt, atacando) {
        this.sprite.runAction(this.actionAnimacionNormal);
        if(atacando){
            this.shape.setCollisionType(tipoContenedor)
        }else{
            this.shape.setCollisionType(0);
        }
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
