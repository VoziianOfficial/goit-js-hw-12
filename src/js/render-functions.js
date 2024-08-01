function renderGallery(images) {
    const gallery = document.querySelector(".gallery");
    const markup = images.map(image => {
        return `<div class="gallery-item">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"></img>
            </a>
        </div>`;
    }).join("");
    gallery.insertAdjacentHTML("beforeend", markup);
}

function clearGallery() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
}

function showLoadMoreButton() {
    const loadMoreButton = document.querySelector(".load-more");
    loadMoreButton.hidden = false;
}

function hideLoadMoreButton() {
    const loadMoreButton = document.querySelector(".load-more");
    loadMoreButton.hidden = true;
}

export { renderGallery, clearGallery, showLoadMoreButton, hideLoadMoreButton };