'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

let renderCountry = function (data) {
  console.log(data);

  const lang = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `
    <article class="country">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${lang}</p>
        <p class="country__row"><span>💰</span>${currency}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData1 = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', () => {
    const [data] = JSON.parse(request.responseText);
    renderCountry(data);
  });
};

const getCountryData2 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json(),
      err => console.log(err)
    )
    .then(
      data => renderCountry(data[0]),
      err => console.log(err)
    );
};

const getCountryData3 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(err));
};

const getCountryData4 = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = (await res.json())[0];
    renderCountry(data);
  } catch (err) {
    console.log(err);
  }
};

const get3capitals = async function (c1, c2, c3) {
  const data = await Promise.all([
    await (await fetch(`https://restcountries.com/v3.1/name/${c1}`)).json(),
    await (await fetch(`https://restcountries.com/v3.1/name/${c2}`)).json(),
    await (await fetch(`https://restcountries.com/v3.1/name/${c3}`)).json(),
  ]);
  const capitals = data.map(el => el[0].capital[0]);
  console.log(capitals);
};

get3capitals('egypt', 'syria', 'morocco');

getCountryData2('egypt');
getCountryData3('syria');
getCountryData4('morocco');
