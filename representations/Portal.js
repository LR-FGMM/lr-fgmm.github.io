var Portal = function () {
    this.dmxs = [];
    for (var i = 1; i < 9; ++i){
        var dmx = window.simulator.getRobotById("dmx"+i);
        this.dmxs.push(dmx);
    }
};

Portal.prototype.obtenerDmx = function obtenerDmx(id) {
    return this.dmxs[id];
}

Portal.prototype.moverPitch = function moverPitch(angle) {
    for (var i = 0; i < this.dmxs.length; i++) {
        this.dmxs[i].moverPitch(angle);
    }
    return this;
}

Portal.prototype.moverYaw = function moverYaw(angle) {
    for (var i = 0; i < this.dmxs.length; i++) {
        this.dmxs[i].moverYaw(angle);
    }
    return this;
}

Portal.prototype.esperar = function esperar(tiempo){
    for (var i = 0; i < this.dmxs.length; i++) {
        this.dmxs[i].esperar(tiempo);
    }
    return this;
}

Portal.prototype.cambiarRapidezYaw = function cambiarRapidezYaw(vel){
    for (var i = 0; i < this.dmxs.length; i++) {
        this.dmxs[i].cambiarRapidezYaw(vel);
    }
    return this;
}

Portal.prototype.cambiarRapidezPitch = function cambiarRapidezPitch(vel){
    for (var i = 0; i < this.dmxs.length; i++) {
        this.dmxs[i].cambiarRapidezPitch(vel);
    }
    return this;
}

Portal.prototype.cambiarColorLuz = function cambiarColorLuz(color, intensity){
    for (var i = 0; i < this.dmxs.length; i++) {
        this.dmxs[i].cambiarColorLuz(color, intensity);
    }
    return this;
}



window["Portal"] = Portal; 