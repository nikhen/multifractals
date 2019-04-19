(function mainSelfAffinity() {
    "use strict";

    var fConvertPairsToPlotData = function (aData) {
        var _aX = [],
            _aY = [];

        aData.forEach(function (val, ind) {
            _aX.push(val.x);
            _aY.push(val.y);
        });

        return {
            x: _aX,
            y: _aY
        }
    };

    var init = function () {
        var initData = function (j, k, l, m) {
            var aInitialData = [];
            switch (arguments.length) {
                case 2:
                    aInitialData.push({
                        x: j,
                        y: k
                    });
                    aInitialData.push({
                        x: 1,
                        y: 1
                    });
                    break;
                case 4:
                    aInitialData.push({
                        x: j,
                        y: k
                    });
                    aInitialData.push({
                        x: l,
                        y: m
                    });
                    break;
                default:

                    aInitialData.push({
                        x: 0,
                        y: 0
                    });
                    aInitialData.push({
                        x: 1,
                        y: 1
                    });
                    break;
            }
            return aInitialData;
        };

        return {
            bShuffling: true,
            dbMultifractalTime: 0,  // 0.06
            iIT: 13, // number of iterations; plotly can't deal with data produced over 10 iterations
            fIterate: function () {
                var i = 0,
                    that = this;
                // iterate over data array; compare all neighbouring pairs;
                console.log('Starting first iteration.');
                while (i < this.iIT) {
                    var _aReturn = [];

                    this.aData.forEach(function (val, j) {
                        _aReturn.push(val);
                        var _b, dx0, dy0, x1, y1, x2, y2;
                        if (that.aData[j + 1]) {
                            _b = that.aData[j + 1];
                            dx0 = that.aData[j + 1].x - val.x;
                            if (dx0 < 0) {
                                throw new RangeError("Invalid: Negative x difference.");
                            }
                            dy0 = that.aData[j + 1].y - val.y;

                            x1 = val.x + that.oP.x * dx0;
                            if (that.dbMultifractalTime) {
                                if (Math.random() > 0.5) {
                                    x1 = x1 - that.dbMultifractalTime * dx0;
                                } else {
                                    x1 = x1 + that.dbMultifractalTime * dx0;
                                }
                            }

                            x2 = _b.x;
                            y1 = val.y + that.oP.y * dy0;
                            y2 = _b.y;
                            
                            if (!that.bShuffling) {
                                _aReturn.push({
                                    x: x1,
                                    y: y1
                                });
                                _aReturn.push({
                                    x: x2 - that.oP.x * dx0,
                                    y: y2 - that.oP.y * dy0
                                });
                            } else {
                                var _random = Math.random();
                                if (_random > 0.75) {
                                    _aReturn.push({
                                        x: x1,
                                        y: y2 - that.oP.y * dy0
                                    });
                                    _aReturn.push({
                                        x: x2 - that.oP.x * dx0,
                                        y: y1
                                    });

                                } else {
                                    _aReturn.push({
                                        x: x1,
                                        y: y1
                                    });
                                    _aReturn.push({
                                        x: x2 - that.oP.x * dx0,
                                        y: y2 - that.oP.y * dy0
                                    });

                                }
                            }
                        }
                    });
                    that.aData = _aReturn;
                    i++;
                }
                console.log('Finished last iteration.');
 
                return _aReturn;
            },
            fPrint: function () {
                console.log('Plotting data...');
                var plotBox = document.getElementById('selfAffPlot'),
                    oPlotData = fConvertPairsToPlotData(this.aData);
                Plotly.plot(plotBox, [oPlotData]);
            },
            aData: initData(),
            oP: {
                x: 4 / 9,
                y: 2 / 3
            }
        };
    };

    var main = function () {
        var oData = init();
        oData.fIterate();
        oData.fPrint();
    };

    return main();
})();
