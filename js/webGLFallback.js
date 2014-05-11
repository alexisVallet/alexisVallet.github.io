(function(){
    var supportsWebGL = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();
    
    if (supportsWebGL) {
	console.log("webgl");
	$(".nowebgl").hide();
    } else {
	console.log("no webgl");
	$(".webgl").hide();
    }
})();
