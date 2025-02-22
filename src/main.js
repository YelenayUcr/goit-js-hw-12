import './js/init';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';

const API_KEY = '48307401-677547b5d41e0bab8fbb923eb';
const baseUrl = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
});

let totalHits = 0;
const message1 = "Sorry, there are no images matching your search query. Please, try again!";
const message2 = "We're sorry, but you've reached the end of search results";
const contentUL = document.querySelector('.image-content');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more-button');

const lightbox = new SimpleLightbox('.content-list-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function scrollPage() {
  let listItems = document.querySelector('.content-list-item');
  if (listItems) {
    let rect = listItems.getBoundingClientRect();
    window.scrollBy({ top: rect.height * 2, behavior: 'smooth' });
  }
}

function showError(errorMessage, bgcolor) {
  iziToast.settings({
    timeout: 5000,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
  });
  iziToast.show({
    maxWidth: '350px',
    message: `${errorMessage}`,
    position: 'topRight',
    backgroundColor: `${bgcolor}`,
  });
}

function createMarkup(jsonData) {
  const contentMarkup = jsonData.hits
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="content-list-item">
            <div class="container-div">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" width="240" height="200">
                </a>
                <div class="content-bottom">
                    <div class="content-bottom-inner">
                        <p><b>Likes</b></p>
                        <p class="stats">${likes}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Views</b></p>
                        <p class="stats">${views}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Comments</b></p>
                        <p class="stats">${comments}</p></div>
                    <div class="content-bottom-inner">
                        <p><b>Downloads</b></p>
                        <p class="stats">${downloads}</p></div>
                </div> 
            </div> 
        </li>`
    )
    .join('');

  contentUL.insertAdjacentHTML('beforeend', contentMarkup);
  lightbox.refresh();
}

async function getData() {
  try {
    const response = await axios.get(baseUrl, { params: searchParams });
    loader.style.display = 'none';
    loadMore.style.display = 'none';
    totalHits = response.data.totalHits;
    if (totalHits === 0) {
      showError(message1, 'red');
    } else {
      createMarkup(response.data);

      const currentPage = Number(searchParams.get('page'));
      const perPage = Number(searchParams.get('per_page'));

      if (currentPage < Math.ceil(totalHits / perPage)) {
        loadMore.style.display = 'block';
      }
      if (Math.ceil(totalHits / perPage) === 1) {
        showError(message2, 'aqua');
      }
    }
  } catch (error) {
    loader.style.display = 'none';
    showError(error.message, 'purple');
  }
}

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchParams.set('q', searchInput.value);
  searchParams.set('page', '1');
  contentUL.innerHTML = '';
  loader.style.display = 'flex';
  getData();
});

loadMore.addEventListener('click', async () => {
  let currentPage = Number(searchParams.get('page'));
  let perPage = searchParams.get('per_page');
  searchParams.set('page', currentPage + 1);

  await getData();
  scrollPage();

  if (currentPage + 1 >= Math.ceil(totalHits / perPage)) {
    showError(message2, 'aqua');
    loadMore.style.display = 'none';
  }
});
