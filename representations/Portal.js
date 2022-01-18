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

Portal.prototype.moverPitch = function moverPitch(angle, dmx_control=[0,1,2,3,4,5,6,7]) {
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].moverPitch(angle);
        }
        else{
            continue;
        }
    }
    return this;
}

Portal.prototype.moverYaw = function moverYaw(angle, dmx_control=[0,1,2,3,4,5,6,7]) {
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].moverYaw(angle);
        }
    }
    return this;
}

Portal.prototype.esperar = function esperar(tiempo, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].esperar(tiempo);
        }
    }
    return this;
}

Portal.prototype.cambiarRapidezYaw = function cambiarRapidezYaw(vel, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].cambiarRapidezYaw(vel);
        }
    }
    return this;
}

Portal.prototype.cambiarRapidezPitch = function cambiarRapidezPitch(vel, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].cambiarRapidezPitch(vel);
        }
    }
    return this;
}

Portal.prototype.cambiarColorLuz = function cambiarColorLuz(color, intensity, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].cambiarColorLuz(color, intensity);
        }
    }
    return this;
}



window["Portal"] = Portal; 