//ps1
var ps1 = document.getElementById("personalSkill1");
var ps1Length = ps1.getTotalLength();
ps1.style.strokeDasharray = ps1Length;
ps1.style.strokeDashoffset = ps1Length;

//ps2
var ps2 = document.getElementById("personalSkill2");
var ps2Length = ps1.getTotalLength();
ps2.style.strokeDasharray = ps2Length;
ps2.style.strokeDashoffset = ps2Length;

// Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
window.addEventListener("scroll", myFunction);

function myFunction() {

    var currentScrollTop = $(document).scrollTop();
    var pageBottom = currentScrollTop + $(window).height();
    var personalPosition = $('#personalSkillsSection').offset().top;

    var personalPositionBottom = personalPosition + $('#personalSkillsSection').height();
    if (personalPosition < pageBottom && pageBottom < personalPositionBottom) {
        var amountScrolled = pageBottom - personalPosition;
        var percentScrolled = amountScrolled / $('#personalSkillsSection').height();

        var draw = ps1Length * percentScrolled;

        // Reverse the drawing (when scrolling upwards)
        ps1.style.strokeDashoffset = ps1Length - draw;
    }else if (personalPosition < pageBottom && pageBottom >= personalPositionBottom) {
        $('#personalSkillCreative').fadeIn();
        $('#personalSkillsSvg').fadeOut();
    }



}