$(document).ready(function() {

	/*------------ For Scrollspy Init ------------ */
	$('.nav-link').each(function(i) {
		var position = $($(this).attr("href")).position();
		$(this).scrollspy({
			min : position.top - 50,
			max : position.top + $($(this).attr("href")).height(),
			onEnter : function(element, position) {
				$(element).addClass('active'); 
			},
			onLeave : function(element, position) {
				$(element).removeClass('active');
			}
		});
	});
	
	
	
	
	/*------------ For Top Banner ------------ */
	// Full list of configuration options available here:
	// https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
		width : 1024,
		height : 350,
		controls : false,
		progress : false,
		history : true,
		center : true,
		loop : true,
		autoSlide : 5000,
		minScale : 0.2,
		maxScale : 1.0
	});

	/*------------ For smooth scroll ------------ */

	$('.logo').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();

		$('html, body').stop().animate({
			scrollTop : 0
		}, 800);
	});

	$('#home-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		$('html, body').stop().animate({
			scrollTop : 0
		}, 800);
	});

	$('#about-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		var contentPosTop = $('#about').eq(liIndex).position().top;

		$('html, body').stop().animate({
			scrollTop : contentPosTop
		}, 800);
	});

	$('#portfolio-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		var contentPosTop = $('#portfolio').eq(liIndex).position().top;

		$('html, body').stop().animate({
			scrollTop : contentPosTop
		}, 800);
	});

	$('#contact-link').click(function(event) {
		event.preventDefault();
		var liIndex = $(this).index();
		var contentPosTop = $('#contact').eq(liIndex).position().top;

		$('html, body').stop().animate({
			scrollTop : contentPosTop
		}, 800);
	});

	/*------------ For Portfolio thumbnails ------------ */

	$('.fancybox').fancybox();

	$('.fancybox').hover(function() {
		$(this).addClass("animated bounce");
	}, function() {
		$(this).removeClass("animated bounce");
	});

	/*------------  for Google map  ------------ */

	$(window).load(function() {
		LoadGmaps();
	});

	/* Add Your Company Name latitude and  longitude here.
	 * for latitude and longitude please check http://itouchmap.com/latlong.html
	 *  */
	var latitude = "41.253032";
	var longitude = "-72.520752";
	var details = "Company Name - Brooklyn, NY, United States";

	function LoadGmaps() {
		var myLatlng = new google.maps.LatLng(latitude, longitude);
		var myOptions = {
			zoom : 8,
			scrollwheel : true,
			center : myLatlng,
			navigationControl : true,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}

		var map = new google.maps.Map(document.getElementById("googlemaps"), myOptions);
		var marker = new google.maps.Marker({
			position : myLatlng,
			map : map,
			icon : 'img/map_icon.png'
		});
		var infowindow = new google.maps.InfoWindow({
			content : details
		});
		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map, marker);

		});

	}

});

/*!
 * jQuery Sticky Footer 2.3
 * Corey Snyder
 * http://tangerineindustries.com
 *
 * Released under the MIT license
 *
 * Copyright 2013 Corey Snyder.
 *
 * Date: Thu Jan 22 2013 13:34:00 GMT-0630 (Eastern Daylight Time)
 * Modification for jquery 1.9+ Tue May 7 2013
 * Modification for non-jquery, removed all, now classic JS Wed Jun 12 2013
 * Modification for Foundation 5 auto height issues
 * Modification for new DOM change event listener
 * Modification for old IE mutation events, since not supported uses polling
 * 
 * March 13, 2017
 * Modification for HTML multiple <footer> tag syntax, SF should only grabbing the last <footer> on the page
 */

var MutationObserver = (function () {
	var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
		for (var i=0; i < prefixes.length; i++) {
			if (prefixes[i] + 'MutationObserver' in window) {
				 return window[prefixes[i] + 'MutationObserver'];
			}
		}
		return false;
}());

window.onload = function() {
	stickyFooter();

	if (MutationObserver) {
  		observer.observe(target, config);
	} else {
		//old IE
  		setInterval(stickyFooter, 500);
	}
};

//check for changes to the DOM
var target = document.body;
var observer;
var config = { attributes: true, childList: true, characterData: true, subtree:true };

if (MutationObserver) {
	// create an observer instance
	observer = new MutationObserver(mutationObjectCallback);
}

function mutationObjectCallback(mutationRecordsList) {	
	stickyFooter();
}
	 

//check for resize event
window.onresize = function() {
	stickyFooter();
};

//lets get the marginTop for the <footer>
function getCSS(element, property) {

  var elem = document.getElementsByTagName(element)[0];
  var css = null;
  
  if (elem.currentStyle) {
    css = elem.currentStyle[property];
  
  } else if (window.getComputedStyle) {
	css = document.defaultView.getComputedStyle(elem, null).
	getPropertyValue(property);
  }
  
  return css;

}

function stickyFooter() {
	if (MutationObserver) {
		observer.disconnect();
	}
	document.body.setAttribute("style","height:auto");
	
	//only get the last footer
	var footer = document.getElementsByTagName("footer")[document.getElementsByTagName("footer").length-1];
			
	if (footer.getAttribute("style") !== null) {
		footer.removeAttribute("style");
	}
	
	if (window.innerHeight != document.body.offsetHeight) {
		var offset = window.innerHeight - document.body.offsetHeight;
		var current = getCSS("footer", "margin-top");
		
		if (isNaN(parseInt(current)) === true) {
			footer.setAttribute("style","margin-top:0px;");
			current = 0;
		} else {
			current = parseInt(current);
		}
						
		if (current+offset > parseInt(getCSS("footer", "margin-top"))) {			
			footer.setAttribute("style","margin-top:"+(current+offset)+"px;");
		}
	}
	
	document.body.setAttribute("style","height:100%");
	
	//reconnect
	if (MutationObserver) {
		observer.observe(target, config);
	}
}

/*
! end sticky footer
*/

