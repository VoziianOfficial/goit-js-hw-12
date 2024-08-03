import { fetchImages } from './js/pixabay-api';
import { renderImages, showLoadMoreButton, hideLoadMoreButton, showEndOfCollectionMessage } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/izitoast.css';

let currentPage = 1;
let currentQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-inline');
    const loadMoreButton = document.querySelector('[data-action="load-more"]');
    const loaderDiv = document.querySelector('.loader-div');
    const articlesList = document.querySelector('.articles');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        currentQuery = e.target.query.value.trim();
        if (!currentQuery) return;

        currentPage = 1;
        articlesList.innerHTML = ''; // Clear previous results
        loaderDiv.style.display = 'none'; // Hide loader initially

        try {
            const data = await fetchImages(currentQuery, currentPage);
            if (data.totalHits > 0) {
                renderImages(data.hits);
                currentPage++;
                showLoadMoreButton();
                if (data.totalHits <= 15) {
                    hideLoadMoreButton();
                }
            } else {
                hideLoadMoreButton();
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong while fetching images.',
                position: 'topRight',
            });
        }
    });

    loadMoreButton.addEventListener('click', async () => {
        loadMoreButton.disabled = true;
        loaderDiv.style.display = 'flex'; // Show loader when fetching more images

        try {
            const data = await fetchImages(currentQuery, currentPage);
            if (data.hits.length > 0) {
                renderImages(data.hits);
                currentPage++;
                if (data.totalHits <= currentPage * 15) {
                    hideLoadMoreButton();
                    showEndOfCollectionMessage();
                }
            } else {
                hideLoadMoreButton();
            }
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong while fetching images.',
                position: 'topRight',
            });
        } finally {
            loaderDiv.style.display = 'none'; // Hide loader when done
            loadMoreButton.disabled = false;
            smoothScroll();
        }
    });

    function smoothScroll() {
        const cardHeight = document.querySelector('.articles li').getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    }
});


