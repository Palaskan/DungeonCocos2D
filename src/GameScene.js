var tipoPuertaNormal = 1;
var tipoPuertaJefe = 2;
var tipoJugador = 3;
var tipoEnemigo = 4;
var tipoPalanca = 5;
var tipoSuelo = 6;
var tipoPocion = 7;
var tipoDisparo = 8;

var GameLayer = cc.Layer.extend({
    caballero:null,
    space:null,
    tecla:0,
    mapa:null,
    mapaAncho:0,
    mapaAlto:0,
    vidas:3,
    inmunidad:2,
    enemigos:[],
    velas:[],
    puertasN:[],
    puertasJ:[],
    palancas:[],
    segundo:false,
    formasEliminar:[],
    eliminados:false,
    combinacion:false,
    acertijo:[],
    accionadas:false,
    inicio:true,
    sol:[],
    jefe:null,
    pociones:[],
    ctor:function () {

       this._super();
       this.sol = [4,2,3,1];
       cc.spriteFrameCache.addSpriteFrames(res.caballero_plist);
       cc.spriteFrameCache.addSpriteFrames(res.enemigo_plist);
       cc.spriteFrameCache.addSpriteFrames(res.vela_plist);
       cc.spriteFrameCache.addSpriteFrames(res.puerta_plist);
       cc.spriteFrameCache.addSpriteFrames(res.palanca_plist);
       cc.spriteFrameCache.addSpriteFrames(res.pocion_plist);
       cc.spriteFrameCache.addSpriteFrames(res.jefe_plist);

       // Inicializar Space (sin gravedad)
       this.space = new cp.Space();
       /**
       this.depuracion = new cc.PhysicsDebugNode(this.space);
       this.addChild(this.depuracion, 10);
       **/
       this.space.addCollisionHandler(tipoJugador,tipoEnemigo,
                        null, this.collisionJugadorConEnemigo.bind(this),null,null);
       this.space.addCollisionHandler(tipoJugador,tipoPuertaNormal,
                        null, this.collisionJugadorConPuertaNormal.bind(this),null,null);
       this.space.addCollisionHandler(tipoJugador,tipoPuertaJefe,
                        null, this.collisionJugadorConPuertaJefe.bind(this),null,null);
       this.space.addCollisionHandler(tipoJugador,tipoPalanca,
                        null, this.collisionJugadorConPalanca.bind(this),null,null);
       this.space.addCollisionHandler(tipoJugador,tipoPocion,
                        null, this.collisionJugadorConPocion.bind(this),null,null);
       this.space.addCollisionHandler(tipoEnemigo,tipoPocion,
                        null, this.collisionEnemigoConPocion.bind(this),null,null);
       this.space.addCollisionHandler(tipoEnemigo,tipoDisparo,
                        null, this.collisionEnemigoConDisparoJefe.bind(this),null,null);
       this.space.addCollisionHandler(tipoJugador,tipoDisparo,
                        null, this.collisionJugadorConDisparoJefe.bind(this),null,null);
       this.space.addCollisionHandler(tipoDisparo,tipoSuelo,
                        null, this.collisionDisparoConSuelo.bind(this),null,null);
       this.space.addCollisionHandler(tipoDisparo,tipoDisparo,
                        null, this.collisionDisparoConDisparo.bind(this),null,null);
       this.space.addCollisionHandler(tipoEnemigo,tipoSuelo,
                       null, this.collisionEnemigoConSuelo.bind(this),null,null);
       this.cargarMapa();
       this.scheduleUpdate();

       this.jefe = new Jefe(this,cc.p(522,2960));

       this.caballero = new Caballero(this.space,
              cc.p(900,300), this);


       var enemigo = new Enemigo(this,cc.p(1200,700));
       this.enemigos.push(enemigo);
       enemigo = new Enemigo(this,cc.p(650,1000));
       this.enemigos.push(enemigo);

       cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.teclaPulsada,
            onKeyReleased: this.teclaLevantada
       }, this);

       return true;

    },update:function (dt) {
        //.log(this.caballero.body.p.x + " y:"+this.caballero.body.p.y);
        if(this.jefe!= null && this.jefe.atacando){
              var x= 0;
              var y=0;
              this.disparo = new DisparoJefe(this,cc.p(this.jefe.body.p.x,this.jefe.body.p.y));
              this.disparo.body.applyImpulse(cp.v((this.caballero.body.p.x - this.disparo.body.p.x)*5, (this.caballero.body.p.y - this.disparo.body.p.y)*5),cp.v(0,0));
              this.jefe.atacando = false;
        }
        if(this.disparo != null){
              this.disparo.update(dt);
        }
        if(this.jefe!= null && this.caballero.body.p.y > 2324){
              this.jefe.update(dt,this.caballero.body.p.x,this.caballero.body.p.y);
        }
        for(var i=0;i<this.pociones.length;i++){
              this.pociones[i].update(dt);
        }
        if(this.enemigos.length ==0){
            this.eliminados = true;
        }
        else{
            this.eliminados = false;
        }
        for(var i=0;i<this.puertasN.length;i++){
            this.puertasN[i].updateNormal(dt,this.eliminados)
        }
        if(this.combinacion && this.inicio){
            for(var i=0;i<this.puertasJ.length;i++){
                this.puertasJ[i].updateJefe(dt,this.combinacion)
            }
        }
        var correcto = false;
        if(this.caballero.body.p.y > 2070){
            correcto = true;
        }
        if(this.caballero.body.p.y > 2325){
             this.inicio = false;
             for(var i=0;i<this.puertasJ.length;i++){
                this.puertasJ[i].updateJefe(dt,this.inicio);
             }
        }
        for(var i=0;i<this.velas.length;i++){
            this.velas[i].update(dt,correcto);
        }
        if(!this.combinacion && this.acertijo.length == 4){
            var equal = true;
            for(var i = 0; i < 4; i++){
                if(this.sol[i] != this.acertijo[i])
                    equal = false
            }
            if(equal){
                this.combinacion = true;
            }
            else{
                var enemigo = new Enemigo(this,cc.p(1354,1909));
                this.enemigos.push(enemigo);
                enemigo = new Enemigo(this,cc.p(1354,1500));
                this.enemigos.push(enemigo);
                enemigo = new Enemigo(this,cc.p(1104,1500));
                this.enemigos.push(enemigo);
                this.acertijo = [];
            }
        }

        for(var i=0;i<this.palancas.length;i++){
            this.palancas[i].update(dt);
        }

        this.inmunidad = this.inmunidad - dt;
        if(this.vidas <= 0){
            this.caballero.body.p = cc.p(900,300);
            this.vidas=3;
            var capaControles = this.getParent().getChildByTag(idCapaControles);
            capaControles.quitarVida(this.vidas);
            this.inicio = true;
        }
        this.space.step(dt);

       var posicionXCamara = this.caballero.body.p.x - this.getContentSize().width/2;
       var posicionYCamara = this.caballero.body.p.y - this.getContentSize().height/2;

       if ( posicionXCamara < 0 ){
          posicionXCamara = 0;
       }
       if ( posicionXCamara > this.mapaAncho - this.getContentSize().width ){
          posicionXCamara = this.mapaAncho - this.getContentSize().width;
       }

       if ( posicionYCamara < 0 ){
           posicionYCamara = 0;
       }
       if ( posicionYCamara > this.mapaAlto - this.getContentSize().height ){
           posicionYCamara = this.mapaAlto - this.getContentSize().height ;
       }

       this.setPosition(cc.p( - posicionXCamara , - posicionYCamara));
        for (var i = 0; i < this.enemigos.length; i++) {
               this.enemigos[i].update(dt, this.caballero.body.p.x,this.caballero.body.p.y);
        }

       //console.log("la tecla pulsada es: " + this.tecla);
       //d=68,a=65,w=87,s=83,espacio=32
       // izquierda
       if (this.tecla == 37 ){
            if( this.caballero.body.p.x > 0){
                this.caballero.moverIzquierda();
            } else {
                this.caballero.detener();
            }
       }
       // derecha
       if (this.tecla == 39 ){
            if( this.caballero.body.p.x < this.mapaAncho){
                this.caballero.moverDerecha();
            } else {
                this.caballero.detener();
            }
       }
        // arriba
       if (this.tecla == 38 ){
            if( this.caballero.body.p.y < this.mapaAlto){
                this.caballero.moverArriba();
            } else {
                this.caballero.detener();
            }
       }

       // abajo
       if (this.tecla == 40 ){
            if( this.caballero.body.p.y > 0){
                this.caballero.moverAbajo();
            } else {
                this.caballero.detener();
            }
       }
       if(this.tecla == 32){
            this.caballero.atacar();
       }


       // ninguna pulsada
       if( this.tecla == 0 ){
            this.caballero.atacando = false;
            this.caballero.detener();
       }


       // Eliminar formas:
        for(var i = 0; i < this.formasEliminar.length; i++) {
            var shape = this.formasEliminar[i];

            for (var i = 0; i < this.enemigos.length; i++) {
                if (this.enemigos[i].shape == shape) {
                    this.enemigos[i].eliminar();
                    this.enemigos.splice(i, 1);
                }
            }
            for (var i = 0; i < this.pociones.length; i++) {
                if (this.pociones[i].shape == shape) {
                    this.pociones[i].eliminar();
                    this.pociones.splice(i, 1);
                }
            }
            if(this.disparo != null && this.disparo.shape == shape){
                this.disparo.eliminar();
                this.disparo = null;
            }
            if(this.jefe!= null && this.jefe.shape == shape){
                this.jefe.quitarVida();
                if(this.jefe.vidas<=0){
                     this.jefe = null;
                }
            }
        }
        this.formasEliminar = [];

        if(!this.eliminados){
            for(var i=0;i<this.palancas.length;i++){
                this.palancas[i].accionada = false;
            }
            this.acertijo = [];
            this.accionadas = false;
        }

    }, cargarMapa:function () {
       this.mapa = new cc.TMXTiledMap(res.mazmorra_tmx);
       // Añadirlo a la Layer
       this.addChild(this.mapa);
       // Ancho del mapa
       this.mapaAncho = this.mapa.getContentSize().width;
       this.mapaAlto = this.mapa.getContentSize().height;

        // Solicitar los objeto dentro de la capa Limites
        var grupoLimites = this.mapa.getObjectGroup("Limites");
        var limitesArray = grupoLimites.getObjects();

        // Los objetos de la capa limites
        // formas estáticas de Chipmunk ( SegmentShape ).
        for (var i = 0; i < limitesArray.length; i++) {
              var limite = limitesArray[i];
              var puntos = limite.polylinePoints;
              for(var j = 0; j < puntos.length - 1; j++){
                  var bodyLimite = new cp.StaticBody();

                  var shapeLimite = new cp.SegmentShape(bodyLimite,
                      cp.v(parseInt(limite.x) + parseInt(puntos[j].x),
                          parseInt(limite.y) - parseInt(puntos[j].y)),
                      cp.v(parseInt(limite.x) + parseInt(puntos[j + 1].x),
                          parseInt(limite.y) - parseInt(puntos[j + 1].y)),
                      1);
                  shapeLimite.setCollisionType(tipoSuelo);
                  shapeLimite.setFriction(1);
                  shapeLimite.setElasticity(0);
                  this.space.addStaticShape(shapeLimite);
              }
        }

        var grupoVelas = this.mapa.getObjectGroup("Velas");
        var velasArray = grupoVelas.getObjects();
        for (var i = 0; i < velasArray.length; i++) {
              var vela = new Vela(this,
                cc.p(velasArray[i]["x"],velasArray[i]["y"]));
              this.velas.push(vela);
        }

        var grupoPuertas = this.mapa.getObjectGroup("PuertasNormales");
                var puertasArray = grupoPuertas.getObjects();
                for (var i = 0; i < puertasArray.length; i++) {
                      var puerta = new Puerta(this,
                        cc.p(puertasArray[i]["x"],puertasArray[i]["y"]),1);
                      this.puertasN.push(puerta);
                }
        var grupoPuertas = this.mapa.getObjectGroup("PuertasJefe");
                var puertasArray = grupoPuertas.getObjects();
                for (var i = 0; i < puertasArray.length; i++) {
                      var puerta = new Puerta(this,
                        cc.p(puertasArray[i]["x"],puertasArray[i]["y"]),2);
                      this.puertasJ.push(puerta);
                }

        var grupoPalancas = this.mapa.getObjectGroup("Palancas");
                var palancasArray = grupoPalancas.getObjects();
                for (var i = 0; i < palancasArray.length; i++) {
                      var palanca = new Palanca(this,
                        cc.p(palancasArray[i]["x"],palancasArray[i]["y"]), i+1);
                      this.palancas.push(palanca);
                }
        var grupoPocionesN = this.mapa.getObjectGroup("PocionNormal");
                var pocionesNArray = grupoPocionesN.getObjects();
                    for (var i = 0; i < pocionesNArray.length; i++) {
                        var pocion = new Pocion(this,
                                cc.p(pocionesNArray[i]["x"],pocionesNArray[i]["y"]));
                        this.pociones.push(pocion);
                }
    },teclaPulsada: function(keyCode, event){
         var instancia = event.getCurrentTarget();

         instancia.tecla = keyCode;

     },teclaLevantada: function(keyCode, event){
           var instancia = event.getCurrentTarget();

           if ( instancia.tecla  == keyCode){
              instancia.tecla = 0;
           }
    },collisionJugadorConEnemigo:function (arbiter, space) {
                 if(this.caballero.atacando){
                    var shapes = arbiter.getShapes();
                    // shapes[0] es el jugador
                    this.formasEliminar.push(shapes[1]);
                 }
                 else{
                    if(this.inmunidad<=0){
                        this.vidas--;
                        this.inmunidad = 2;
                        var capaControles = this.getParent().getChildByTag(idCapaControles);
                        capaControles.quitarVida(this.vidas);
                        this.eliminados = false;
                        this.acertijo = [];
                        this.acionadas = false;
                        for(var i=0;i<this.palancas.length;i++){
                            this.palancas[i].accionada = false;
                        }
                    }
                 }

    },collisionJugadorConPuertaNormal:function (arbiter, space) {}
    ,collisionJugadorConPuertaJefe:function (arbiter, space) {}
    ,collisionJugadorConPalanca:function (arbiter, space) {
            if(!this.accionadas && this.eliminados){
                var palanca = arbiter.getShapes();
                var cuerpo = palanca[1].getBody();
                for(var i=0;i<this.palancas.length;i++){
                    if(this.palancas[i].body.p.x == cuerpo.p.x && this.palancas[i].body.p.y == cuerpo.p.y
                        && !this.palancas[i].accionada){
                        this.palancas[i].accionar();
                        this.acertijo.push(this.palancas[i].id);
                    }
                }
                if(this.acertijo.length ==4){
                    this.accionadas = true;
                }
            }
    }
    ,collisionEnemigoConDisparoJefe:function (arbiter,space){}
    ,collisionDisparoConDisparo:function (arbiter,space){}
    ,collisionDisparoConSuelo:function(arbiter, space){}
    ,collisionEnemigoConSuelo:function (arbiter, space){
        this.jefe.body.vx = this.jefe.body.vx*-1;
    }
    ,collisionJugadorConPocion:function (arbiter, space) {
            var shapes = arbiter.getShapes();
            // shapes[0] es el jugador
            this.formasEliminar.push(shapes[1]);
            this.vidas++;
            var capaControles = this.getParent().getChildByTag(idCapaControles);
            capaControles.quitarVida(this.vidas);

       },collisionEnemigoConPocion:function (arbiter, space) {}
       ,collisionJugadorConDisparoJefe:function (arbiter,space){
            if(this.inmunidad<=0){
                this.vidas--;
                this.inmunidad = 2;
                var capaControles = this.getParent().getChildByTag(idCapaControles);
                capaControles.quitarVida(this.vidas);
            }
            var shapes = arbiter.getShapes();
            // shapes[0] es el jugador
            this.formasEliminar.push(shapes[1]);
       }
});

var idCapaJuego = 1;
var idCapaControles = 2;

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer, 0, idCapaJuego);

        var controlesLayer = new ControlesLayer();
        this.addChild(controlesLayer, 0, idCapaControles);
    }
});
