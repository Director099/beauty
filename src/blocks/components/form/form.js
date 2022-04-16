$('.js-form').each(function () {
  var validForm = new ValidateForm($(this));
});

function ValidateForm(elem) {
  var _this = this;

  _this.elem = elem;
  this.f = true;
  this.reg = {
    Password: /^[\S]{8,}$/,
    Email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  };

  elem.on('change', '[data-required=1]', function () {
    $(this).removeClass('error');
  });

  elem.on('input', '[data-required=1]', function () {
    if (!_this.addInvalid()) {
      elem.find('.form__warning').removeClass('d-none');
    }
  });

  this.addInvalid = function (elem) {
    var parentElem = $(elem).closest('.field-text');
    parentElem.removeClass('valid');
    parentElem.addClass('error');
    _this.f = false;
  };

  this.addValid = function (elem) {
    var parentElem = $(elem).closest('.field-text');
    var parentCheckbox = $(elem).closest('.field-checkbox');
    parentElem.addClass('valid');
    parentElem.removeClass('error');
    parentCheckbox.removeClass('error');
  };

  this.isValid = function () {
    _this.f = true;

    _this.elem.find('[data-required=1]').each(function (i, elem) {
      if ($(this).val() == '') {
        _this.addInvalid(elem);

      } else if ($(this).attr('type') == 'checkbox' && !$(this).prop('checked')) {
        $(this).closest('.field-checkbox').addClass('error');
        _this.f = false;
      } else {
        _this.addValid(elem);
      }

      if (elem.classList.contains('js-calendar')) {
        const calendar = new Inputmask("99.99.9999", {
          alias: "datetime",
          placeholder: "",
          inputFormat: "dd.mm.yyyy",
          insertMode: false,
          showMaskOnHover: false,
          jitMasking: true
        }).mask(document.querySelectorAll(".js-calendar"));

        if (!calendar.isComplete()) {
          _this.addInvalid(elem);
        }
      }

      if (elem.type == 'tel') {
        const tel = new Inputmask({
          mask: "+7 (999) 999 99 99",
          showMaskOnHover: false
        }).mask(document.querySelectorAll("[type='tel']"));

        // if (!tel.isComplete()) {
        //   _this.addInvalid(elem);
        // }
      }

      if ($(this).data('type') == "password") {
        var value = $(this).val();

        if ($(this).hasClass('js-check')) {
          if (value !== $('.js-input-elem').val()) {
            _this.addInvalid(elem);
          }
        }

        if (_this.reg.Password.test(value) == false) {
          _this.addInvalid(elem);
        }
      }

      if ($(this).attr('type') == 'file') {
        _this.f = true;
      }

      if ($(this).data('type') == "email") {
        var value = $(this).val();

        if (_this.reg.Email.test(value) == false) {
          _this.addInvalid(elem);
        }
      }
    });

    return _this.f;
  };
}

$(".js-form").on("submit", function (e) {
  var validForm = new ValidateForm($(this));

  if (validForm.isValid()) {
    return true;
  }

  return false;
});
