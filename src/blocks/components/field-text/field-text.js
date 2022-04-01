const fieldDoc = document.querySelectorAll('.js-field');
const btnResetField = document.querySelectorAll('.field-text__btn-event');
const btnPassword = document.querySelectorAll('.field-text__btn-password');

function focus() {
  const input = this.querySelector('.field-text__input');

  if (input.value !== '') {
    this.classList.add('focus');
  } else {
    this.classList.remove('focus');
  }
}

function openEye() {
  const filed = this.closest('.field-text').querySelector('.field-text__input');
  this.classList.toggle('field-text__btn-password--open');

  if (this.classList.contains('field-text__btn-password--open')) {
    filed.type = 'text';
  } else {
    filed.type = 'password';
  }
}

function resetField() {
  this.closest('.field-text').querySelector('.field-text__input').value = '';
}

fieldDoc.forEach(item => {
  item.addEventListener('change', focus);
});
btnResetField.forEach(item => {
  item.addEventListener('click', resetField);
});
btnPassword.forEach(item => {
  item.addEventListener('click', openEye);
});
