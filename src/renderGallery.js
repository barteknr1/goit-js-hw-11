import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.photo-link', {
    captionDelay: 250,
    captionsData: 'alt',
});

const renderGallery = (photoArray) => {
    const galleryItem = photoArray.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `<a class="photo-link" href="${largeImageURL}">
                                <div class="photo-card">
                                    <img class="photo-img" src="${webformatURL}" data-source="${largeImageURL}" alt="${tags}" width=100% loading="lazy" />
                                    <div class="info">
                                        <p class="info-item">
                                            <b>Likes</b>
                                            ${likes}
                                        </p>
                                        <p class="info-item">
                                            <b>Views</b>
                                            ${views}
                                        </p>
                                        <p class="info-item">
                                            <b>Comments</b>
                                            ${comments}
                                        </p>
                                        <p class="info-item">
                                            <b>Downloads</b>
                                            ${downloads}
                                        </p>
                                    </div>
                                </div>
                            </a>`
    }).join('');
    gallery.insertAdjacentHTML('beforeend', galleryItem);
    lightbox.refresh();
}

export default renderGallery;