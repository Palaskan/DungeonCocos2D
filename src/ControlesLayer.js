var ControlesLayer = cc.Layer.extend({
    etiquetaVidas:null,
    etiquetaAcertijo:null,
    etiquetaLlaves:null,
    mostrando:false,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // Contador Monedas
        this.etiquetaVidas = new cc.LabelTTF("Vidas: 3", "Helvetica", 20);
        this.etiquetaVidas.setPosition(cc.p(size.width - 750, size.height - 20));
        this.etiquetaVidas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaVidas)

        this.etiquetaLlaves = new cc.LabelTTF("Llaves: 0", "Helvetica", 20);
        this.etiquetaLlaves.setPosition(cc.p(size.width*0.92, size.height*0.95));
        this.etiquetaLlaves.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaLlaves)

        this.etiquetaAcertijo = new cc.LabelTTF("Abajo Abajo Arriba Arriba Derecha Izquierda Derecha Izquierda.\n" +
        "No repitas en el mismo eje", "Helvetica", 20);
        this.etiquetaAcertijo.setPosition(cc.p(size.width - size.width*0.5, size.height - size.height*0.8));
        this.etiquetaAcertijo.fillStyle = new cc.Color(255, 255, 255, 255);

        this.scheduleUpdate();
        return true;
    },update:function (dt) {

    },quitarVida:function(vidas){
         this.etiquetaVidas.setString("Vidas: " + vidas);
     },añadirLlave:function(llaves){
         this.etiquetaLlaves.setString("Llaves: " + llaves);

     },quitarLlave:function(llaves){
        this.etiquetaLlaves.setString("Llaves: " + llaves);
     },mostrarAcertijo:function(){
         if(!this.mostrando){
             this.addChild(this.etiquetaAcertijo)
         }
         this.mostrando = true;
     }
     ,quitarAcertijo:function(){
             if(this.mostrando){
                 this.removeChild(this.etiquetaAcertijo)
             }
             this.mostrando = false;
      }
});
