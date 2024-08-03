export function renderImages(images) {
    const list = document.querySelector('.articles');
    const markup = images
        .map(
            img => `
            <li>
                <img src="${img.webformatURL}" alt="${img.tags}" />
                <a href="${img.largeImageURL}" target="_blank">View</a>
            </li>`
        )
        .join('');
    list.insertAdjacentHTML('beforeend', markup);
}

export function showLoadMoreButton() {
    const button = document.querySelector('.button');
    button.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
    const button = document.querySelector('.button');
    button.classList.add('is-hidden');
}

export function showEndOfCollectionMessage() {
    iziToast.info({
        title: 'No more results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
    });
}