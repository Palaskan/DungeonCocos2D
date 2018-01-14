var Jefe = cc.Class.extend({
    gameLayer:null,
    tiempoUtimoDisparo:0,
    tiempoEntreDisparos:0,
    actionAnimacionAtaque:null,
    actionAnimacionBucle:null,
    disparo:null,
    vidas:0,
    vidasInicial:0,
    animacion:null,
    atacando:false,
    sprite:null,
    shape:null,
    velocidad:0,
    fase:null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;
    this.tiempoEntreDisparos = 2;
    this.vidas = 120;
    this.vidasInicial = this.vidas;
    this.fase=false;
    this.velocidad = 300;
    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 6; i++) {
        var str = "jefe_giro_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.3);
    this.actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));

    var framesAnimacion = [];
    for (var i = 1; i <= 6; i++) {
        var str = "jefe_ataque_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    animacion = new cc.Animation(framesAnimacion, 0.2);
    this.actionAnimacionAtaque =
            new cc.RepeatForever(new cc.Animate(animacion));


    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#jefe_giro_1.png");
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
        this.shape.setElasticity(100);
    this.shape.setCollisionType(tipoJefe);
    // agregar forma dinamica
    gameLayer.space.addShape(this.shape);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(this.actionAnimacionBucle);
    this.animacion = this.actionAnimacionBucle;
    this.body.applyImpulse(cp.v(300, 0), cp.v(0, 0));
    gameLayer.addChild(this.sprite,10);
}, update:function (dt, jugadorX,jugadorY) {
      this.body.vy = 0;


      // aumentar el tiempo que ha pasado desde el ultimo salto
      this.tiempoUtimoDisparo = this.tiempoUtimoDisparo + dt;
      if(this.tiempoUtimoDisparo > this.tiempoEntreDisparos && Math.abs( this.body.p.x - jugadorX ) < 500){
            if(Math.abs(jugadorX - this.body.p.x) < 150 || Math.abs(jugadorY - this.body.p.y) < 150){
                        if(!this.atacando){
                            this.sprite.stopAllActions();
                            this.animacion=this.actionAnimacionAtaque;
                            this.sprite.runAction(this.animacion);
                            this.atacando = true;
                        }
                  }
            this.tiempoUtimoDisparo = 0;
      }
      if(Math.abs(jugadorX - this.body.p.x) >= 150 && Math.abs(jugadorY - this.body.p.y) >=150){
                this.sprite.stopAllActions();
                this.animacion=this.actionAnimacionBucle;
                this.sprite.runAction(this.animacion);
      }
      if(this.vidas <= this.vidasInicial /2 ){
              if(!this.fase){
                  this.tiempoEntreDisparos = this.tiempoEntreDisparos /2;
                  this.body.vx = this.body.vx * 1.5
              }
              this.fase = true;
      }

  },quitarVida:function(){
        this.vidas--;
        console.log(this.vidas);
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
