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
/* Funciones galería de imagen */
$('#proyectos > div > div:nth-child(5)').click(function () {
    $('#imagenProyecto').css({background: 'url("./img/sprite-openroad.jpg") -490px 0px no-repeat'});
});


/* Funcion para el menú de móvil */

$("div#menuMovil ul").click(function () {

    if ($("div#menuMovil ul ul").css('display') == 'none') {
        $("div#menuMovil ul ul ").fadeIn('slow');
    } else {
        $("div#menuMovil ul ul ").fadeOut('slow');
    }


});

$("#nuestrosProyectos > div:gt(0)").hide();

$('.galeriaProyectos').click(function() {
        
    var id = $(this).attr('id');   
    
    switch(id) {
        case 'proyecto01': $('#nuestrosProyectos > div:nth-child(1)').fadeIn(1000);
                           $("#nuestrosProyectos > div:gt(0)").hide();
                           break;
        case 'proyecto02': $('#nuestrosProyectos > div:nth-child(2)').fadeIn(1000);
                            $("#nuestrosProyectos > div:gt(1)").hide();
                           break;
        case 'proyecto03': $('#nuestrosProyectos > div:nth-child(3)').fadeIn(1000);
                            $("#nuestrosProyectos > div:gt(2)").hide();               
                            break;
        case 'proyecto04': $('#nuestrosProyectos > div:nth-child(4)').fadeIn(1000);
                            $("#nuestrosProyectos > div:gt(3)").hide();
                           break;
        case 'proyecto05': $('#nuestrosProyectos > div:nth-child(5)').fadeIn(1000);
                            $("#nuestrosProyectos > div:gt(4)").hide();
                           break;
        case 'proyecto06': $('#nuestrosProyectos > div:nth-child(6)').fadeIn(1000);
                            $("#nuestrosProyectos > div:gt(5)").hide();
                           break;
    }
    
});


/*
$("#nuestrosProyectos > div:gt(0)").hide();

$('#proyectos > div > div:nth-child(3) > div:nth-child(1)').click(function() {
    $("#nuestrosProyectos > div:gt(0)").fadeOut('slow');
    $('#nuestrosProyectos > div:nth-child(1)').fadeIn('slow');
});


$('#proyectos > div > div:nth-child(3) > div:nth-child(2)').click(function() {
    $("#nuestrosProyectos > div:gt(0)").fadeOut('slow');
    $('#nuestrosProyectos > div:nth-child(2)').fadeIn('slow');
});
*/

/* Funciones para el slideshow */
/*
$("#nuestrosProyectos > div:gt(0)").hide();

setInterval(function () {
    $('#nuestrosProyectos > div:first')
        .next()
        .end()
        .appendTo('#nuestrosProyectos');
}, 10000);*/

function validacionFormulario() {

    var validacion = true;
    var campoRequerido = document.getElementsByClassName("campoRequerido");
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var asunto = document.getElementById("asunto").value;
    var mensaje = document.getElementById("mensaje").value;

    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        validacion = false;
        campoRequerido[0].style.color = "red";
    } else campoRequerido[0].style.color = "white";

    if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(email))) {
        validacion = false;
        campoRequerido[1].style.color = "red";
    } else campoRequerido[1].style.color = "white";

    if (asunto == null || asunto.length == 0 || /^\s+$/.test(asunto)) {
        validacion = false;
        campoRequerido[2].style.color = "red";
    } else campoRequerido[2].style.color = "white";

    if (mensaje == null || mensaje.length == 0 || /^\s+$/.test(mensaje)) {
        validacion = false;
        campoRequerido[3].style.color = "red";
    } else campoRequerido[3].style.color = "white";

    return validacion;
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
