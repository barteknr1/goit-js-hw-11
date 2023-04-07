import './css/styles.css';
import Notiflix from 'notiflix';
import fetchImages from './js/fetchImages';
import renderGallery from './js/renderGallery';

const input = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let page
const perPage = 40;

const getImages = async (e) => {
    try {
        e.preventDefault();
        page = 1;
        const q = input.value;
        const photos = await fetchImages(perPage, page);
        const { totalHits: photosQuantity, hits: photoArray } = photos;
        if (!photoArray.length || !q) {
            loadMoreButton.style.visibility = 'hidden';
            gallery.innerHTML = '';
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
        }
        else {
            Notiflix.Notify.success(`Hooray! We found ${photosQuantity} images.`);
            gallery.innerHTML = '';
            renderGallery(photoArray);
            loadMoreButton.style.visibility = 'visible';
            if (photosQuantity <= perPage) {
                loadMoreButton.style.visibility = 'hidden';  
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

searchForm.addEventListener('submit', getImages);

const loadMore = async () => {
    try {
        page++;
        const photos = await fetchImages(perPage, page);
        const { totalHits: photosQuantity, hits: photoArray } = photos;
        renderGallery(photoArray);
        const actualNumberOfImages = page * perPage;
        if (actualNumberOfImages > photosQuantity) {
            Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
            loadMoreButton.style.visibility = 'hidden';
        }
    }
    catch (err) {
        console.log(err);
    }
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
loadMoreButton.addEventListener('click', loadMore);