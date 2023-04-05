import './css/styles.css';
import Notiflix from 'notiflix';
import fetchImages from './fetch';
import renderGallery from './renderGallery';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let page
const perPage = 40;

const getImages = async (e) => {
    try {
        e.preventDefault();
        page = 1;
        const photos = await fetchImages(perPage, page);
        const { totalHits: photosQuantity, hits: photoArray } = photos;
        if (!photoArray.length) {
            gallery.innerHTML = '';
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
        }
        else {
    Notiflix.Notify.success(`Hooray! We found ${photosQuantity} images.`);
    gallery.innerHTML = '';
    renderGallery(photoArray);
        }
    }
    catch (err) {
        console.log(err);
    }
}

searchForm.addEventListener('submit', getImages);

const loadMore = async () => {
    try {
        page++;
        const photos = await fetchImages(perPage, page);
        const { totalHits: photosQuantity, hits: photoArray } = photos;
        // const limitPages = photosQuantity / perPage;
        renderGallery(photoArray);
    }
    catch (err) {
        console.log(err);
    }
}
loadMoreButton.addEventListener('click', loadMore);
// code spell checker