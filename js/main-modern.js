/** 
 * ===================================================================
 * Modern main js - Updated for better performance and practices
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {
	"use strict";

	// Initialize when DOM is ready
	$(document).ready(function() {
		initializePortfolio();
	});

	/*---------------------------------------------------- */
	/* Preloader - Initialize immediately
	------------------------------------------------------ */ 
	$(window).on('load', function() {
		// Fade out loading animation with better performance
		$("#loader").fadeOut("slow", function(){
			$("#preloader").delay(300).fadeOut("slow");
		});       
	});

	function initializePortfolio() {

		/*---------------------------------------------------- */
		/* FitText Settings - with fallback for older browsers
		------------------------------------------------------ */
		setTimeout(function() {
			if (typeof $.fn.fitText !== 'undefined') {
				$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });
			}
		}, 100);

		/*---------------------------------------------------- */
		/* Smooth Scrolling
		------------------------------------------------------ */ 
		$('a.smoothscroll').on('click', function(e) {
			e.preventDefault();
			
			const target = $(this.getAttribute('href'));
			
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, 'easeInOutExpo');
			}
		});

		/*----------------------------------------------------- */
		/* Alert Boxes - Improved event handling
		------------------------------------------------------- */
		$('.alert-box').on('click', '.close', function(e) {
			e.preventDefault();
			$(this).parent().fadeOut(500);
		});	

		/*----------------------------------------------------- */
		/* Mobile Menu Toggle
		------------------------------------------------------- */
		$('.menu-toggle').on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass('is-clicked');
			$('.mobile-menu').slideToggle();
		});

		/*----------------------------------------------------- */
		/* Back to Top Button
		------------------------------------------------------- */
		$(window).on('scroll', function() {
			if ($(window).scrollTop() > 500) {
				$('#go-top').fadeIn();
			} else {
				$('#go-top').fadeOut();
			}
		});

		$('#go-top').on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, 800);
		});

		/*----------------------------------------------------- */
		/* Accessibility Improvements
		------------------------------------------------------- */
		// Add focus management for keyboard navigation
		$('a, button, input, select, textarea').on('focus', function() {
			$(this).addClass('focus-visible');
		}).on('blur', function() {
			$(this).removeClass('focus-visible');
		});

		// Add ARIA labels to social links if missing
		$('.intro-social a').each(function() {
			if (!$(this).attr('aria-label')) {
				const platform = $(this).find('i').attr('class').includes('linkedin') ? 'LinkedIn' : 'GitHub';
				$(this).attr('aria-label', `Visit my ${platform} profile`);
			}
		});
	}

	/*----------------------------------------------------- */
	/* Utility Functions
	------------------------------------------------------- */
	
	// Enhanced easing function
	$.extend($.easing, {
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	});

	// Performance optimization - debounce function
	function debounce(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this, args = arguments;
			const later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

})(jQuery);