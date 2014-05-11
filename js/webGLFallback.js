(function(){
    var supportsWebGL = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();
    
    if (supportsWebGL) {
	$(".nowebgl").hide();
	$(".webgl").show()
    } else {
	$(".webgl").hide();
	$(".nowebgl").show();
    }
})();
