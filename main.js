const spinner = document.querySelector(".spinner-border");
const cykelAnchor = document.getElementById("cykel-anchor");
const numOfBikeStations = document.getElementById("num-of-stations");
const cityCountry = document.getElementById("city-country");
const exampleMapText = document.getElementById("example-map");
const exploreBtn = document.querySelector(".explore-btn");
const citySelect = document.getElementById("city-select");
const countrySelect = document.getElementById("country-select");
const form = document.getElementById("location-form");
const selectCountry = document.getElementById("country-select");
const container = document.querySelector(".container");
const stationCards = document.getElementById("station-cards");
const cardsShown = 20;
let worldData = [];
let city = [];
let country = [];

getAllBike();

cykelAnchor.addEventListener("click", function () {
  numOfBikeStations.textContent = "";
  cityCountry.textContent = "Get out and bike in your favorite city";
  map.setCenter(sf);
  map.setZoom(11);
  removeCards();
  removeNav(document.querySelector(".nav"));
  form.reset();
  exploreBtn.textContent = "Explore";
  exampleMapText.classList.remove("d-none");
});

selectCountry.addEventListener("change", function () {
  const countryName = event.target.value;
  createCitySelectTags(getCity(countryLong[countryName]));
});

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const countrySelect = formData.get("country-select");
  const citySelect = formData.get("city-select");
  const countryCode = countryLong[countrySelect];
  removeCards();
  removeNav(document.querySelector(".nav"));
  getBike(countrySelect, countryCode, citySelect);
}

// Google Maps API
let map;
var sf = { lat: 37.7946, lng: -122.3999 };
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: sf,
  });
}

function getAllBike() {
  $.ajax({
    method: "GET",
    url: "https://api.citybik.es/v2/networks",
    success: function (data) {
      worldData = data;
      for (let i = 0; i < worldData.networks.length; i++) {
        city.push(worldData.networks[i].location.city);
        country.push(worldData.networks[i].location.country);
      }

      city = [...new Set(city)];
      country = [...new Set(country)];

      createCitySelectTags(city);
      createCountrySelectTags(country);
      for (let i = 0; i < data.networks.length; i++) {
        if (data.networks[i].location.city === "San Francisco Bay Area, CA") {
          $.ajax({
            method: "GET",
            url: "https://api.citybik.es" + data.networks[i].href,
            success: function (data) {
              for (let j = 0; j < data.network.stations.length; j++) {
                const marker = new google.maps.Marker({
                  position: {
                    lat: data.network.stations[j].latitude,
                    lng: data.network.stations[j].longitude,
                  },
                });
                marker.setMap(map);
                map.setZoom(11);
              }
              spinner.classList.add("d-none");
            },
            error: function (err) {
              console.log(err);
              $("#myModal").modal("toggle");
              spinner.classList.add("d-none");
            },
          });
        }
      }
    },

    error: function (err) {
      console.log(err);
      $("#myModal").modal("toggle");
      spinner.classList.add("d-none");
    },
  });
}

function getBike(country, countryCode, city) {
  $.ajax({
    method: "GET",
    url: "https://api.citybik.es/v2/networks",
    beforeSend: function () {
      spinner.classList.remove("d-none");
    },
    success: function (data) {
      let totalStations = 0;
      exampleMapText.classList.add("d-none");
      const regionData = [];

      for (let i = 0; i < data.networks.length; i++) {
        if (
          data.networks[i].location.city.includes(city) &&
          data.networks[i].location.country.includes(countryCode)
        ) {
          regionData.push(data.networks[i]);
        }
      }

      if (regionData.length != 0) {
        let totalLat = 0;
        let totalLng = 0;
        for (let i = 0; i < regionData.length; i++) {
          totalLat += regionData[i].location.latitude;
          totalLng += regionData[i].location.longitude;
        }

        map.setCenter({
          lat: totalLat / regionData.length,
          lng: totalLng / regionData.length,
        });
      }

      for (let i = 0; i < regionData.length; i++) {
        $.ajax({
          method: "GET",
          url: "https://api.citybik.es" + regionData[i].href,
          success: function (data) {
            totalStations += data.network.stations.length;
            numOfBikeStations.textContent =
              totalStations + " Bike Stations in ";
            cityCountry.textContent = city + ", " + country;

            for (let j = 0; j < data.network.stations.length; j++) {
              const marker = new google.maps.Marker({
                position: {
                  lat: data.network.stations[j].latitude,
                  lng: data.network.stations[j].longitude,
                },
              });

              if (!data.network.stations[j].extra.ebikes) {
                var ebikeData = 0;
              } else {
                ebikeData = data.network.stations[j].extra.ebikes;
              }

              if (!data.network.stations[j].empty_slots) {
                var emptySlotsData = 0;
              } else {
                emptySlotsData = data.network.stations[j].empty_slots;
              }

              var content =
                "<h5>" +
                data.network.stations[j].name +
                "</h5>" +
                "<div><h6>Available Bikes: " +
                emptySlotsData +
                "</h6></div>" +
                "<div><h6>" +
                "Available E-Bikes: " +
                ebikeData +
                "</h6></div>";

              var infowindow = new google.maps.InfoWindow();

              google.maps.event.addListener(
                marker,
                "click",
                (function (content) {
                  return function () {
                    infowindow.setContent(content);
                    infowindow.open(map, this);
                  };
                })(content)
              );

              marker.setMap(map);

              const stationName = data.network.stations[j].name;
              let availableBikes = data.network.stations[j].empty_slots;
              let eBikes = data.network.stations[j].extra.ebikes;

              if (!availableBikes) {
                availableBikes = 0;
              }

              if (!eBikes) {
                eBikes = 0;
              }

              stationCards.appendChild(
                createStationCard(
                  stationName,
                  availableBikes,
                  eBikes,
                  country,
                  city
                )
              );
            }
            map.setZoom(14);
            clearPageNav();
            if (totalStations !== 0) {
              container.appendChild(pageCards());
            }

            shortenPageDisplay(0, totalStations / cardsShown);
            spinner.classList.add("d-none");
          },
          error: function (err) {
            console.log(err);
            $("#myModal").modal("toggle");
            spinner.classList.add("d-none");
          },
        });
      }
      exploreBtn.textContent = "Explore Another Location";
    },
    error: function (err) {
      console.log(err);
      $("#myModal").modal("toggle");
      spinner.classList.add("d-none");
    },
  });
}

