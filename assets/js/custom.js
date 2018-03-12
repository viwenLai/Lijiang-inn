(function($){

	/* Preloader */

	$(window).load(function() {
		/*$('#status').fadeOut();*/
		$('#preloader').delay(100).fadeOut('slow');
	});

	$(document).ready(function() {

		/* lazy load */

		var lazyLoad = (function() {
			var clock;

			function init() {
				$(window).on("scroll", function() {
					if (clock) {
						clearTimeout(clock);
					}
					clock = setTimeout(function() {
						checkShow();
					}, 200);
				})
				checkShow();
			}

			function checkShow() {
				$(".portfolio-items-container img").each(function() {
					var $cur = $(this);
					if ($cur.attr('isLoaded')) {
						return;
					}
					if (shouldShow($cur)) {
						showImg($cur);
					}
				})
			}

			function shouldShow($node) {
				var scrollH = $(window).scrollTop();
				var winH = $(window).height();
				var top = $node.offset().top;

				if (top < winH + scrollH) {
					return true;
				} else {
					return false;
				}
			}

			function showImg($node) {
				$node.attr('src', $node.attr('data-original'));
				$node.attr('isLoaded', true);
			}

			return {
				init: init
			}
		})()

		lazyLoad.init();

		/* display large img */

		$(".portfolio-items-container img").click(function() {
			var _this = $(this);
			imgShow("#outerDiv", "#innerDiv", "#largeImg", _this);
		});

		function imgShow(outerDiv, innerDiv, largeImg, _this) {
			var src = _this.attr("src");
			$("#largeImg").attr("src", src);

			$("<img/>").attr("src", src).load(function() {
				var windowW = $(window).width();
				var windowH = $(window).height();
				var realWidth = this.width;
				var realHeight = this.height;
				var imgWidth, imgHeight;
				var scale = 0.8;

				if (realHeight > windowH*scale) {
					imgHeight = windowH*scale;
					imgWidth = imgHeight/realHeight*realWidth;
					if (imgWidth > windowW*scale) {
						imgWidth = windowW*scale;
					}
				} else if (realWidth > windowW*scale) {
					imgWidth = windowW*scale;
					imgHeight = imgWidth/realWidth*realHeight;
				} else {
					imgWidth = realWidth;
					imgHeight = realHeight;
				}

				innerWidth = imgWidth + 20;
				$("#innerDiv").css("width", innerWidth);

				$("#largeImg").css("width", imgWidth);

				$(".descrText").text(_this.attr('data-text'));

				var w = (windowW - imgWidth)/2 - 10;
				var h = (windowH - imgHeight)/2;

				/*$("#innerDiv").css({"top": h, "left": w});*/
				document.getElementById('innerDiv').style.left = w + 'px';
				document.getElementById('innerDiv').style.top = h + 'px';
				$("#outerDiv").fadeIn("slow");

			  $("#outerDiv").click(function() {
				  $(this).fadeOut("slow");
			  });
			})
		}

		/* Animated scrolling / Scroll Up */

		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		/* Navbar */

		$('.header').sticky({
			topSpacing: 0
		});

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 70
		})

		/* Background image */

		$(".js-height-full").height($(window).height());

		$(window).resize(function(){
			$(".js-height-full").height($(window).height());
		});

		/* Initialize shuffle plugin */

		var $portfolioContainer = $('.portfolio-items-container');

		$('#filter li').on('click', function (e) {
			e.preventDefault();

			$('#filter li').removeClass('active');
			$(this).addClass('active');

			group = $(this).attr('data-group');
			var groupName = $(this).attr('data-group');

			$portfolioContainer.shuffle('shuffle', groupName );
		});

		$('.simple-ajax-popup').magnificPopup({
			type: 'ajax',
			callbacks: {
				parseAjax: function(mfpResponse) {
					$.getScript('assets/js/jquery.fitvids.js');
					$.getScript('assets/js/custom-portfolio.js');
				},
			}
		});

		/* WOW Animation When You Scroll */

		wow = new WOW({
			mobile: false
		});
		wow.init();

		/* A jQuery plugin for fluid width video embeds */

		$('body').fitVids();

		/* Customer evaluate */

		$(function() {
			$('#evaluate').owlCarousel({
				items: 1,
				autoPlay: true
			});
		});

	});

})(jQuery);
