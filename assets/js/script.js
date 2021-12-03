var rqjs = document.getElementById('requirejs');
requirejs.config({
	baseUrl: rqjs.getAttribute('src').replace('require.js',''),
	paths: {
		mmenu: 'mmenu-light',
		bootstrap: 'bootstrap.bundle.min',
		parallax: '//cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min',
	},
	shim : {
        'bootstrap' : { 'deps' :['jquery'] }
    },
});

if (typeof jQuery === 'function') define('jquery', function () {
	return jQuery;
});

const imageObserver = new IntersectionObserver((entries, imgObserver) => {
	entries.forEach(function(entry){
		if (entry.isIntersecting){
			const lazyImage = entry.target;
			lazyImage.src = lazyImage.dataset.src;
			imgObserver.unobserve(lazyImage);
		}
	});
});


requirejs(['bootstrap'], function($){
	jQuery(document).ready(function($){
		"use strict";

		if(document.getElementById('mmenu')){
			requirejs(['mmenu'], function(){
				const menu = new MmenuLight(document.getElementById('mmenu')), drawer = menu.offcanvas({position: ((document.dir == 'rtl') ? 'right' : 'left')});
				menu.navigation({title: $('#mmenu').data('mm-spn-title')});
				$('[href="#mmenu"]').click(function (e) { 
					e.preventDefault();
					drawer.open();
				});
			});
		}
		
		function initjsFuncs(){
			const lazyImages = document.querySelectorAll('[data-src]');
			for (var i = 0; i < lazyImages.length; i++) {
				imageObserver.observe(lazyImages[i]);
			}

			if(document.getElementsByClassName('splide')){
				requirejs(['splide'], function(){
					const splides = document.getElementsByClassName('splide');
					for ( var i = 0; i < splides.length; i++ ) {
						new Splide(splides[i]).mount();
					}
				});
			}

			$('.timerclock').each(function(e){
				const element = this;
				const countDownDate = new Date($(this).data('datetime')).getTime();
				const x = setInterval(function () {
					let now = new Date().getTime();
					let distance = countDownDate - now;
					let days = Math.floor(distance / (1000 * 60 * 60 * 24));
					let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					let seconds = Math.floor((distance % (1000 * 60)) / 1000);
					if($(element).find('.days').length !== 0) $(element).find('.days').html(days);
					if($(element).find('.hours').length !== 0) $(element).find('.hours').html(hours);
					if($(element).find('.minutes').length !== 0) $(element).find('.minutes').html(minutes);
					if($(element).find('.seconds').length !== 0) $(element).find('.seconds').html(seconds);
					if (distance < 0) {
						clearInterval(x);
						// $(element).html('<span title="day" class="rounded expired">End!</span>');
						$(element).html('');
					}
				}, 1000);
			});

			$('[data-bs-toggle="tooltip"]').tooltip();
		}

		initjsFuncs();


		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function() {
				this.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					$(panel).slideUp();
				} else {
					$(panel).slideDown();
				}
			});
		}


		/*
		Ajax Template
		$.ajax({
			type : 'POST',
			url : rqjs.getAttribute('data-ajax'),
			data : {
				action : 'actionname',
				inputs : $(this).serialize()
			},
			beforeSend: function() {
				...
			},
			success : function(resp) {
				...
			},
			complete: function(){
				initAjax();
			}
		});
		*/

	});
});