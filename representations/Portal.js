var Portal = function () {
    this.dmxs = [];
    for (var i = 1; i < 9; ++i){
        var dmx = window.simulator.getRobotById("dmx"+i);
        dmx.com_portal = this;
        this.dmxs.push(dmx);
    }
    this.portal_tasks = [];
    this.active_task = {'class':'none','value':0,'dmxs':[]};
};

Portal.prototype.obtenerDmx = function obtenerDmx(id) {
    return this.dmxs[id];
}

Portal.prototype._moverPitch = function _moverPitch(angle, dmx_control=[0,1,2,3,4,5,6,7]) {
    console.debug('moverPitch: '+ angle + ' ' + dmx_control);
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

Portal.prototype._moverYaw = function _moverYaw(angle, dmx_control=[0,1,2,3,4,5,6,7]) {
    console.debug('moverYaw: '+ angle + ' ' + dmx_control);
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].moverYaw(angle);
        }
    }
    return this;
}

Portal.prototype._esperar = function _esperar(tiempo, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].esperar(tiempo);
        }
    }
    return this;
}

Portal.prototype._cambiarRapidezYaw = function _cambiarRapidezYaw(vel, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].cambiarRapidezYaw(vel);
        }
    }
    return this;
}

Portal.prototype._cambiarRapidezPitch = function _cambiarRapidezPitch(vel, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].cambiarRapidezPitch(vel);
        }
    }
    return this;
}

Portal.prototype._cambiarColorLuz = function _cambiarColorLuz(color, intensity, dmx_control=[0,1,2,3,4,5,6,7]){
    for (var i = 0; i < this.dmxs.length; i++) {
        if (dmx_control.includes(i)){
            this.dmxs[i].cambiarColorLuz(color, intensity);
        }
    }
    return this;
}










Portal.prototype._addTask = function _addTask(a,value,dmxs_arr){
    if(value == null){
        return this;
    }
    var new_task = {'class':a,'value':value,'dmxs':dmxs_arr};
    this.portal_tasks.push(new_task);
    return this;
}


Portal.prototype.esperar = function esperar(tiempo, dmx_control=[0,1,2,3,4,5,6,7]){
    return this._addTask('wait',tiempo, dmx_control);
}

Portal.prototype.cambiarRapidezYaw = function cambiarRapidezYaw(vel, dmx_control=[0,1,2,3,4,5,6,7]){
    //vel = vel.toFixed(2);
    //vel = vel/1000.;
    return this._addTask('yaw_vel',vel, dmx_control);
}

Portal.prototype.cambiarRapidezPitch = function cambiarRapidezPitch(vel, dmx_control=[0,1,2,3,4,5,6,7]){
    //vel = vel.toFixed(2);
    //vel = vel/1000.;
    return this._addTask('pitch_vel',vel, dmx_control);
}

Portal.prototype.cambiarColorLuz = function cambiarColorLuz(color, intensity, dmx_control=[0,1,2,3,4,5,6,7]){
    var new_task = {'class':'light_color_intensity','value':[color,intensity], 'dmxs':dmx_control};
    this.portal_tasks.push(new_task);
    return this;
}

Portal.prototype.moverPitch = function moverPitch(angulo, dmx_control=[0,1,2,3,4,5,6,7]) {
    //angulo = this._degToRad(angulo);
    return this._addTask('pitch',angulo, dmx_control);
}

Portal.prototype.moverYaw = function moverYaw(angulo, dmx_control=[0,1,2,3,4,5,6,7]) {
    //angulo = this._degToRad(angulo);
    return this._addTask('yaw',angulo, dmx_control);
}

Portal.prototype._degToRad = function _degToRad(deg_angle){
    return Math.PI * (deg_angle/180.0);
}



Portal.prototype.update = function update (data){
    if (this.active_task.class == 'none' && this.portal_tasks.length > 0){
        console.debug('La tarea actual es none');
        console.debug('La lista de tareas es: ' + this.portal_tasks);
        this.active_task = this.portal_tasks.shift();
    }

    if (this.active_task.class == 'waiting_exec'){
        console.debug('La tarea actual del portal es waiting_exec');
        let ready = true;
        for (var i = 0; i < this.dmxs.length; i++) {
            console.debug('el dmx ' + i + ' ready is ' + (this.dmxs[i].active_task.class == 'none'));
            console.debug(' el dmx ' + i + ' tiene la tarea: ' + this.dmxs[i].active_task.class);
            ready = ready && (this.dmxs[i].active_task.class == 'none');
        }
        if (ready){
            this.active_task.class = 'none';
        }
    }

    if (this.active_task.class == 'yaw'){
        this.active_task.class = 'waiting_exec';
        console.debug('La tarea actual es yaw');
        return this._moverYaw(this.active_task.value,this.active_task.dmxs);
    }

    if (this.active_task.class == 'pitch'){
        this.active_task.class = 'waiting_exec';
        console.debug('La tarea actual es pitch');
        return this._moverPitch(this.active_task.value,this.active_task.dmxs);
    }

    if (this.active_task.class == 'yaw_vel'){
        this.active_task.class = 'waiting_exec';
        console.debug('La tarea actual es yaw_vel');
        return this._cambiarRapidezYaw(this.active_task.value,this.active_task.dmxs);
    }

    if (this.active_task.class == 'pitch_vel'){
        this.active_task.class = 'waiting_exec';
        console.debug('La tarea actual es pitch_vel');
        return this._cambiarRapidezPitch(this.active_task.value,this.active_task.dmxs);
    }

    if (this.active_task.class == 'wait'){
        this.active_task.class = 'waiting_exec';
        console.debug('La tarea actual es wait');
        return this._esperar(this.active_task.value,this.active_task.dmxs);
    }

    if (this.active_task.class == 'light_color_intensity'){
        this.active_task.class = 'waiting_exec';
        console.debug('La tarea actual es light_color_intensity');
        return this._cambiarColorLuz(this.active_task.value[0],this.active_task.value[1],this.active_task.dmxs);
    }


}
window["Portal"] = Portal; 