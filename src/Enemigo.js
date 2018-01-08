var Enemigo = cc.Class.extend({
    gameLayer:null,
    actionAnimacionAtaque:null,
    actionAnimacionBucle:null,
    animacion:null,
    sprite:null,
    shape:null,
    dropKey:null,
    dropPotion:null,
ctor:function (gameLayer, posicion, drop, dropKey) {
    this.gameLayer = gameLayer;
    this.dropPotion = drop;
    this.dropKey = dropKey;
    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 6; i++) {
        var str = "enemigo_movimiento_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.3);
    this.actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));

    var framesAnimacion = [];
    for (var i = 1; i <= 6; i++) {
        var str = "enemigo_ataque_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionAtaque =
            new cc.RepeatForever(new cc.Animate(animacion));


    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#enemigo_movimiento_1.png");
    // Cuerpo estática , no le afectan las fuerzas
    // Cuerpo dinámico, SI le afectan las fuerzas
    this.body = new cp.Body(5, cp.momentForBox(1,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height));

    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    // Se añade el cuerpo al espacio
    gameLayer.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width - 16,
        this.sprite.getContentSize().height - 16);
        this.shape.setFriction(0);
        this.shape.setElasticity(0);
    this.shape.setCollisionType(tipoEnemigo);
    // agregar forma dinamica
    gameLayer.space.addShape(this.shape);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(this.actionAnimacionBucle);
    this.animacion = this.actionAnimacionBucle;

    gameLayer.addChild(this.sprite,10);
}, update:function (dt, jugadorX,jugadorY) {

      // aumentar el tiempo que ha pasado desde el ultimo salto

      if(jugadorX > this.body.p.x){
            this.body.vx = 0;
            this.body.applyImpulse(cp.v(250, 0), cp.v(0, 0));
      }
      if(jugadorX < this.body.p.x){
            this.body.vx = 0;
            this.body.applyImpulse(cp.v(-250,0),cp.v(0,0));
      }
      if(jugadorY > this.body.p.y){
            this.body.vy = 0;
            this.body.applyImpulse(cp.v(0,250),cp.v(0,0));
      }
      if(jugadorY < this.body.p.y){
            this.body.vy = 0;
            this.body.applyImpulse(cp.v(0,-250),cp.v(0,0));
      }

      if(Math.abs(jugadorX - this.body.p.x) < 40 && Math.abs(jugadorY - this.body.p.y) < 40){
            if(this.animacion != this.actionAnimacionAtaque){
                this.sprite.stopAllActions();
                this.animacion=this.actionAnimacionAtaque;
                this.sprite.runAction(this.animacion);
            }
      }
      if(Math.abs(jugadorX - this.body.p.x) >= 40 || Math.abs(jugadorY - this.body.p.y) >= 40){
            if(this.animacion != this.actionAnimacionBucle ){
                this.sprite.stopAllActions();
                this.animacion=this.actionAnimacionBucle;
                this.sprite.runAction(this.animacion);
            }
      }


      /*// Invertir o no sprite en funcion de la velocidad / orientación
      if(this.body.getVel().x > 0){
          this.sprite.flippedX = true;
      } else {
           this.sprite.flippedX = false;
      }*/
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
        if(this.dropKey){
            var llave = new Llave(this.gameLayer,cc.p(this.body.p.x,this.body.p.y));
            this.gameLayer.llaves.push(llave)
        }
    }




});
