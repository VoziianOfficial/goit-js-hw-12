import { fetchImages } from './pixabay-api';
import { renderGallery, clearGallery, showLoadMoreButton, hideLoadMoreButton } from './render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';

const searchInput = document.querySelector('[data-search]');
const searchButton = document.querySelector('[data-search-button]');
const loadMoreButton = document.querySelector('.load-more');

searchButton.addEventListener('click', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault(); // Запобігає перезавантаженню сторінки при натисканні на кнопку пошуку

  currentQuery = searchInput.value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  const data = await fetchImages(currentQuery, currentPage);
  if (data.hits.length === 0) {
    alert('No images found. Please try again.');
    return;
  }

  renderGallery(data.hits);
  new SimpleLightbox('.gallery a').refresh();

  if (data.hits.length === 15) {
    showLoadMoreButton();
  }
}

async function onLoadMore() {
  currentPage += 1;

  const data = await fetchImages(currentQuery, currentPage);
  renderGallery(data.hits);
  new SimpleLightbox('.gallery a').refresh();

  if (data.hits.length < 15 || currentPage * 15 >= data.totalHits) {
    hideLoadMoreButton();
    alert("We're sorry, but you've reached the end of search results.");
  }
}