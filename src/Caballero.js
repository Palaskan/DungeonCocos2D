var Caballero = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    body:null,
    layer:null,
    animacionQuietoAbajo:null,
    animacionQuietoArriba:null,
    animacionQuietoDerecha:null,
    animacionQuietoIzquierda:null,
    animacionDerecha:null,
    animacionIzquierda:null,
    animacionArriba:null,
    animacionAbajo:null,
    animacionAtaqueIzquierda:null,
    animacionAtaqueDerecha:null,
    animacionAtaqueArriba:null,
    animacionAtaqueAbajo:null,
    animacion:null, // Actual
    atacando:false,

ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#caballero_quieto_1.png");
    // Cuerpo dinamico, SI le afectan las fuerzas
    this.body = new cp.Body(5, Infinity);

    this.body.setPos(posicion);
    //body.w_limit = 0.02;
    this.body.setAngle(0);
    this.sprite.setBody(this.body);

    // Se añade el cuerpo al espacio
    this.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);

    this.shape.setFriction(1);
    this.shape.setElasticity(0);
    this.shape.setCollisionType(tipoJugador);
    // forma dinamica
    this.space.addShape(this.shape);

    // Crear animación - quieto abajo
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "caballero_quieto_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionQuietoAbajo =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - quieto arriba
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "parado_arriba_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionQuietoArriba =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - quieto derecha
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "parado_derecha_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionQuietoDerecha =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - quieto derecha
        var framesAnimacion = [];
        for (var i = 1; i <= 1; i++) {
            var str = "parado_izquierda_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        this.animacionQuietoIzquierda =
            new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - derecha
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "caballero_derecha_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionDerecha =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - izquierda
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "caballero_izquierda_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionIzquierda =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - arriba
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "caballero_arriba_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionArriba =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - abajo
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "caballero_abajo_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionAbajo =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - ataque - izquierda
        var framesAnimacion = [];
        for (var i = 1; i <= 2; i++) {
            var str = "caballero_ataque_izquierda_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        this.animacionAtaqueIzquierda =
            new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - ataque - derecha
            var framesAnimacion = [];
            for (var i = 1; i <= 2; i++) {
                var str = "caballero_ataque_derecha_" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                framesAnimacion.push(frame);
            }
            var animacion = new cc.Animation(framesAnimacion, 0.2);
            this.animacionAtaqueDerecha =
                new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - ataque - arriba
            var framesAnimacion = [];
            for (var i = 1; i <= 2; i++) {
                var str = "caballero_ataque_arriba_" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                framesAnimacion.push(frame);
            }
            var animacion = new cc.Animation(framesAnimacion, 0.2);
            this.animacionAtaqueArriba =
                new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - ataque - abajo
            var framesAnimacion = [];
            for (var i = 1; i <= 2; i++) {
                var str = "caballero_ataque_abajo_" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                framesAnimacion.push(frame);
            }
            var animacion = new cc.Animation(framesAnimacion, 0.2);
            this.animacionAtaqueAbajo =
                new cc.RepeatForever(new cc.Animate(animacion));


    // ejecutar la animación
    this.sprite.runAction(this.animacionQuietoAbajo);
    this.animacion = this.animacionQuietoAbajo;
    layer.addChild(this.sprite,10);

    }, moverIzquierda:function() {
        if (this.animacion != this.animacionIzquierda){
            this.sprite.stopAllActions();
            this.animacion = this.animacionIzquierda;
            this.sprite.runAction(this.animacion);
        }

        //this.body.vy = 0;
        if ( this.body.vx > -125){
            this.body.applyImpulse(cp.v(-125, 0), cp.v(0, 0));
        }

    }, moverDerecha:function() {
        if (this.animacion != this.animacionDerecha){
            this.sprite.stopAllActions();
            this.animacion = this.animacionDerecha;
            this.sprite.runAction(this.animacion);
        }

        //this.body.vy = 0;
        if ( this.body.vx < 125){
            this.body.applyImpulse(cp.v(125, 0), cp.v(0, 0));
        }

    }, moverArriba:function() {
        if (this.animacion != this.animacionArriba){
            this.sprite.stopAllActions();
            this.animacion = this.animacionArriba;
            this.sprite.runAction(this.animacion);
        }

        //this.body.vx = 0;
        if ( this.body.vy < 125){
            this.body.applyImpulse(cp.v(0, 125), cp.v(0, 0));
        }

    }, moverAbajo:function() {
        if (this.animacion != this.animacionAbajo){
            this.sprite.stopAllActions();
            this.animacion = this.animacionAbajo;
            this.sprite.runAction(this.animacion);
        }

       //this.body.vx = 0;
       if ( this.body.vy > -125){
            this.body.applyImpulse(cp.v(0, -125), cp.v(0, 0));
       }

    }, atacar:function() {
             if (this.animacion != this.animacionAtaqueIzquierda && this.animacion != this.animacionAtaqueDerecha
                    && this.animacion != this.animacionAtaqueArriba && this.animacion != this.animacionAtaqueAbajo ){
                 if(this.animacion == this.animacionQuietoIzquierda || this.animacion == this.animacionIzquierda){
                      this.sprite.stopAllActions();
                      this.animacion = this.animacionAtaqueIzquierda;
                 }
                 else if(this.animacion == this.animacionQuietoDerecha || this.animacion == this.animacionDerecha){
                      this.sprite.stopAllActions();
                      this.animacion = this.animacionAtaqueDerecha;
                 }
                 else if(this.animacion == this.animacionQuietoArriba|| this.animacion == this.animacionArriba){
                      this.sprite.stopAllActions();
                      this.animacion = this.animacionAtaqueArriba;
                 }
                 else{
                      this.sprite.stopAllActions();
                      this.animacion = this.animacionAtaqueAbajo;
                 }
                 this.sprite.runAction(this.animacion);
             }

             this.body.vy = 0;
             this.body.vx = 0;
             this.atacando = true;
    }, detener : function() {
      if (this.animacion != this.animacionQuietoAbajo && this.animacion != this.animacionQuietoArriba
                && this.animacion != this.animacionQuietoDerecha && this.animacion != this.animacionQuietoIzquierda){
         if(this.animacion == this.animacionAtaqueIzquierda || this.animacion == this.animacionIzquierda){
            this.sprite.stopAllActions();
            this.animacion = this.animacionQuietoIzquierda;
         }
         else if(this.animacion == this.animacionAtaqueDerecha || this.animacion == this.animacionDerecha){
            this.sprite.stopAllActions();
            this.animacion = this.animacionQuietoDerecha;
         }
         else if(this.animacion == this.animacionAtaqueArriba|| this.animacion == this.animacionArriba){
            this.sprite.stopAllActions();
            this.animacion = this.animacionQuietoArriba;
         }
         else{
            this.sprite.stopAllActions();
            this.animacion = this.animacionQuietoAbajo;
         }
         this.sprite.runAction(this.animacion);
       }

       this.body.vx = 0;
       this.body.vy = 0;
    }
});
