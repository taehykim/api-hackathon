const cykelAnchor = document.getElementById("cykel-anchor");
const titleSub = document.querySelector(".title-sub");
const bikeTable = document.querySelector("table");
const bikeTableBody = document.getElementById("bike-table-body");
const exampleMapText = document.getElementById("example-map");
const exploreBtn = document.querySelector(".explore-btn");
const citySelect = document.getElementById("city-select");
const countrySelect = document.getElementById("country-select");
const form = document.getElementById("location-form");
const selectCountry = document.getElementById("country-select");
const container = document.querySelector(".container");
let worldData = [];
let city = [];
let country = [];

getAllBike();

cykelAnchor.addEventListener("click", function () {
  titleSub.textContent = "Get out and bike in your favorite city";
  map.setCenter(sf);
  map.setZoom(11);
  removeTable();
  removeNav(document.querySelector("#nav"));
  bikeTable.classList.add("d-none");
  form.reset();
  exploreBtn.textContent = "Explore";
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

  removeTable();
  removeNav(document.getElementById("nav"));
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
    url: "http://api.citybik.es/v2/networks",
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
            url: "http://api.citybik.es" + data.networks[i].href,
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
            },
            error: function (err) {
              console.log(err);
            },
          });
        }
      }
    },

    error: function (err) {
      console.log(err);
    },
  });
}

function getBike(country, countryCode, city) {
  $.ajax({
    method: "GET",
    url: "http://api.citybik.es/v2/networks",
    success: function (data) {
      let totalStations = 0;
      bikeTable.classList.remove("d-none");
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

        // change the center of the map and zoom in
        map.setCenter({
          lat: totalLat / regionData.length,
          lng: totalLng / regionData.length,
        });
      }

      for (let i = 0; i < regionData.length; i++) {
        $.ajax({
          method: "GET",
          url: "http://api.citybik.es" + regionData[i].href,
          success: function (data) {
            totalStations += data.network.stations.length;
            titleSub.textContent =
              totalStations + " Bike stations in " + city + ", " + country;

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

              // fill in the table in DOM
              const stationName = data.network.stations[j].name;
              const totalBikes = data.network.stations[j].free_bikes;
              const availableBikes = data.network.stations[j].empty_slots;
              let eBikes = data.network.stations[j].extra.ebikes;

              if (!eBikes) {
                eBikes = 0;
              }

              bikeTableBody.appendChild(
                getNewRow(
                  stationName,
                  totalBikes,
                  availableBikes,
                  eBikes,
                  country,
                  city
                )
              );
            }
            map.setZoom(14);
            pageTable();
          },
          error: function (err) {
            console.log(err);
          },
        });
      }
      exploreBtn.textContent = "Explore Another Location";
    },
    error: function (err) {
      console.log(err);
    },
  });
}

// functions
function getCity(countryCode) {
  var filteredCity = [];
  for (var i = 0; i < worldData.networks.length; i++) {
    if (worldData.networks[i].location.country === countryCode) {
      filteredCity.push(worldData.networks[i].location.city);
    }
  }
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
  for (var i = 0; i < countries.length; i++) {
    countries[i] = countryShort[countries[i]];
  }
  countries = countries.sort();
  for (var i = 0; i < countries.length; i++) {
    var option = document.createElement("option");
    option.value = countries[i];
    option.textContent = countries[i];
    countrySelect.appendChild(option);
  }
}

// function displayTotal(totalStations) {
//   document.getElementById("stats").classList.remove("d-none");
//   document.getElementById("stats").textContent =
//     "There are total " + totalStations + " Bike Stations in this area";
// }

function removeNav(nav) {
  if (nav) nav.remove();
}

function removeNavs() {
  const navs = document.querySelectorAll("#nav");
  for (let i = 1; i < navs.length; i++) {
    container.removeChild(navs[i]);
  }
}

function removeTable() {
  bikeTableBody.innerHTML = "";
}

function getNewRow(
  stationName,
  totalBikes,
  availableBikes,
  eBikes,
  country,
  city
) {
  exampleMapText.classList.add("d-none");
  const newRow = document.createElement("tr");
  const stationTd = document.createElement("td");
  const totalBikesTd = document.createElement("td");
  const availableBikesTd = document.createElement("td");
  const eBikesTd = document.createElement("td");
  const cityTd = document.createElement("td");
  const countryTd = document.createElement("td");

  stationTd.classList.add("station");
  totalBikesTd.classList.add("total-bikes");
  availableBikesTd.classList.add("available-bikes");
  eBikesTd.classList.add("e-bikes");
  cityTd.classList.add("city");
  countryTd.classList.add("country");

  stationTd.textContent = stationName;
  totalBikesTd.textContent = totalBikes;
  availableBikesTd.textContent = availableBikes;
  eBikesTd.textContent = eBikes;
  cityTd.textContent = city;
  countryTd.textContent = country;

  newRow.append(
    stationTd,
    cityTd,
    countryTd,
    totalBikesTd,
    availableBikesTd,
    eBikesTd
  );

  return newRow;
}

function pageTable() {
  $(document).ready(function () {
    $("#data").after('<div id="nav"></div>');
    var rowsShown = 10;
    var rowsTotal = $("#data tbody tr").length;
    var numPages = rowsTotal / rowsShown;
    for (let i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      $("#nav").append('<a href="#" rel="' + i + '">' + pageNum + "</a> ");
    }

    $("#data tbody tr").hide();
    $("#data tbody tr").slice(0, rowsShown).show();
    $("#nav a:first").addClass("active");
    $("#nav a").bind("click", function () {
      $("#nav a").removeClass("active");
      $(this).addClass("active");
      var currPage = $(this).attr("rel");
      var startItem = currPage * rowsShown;
      var endItem = startItem + rowsShown;
      $("#data tbody tr")
        .css("opacity", "0.0") // making it 100% transparent
        .hide() // remove the tbody tr from the DOM
        .slice(startItem, endItem) // cut the row
        .css("display", "table-row") // displays the row (gives spaces for the row in DOM) but transparent
        .animate({ opacity: 1 }, 300); // in 300 milliseconds, change opacity to 1, so you can view it
    });
    removeNavs();
  });
}

//trying to get user's location on the main page
// var currentLocation = {};
// //   var sf = { lat: 37.7749, lng: -122.4194 };

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(pos) {
//   var crd = pos.coords;

//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
//   currentLocation.lat = parseFloat(crd.latitude);
//   currentLocation.lng = parseFloat(crd.longitude);

//   getAllBike(crd);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);
