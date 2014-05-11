(function() {
    /**
     * Custom helpers
     */

    function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    // Clock that starts as soon as it is first called (per id).
    var clocks = {};
    window.clock = function (id) {
	if (!clocks[id]) clocks[id] = +new Date();
	return (+new Date() - clocks[id]) * .001;
    }

    /**
     * Bootstrap
     */
    // Checks webgl availability, otherwise falls back to an image.
    DomReady.ready(function() {	
	ThreeBox.preload([
	    '../../../js/MathBox.js/shaders/snippets.glsl.html',
	], function () {
            // MathBox boilerplate
	    var mathbox = window.mathbox = mathBox({
		cameraControls: true,
		cursor:         true,
		controlClass:   ThreeBox.OrbitControls,
		elementResize:  true,
		fullscreen:     true,
		screenshot:     true,
		stats:          false,
		scale:          1,
	    }).start();

	    // Viewport camera/setup
	    mathbox
	    // Cartesian viewport
		.viewport({
		    type: 'cartesian',
		    range: [[0, 1], [0, 1], [0, 1]],
		    scale: [1, 1, 1],
		    polar: 0,
		})
		.camera({
		    orbit: 4,
		    phi: τ/4-.5,
		    theta: .7,
		})
		.transition(300)
		.axis({
		    id: 'L*',
		    axis: 0,
		    tickUnit: 0.2,
		    tickScale: 10,
		    color: 0xa0a0a0,
		    ticks: 5,
		    linewidth: 1,
		    labels: false
		})
	        .axis({
		    id: 'a*',
		    axis: 1,
		    color: 0xff00ff,
		    ticks: 5,
		    tickUnit: 0.2,
		    tickScale: 10,
		    linewidth: 1,
		    labels: false
		})
		.axis({
		    id: 'b*',
		    axis: 2,
		    color: 0x00ff00,
		    ticks: 5,
		    tickScale: 10,
		    tickUnit: 0.2,
		    linewidth: 1,
		    labels: false
		})
	    // Draw the scatter plot
	    $.getJSON("motoko4lab.json", function (labData) {
		$.getJSON("motoko4rgb.json", function (rgbData) {
		    for (i = 0; i < labData.length; i++) {
			mathbox.curve({
			    color: rgbData[i][0] + 
				256 * rgbData[i][1] +
				65536 * rgbData[i][2],
			    n: 1,
			    data: [labData[i]],
			    points: true,
			    line: false
			});
		    }
		});
	    });
	    // Draw the principal component
	    $.getJSON("motoko4eig.json", function (eigData) {
		evecs = eigData.evectors;
		evecEnds = [];
		for (i in [0, 1, 2]) {
		    evec = numeric.mul(Math.sqrt(eigData.evalues[i]),
				       [evecs[0][i], 
					evecs[1][i], 
					evecs[2][i]]);
		    evecEnd = numeric.add(eigData.mean, evec);
		    evecEnds = evecEnds.concat([evecEnd]);
		}
		mathbox.vector({
		    n: 3,
		    data: [
			eigData.mean, evecEnds[0],
			eigData.mean, evecEnds[1],
			eigData.mean, evecEnds[2]
		    ],
		    lines: true,
		    arrow: true,
		    size: .07
		});
	    });
	});	
    });
})();
