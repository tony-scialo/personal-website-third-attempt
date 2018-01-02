var currentInterval;

(function(){
  onPageLoad();
}());

function onPageLoad() {
  setTimeout(function(){
    titleOverlaySlideDown();
  }, 500);

  setTimeout(function(){
    diminsionTypeTextStart();
    headerFadeIn();
  },1500);
}

function titleOverlaySlideDown() {
  var overlay = $('#titleOverlay');
  var afterWidth = window.getComputedStyle(document.querySelector('#titleOverlay'), ':after').width.split('p')[0];
  var finalWidth = overlay.width() + parseInt(afterWidth);
  var width = '-' + finalWidth + 'px';
  overlay.css({left: width, display: 'block'});
  overlay.animate({
    left: '0'
  }, 750);
}

function headerFadeIn() {
  $('#pageHeader').fadeIn();
}

var lastScrollTop = 0;
$(window).scroll(function(){
  slideUpDownHeader();
  dividerSlideIn();
});

function slideUpDownHeader() {
  var currentScrollTop = $(document).scrollTop();
  var pageHeaderHeight = $('#pageHeader').outerHeight();
  if(($('#pageHeader').hasClass('up-scroll')  || $('#pageHeader').hasClass('top')) && currentScrollTop > lastScrollTop){
    $('#pageHeader').removeClass('up-scroll top').addClass('down-scroll');
    $('#pageHeader').animate({
      top: '-' + pageHeaderHeight + 'px'
    }, 500);    
  } else if($('#pageHeader').hasClass('down-scroll') && currentScrollTop < lastScrollTop){
    $('#pageHeader').removeClass('down-scroll').addClass('up-scroll');
    $('#pageHeader').animate({
      top: '0'
    }, 500);    
  }
  lastScrollTop = currentScrollTop;
  if(lastScrollTop === 0){
    $('#pageHeader').removeClass('up-scroll').addClass('top');
  }
}

function dividerSlideIn() {
  var currentScrollTop = $(document).scrollTop();
  var pageBottom = currentScrollTop + $(window).height();
  var dividerPosition = $('#dividerOverlay').position().top;
  if(dividerPosition < pageBottom) {
    $('#dividerOverlay').animate({
      width: '0%'
    }, 1750);
  }
}

function menuClick() {

  var menu = $('.menu');
  var menuButton = $('.menu-button');

  if (menuButton.hasClass('menu-button-open')) {
    menuButton.removeClass('menu-button-open');
    menu.fadeOut();
  } else {
    menuButton.addClass('menu-button-open');
    menu.fadeIn();
  }
}

function menuItemClick(scrollTo, el) {

  $('#menuList').find('.current-section').removeClass('current-section');
  $(el).find('a').addClass('current-section');

  menuClick();

  var scrollEl = $('#' + scrollTo);

  $('html, body').animate({
    scrollTop: scrollEl.offset().top
  }, 1000);
}

function skillsSquareClick(element, skillsColumnIndex) {
  $(element).addClass('active-skill');

  $('.skills-section-inner .skills-column').children().each(function (index) {
    if (!$(this).hasClass('active-skill')) {
      $(this).delay(100 * index).animate({
        opacity: 0
      });
    }
  });

  setTimeout(function () {
    $('.skills-section-inner .skills-column').each(function (index) {
      if (index !== skillsColumnIndex) {
        $(this).fadeOut();
      }
    });
  }, 400);

  setTimeout(function () {
    $('.skills-section-inner').addClass('skill-is-active');
    $(element).animate({
      width: '100%',
      height: '100%'
    }, function () {
      currentInterval = generateParticelForId($(element).find('canvas').attr('id'));
    });
    $(element).find('.skills-square-content').fadeOut();
    $(element).find('.skills-square-inner-hidden').fadeIn();
  }, 1000);

}

$(".skills-close-container").click(function (event) {
  event.stopPropagation();

  clearInterval(currentInterval);

  var skillsSquare = $(this).closest('.skills-square');
  skillsSquare.find('.skills-square-inner-hidden').fadeOut();

  skillsSquare.animate({
    width: '240px',
    height: '240px',
  }, 300);
  skillsSquare.css({
    overflow: 'initial'
  });

  setTimeout(function () {
    $('.skills-section-inner .skills-column').each(function (index) {
      $(this).fadeIn();
    });
  }, 400);

  setTimeout(function () {
    skillsSquare.removeClass('active-skill');
    skillsSquare.find('.skills-square-content').fadeIn();
  }, 400);

  setTimeout(function () {
    $('.skills-section-inner .skills-column').children().each(function (index) {
      if (!$(this).hasClass('active-skill')) {
        $(this).delay(100 * index).animate({
          opacity: 1.0
        });
      }
    });

    $('.skills-section-inner').removeClass('skill-is-active');
  }, 400);
});

/*$('.stars-container').hover(function(){
  console.log('stars-in');
  $('.stars-container').css('background-color', '#2C1B3D');
},function(){
  console.log('stars-out');
  $('.stars-container').css('background-color', '#e21838');
});*/