function getCity(countryCode) {
  let filteredCity = [];
  worldData.networks
    .filter((data) => data.location.country === countryCode)
    .forEach((elm) => filteredCity.push(elm.location.city));
  return filteredCity;
}

function resetSelectTags(select) {
  while (select.firstElementChild) {
    select.remove(select.firstElementChild);
  }
}

function createCitySelectTags(cities) {
  resetSelectTags(citySelect);
  cities = cities.sort();
  var firstOptionTag = document.createElement("option");
  firstOptionTag.value = "";
  firstOptionTag.textContent = "List of Cities";
  citySelect.appendChild(firstOptionTag);

  for (var i = 0; i < cities.length; i++) {
    var option = document.createElement("option");
    option.value = cities[i];
    option.textContent = cities[i];
    citySelect.appendChild(option);
  }
}

function createCountrySelectTags(countries) {
  for (let i = 0; i < countries.length; i++) {
    countries[i] = countryShort[countries[i]];
  }
  countries = countries.sort();
  for (let i = 0; i < countries.length; i++) {
    var option = document.createElement("option");
    option.value = countries[i];
    option.textContent = countries[i];
    countrySelect.appendChild(option);
  }
}

function removeCards() {
  document.getElementById("station-cards").innerHTML = "";
}

function removeNav(nav) {
  if (nav) nav.remove();
}

function createStationCard(stationName, availableBikes, eBikes, country, city) {
  const card = document.createElement("div");
  const stationNameDiv = document.createElement("div");
  const cityDiv = document.createElement("div");
  const countryDiv = document.createElement("div");
  const bikeDataDiv = document.createElement("div");
  const bikeDiv = document.createElement("div");
  const eBikeDiv = document.createElement("div");
  const bikeSpan = document.createElement("span");
  const eBikeSpan = document.createElement("span");

  card.classList.add("card");
  card.classList.add("mb-3", "p-2", "text-center");
  stationNameDiv.classList.add("font-weight-bold");
  stationNameDiv.textContent = stationName;
  cityDiv.textContent = city;
  countryDiv.textContent = country;
  bikeSpan.textContent = availableBikes;
  eBikeSpan.textContent = eBikes;
  bikeDiv.textContent = "Available Bikes: ";
  bikeDiv.appendChild(bikeSpan);
  eBikeDiv.textContent = "Available E-Bikes: ";
  eBikeDiv.appendChild(eBikeSpan);
  bikeDataDiv.append(bikeDiv, eBikeDiv);

  card.append(stationNameDiv, cityDiv, countryDiv, bikeDataDiv);
  return card;
}

