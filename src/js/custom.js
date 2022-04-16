'use strict';
import '../blocks/components/tabs/tabs.js';
import '../blocks/components/form/form.js';

/**
 Фенсибркс, отключение свойства граб
*/
Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
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
        spaceBetween: 24,
      }
    },
    navigation: {
      nextEl: item.closest('.block-type').querySelector('.swiper-button-next'),
      prevEl: item.closest('.block-type').querySelector('.swiper-button-prev'),
    },
  });
})

/**
 Маска телефона
 */
new Inputmask({
  mask: "+7 (X99) 999-9999",
  definitions: {
    'X': {
      validator: "[1, 2, 3, 4, 5, 6, 9, 0]",
    },
  },
  showMaskOnHover: false
}).mask(document.querySelectorAll("[type='tel']"));

/**
 Авто скрол к нужному блоку
 */
const jsScroll = document.querySelectorAll('.js-scroll');
jsScroll.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    Fancybox.close("modal-menu");
    window.scroll({
      left: 0,
      top: document.querySelector(e.target.hash).offsetTop,
      behavior: 'smooth'
    })
  })
});

/**
 * @description таб фильтр
 */
const btnFilter = document.querySelectorAll('[data-btn-filter]');
btnFilter.forEach((item) => {
  item.addEventListener('click', function(e) {
    const parents = this.closest('.filter-group');
    const nameActiveFilter = e.target.dataset.btnFilter;
    const swiper = parents.querySelector('.js-slider-auto-width').swiper;

    parents.querySelectorAll('[data-btn-filter]').forEach((item) => item.classList.remove('active'));
    e.target.classList.add('active');

    parents.querySelectorAll(`[data-filter]`).forEach(item => item.classList.add('d-none'));
    parents.querySelectorAll(`[data-filter=${nameActiveFilter}]`).forEach(item => item.classList.remove("d-none"));
    swiper.update();
  })
});

const flickityObj = {
  accessibility: true,
  resize: true,
  wrapAround: true,
  prevNextButtons: false,
  pageDots: false,
  percentPosition: true,
  setGallerySize: true,
};
const jsElemMarqueeTop = document.querySelector('.js-slider-marquee-top');
const jsSliderMarqueeTop = new Flickity(jsElemMarqueeTop, flickityObj);
const jsSliderMarqueeBottom = new Flickity('.js-slider-marquee-bottom', flickityObj);
let requestId = null;

// Set initial position to be 0
jsSliderMarqueeBottom.x = -1;

// Main function that 'plays' the marquee.
function play() {
  // Set the decrement of position x
  jsSliderMarqueeTop.x -= 0.4;
  jsSliderMarqueeBottom.x -= 0.55;

  // Settle position into the slider
  jsSliderMarqueeTop.settle(jsSliderMarqueeTop.x);
  jsSliderMarqueeBottom.settle(jsSliderMarqueeBottom.x);

  // Set the requestId to the local variable
  requestId = window.requestAnimationFrame(play);
}

// Start the marquee animation
play();

