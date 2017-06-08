if (typeof jQuery === "undefined") {
  throw new Error("Minsa requires jQuery");
}

$.Minsa = {};

$.Minsa.options = {
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", 
  navbarMenuHeight: "200px",
  animationSpeed: 500,
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  sidebarPushMenu: true,
  sidebarSlimScroll: true,
  sidebarExpandOnHover: false,
  enableBoxRefresh: true,
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  enableFastclick: false,
  enableControlTreeView: true,
  enableControlSidebar: true,
  controlSidebarOptions: {
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    selector: ".control-sidebar",
    slide: true
  },
  enableBoxWidget: true,
  boxWidgetOptions: {
    boxWidgetIcons: {
      collapse: 'fa-minus',
      open: 'fa-plus',
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      remove: '[data-widget="remove"]',
      collapse: '[data-widget="collapse"]'
    }
  },
  directChat: {
    enable: true,
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

$(function () {
  "use strict";
  //Fix for IE page transitions
  // SOLUCIONA LAS TRANSICIONES DE PAGINAS DE IE
  $("body").removeClass("hold-transition");
  //Easy access to options
  // FÁCIL ACCESO A LAS OPCIONES -----> MENUS DESPLEGABLES
  var o = $.Minsa.options;
  //Set up the object
  // CONFIGURAR EL OBJETO ------> NO TOCAR
  _init();
  //Activate the layout maker
  // ACTIVA LA POSICION DEL DISEÑO ------> NO TOCAR
  $.Minsa.layout.activate();
  //Enable sidebar tree view controls
  // HABILITA LA APARICION DE LOS SUBMENUS DE LA BARRA LATERAL
  if (o.enableControlTreeView) {
    $.Minsa.tree('.sidebar');
  }
  //Enable control sidebar
  // ACTIVA EL DESPLIEGUE DE LA BARRA LATERAL DERECHA (TUERCA)
  if (o.enableControlSidebar) {
    $.Minsa.controlSidebar.activate();
  }
  //Activate sidebar push menu
  // ACTIVAR BURGER MENU DESKTOP
  if (o.sidebarPushMenu) {
    $.Minsa.pushMenu.activate(o.sidebarToggleSelector);
  }

  // NO TOCAR
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
      var group = $(this);
      $(this).find(".btn").on('click', function (e) {
        group.find(".btn.active").removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
      });
  });
});

function _init() {
  'use strict';
  $.Minsa.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $('body, html, .wrapper').css('height', 'auto');
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      // Remove overflow from .wrapper if layout-boxed exists
      // ELIMINA EL DESBORDAMIENTO DE .WRAPPER SI EXISTE UN DISEÑO EN CAJA.
      $(".layout-boxed > .wrapper").css('overflow', 'hidden');
      //Get window height and the wrapper height
      // OBTIENE LA ALTUA DE LA VENTANA Y DE WRAPPER
      var footer_height = $('.main-footer').outerHeight() || 0;
      var neg = $('.main-header').outerHeight() + footer_height;
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height() || 0;
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      // Establece la min-altura del contenido y la barra lateral en función de la
      // la altura del documento.
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - footer_height);
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        // Corrección de la altura de la barra lateral de control
        var controlSidebar = $($.Minsa.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }
      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.Minsa.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimScroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };
  $.Minsa.pushMenu = {
    //  OCULTA Y MUESTRA LA BARRA LATERAL IZQUIERDA
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.Minsa.options.screenSizes;
      //Enable sidebar toggle
      $(document).on('click', toggleBtn, function (e) {
        e.preventDefault();
        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
          }
        }
      });
      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });
      //Enable expand on hover for sidebar mini
      if ($.Minsa.options.sidebarExpandOnHover
        || ($('body').hasClass('fixed')
        && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
  };
  $.Minsa.tree = function (menu) {
    // MENU DESPLEGABLE SUBMENU
    var _this = this;
    var animationSpeed = $.Minsa.options.animationSpeed;
    $(document).off('click', menu + ' li a')
      .on('click', menu + ' li a', function (e) {
        //Get the clicked link and the next element
        var $this = $(this);
        var checkElement = $this.next();

        //Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
          //Close the menu
          checkElement.slideUp(animationSpeed, function () {
            checkElement.removeClass('menu-open');
            //Fix the layout in case the sidebar stretches over the height of the window
            //_this.layout.fix();
          });
          checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
          //Get the parent menu
          var parent = $this.parents('ul').first();
          //Close all open menus within the parent
          var ul = parent.find('ul:visible').slideUp(animationSpeed);
          //Remove the menu-open class from the parent
          ul.removeClass('menu-open');
          //Get the parent li
          var parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function () {
            //Add the class active to the parent li
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
            //Fix the layout in case the sidebar stretches over the height of the window
            _this.layout.fix();
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
          e.preventDefault();
        }
      });
  };
  $.Minsa.controlSidebar = {
    //instantiate the object
    // MENU BURGE ACTIVATE
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.Minsa.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
          && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      //If the body has a boxed layout, fix the sidebar bg position
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      //If the body has a fixed layout, make the control sidebar fixed
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    //Open the control sidebar
    // ABRIR MENU LATERAL DERECHO
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    // CERRAR MENU LATERAL DERECHO
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    // MENU BURGER
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        if (_this.hasBindedResize) {
          return;
        }
        $(window).resize(function () {
          _this._fix(sidebar);
        });
        _this.hasBindedResize = true;
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      };
    }
  };
};

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
});