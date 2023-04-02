import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const input = document.querySelector('input');
const button = document.querySelector('button');
const searchForm = document.querySelector('#search-form')

const API_KEY = '34988935-65ac090a375899987f778a290';
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let q = input.value;
    console.log(q);
});

// https://pixabay.com/api/?key=34988935-65ac090a375899987f778a290&q=yellow+flowers&image_type=photo

// const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });