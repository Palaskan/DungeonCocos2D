var ControlesLayer = cc.Layer.extend({
    etiquetaVidas:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // Contador Monedas
        this.etiquetaVidas = new cc.LabelTTF("Vidas: 3", "Helvetica", 20);
        this.etiquetaVidas.setPosition(cc.p(size.width - 750, size.height - 20));
        this.etiquetaVidas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaVidas);

        this.scheduleUpdate();
        return true;
    },update:function (dt) {

    },quitarVida:function(vidas){
         this.etiquetaVidas.setString("Vidas: " + vidas);
     }
});
