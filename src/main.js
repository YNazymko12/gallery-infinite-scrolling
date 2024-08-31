import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchImages } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';
import { root } from 'postcss';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const observerdEl = document.querySelector('.js-observerd-element');

let currentPage = 1;
const perPage = 15;
let searchedValue = '';

let lightbox = new SimpleLightbox('.js-gallery a');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px 400px 0px',
  threshold: 1,
};

const observerCallBack = async entries => {
  console.log(entries);
  if (entries[0].isIntersecting) {
    try {
      currentPage += 1;
      const response = await fetchImages(searchedValue, currentPage, perPage);
      const galleryMarkup = response.data.hits
        .map(imgDetails => createGalleryCard(imgDetails))
        .join('');
      galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
      // smoothScrollByHeight();
      lightbox.refresh();
    } catch (error) {
      console.log(error);
      showError(`${error}`);
    }
  }
};

const observer = new IntersectionObserver(observerCallBack, observerOptions);

const toggleLoader = () => {
  loaderEl.classList.toggle('is-hidden');
};

const showError = message => {
  iziToast.error({
    message: message,
    position: 'topRight',
    maxWidth: 400,
  });
};

// const smoothScrollByHeight = () => {
//   const galleryCard = document.querySelector('.js-gallery .gallery-card');
//   if (galleryCard) {
//     const cardHeight = galleryCard.getBoundingClientRect().height;
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   }
// };

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    searchedValue = searchFormEl.elements.user_query.value.trim();
    if (searchedValue === '') {
      return;
    }
    galleryEl.innerHTML = '';
    toggleLoader();
    currentPage = 1;

    const response = await fetchImages(searchedValue, currentPage, perPage);

    if (response.data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    const galleryMarkup = response.data.hits
      .map(imgDetails => createGalleryCard(imgDetails))
      .join('');

    galleryEl.innerHTML = galleryMarkup;

    observer.observe(observerdEl);
    lightbox.refresh();
    searchFormEl.reset();
  } catch (error) {
    console.log(error);
    showError(`${error}`);
  } finally {
    toggleLoader();
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
