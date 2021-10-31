'use strict';
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'imagz/close.png',
  },

  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    // console.log(this.settings)
    document.querySelector(this.settings.previewSelector)
      .addEventListener('click', (event) => this.containerClickHandler(event));
  },

  containerClickHandler(event) {
    // console.log(event.target);
    // event.stopPropagation();
    // event.preventDefault();
    // console.log(event.currentTarget);
    if (event.target.tagName !== 'IMG') return;
    this.openImage(event.target.dataset.full_image_url);
  },

  openImage(src) {
    this.getScreenContainer()
      .querySelector(`.${this.settings.openedImageClass}`).src = src;
  },

  getScreenContainer() {
    return this.createScreenContainer();
  },

  createScreenContainer() {
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    galleryWrapperElement.appendChild(closeImageElement);
    closeImageElement.addEventListener('click', () => this.close());

    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    document.body.appendChild(galleryWrapperElement);

    return galleryWrapperElement;
  },

  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  },
};

gallery.init({
  previewSelector: '.galleryPreviewsContainer'
});

