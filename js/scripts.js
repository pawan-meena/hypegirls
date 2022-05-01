/* Description: Custom JS file */

$(document).ready(function () {
    document.getElementById("preloading").style.display="none";
});

(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Text Slider - Swiper */
	var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });

    
    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);
var Slider = (function() {
    var initSlider = function() {
        var dir = $("html").attr("dir");
        var swipeHandler = new Hammer(document.getElementById("slider"));
        swipeHandler.on('swipeleft', function(e) {
            if (dir == "rtl")
                $(".arrow-left").trigger("click");
            else
                $(".arrow-right").trigger("click");
        });

        swipeHandler.on('swiperight', function(e) {
            if (dir == "rtl")
                $(".arrow-right").trigger("click");
            else
                $(".arrow-left").trigger("click");
        });

        $(".arrow-right , .arrow-left").click(function(event) {
            var nextActiveSlide = $(".slide.active").next();

            if ($(this).hasClass("arrow-left"))
                nextActiveSlide = $(".slide.active").prev();

            if (nextActiveSlide.length > 0) {
                var nextActiveIndex = nextActiveSlide.index();
                $(".dots span").removeClass("active");
                $($(".dots").children()[nextActiveIndex]).addClass("active");

                updateSlides(nextActiveSlide);
            }
        });

        $(".dots span").click(function(event) {
            var slideIndex = $(this).index();
            var nextActiveSlide = $($(".slider").children()[slideIndex]);
            $(".dots span").removeClass("active");
            $(this).addClass("active");

            updateSlides(nextActiveSlide);
        });

        var updateSlides = function(nextActiveSlide) {
            var nextActiveSlideIndex = $(nextActiveSlide).index();

            $(".slide").removeClass("prev-1");
            $(".slide").removeClass("next-1");
            $(".slide").removeClass("active");
            $(".slide").removeClass("prev-2");
            $(".slide").removeClass("next-2");

            nextActiveSlide.addClass("active");

            nextActiveSlide.prev().addClass("prev-1");
            nextActiveSlide.prev().prev().addClass("prev-2");
            nextActiveSlide.addClass("active");
            nextActiveSlide.next().addClass("next-1");
            nextActiveSlide.next().next().addClass("next-2");
        }

        var updateToNextSlide = function(nextActiveSlide)
        {
            
        }
    }
    return {
        init: function() {
            initSlider();
        }
    }
})();

$(function() {
    Slider.init();
});



const changeValues = () => {
const inc = document.querySelector(".counter--arrow-inc > span");
const dec = document.querySelector(".counter--arrow-dec > span");
const timer = document.querySelector(".counter");
const output = document.querySelector(".counter--output");
const outpute = document.querySelector(".counter--outpute");
const singleStep = "1";
const singleStepe = singleStep*0.08+" ETH ";
const medStep = "5";
const lgStep = "25";
const largeInt = "500";
const medInt = "250";
const smInt = "100";
let step = "1";
let stepInterval = 1;
let intTime = largeInt;

output.setAttribute("value", singleStep); // Initialize input value
outpute.setAttribute("value", singleStepe);
timer.addEventListener("mousedown", e => {
// Start timer to record length of mousedown event
const startTime = new Date().getTime();
output.setAttribute("type", "number");

stepInterval = () => {
const newTime = new Date().getTime();
const elapsedTime = newTime - startTime;

if (elapsedTime === 0 && elapsedTime < 3000) {
step = singleStep;
intTime = largeInt;
}
// Update step and interval values
if (elapsedTime > 3000 && elapsedTime < 6000) {
step = medStep;
intTime = medInt;
}

if (elapsedTime > 6000) {
step = lgStep;
intTime = smInt;
}

// remove click event from decrement button when value is zero
if (output.value === "0") {
dec.parentElement.classList.add('js-noevent');
} else {
dec.parentElement.classList.remove('js-noevent');
}

if (inc.parentElement.contains(e.target)) {
  // on click increment
  output.stepUp(step);
  output.setAttribute('value', output.value);
  output.setAttribute('step', step);
  const vv = $(".counter--output").val();
$(".counter--outpute").val(vv*0.08 + " ETH ");
  exit;
}

if (dec.parentElement.contains(e.target)) {
  // on click decrement
  output.stepDown(step);
  output.setAttribute('value', output.value);
  output.setAttribute('step', step);
  const vvvs = $(".counter--output").val();
  if (vvvs<=0) {
const vvvs = $(".counter--output").val(0);
$(".counter--outpute").val(0 + " ETH ");
}else{
  const vvv = $(".counter--outpute").val();
  let num = parseFloat(vvv).toFixed(2) - parseFloat(0.08).toFixed(2);
 let text=num.toString();
  let result = text.slice(0, 4);
  $(".counter--outpute").val(result+ " ETH ");}
  exit;
}

// Call recursively
count = setTimeout(stepInterval, intTime);
};
stepInterval();
});
};

window.addEventListener("mouseup", () => {
clearTimeout(count);
});

changeValues();



