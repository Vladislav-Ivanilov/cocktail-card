export class Select {
  constructor(selector, options) {
    this.el = document.querySelector(selector);
    this.options = options;
    this.placeholder = 'A';
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.el.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === 'input' || type === 'svg') {
      this.toggle();
    }
  }

  //changePlaceholder(placeholder = 'A') {
  //  this.el.firstChild.nextSibling.firstChild.textContent = placeholder;
  //}

  isOpen() {
    return this.el.classList.contains('open');
  }

  toggle() {
    return this.isOpen() ? this.close() : this.open();
  }

  open() {
    this.el.classList.add('open');
  }

  close() {
    this.el.classList.remove('open');
  }

  destroy() {
    this.el.removeEventListener('click', this.clickHandler);
  }
}
