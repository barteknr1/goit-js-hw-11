import axios from 'axios';
const input = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('#search-form')

const fetchImages = async (perPage, page) => {
    const q = input.value;
    const URL = 'https://pixabay.com/api/';

    try {
        const response = await axios.get(URL, {
            params: {
                key: '34988935-65ac090a375899987f778a290',
                q: q,
                image_type: 'photo',
                orientation: 'horizontal',
                safeSearch: true,
                per_page: perPage,
                page,
            }
        });
        return await response.data;
    } catch (err) {
        console.log(err);
    }
}

export default fetchImages;