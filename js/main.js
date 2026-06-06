/* =============================================
   TANDOORI NIGHTS — Main JS
   ============================================= */

/* ── Dish name → Unsplash keyword map ── */
var dishKeywords = {
  'samosa':              'samosa indian appetizer',
  'paneer tikka':        'paneer tikka grilled',
  'aloo tikki':          'aloo tikki potato patty',
  'onion bhaji':         'onion bhaji fritter',
  'chicken tikka':       'chicken tikka tandoor',
  'seekh kabab':         'seekh kebab minced meat',
  'chicken malai tikka': 'chicken malai tikka creamy',
  'tandoori chicken':    'tandoori chicken roasted',
  'shrimp tikka':        'shrimp tikka grilled',
  'palak paneer':        'palak paneer spinach',
  'butter paneer':       'butter paneer masala',
  'paneer makhani':      'paneer makhani butter',
  'chana masala':        'chana masala chickpea curry',
  'dal makhani':         'dal makhani lentil indian',
  'aloo gobi':           'aloo gobi cauliflower potato',
  'baingan bharta':      'baingan bharta eggplant',
  'kadai paneer':        'kadai paneer pepper',
  'matar paneer':        'matar paneer peas',
  'mix vegetable curry': 'mixed vegetable curry indian',
  'chicken tikka masala':'chicken tikka masala curry',
  'butter chicken':      'butter chicken makhani',
  'chicken saag':        'chicken saag spinach curry',
  'kadai chicken':       'kadai chicken bell pepper',
  'chicken korma':       'chicken korma cashew cream',
  'lamb curry':          'lamb curry indian',
  'lamb saag':           'lamb saag spinach',
  'lamb rogan josh':     'rogan josh kashmiri lamb',
  'goat curry':          'goat curry masala',
  'fish curry':          'fish curry coconut indian',
  'shrimp curry':        'shrimp curry coconut',
  'chicken vindaloo':    'chicken vindaloo spicy goan',
  'chicken bowl':        'chicken rice bowl indian',
  'paneer bowl':         'paneer rice bowl indian',
  'lamb bowl':           'lamb rice bowl',
  'veggie bowl':         'vegetable rice bowl indian',
  'plain rice':          'steamed basmati rice',
  'vegetable fried rice':'vegetable fried rice',
  'chicken fried rice':  'chicken fried rice',
  'vegetable biryani':   'vegetable biryani aromatic',
  'chicken biryani':     'chicken biryani aromatic',
  'plain naan':          'naan bread tandoor',
  'butter naan':         'butter naan flatbread',
  'garlic naan':         'garlic naan herb',
  'cheese naan':         'cheese naan stuffed',
  'keema naan':          'keema naan minced lamb',
  'tandoori roti':       'tandoori roti wheat bread',
  'plain parantha':      'paratha layered flatbread',
  'aloo parantha':       'aloo paratha stuffed potato',
  'raita':               'raita yogurt cucumber',
  'papadum':             'papadum crispy indian',
  'chutney trio':        'chutney mint tamarind indian',
  'gulab jamun':         'gulab jamun syrup dessert',
  'kheer':               'kheer rice pudding indian',
  'rasmalai':            'rasmalai cottage cheese dessert',
  'kulfi':               'kulfi indian ice cream pistachio',
  'gajar halwa':         'gajar halwa carrot dessert',
  'mango lassi':         'mango lassi yogurt drink',
  'sweet lassi':         'lassi sweet yogurt drink',
  'salted lassi':        'lassi yogurt drink',
  'masala chai':         'masala chai spiced tea'
};

function getDishKeyword(name) {
  var lower = name.toLowerCase().replace(/\s*\(.*?\)/g, '').trim();
  return dishKeywords[lower] || (lower + ' indian food');
}

