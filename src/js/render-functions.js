function renderGallery(image) {
    const gallery = document.querySelector(".gallery");
    const markup = image.map(image => {
        return `<div> class="gallery-item>
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
    const LoadMoreButton = document.querySelector(".load-more");
    LoadMoreButton.hidden = false;
};

function hiddenLoadMoreButton() {
    const LoadMoreButton = document.querySelector(".load-more");
    LoadMoreButton.hidden = true;
};


export {renderGallery, clearGallery, showLoadMoreButton, hiddenLoadMoreButton};