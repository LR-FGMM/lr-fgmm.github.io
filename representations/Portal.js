var Portal = function () {
    this.dmxs = [];
    for (var i = 1; i < 9; ++i){
        var dmx = window.simulator.getRobotById("dmx"+i);
        this.dmxs.push(dmx);
    }
};

window["Portal"] = Portal; 