$(document).ready(function () {

  /* ── Dynamic footer year ── */
  $('.footer-copy').html(function (_, html) {
    return html.replace(/\b\d{4}\b/, new Date().getFullYear());
  });

  /* ── Magnific Popup lightbox (gallery page) ── */
  if ($('.image-popup-vertical-fit').length) {
    $('.image-popup-vertical-fit').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      },
      image: {
        tError: '<a href="%url%">The image</a> could not be loaded.',
      }
    });
  }

  /* ── Menu sticky tab nav ── */
  var tabs = $('.menu-tab');
  // Include QR-menu blocks (Daily Buffet / Combos) that act as scroll targets
  var categories = $('.menu-category, .qr-block[id]');

  function stickyOffset() {
    // navbar height + tab bar height
    var navH = $('.navbar').outerHeight() || 68;
    var tabH = $('.menu-tabs-outer').outerHeight() || 46;
    return navH + tabH + 12;
  }

  function updateActiveTab() {
    var activeId = '';
    var offset = stickyOffset();
    categories.each(function () {
      if ($(window).scrollTop() + offset >= $(this).offset().top) {
        activeId = $(this).attr('id');
      }
    });
    tabs.each(function () {
      var isActive = $(this).data('target') === activeId;
      $(this).toggleClass('active', isActive);
      // On mobile, scroll the active tab into view horizontally
      if (isActive && $(window).width() <= 767) {
        var wrap = $('.menu-tabs-wrap')[0];
        var tabEl = this;
        if (wrap && tabEl) {
          var tabLeft = tabEl.offsetLeft;
          var tabWidth = tabEl.offsetWidth;
          var wrapWidth = wrap.offsetWidth;
          var scrollTarget = tabLeft - (wrapWidth / 2) + (tabWidth / 2);
          wrap.scrollLeft = scrollTarget;
        }
      }
    });
  }

  if (tabs.length) {
    tabs.on('click', function () {
      var target = $('#' + $(this).data('target'));
      if (target.length) {
        var offset = stickyOffset();
        $('html, body').animate({ scrollTop: target.offset().top - offset }, 400);
      }
    });
    $(window).on('scroll', updateActiveTab);
    updateActiveTab();
  }

  /* ── Scroll to top ── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('.scrollup').fadeIn(200);
    } else {
      $('.scrollup').fadeOut(200);
    }
  });

  $('.scrollup, .totop a').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  /* ── Dish photo modal ── */
  if ($('#dish-modal').length) {
    // Inject camera icon into every menu item
    $('.menu-item').each(function () {
      $(this).append('<span class="dish-photo-icon"><i class="fa fa-camera"></i></span>');
    });

    // Open modal on menu item click
    $(document).on('click', '.menu-item', function () {
      var dishName = $(this).find('.menu-item-name').text().trim();
      var keyword  = getDishKeyword(dishName);
      var imgUrl   = 'https://source.unsplash.com/800x500/?' + encodeURIComponent(keyword);

      $('#dish-modal-name').text(dishName);
      var $img = $('#dish-modal-img');
      $img.attr('src', '').hide();
      $('.dish-modal-spinner').show();
      $('#dish-modal').addClass('open').attr('aria-hidden', 'false');
      $('body').css('overflow', 'hidden');

      // Load image
      var tempImg = new Image();
      tempImg.onload = function () {
        $img.attr('src', imgUrl).show();
        $('.dish-modal-spinner').hide();
      };
      tempImg.onerror = function () {
        // Fallback: generic indian food search
        var fallback = 'https://source.unsplash.com/800x500/?indian+food+dish';
        $img.attr('src', fallback).show();
        $('.dish-modal-spinner').hide();
      };
      tempImg.src = imgUrl;
    });

    // Close modal
    function closeModal() {
      $('#dish-modal').removeClass('open').attr('aria-hidden', 'true');
      $('body').css('overflow', '');
    }
    $(document).on('click', '.dish-modal-close', closeModal);
    $(document).on('click', '.dish-modal-overlay', function (e) {
      if ($(e.target).hasClass('dish-modal-overlay')) closeModal();
    });
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

});
