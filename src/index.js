import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('input');
const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery');

const axios = require('axios');
// let page = 1;
// &page=${page}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value;
    fetch(`https://pixabay.com/api/?key=34988935-65ac090a375899987f778a290&q=${q}&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            const dataArray = data.hits;
            if (!data.total || !q) {
                gallery.innerHTML = '';
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
            }
            else {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
                gallery.innerHTML = '';
                console.log(dataArray),
                    [...dataArray].forEach(item => {
                        const galleryItem =
                            `<div class="photo-card">
                                <a class="photo-link" href="${item.largeImageURL}">
                                    <img class="photo-img" src="${item.webformatURL}" data-source="${item.largeImageURL}" alt="${item.tags}" width=100% loading="lazy" />
                                    <div class="info">
                                        <p class="info-item">
                                            <b>Likes</b>
                                            ${item.likes}
                                        </p>
                                        <p class="info-item">
                                            <b>Views</b>
                                            ${item.views}
                                        </p>
                                        <p class="info-item">
                                            <b>Comments</b>
                                            ${item.comments}
                                        </p>
                                        <p class="info-item">
                                            <b>Downloads</b>
                                            ${item.downloads}
                                        </p>
                                    </div>
                                </a>
                            </div>`
                        gallery.insertAdjacentHTML('beforeend', galleryItem);
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })
});

var lightbox = new SimpleLightbox('.photo-link', { 
    captionDelay: 250,
    captionsData: 'alt',
});