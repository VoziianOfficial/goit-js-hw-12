import { fetchImages } from "./js/pixabay-api";
import { renderGallery, clearGallery } from "./js/render-functions";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
const perPage = 25;
const maxPages = 10;
let currentQuery = '';
let totalHits = 0;

const searchInput = document.querySelector('[data-search]');
const searchButton = document.querySelector('[data-search-button]');
const loadMoreButton = document.querySelector('.load-more');

searchButton.addEventListener('click', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  currentQuery = searchInput.value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  const data = await fetchImages(currentQuery, currentPage, perPage);
  totalHits = data.totalHits;

  if (data.hits.length === 0) {
    alert('No images found. Please try again.');
    return;
  }

  renderGallery(data.hits);
  new SimpleLightbox('.gallery a').refresh();

  if (data.hits.length === perPage && currentPage < maxPages) {
    showLoadMoreButton();
  } else if (currentPage * perPage >= totalHits) {
    hideLoadMoreButton();
    alert("We're sorry, but you've reached the end of search results.");
  }
}

async function onLoadMore() {
  if (currentPage >= maxPages) {
    hideLoadMoreButton();
    alert("You've reached the maximum number of pages.");
    return;
  }

  currentPage += 1;

  const data = await fetchImages(currentQuery, currentPage, perPage);
  renderGallery(data.hits);
  new SimpleLightbox('.gallery a').refresh();

  if (currentPage * perPage >= totalHits) {
    hideLoadMoreButton();
    alert("We're sorry, but you've reached the end of search results.");
  } else if (data.hits.length < perPage) {
    hideLoadMoreButton();
    alert("We're sorry, but you've reached the end of search results.");
  }
}

function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}