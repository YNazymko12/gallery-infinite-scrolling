import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchImages } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

let currentPage = 1;
const perPage = 15;
let searchedValue = '';

let lightbox = new SimpleLightbox('.js-gallery a');

const toggleLoader = () => {
  loaderEl.classList.toggle('is-hidden');
};

const hideLoadMoreBtn = () => {
  loadMoreBtnEl.classList.add('is-hidden');
};

const showLoadMoreBtn = () => {
  loadMoreBtnEl.classList.remove('is-hidden');
};

const showError = message => {
  iziToast.error({
    message: message,
    position: 'topRight',
    maxWidth: 400,
  });
};

const smoothScrollByHeight = () => {
  const galleryCard = document.querySelector('.js-gallery .gallery-card');
  if (galleryCard) {
    const cardHeight = galleryCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    searchedValue = searchFormEl.elements.user_query.value.trim();
    if (searchedValue === '') {
      return;
    }
    galleryEl.innerHTML = '';
    hideLoadMoreBtn();
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

    if (response.data.totalHits > 15) {
      showLoadMoreBtn();
    }

    lightbox.refresh();
    searchFormEl.reset();
  } catch (error) {
    console.log(error);
    showError(`${error}`);
  } finally {
    toggleLoader();
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage += 1;
    hideLoadMoreBtn();
    toggleLoader();

    const response = await fetchImages(searchedValue, currentPage, perPage);

    const galleryMarkup = response.data.hits
      .map(imgDetails => createGalleryCard(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

    smoothScrollByHeight();
    lightbox.refresh();

    const totalPages = Math.ceil(response.data.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreBtn();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        maxWidth: 400,
      });
    }
  } catch (error) {
    console.log(error);
    showError(`${error}`);
  } finally {
    toggleLoader();
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