function pageCards() {
  const nav = document.createElement("ul");
  nav.classList.add("nav", "justify-content-center", "mb-3", "nav-numbers");

  const cardsTotal = document.querySelectorAll(".card").length;
  const numPages = cardsTotal / cardsShown;

  for (let i = 0; i < numPages; i++) {
    let pageNum = i + 1;
    let listTag = document.createElement("li");
    listTag.classList.add("nav-item");
    let anchorTag = document.createElement("a");
    anchorTag.classList.add("nav-link");
    anchorTag.href = "#";
    anchorTag.rel = i;
    anchorTag.textContent = pageNum;
    listTag.appendChild(anchorTag);
    nav.appendChild(listTag);
  }

  [...stationCards.children].forEach((div) => div.classList.add("d-none"));

  [...stationCards.children]
    .slice(0, cardsShown)
    .forEach((div) => div.classList.remove("d-none"));

  nav.firstElementChild.firstElementChild.classList.add("active");

  [...nav.children].forEach((aTag) =>
    aTag.addEventListener("click", function () {
      document.querySelector("a.active").classList.remove("active");
      event.target.classList.add("active");

      let currPage = event.target.attributes.rel.value;
      let startRow = currPage * cardsShown;
      let endRow = startRow + cardsShown;

      shortenPageDisplay(currPage, numPages);

      [...stationCards.children].forEach((div) => div.classList.add("d-none"));

      [...stationCards.children]
        .slice(startRow, endRow)
        .forEach((div) => div.classList.remove("d-none"));
    })
  );

  return nav;
}

function clearPageNav() {
  if (document.querySelector(".nav-numbers")) {
    document.querySelector(".nav-numbers").remove();
  }
}

function shortenPageDisplay(currPage, totalPage) {
  let minPage = Number(currPage) - 2;
  if (minPage < 0) {
    minPage = 0;
  } else if (minPage > totalPage - 5) {
    minPage = totalPage - 5;
  }
  let maxPage = minPage + 5;

  if (maxPage > totalPage) {
    maxPage = totalPage;
  }

  if (minPage != 0) {
    if (!document.querySelector(".first-li")) {
      let firstArrowLi = document.createElement("span");
      let firstArrowAnchor = document.createElement("a");
      firstArrowLi.classList.add("nav-item", "first-li", "mx-1");
      firstArrowAnchor.classList.add("nav-link", "arrow-left");

      firstArrowAnchor.textContent = "<";
      firstArrowLi.appendChild(firstArrowAnchor);

      firstArrowAnchor.addEventListener("click", function () {
        document.querySelector("a.active").classList.remove("active");
        if (document.querySelector(".first-li")) {
          document.querySelector(".first-li").remove();
        }
        document
          .querySelector("ul")
          .firstElementChild.firstElementChild.classList.add("active");

        [...stationCards.children].forEach((div) =>
          div.classList.add("d-none")
        );
        [...stationCards.children]
          .slice(0, cardsShown)
          .forEach((div) => div.classList.remove("d-none"));

        minPage = 0;
        maxPage = 5;

        shortenPageDisplay(minPage, totalPage);
      });

      document
        .querySelector("a.active")
        .parentElement.parentElement.prepend(firstArrowLi);
    }
  }

  if (maxPage != totalPage) {
    if (!document.querySelector(".last-li")) {
      let tempArrowLi = document.createElement("span");
      let tempArrowAnchor = document.createElement("a");
      tempArrowLi.classList.add("nav-item", "last-li", "mx-1");
      tempArrowAnchor.classList.add("nav-link", "arrow-right");

      tempArrowAnchor.textContent = ">";
      tempArrowLi.appendChild(tempArrowAnchor);
      tempArrowAnchor.addEventListener("click", function () {
        document.querySelector("a.active").classList.remove("active");
        if (document.querySelector(".last-li")) {
          document.querySelector(".last-li").remove();
        }
        document
          .querySelector("ul")
          .lastElementChild.firstElementChild.classList.add("active");

        [...stationCards.children].forEach((div) =>
          div.classList.add("d-none")
        );
        [...stationCards.children]
          .slice(
            document.querySelectorAll(".card").length - cardsShown,
            document.querySelectorAll(".card").length
          )
          .forEach((div) => div.classList.remove("d-none"));

        minPage = totalPage - 3;
        maxPage = totalPage;

        shortenPageDisplay(minPage, totalPage);
      });

      document
        .querySelector("a.active")
        .parentElement.parentElement.appendChild(tempArrowLi);
    }
  }

  if (maxPage >= totalPage) {
    removeArrow(".last-li");
  }

  if (minPage === 0) {
    removeArrow(".first-li");
  }

  for (let i = 0; i < totalPage; i++) {
    if (i < minPage) {
      document.querySelectorAll("li")[i].classList.add("d-none");
    } else if (i >= maxPage) {
      document.querySelectorAll("li")[i].classList.add("d-none");
    } else {
      document.querySelectorAll("li")[i].classList.remove("d-none");
    }
  }
}

function removeArrow(arrowDirection) {
  if (document.querySelector(arrowDirection)) {
    document.querySelector(arrowDirection).remove();
  }
}
