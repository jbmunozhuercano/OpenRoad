/* detect touch */
if ("ontouchstart" in window) {
    document.documentElement.className = document.documentElement.className + " touch";
}

if (!$("html").hasClass("touch")) {
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix() {
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function (i) {
        if ($(this).innerHeight() <= h) {
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize() {
    var windowH = $(window).height();
    $(".background").each(function (i) {
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if (contW > imgW) {
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}

$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e) {
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function (i) {
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if (bottomWindow > top && topWindow < bottom) {
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = -imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}

if (!$("html").hasClass("touch")) {
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}

/* Funciones de Google Maps API */
function inicializarMapa() {
    
    var opcionesMapa = {
        zoom: 16,
        center: new google.maps.LatLng(38.3417500, -0.5112905999999384),
    };

    var lienzoMapa = new google.maps.Map($('#googleMap')[0], opcionesMapa);

    var imagen = 'img/cursor-google-maps.png';

    var miLatLong = new google.maps.LatLng(38.3417500, -0.5112905999999384);

    var customMarker = new google.maps.Marker({
        position: miLatLong,
        map: lienzoMapa,
        icon: imagen,
        title: "Click para centrar"
    });
    
    google.maps.event.addListener(customMarker, 'click', function() {
        lienzoMapa.setZoom(16),
        lienzoMapa.setCenter(customMarker.getPosition());
    });
    
 }

google.maps.event.addDomListener(window, 'load', inicializarMapa);

/* Funciones ajueste modo pestañas en vista para móvil */
var min = -6;
var max = 6;

function numeroAleatorio(min,max) {
    return x = Math.floor(Math.random() * (max - min) + min);
}

function generarEstilo() {
    var claseGeneral = "transformacionEstilo";
    var num = numeroAleatorio(min,max);
    
    switch(num) {
        case 0: return claseGeneral + 0;
            break;
        case 1: return claseGeneral + 1;
            break;
        case 2: return claseGeneral + 2;
            break;
        case 3: return claseGeneral + 3;
            break;
        case 4: return claseGeneral + 4;
            break;
        case 5: return claseGeneral + 5;
            break;
        case 6: return claseGeneral + 6;
            break;
        case -1: return claseGeneral + 7;
            break;
        case -2: return claseGeneral + 8;
            break;
        case -3: return claseGeneral + 9;
            break;
        case -4: return claseGeneral + 10;
            break;
        case -5: return claseGeneral + 11;
            break;
        case -6: return claseGeneral + 12;
            break;
    }
}

$(document).ready(function() {
    
    var ulProyectos = $("#nuestrosProyectos > div > ul");
    var estiloPorDefecto = "medium-block-grid-2 large-block-grid-3";
    var estiloTabs = "tabs-content";
    var anchoPantalla = $(window).width();    
        
    if(anchoPantalla <= 640) {
        ulProyectos.toggleClass(estiloTabs,estiloPorDefecto);
    } else {
        if(ulProyectos.hasClass(estiloTabs)) { ulProyectos.toggleClass(estiloPorDefecto,estiloTabs); }
    }    
    
    for(var i = 0; i < 6; i++ ) {
    
        var descripcionProyecto = "#panel" + i + " > div";
        var imagenProyecto = "#panel" + i + " img.th.radius";
        
        $(descripcionProyecto).addClass(generarEstilo());
        $(imagenProyecto).addClass(generarEstilo());
        
    }

});


