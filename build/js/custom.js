(function (factory) {
  typeof define === 'function' && define.amd ? define('custom', factory) :
  factory();
}((function () { 'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (location.hash) {
      showTab(location.hash);
    } // Следим за поднимающимися кликами


    document.addEventListener('click', function (event) {
      if (event.target.dataset.toggle === 'tab') {
        event.preventDefault();
        var target = event.target.hash === undefined ? event.target.dataset.target : event.target.hash;

        if (target !== undefined) {
          showTab(target);

          if (history && history.pushState && history.replaceState) {
            var stateObject = {
              'url': target
            };

            if (window.location.hash && stateObject.url !== window.location.hash) {
              window.history.pushState(stateObject, document.title, window.location.pathname + target);
            } else {
              window.history.replaceState(stateObject, document.title, window.location.pathname + target);
            }
          }
        }
      }
    });
    /**
     * Показывает таб
     * @param  {string} tabId ID таба, который нужно показать
     */

    function showTab(tabId) {
      var element = document.querySelector(tabId);

      if (element && element.classList.contains('tabs__content-item')) {
        var tabsParent = document.querySelector(tabId).closest('.tabs');
        var btnTabDropdown = tabsParent.querySelector('.tabs__btn-dropdown');
        var activeTabClassName = 'tabs__link-wrap--active';
        var activeTabContentClassName = 'tabs__content-item--active'; // таб

        tabsParent.querySelectorAll('.' + activeTabClassName).forEach(function (item) {
          item.classList.remove(activeTabClassName);
        });
        var activeTab = tabsParent.querySelector('[href="' + tabId + '"]') ? tabsParent.querySelector('[href="' + tabId + '"]') : tabsParent.querySelector('[data-target="' + tabId + '"]'); // Если есть дропдаун кнопка

        if (btnTabDropdown) {
          var activeTabContent = activeTab.closest('.tabs__link-wrap').querySelector('a').textContent;
          btnTabDropdown.textContent = activeTabContent;
        }

        activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName); // контент таба

        tabsParent.querySelectorAll('.' + activeTabContentClassName).forEach(function (item) {
          item.classList.remove(activeTabContentClassName);
        });
        tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
      }
    } // Добавление метода .closest() (полифил, собственно)


    (function (e) {
      e.closest = e.closest || function (css) {
        var node = this;

        while (node) {
          if (node.matches(css)) return node;else node = node.parentElement;
        }

        return null;
      };
    })(Element.prototype);
  });

  /**
   Фенсибркс, отключение свойства граб
  */

  Fancybox.bind("[data-fancybox]", {
    dragToClose: false
  });
  /**
    Слайдер с авто шириной
   */

  const jsSliderAutoWidth = document.querySelectorAll('.js-slider-auto-width');
  jsSliderAutoWidth.forEach(item => {
    new Swiper(item, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      breakpoints: {
        1200: {
          spaceBetween: 24
        }
      },
      navigation: {
        nextEl: item.closest('.block-type').querySelector('.swiper-button-next'),
        prevEl: item.closest('.block-type').querySelector('.swiper-button-prev')
      }
    });
  });
  /**
   Маска телефона
   */

  new Inputmask({
    mask: "+7 (X99) 999-9999",
    definitions: {
      'X': {
        validator: "[1, 2, 3, 4, 5, 6, 9, 0]"
      }
    },
    showMaskOnHover: false
  }).mask(document.querySelectorAll("[type='tel']"));
  /**
   Авто скрол к нужному блоку
   */

  const jsScroll = document.querySelectorAll('.js-scroll');
  jsScroll.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      Fancybox.close("modal-menu");
      window.scroll({
        left: 0,
        top: document.querySelector(e.target.hash).offsetTop,
        behavior: 'smooth'
      });
    });
  });
  /**
   * @description таб фильтр
   */

  const btnFilter = document.querySelectorAll('[data-btn-filter]');
  btnFilter.forEach(item => {
    item.addEventListener('click', function (e) {
      const parents = this.closest('.filter-group');
      const nameActiveFilter = e.target.dataset.btnFilter;
      const swiper = parents.querySelector('.js-slider-auto-width').swiper;
      parents.querySelectorAll('[data-btn-filter]').forEach(item => item.classList.remove('active'));
      e.target.classList.add('active');
      parents.querySelectorAll(`[data-filter]`).forEach(item => item.classList.add('d-none'));
      parents.querySelectorAll(`[data-filter=${nameActiveFilter}]`).forEach(item => item.classList.remove("d-none"));
      swiper.update();
    });
  });
  const flickityObj = {
    accessibility: true,
    resize: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    percentPosition: true,
    setGallerySize: true
  };
  const jsElemMarqueeTop = document.querySelector('.js-slider-marquee-top');
  const jsSliderMarqueeTop = new Flickity(jsElemMarqueeTop, flickityObj);
  const jsSliderMarqueeBottom = new Flickity('.js-slider-marquee-bottom', flickityObj);
  let requestId = null; // Set initial position to be 0

  jsSliderMarqueeBottom.x = -1; // Main function that 'plays' the marquee.

  function play() {
    // Set the decrement of position x
    jsSliderMarqueeTop.x -= 0.4;
    jsSliderMarqueeBottom.x -= 0.55; // Settle position into the slider

    jsSliderMarqueeTop.settle(jsSliderMarqueeTop.x);
    jsSliderMarqueeBottom.settle(jsSliderMarqueeBottom.x); // Set the requestId to the local variable

    requestId = window.requestAnimationFrame(play);
  } // Start the marquee animation


  play();

})));
