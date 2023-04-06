import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.photo-link', {
    captionDelay: 250,
    captionsData: 'alt',
});

const renderGallery = (photoArray) => {
    const galleryItem = photoArray.map((img) => {
        return `<a class="photo-link" href="${img.largeImageURL}">
                                <div class="photo-card">
                                    <img class="photo-img" src="${img.webformatURL}" data-source="${img.largeImageURL}" alt="${img.tags}" width=100% loading="lazy" />
                                    <div class="info">
                                        <p class="info-item">
                                            <b>Likes</b>
                                            ${img.likes}
                                        </p>
                                        <p class="info-item">
                                            <b>Views</b>
                                            ${img.views}
                                        </p>
                                        <p class="info-item">
                                            <b>Comments</b>
                                            ${img.comments}
                                        </p>
                                        <p class="info-item">
                                            <b>Downloads</b>
                                            ${img.downloads}
                                        </p>
                                    </div>
                                </div>
                            </a>`
    }).join('');
    gallery.insertAdjacentHTML('beforeend', galleryItem);
    lightbox.refresh();
}

export default renderGallery;