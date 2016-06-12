$(document).ready(function () {
    $(document).on("scroll", onScroll);

    $('.nav.navbar-nav.navbar-right a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('.nav.navbar-nav.navbar-right a').each(function () {
            $(this).removeClass('selectedClass');
        })
        $(this).addClass('selectedClass');

        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    var scrollPosition = $(document).scrollTop();
    $('.nav.navbar-nav.navbar-right a').each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() >= scrollPosition) {
            $('.nav.navbar-nav.navbar-right ul li a').removeClass("selectedClass");
            currentLink.addClass("selectedClass");
        }
        else {
            currentLink.removeClass("selectedClass");
        }
    });
}


d1 = function () {
    $('#i1').hide().html('<img src="img/icons/h1.png" />').fadeIn("slow");
    $('#d1,#l1').fadeTo(1000, 1);
    $('#d2 p,#d3 p').fadeTo(1000, 0);
    $('#d3 h2, #d2 h2').fadeTo(1000, 0.5);
    $('#l2,#dd1').fadeTo(1000, 1);
    $('#l2,#l3').removeClass('blue');
    $('#dd2,#dd1').removeClass('dividerBlue');
    $('#l2,#dd1,#dd2,#l3').addClass('grey');
    $('#l2,#dd1,#dd2,#l3').fadeTo(1000, 0.5);

};

d2 = function () {
    $('#i1').hide().html('<img src="img/icons/h2.png" />').fadeIn("slow");
    $('#d2 h2, #d2 p, #d2').fadeTo(1000, 1);
    $('#d1').fadeTo(1000, 0.5);
    $('#d3 p').fadeTo(1000, 0);
    $('#d3 h2').fadeTo(1000, 0.5);
    $('#l2,#dd1').removeClass('grey');
    $('#dd1').addClass('dividerBlue');
    $('#l2').addClass('blue', 1500);
    $('#l2').fadeTo(1500, 1);
    $('#l1,#dd1,#l3,#dd2').fadeTo(1000, 0.5);
    $('#l3').removeClass('blue');
    $('#dd2').removeClass('dividerBlue');
    $('#dd2,#l3').addClass('grey');

};

d3 = function () {
    $('#i1').hide().html('<img src="img/icons/h3.png" />').fadeIn("slow");
    $('#d3 p, #d3 h2').fadeTo(1000, 1);
    $('#d2 p').fadeTo(1000, 0.5);
    $('#d1, #d2').fadeTo(1000, 0.5);
    $('#l2,#dd1,#l3,#dd2').removeClass('grey');
    $('#dd1').addClass('dividerBlue');
    $('#l2').addClass('blue', 1500);
    $('#dd2').addClass('dividerBlue');
    $('#l3').addClass('blue', 1500);
    $('#l3').fadeTo(1500, 1);
    $('#l1,#dd1,#dd2,#l2').fadeTo(1000, 0.5);
};

$('#d1').click(d1);

$('#d2').click(d2);

$('#d3').click(d3);

$('#l1').click(d1);
$('#l2').click(d2);
$('#l3').click(d3);

var interval = setInterval(function () {
    if ($('#d1').css("opacity") == 1) {
        d2();
    }
    ;
}, 5000);

var interval2 = setInterval(function () {
    if ($('#d2').css("opacity") == 1) {
        d3();
    }
    ;
}, 10000);

var interval = setInterval(function () {
    if ($('#d3').css("opacity") == 1) {
        d1();
    }
    ;
}, 15000);


var wave = new google.maps.LatLng(14.559918, 121.019780);

function initialize() {
    var mapProp = {
        center: wave,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var marker = new google.maps.Marker({
        position: wave,
    });

    marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
