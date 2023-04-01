import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchBox.addEventListener("input", debounce(e => {
    fetchCountries(searchBox.value.trim())
        .then(data => {
            if (data.length > 10) {
                countryInfo.innerHTML = '';
                countryList.innerHTML = '';
                Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
            }
            if (data.length >= 2 && data.length <= 10) {
                countryInfo.innerHTML = '';
                countryList.innerHTML = '';
                [...data].forEach(item => {
                    let countryInList =
                        `<li class="country-list__item"><img class="country-flag" src="${item.flags.svg}" alt="${item.flags.alt}" width=40></img>
                        <p class="country-list__name"><b>${item.name.official}</b></p></li>`
                    countryList.innerHTML += countryInList;
                }
                )
            }
            if (data.length === 1) {
                countryInfo.innerHTML = '';
                countryList.innerHTML = '';
                countryInfo.innerHTML =
                    `<h2 class="country-info__name"><img src="${data[0].flags.svg}" alt="${data[0].flags.alt}" width=40></img>
                    ${data[0].name.official}</h2>
                    <p><b>Capital:</b> ${data[0].capital}</p>
                    <p><b>Population:</b> ${data[0].population}</p>
                    <p><b>Languages:</b> ${Object.values(data[0].languages).join(', ')}</p>`
            }
        })
        .catch(err => {
            console.log(err);
                Notiflix.Notify.failure(`Oops, there is no data with that name`)
        });
}, DEBOUNCE_DELAY));