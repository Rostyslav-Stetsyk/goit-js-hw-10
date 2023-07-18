import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";

const refs = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    err: document.querySelector('.error')
};

refs.loader.classList.add('visible')

fetchBreeds()
    .then(({ data }) => {
        const markup = data.map(createMarkupSelect).join('');
        refs.breedSelect.insertAdjacentHTML('beforeend', markup);
        new SlimSelect({ select: '.breed-select' });
    })
    .catch((err) => {
        Notify.warning(err.message)
    })
    .finally(() => {
        refs.loader.classList.remove('visible');
    })

refs.breedSelect.addEventListener('change', onChangeBreed)

function onChangeBreed(e) {
    const id = e.target.value;
    refs.loader.classList.add('visible');
    refs.catInfo.classList.remove('visible');

    fetchCatByBreed(id)
        .then(({ data }) => {
            const imgUrl = data[0].url;
            const catName = data[0].breeds[0].name;
            const catTemperament = data[0].breeds[0].temperament;
            const catDescription = data[0].breeds[0].description;

            const markup = createMarkupCatInfo(imgUrl, catName, catTemperament, catDescription);
            refs.catInfo.innerHTML = markup;
        })
        .catch((err) => {
            Notify.warning(err.message)
        })
        .finally(() => {
            refs.loader.classList.remove('visible');
            refs.catInfo.classList.add('visible');
        })
}

function createMarkupSelect({ id, name }) {
    return `<option value="${id}">${name}</option>`
};

function createMarkupCatInfo(img, name, temperament, description) {
    return `<img src="${img}" height="350px" alt="Cat ${name}">
<h2>${name}</h2>
<ul>
  <li>
    <p><span class='text-accent'>Temperament:&nbsp;</span>${temperament}</p>
  </li>
  <li>
    <p><span class='text-accent'>Description:&nbsp;</span>${description}</p>
  </li>
</ul>`
};