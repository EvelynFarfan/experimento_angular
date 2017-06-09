// ----------------------------------------------------------------------------------------
$(document).ready(function() {
  var navPrimary = document.querySelector(".nav--primary");
  var navItems = document.querySelectorAll(".nav-item--primary");

  navItems.forEach(function(item) {
    var secondary = item.querySelector(".nav--secondary");
    if (secondary) {
      // secondary.style.height = secondary.offsetHeight + "px";
      secondary.style.height = "auto";
    }
    item.classList.add("is-collapsed");

    item.onclick = function() {
      item.classList.toggle("is-collapsed");
      item.classList.toggle("is-active");
    };
  });
  $('.collapse__head').click(function(){
    $(this).toggleClass('open'); 
    $(this).parent().find('.collapse__body').slideToggle('slow');
  });
});

