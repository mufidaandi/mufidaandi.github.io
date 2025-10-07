/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).on('load', function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	});


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	// Check if target exists
    	if ($target.length) {
    		var scrollTop = $target.offset().top - 20; // 20px offset for better UX
    		
    		$('html, body').stop().animate({
       		'scrollTop': scrollTop
      	}, 90, 'swing', function () {
      		window.location.hash = target;
      	});
      }

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});

	/*---------------------------------------------------- */
  	/* Technologies Tab Functionality
  	------------------------------------------------------ */
  	$('.tech-tab').on('click', function() {
  		var tabId = $(this).data('tab');
  		
  		// Remove active class from all tabs and content
  		$('.tech-tab').removeClass('active');
  		$('.tech-tab-content').removeClass('active');
  		
  		// Add active class to clicked tab and corresponding content
  		$(this).addClass('active');
  		$('#' + tabId).addClass('active');
  	});

  	/*---------------------------------------------------- */
  	/* Mobile Hamburger Menu
  	------------------------------------------------------ */
  	$('#hamburger-menu').on('click', function() {
  		$(this).toggleClass('active');
  		$('#nav-menu').toggleClass('active');
  		
  		// Prevent body scroll when menu is open
  		if ($(this).hasClass('active')) {
  			$('body').css('overflow', 'hidden');
  		} else {
  			$('body').css('overflow', 'auto');
  		}
  	});

  	// Close menu when clicking on navigation links
  	$('.nav-link').on('click', function() {
  		$('#hamburger-menu').removeClass('active');
  		$('#nav-menu').removeClass('active');
  		$('body').css('overflow', 'auto');
  	});

  	// Close menu when clicking outside
  	$(document).on('click', function(e) {
  		if (!$(e.target).closest('.nav-container').length) {
  			$('#hamburger-menu').removeClass('active');
  			$('#nav-menu').removeClass('active');
  			$('body').css('overflow', 'auto');
  		}
  	});

  	// Handle window resize - close mobile menu if window becomes large
  	$(window).on('resize', function() {
  		if ($(window).width() > 768) {
  			$('#hamburger-menu').removeClass('active');
  			$('#nav-menu').removeClass('active');
  			$('body').css('overflow', 'auto');
  		}
  	});

  	/*---------------------------------------------------- */
  	/* Project Modal Functionality
  	------------------------------------------------------ */
  	
  	// Project data
  	const projectData = {
  		'expense-tracker': {
  			title: 'Expense Tracker with Gemini AI',
  			badges: [{ text: 'Featured', class: 'featured' }],
  			image: 'images/expensure.jpg',
			loom: '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/982f3d992aa74610a8d2ab98448a8a87?sid=9e47e04a-6dc4-4fc9-bd54-8f87f2345667" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',	
  			description: 'A modern expense tracking app that uses Gemini AI to automatically categorize transactions and generate personalized financial insights. Built with React and Node.js, this application provides users with intelligent budget analysis and spending recommendations.',
  			tech: ['React', 'Node.js', 'MongoDB', 'Gemini AI', 'Vercel', 'Express.js'],
  			highlights: [
  				'AI-powered categorization and budget insights',
  				'Clean, accessible desktop-first UI',
  				'Real-time financial analytics',
  				'Intelligent spending recommendations',
  				'Secure user authentication'
  			],
  			links: [
  				{ url: 'https://github.com/mufidaandi/ai-financial-dashboard', text: 'View Code', icon: 'fa-github' },
  				{ url: 'https://ai-financial-dashboard.vercel.app/', text: 'Live Demo', icon: 'fa-external-link' }
  			]
  		},
  		'financial-dashboard': {
  			title: 'Financial Dashboard (Happy Hive Hiring Challenge)',
  			badges: [{ text: 'Challenge', class: 'challenge' }],
  			image: 'images/financial-dashboard-vikings.jpg',
			loom: '',
  			description: 'Developed as part of a hiring challenge, this app provides a clear overview of account balances for both deposit accounts and credit cards. Built end-to-end with Java Spring Boot and modern JavaScript.',
  			tech: ['Java', 'Spring Boot', 'Bootstrap', 'JavaScript', 'Docker', 'Maven', 'Render'],
  			highlights: [
  				'Built independently in 2-person team (solo dev with a project manager)',
  				'Containerized with Docker for deployment',
  				'Minimal design',
  				'RESTful API architecture'
  			],
  			links: [
  				{ url: 'https://github.com/mufidaandi/financial_dashboard_teamvikings', text: 'View Code', icon: 'fa-github' },
  				{ url: 'https://financial-dashboard-teamvikings.onrender.com/', text: 'Live Demo', icon: 'fa-external-link' },
  				{ url: 'https://whimsical.com/team-vikings-group-challenge-financial-dashboard-wireframe-NZudMJg77TgMYbLGVPggtP', text: 'View Wireframe', icon: 'fa-sitemap' }
  			]
  		},
  		'pet-store': {
  			title: 'Rasvel\'s Pet Store',
  			badges: [{ text: 'Group', class: 'group' }],
  			image: 'images/PetStore.jpg',
			loom: '',
  			description: 'A modern pet store website with dynamic features including product filtering, search functionality, and smooth animations. Developed as a team project showcasing modern web development practices.',
  			tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Responsive Design'],
  			highlights: [
  				'Dynamic product filtering and search',
  				'Responsive design with animations',
  				'Modern e-commerce interface',
  				'Team collaboration and Git workflow',
  				'Cross-browser compatibility'
  			],
  			links: [
  				{ url: 'https://github.com/mufidaandi/rasvels-pet-store', text: 'View Code', icon: 'fa-github' },
  				{ url: 'https://mufidaandi.github.io/rasvels-pet-store', text: 'Live Demo', icon: 'fa-external-link' }
  			]
  		},
  		'general-store': {
  			title: 'Rasvel\'s General Store',
  			badges: [{ text: 'Group', class: 'group' }],
  			image: 'images/rasvels.jpg',
			loom: '',
  			description: 'An elegant static website for a general merchandise store, showcasing clean design principles and engaging user experience. Focus on pure CSS implementation and responsive design.',
  			tech: ['HTML5', 'CSS3', 'Responsive Design', 'CSS Grid', 'Flexbox'],
  			highlights: [
  				'Pure CSS implementation',
  				'Elegant and engaging design',
  				'Mobile-responsive layout',
  				'Modern CSS techniques',
  				'Clean code architecture'
  			],
  			links: [
  				{ url: 'https://github.com/mufidaandi/rasvels', text: 'View Code', icon: 'fa-github' },
  				{ url: 'https://mufidaandi.github.io/rasvels', text: 'Live Demo', icon: 'fa-external-link' }
  			]
  		}
  	};

  	// Open modal function
  	window.openProjectModal = function(projectId) {
  		const project = projectData[projectId];
  		if (!project) return;

  		// Populate modal content
  		$('#modal-description').text(project.description);

  		// Clear existing title section and create new one with title and badges in same row
  		$('.modal-title-section').remove(); // Remove any existing title section
  		
  		let badgesHtml = '';
  		project.badges.forEach(badge => {
  			badgesHtml += `<span class="modal-badge ${badge.class}">${badge.text}</span>`;
  		});
  		
  		// Create title section with title and badges
  		const titleSectionHtml = `
  			<div class="modal-title-section">
  				<h3 id="modal-title">${project.title}</h3>
  				<div class="modal-badges-header">${badgesHtml}</div>
  			</div>
  		`;
  		
  		// Insert the title section before the close button
  		$('.modal-close').before(titleSectionHtml);

  		// Add loom if available
  		if (project.loom) {
  			$('#modal-image').html(project.loom);
  		} else if (project.image) {
  			$('#modal-image').html(`<img src="${project.image}" alt="${project.title}" />`);
  		} else {
  			$('#modal-image').empty();
  		}

  		// Add tech tags
  		let techHtml = '';
  		project.tech.forEach(tech => {
  			techHtml += `<span class="tech-tag">${tech}</span>`;
  		});
  		$('#modal-tech').html(techHtml);

  		// Add highlights
  		let highlightsHtml = '<h5>Key Features</h5><ul>';
  		project.highlights.forEach(highlight => {
  			highlightsHtml += `<li>${highlight}</li>`;
  		});
  		highlightsHtml += '</ul>';
  		$('#modal-highlights').html(highlightsHtml);

  		// Add links
  		let linksHtml = '';
  		project.links.forEach(link => {
  			linksHtml += `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="modal-link">
  				<i class="fa ${link.icon}"></i> ${link.text}
  			</a>`;
  		});
  		$('#modal-links').html(linksHtml);

  		// Show modal
  		$('#project-modal').fadeIn(300);
  		$('body').css('overflow', 'hidden');
  	};

  	// Close modal function
  	function closeProjectModal() {
  		$('#project-modal').fadeOut(300);
  		$('body').css('overflow', 'auto');
  	}

  	// Close modal when clicking close button
  	$('.modal-close').on('click', closeProjectModal);

  	// Close modal when clicking outside
  	$('#project-modal').on('click', function(e) {
  		if (e.target === this) {
  			closeProjectModal();
  		}
  	});

  	// Close modal with ESC key
  	$(document).on('keydown', function(e) {
  		if (e.key === 'Escape' && $('#project-modal').is(':visible')) {
  			closeProjectModal();
  		}
  	});

})(jQuery);