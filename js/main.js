(function ($) {
  "use strict";

  // Preloader
  $(window).on('load', function () {
    if ($('.preloader').length) {
      $('.preloader').delay(1000).fadeOut('slow');
    }
  });

  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out'
  });

  // Sticky Navbar
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('.navbar').addClass('sticky');
      $('.back-to-top').addClass('active');
    } else {
      $('.navbar').removeClass('sticky');
      $('.back-to-top').removeClass('active');
    }
  });

  // Smooth scrolling for navigation
  $('.nav-link, .smoothScroll').on('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 70
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  // Typed.js for text animation
  if ($('.typed-text').length) {
    var typed = new Typed('.typed-text', {
      strings: ['FULL STACK DEVELOPER', 'DEVOPS EXPERT', 'LEAD DEVELOPER', 'AZURE SPECIALIST'],
      typeSpeed: 50,
      backSpeed: 20,
      backDelay: 2000,
      loop: true
    });
  }

  // Portfolio filter
  $(window).on('load', function() {
    var $portfolioGrid = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('.portfolio-filter ul li').on('click', function () {
      $('.portfolio-filter ul li').removeClass('filter-active');
      $(this).addClass('filter-active');

      var filterValue = $(this).attr('data-filter');
      $portfolioGrid.isotope({
        filter: filterValue
      });
    });
  });

  // Testimonial slider
  $('.testimonial-slider').slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear'
  });

  // Animate floating shapes
  function animateShapes() {
    $('.floating-shape').each(function(index) {
      var randomX = Math.random() * 20 - 10;
      var randomY = Math.random() * 20 - 10;
      var duration = 3 + Math.random() * 5;
      
      $(this).animate({
        'margin-top': '+=' + randomY + 'px',
        'margin-left': '+=' + randomX + 'px'
      }, duration * 1000, function() {
        $(this).animate({
          'margin-top': '-=' + randomY + 'px',
          'margin-left': '-=' + randomX + 'px'
        }, duration * 1000, function() {
          animateShapes();
        });
      });
    });
  }
  
  animateShapes();

  // Form submission with EmailJS
  document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.init("Q1qx4-aOCWv3pTTUG");
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value || 'New Portfolio Contact';
    const message = document.getElementById('message').value;
    
    const templateParams = {
      to_email: "jeffgithae03@gmail.com",
      to_name: "Jeff Githae",
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };
    
    emailjs.send('service_ljkgfhe', 'template_uqv99tg', templateParams)
      .then(function (response) {
        alert('Thank you for reaching out! I will get back to you as soon as possible.');
        document.getElementById('myForm').reset();
      }, function (error) {
        alert('Oops! Something went wrong. Please try again later.');
      });
  });

  // Activate skill percentage counters
  $('.count-text').each(function () {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  });

  // Back to top button
  $('.back-to-top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 800);
  });

  // Navbar collapse on link click
  $('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
  });

})(jQuery);