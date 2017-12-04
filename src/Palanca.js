var Palanca = cc.Class.extend({
    gameLayer:null,
    actionAnimacionPalancaIzquierdaArriba:null,
    actionAnimacionPalancaIzquierdaAbajo:null,
    actionAnimacionPalancaDerechaArriba:null,
    actionAnimacionPalancaDerechaAbajo:null,
    sprite:null,
    body:null,
    shape:null,
    accionada:false,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;
    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "palanca_izquierda_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionPalancaIzquierdaArriba =
        new cc.RepeatForever(new cc.Animate(animacion));

    var framesAnimacion = [];
    for (var i = 2; i <= 2; i++) {
        var str = "palanca_izquierda_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionPalancaIzquierdaAbajo =
            new cc.RepeatForever(new cc.Animate(animacion));

        //this.sprite = new cc.PhysicsSprite("#puerta_normal_cerrada_1.png");
    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#palanca_izquierda_1.png");

    // Cuerpo estático , no le afectan las fuerzas
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.body = body;
    this.sprite.setBody(body);
    // forma
    this.shape = new cp.BoxShape(body,32,38);
    this.shape.setCollisionType(tipoPalanca);
    /*if(this.tipo==1){
        this.shape.setCollisionType(tipoPuertaNormal);
    }
    if(this.tipo==2){
        this.shape.setCollisionType(tipoPuertaJefe);
    }*/

    // agregar forma dinamica
    gameLayer.space.addStaticShape(this.shape);
    // añadir sprite a la capa

    this.sprite.runAction(this.actionAnimacionPalancaIzquierdaArriba);
    this.animacion = this.actionAnimacionPalancaIzquierdaArriba;


    gameLayer.addChild(this.sprite,10);
}, update:function (dt) {

       // aumentar el tiempo que ha pasado desde el ultimo salto
       if(this.accionada){
                this.sprite.stopAllActions();
                this.animacion = this.actionAnimacionPalancaIzquierdaAbajo;
                this.sprite.runAction(this.animacion);
       }
       if(!this.accionada){
                this.sprite.stopAllActions();
                this.animacion = this.actionAnimacionPalancaIzquierdaArriba;
                this.sprite.runAction(this.animacion);
       }
   },accionar:function(){
        this.accionada = true;
   }
});