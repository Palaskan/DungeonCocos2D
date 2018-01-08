var Puerta = cc.Class.extend({
    gameLayer:null,
    actionAnimacionJefeCerrada:null,
    actionAnimacionJefeAbierta:null,
    actionAnimacionNormalCerrada:null,
    actionAnimacionNormalAbierta:null,
    tipo:0,
    sprite:null,
    body:null,
    shape:null,
ctor:function (gameLayer, posicion,tipo) {
    this.gameLayer = gameLayer;
    this.tipo = tipo;
    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "puerta_jefe_cerrada_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionJefeCerrada =
        new cc.RepeatForever(new cc.Animate(animacion));

    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "puerta_jefe_abierta_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionJefeAbierta =
            new cc.RepeatForever(new cc.Animate(animacion));

    var framesAnimacion = [];
        for (var i = 1; i <= 1; i++) {
            var str = "puerta_normal_cerrada_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        this.actionAnimacionNormalCerrada =
            new cc.RepeatForever(new cc.Animate(animacion));

        var framesAnimacion = [];
        for (var i = 1; i <= 1; i++) {
            var str = "puerta_normal_abierta_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        animacion = new cc.Animation(framesAnimacion, 0.2);
        this.actionAnimacionNormalAbierta =
                new cc.RepeatForever(new cc.Animate(animacion));


    //this.sprite = new cc.PhysicsSprite("#puerta_normal_cerrada_1.png");
    // Crear Sprite - Cuerpo y forma
    if(this.tipo == 1){
        this.sprite = new cc.PhysicsSprite("#puerta_normal_cerrada_1.png");
    }
    if(this.tipo == 2){
        this.sprite = new cc.PhysicsSprite("#puerta_jefe_cerrada_1.png");
    }


    // Cuerpo estático , no le afectan las fuerzas
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.sprite.setBody(body);
    // forma
    this.shape = new cp.BoxShape(body,32,38);
    this.shape.setCollisionType(0);
    /*if(this.tipo==1){
        this.shape.setCollisionType(tipoPuertaNormal);
    }
    if(this.tipo==2){
        this.shape.setCollisionType(tipoPuertaJefe);
    }*/

    // agregar forma dinamica
    gameLayer.space.addStaticShape(this.shape);
    // añadir sprite a la capa

    // ejecutar la animación
    if(this.tipo==1){
        this.sprite.runAction(this.actionAnimacionNormalCerrada);
        this.animacion = this.actionAnimacionNormalCerrada;
    }
    if(this.tipo==2){
        this.sprite.runAction(this.actionAnimacionJefeCerrada);
        this.animacion = this.actionAnimacionJefeCerrada;
    }


    gameLayer.addChild(this.sprite,10);
}, updateNormal:function (dt, correcto, llaves, numllaves) {

      // aumentar el tiempo que ha pasado desde el ultimo salto
      if(correcto && llaves == 0 && numllaves == 0){
            if(this.tipo == 1){
                this.sprite.runAction(this.actionAnimacionNormalAbierta);
                this.shape.setCollisionType(tipoPuertaNormal);
            }
      }
      if(correcto && llaves == 0 && numllaves > 0){
              if(this.tipo == 1){
                  this.shape.setCollisionType(tipoPuertaNormal);
              }
       }
      if(!correcto){
            if(this.tipo == 1){
                this.sprite.runAction(this.actionAnimacionNormalCerrada);
                this.shape.setCollisionType(0);
            }
      }
  }, updateJefe:function (dt, correcto) {

         // aumentar el tiempo que ha pasado desde el ultimo salto
         if(correcto){
               //if(this.tipo == 2){
                   this.sprite.runAction(this.actionAnimacionJefeAbierta);
                   this.shape.setCollisionType(tipoPuertaJefe);
               //}
         }
         if(!correcto){
               //if(this.tipo == 2){
                   this.sprite.runAction(this.actionAnimacionJefeCerrada);
                   this.shape.setCollisionType(0);
              // }
         }
     }
});
