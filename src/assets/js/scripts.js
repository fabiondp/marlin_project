jQuery(document).ready(function ($) {
  // console.log('Script.js');

  // Add scrollspy to <body>
  $('body').scrollspy({
    target: '.navbar',
    offset: 92
  });

  $(document).on('click', '#myNavbar a, #icones-home a', function (event) {

    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      const hash = this.hash;
      // console.log('window.location', window.location);

      if (window.location.href.indexOf('home') === -1) {

        // window.location.href = '/home' + hash;
      } else {


        $('html, body').animate({
          scrollTop: ($(hash).offset().top - 90)
        }, 800, function () {
          // window.location.hash = hash;
        });
      }
    } // End if
  });

  // Add smooth scrolling on all links inside the navbar
  // $('#myNavbar a, #icones-home a').on('click', function (event) {  

  // });

  // $('.collapse').collapse();

  // $('.collapse').on('hide.bs.collapse', function () {
  //   alert('Open');
  //   $('.panel-title').html(
  //     '<span class="glyphicon glyphicon-collapse-down"></span> Abrir'
  //   );
  // });
  // $('.collapse').on('show.bs.collapse', function () {
  //   close('Open');
  //   $('.panel-title').html(
  //     '<span class="glyphicon glyphicon-collapse-up"></span> Fechar'
  //   );
  // });




});
