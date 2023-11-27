// main.js

import { fetchData, filterData, renderMovieList } from 'js/MovieModule.js';


async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    const data = await fetchData();
    const filteredData = filterData(data, category);
    renderMovieList(filteredData);
}

window.onload = main;
