var footerHeight = document.getElementById('footer').offsetHeight;
document.getElementById('wrapper').style.marginBottom = footerHeight;

new WOW().init();

// Fixed Header
window.onscroll = function() {
  var sticky = document.getElementsByClassName("header")[0], scroll = this.scrollY, headerLogo = document.getElementsByClassName("header-logo")[0];
  if(scroll >= 200) {
    sticky.classList.add("-fixed");
    headerLogo.src = "assets/img/logo-black.png";
  } else {
    sticky.classList.remove("-fixed");
    headerLogo.src = "assets/img/logo-white.png";
  }
};

// Menu
var openMenu = document.getElementsByClassName('open-menu')[0];
var closeMenu = document.getElementsByClassName('close-menu')[0];
var headerMobile = document.getElementsByClassName('header-mobile')[0];

openMenu.addEventListener("click", function(){
  headerMobile.classList.add("-is-open");
});

closeMenu.addEventListener("click", function(){
  headerMobile.classList.remove("-is-open");
});

// OWL Carousel
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    items: 1,
    number: 1,
    loop: true,
    nav: false,
    dots: true,
    margin: 30,
    stagePadding:30,
    smartSpeed:1000,
    autoplay: true,
		autoplayTimeout: 5000,
  });
});

window.onload = function(){
  document.getElementsByTagName('body')[0].classList.add('-loaded');
};