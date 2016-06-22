$(document).ready(function () {
    if ($(window).width() < 769) {
        console.log("less than 769");
        $('#nv').removeClass('collapse navbar-collapse');
        $('#nv').addClass('navmenu navmenu-default navmenu-fixed-left offcanvas');
    }
    else {
        console.log('More than 768');
        $('#nv').removeClass('navmenu navmenu-default navmenu-fixed-left offcanvas');
        $('#nv').addClass('collapse navbar-collapse');
    }
});

$(window).resize(function () {
    if ($(window).width() < 769) {
        console.log("less than 769");
        $('#nv').removeClass('collapse navbar-collapse');
        $('#nv').addClass('navmenu navmenu-default navmenu-fixed-left offcanvas');
    }
    else {
        console.log('More than 768');
        $('#nv').removeClass('navmenu navmenu-default navmenu-fixed-left offcanvas');
        $('#nv').addClass('collapse navbar-collapse');
    }
});

var elementOffset = $('#waveNav').offset().top;

var dest = elementOffset;

$('#waveNav').affix({offset: dest});
$('#minlogo').affix({offset: dest});

